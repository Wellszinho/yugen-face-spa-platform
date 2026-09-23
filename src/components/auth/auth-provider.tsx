"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoPasswords, users } from "@/lib/data";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { UserProfile } from "@/lib/types";

const AUTH_STORAGE_KEY = "yugen-auth-user";
const PROFILE_STORAGE_KEY = "yugen-profile-overrides";

type AuthStatus = "loading" | "authenticated" | "anonymous";

interface AuthContextValue {
  user: UserProfile | null;
  status: AuthStatus;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ ok: boolean; message: string }>;
  updateProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as UserProfile;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function storeUser(user: UserProfile | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function mergeProfileOverrides(user: UserProfile) {
  if (typeof window === "undefined") {
    return user;
  }

  const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!stored) {
    return user;
  }

  try {
    const overrides = JSON.parse(stored) as Partial<UserProfile>;
    return { ...user, ...overrides };
  } catch {
    return user;
  }
}

async function mapSupabaseUser(email: string) {
  const fallback = users.find((candidate) => candidate.email === email) ?? users[1];

  if (!supabase) {
    return mergeProfileOverrides(fallback);
  }

  const { data } = await supabase.from("profiles").select("*").eq("email", email).maybeSingle();
  if (!data) {
    return mergeProfileOverrides(fallback);
  }

  return mergeProfileOverrides({
    id: String(data.id),
    name: String(data.full_name ?? fallback.name),
    email: String(data.email ?? email),
    role: data.role ?? fallback.role,
    avatar: String(data.avatar_url ?? fallback.avatar),
    phone: String(data.phone ?? fallback.phone),
    city: String(data.city ?? fallback.city),
    region: String(data.region ?? fallback.region),
    joinedAt: String(data.joined_at ?? fallback.joinedAt),
    specialties: Array.isArray(data.specialties) ? data.specialties : fallback.specialties,
    completedCourses: Number(data.completed_courses ?? fallback.completedCourses),
    progress: Number(data.progress ?? fallback.progress),
    active: Boolean(data.active ?? fallback.active)
  });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let active = true;

    async function hydrate() {
      const stored = readStoredUser();

      if (stored) {
        if (active) {
          setUser(mergeProfileOverrides(stored));
          setStatus("authenticated");
        }
        return;
      }

      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        const email = data.session?.user.email;
        if (email) {
          const mapped = await mapSupabaseUser(email);
          storeUser(mapped);
          if (active) {
            setUser(mapped);
            setStatus("authenticated");
          }
          return;
        }
      }

      if (active) {
        setStatus("anonymous");
      }
    }

    hydrate();

    return () => {
      active = false;
    };
  }, []);

  async function signIn(email: string, password: string) {
    const normalized = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const result = await supabase.auth.signInWithPassword({ email: normalized, password });
      if (!result.error && result.data.user.email) {
        const mapped = await mapSupabaseUser(result.data.user.email);
        setUser(mapped);
        setStatus("authenticated");
        storeUser(mapped);
        return { ok: true };
      }
    }

    const expectedPassword = demoPasswords[normalized];
    const demoUser = users.find((candidate) => candidate.email === normalized);

    if (!expectedPassword || expectedPassword !== password || !demoUser) {
      return { ok: false, message: "E-mail ou senha inválidos." };
    }

    const mapped = mergeProfileOverrides(demoUser);
    setUser(mapped);
    setStatus("authenticated");
    storeUser(mapped);
    return { ok: true };
  }

  async function signOut() {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    storeUser(null);
    setUser(null);
    setStatus("anonymous");
  }

  async function requestPasswordReset(email: string) {
    const normalized = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(normalized);
      if (error) {
        return { ok: false, message: error.message };
      }
      return { ok: true, message: "Enviamos as instruções de recuperação para o e-mail informado." };
    }

    return {
      ok: true,
      message: "Modo demo ativo. Em produção, o Supabase enviará o link de recuperação."
    };
  }

  function updateProfile(profile: UserProfile) {
    setUser(profile);
    storeUser(profile);
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isAdmin: user?.role === "admin",
      signIn,
      signOut,
      requestPasswordReset,
      updateProfile
    }),
    [status, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
