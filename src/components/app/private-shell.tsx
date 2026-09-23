"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  FileBadge,
  Gift,
  Home,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Settings,
  Sparkles,
  User,
  Users,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { BrandLockup, BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/state";
import { messages, notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/conteudos", label: "Conteúdos", icon: BookOpen },
  { href: "/tecnicas", label: "Técnicas Yugen", icon: Sparkles },
  { href: "/comunidade", label: "Comunidade", icon: Users },
  { href: "/especialistas", label: "Especialistas", icon: User },
  { href: "/beneficios", label: "Benefícios", icon: Gift },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
  { href: "/certificados", label: "Certificados", icon: FileBadge },
  { href: "/perfil", label: "Meu perfil", icon: Settings }
];

const mobileNavItems = navItems.slice(0, 5);

export function PrivateShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, status, isAdmin, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"notifications" | "messages" | "user" | null>(null);

  const unreadNotifications = notifications.filter((item) => !item.read).length;
  const unreadMessages = messages.filter((item) => item.unread).length;

  const allNavItems = useMemo(() => {
    if (!isAdmin) {
      return navItems;
    }
    return [...navItems, { href: "/admin", label: "Admin", icon: LayoutDashboard }];
  }, [isAdmin]);

  useEffect(() => {
    if (status === "anonymous") {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router, status]);

  useEffect(() => {
    setMenuOpen(false);
    setPanel(null);
  }, [pathname]);

  if (status === "loading" || !user) {
    return <LoadingState label="Abrindo seu espaço Yugen..." />;
  }

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[18.4rem] flex-col border-r border-yugen-clay/85 bg-yugen-sage/76 lg:flex">
        <BrandBlock />
        <nav className="no-scrollbar mt-5 flex-1 space-y-2 overflow-y-auto px-6 pb-5" aria-label="Navegação principal">
          {allNavItems.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href || pathname.startsWith(`${item.href}/`)} />
          ))}
        </nav>
        <div className="m-6 rounded-[20px] border border-yugen-clay/80 bg-yugen-oat/58 p-5">
          <p className="font-serif text-lg leading-tight">Comunidade de licenciadas</p>
          <p className="mt-2 text-xs leading-5 text-yugen-muted">Acompanhe encontros, conteúdos e benefícios em um único ambiente.</p>
        </div>
      </aside>

      <div className="lg:pl-[18.4rem]">
        <header className="sticky top-0 z-30 border-b border-yugen-clay/85 bg-yugen-oat/72 backdrop-blur-xl">
          <div className="flex h-[4.85rem] items-center justify-between gap-3 overflow-hidden px-4 sm:px-6 lg:px-9">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
                <Menu className="h-4 w-4" aria-hidden="true" />
              </Button>
              <BrandLogo size="sm" className="sm:hidden" />
              <div className="hidden sm:block lg:hidden">
                <BrandLockup size="sm" />
              </div>
              <div className="hidden min-w-0 sm:block">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-yugen-ochre">Yugen Face Spa</p>
                <h1 className="font-serif text-[1.55rem] leading-tight text-yugen-ink sm:text-[1.85rem]">{pageTitle(pathname)}</h1>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <HeaderIconButton
                label="Notificações"
                count={unreadNotifications}
                active={panel === "notifications"}
                onClick={() => setPanel(panel === "notifications" ? null : "notifications")}
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
              </HeaderIconButton>
              <HeaderIconButton
                label="Mensagens"
                count={unreadMessages}
                active={panel === "messages"}
                onClick={() => setPanel(panel === "messages" ? null : "messages")}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </HeaderIconButton>
              <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-full border border-yugen-clay/85 bg-yugen-oat/70 p-1 pr-2 transition hover:border-yugen-ochre/45"
                onClick={() => setPanel(panel === "user" ? null : "user")}
                aria-expanded={panel === "user"}
              >
                <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                <ChevronDown className="hidden h-4 w-4 sm:block" aria-hidden="true" />
                <span className="sr-only">Abrir menu da usuária</span>
              </button>
            </div>
          </div>

          {panel ? (
            <div className="absolute right-4 top-[4rem] z-50 w-[min(22rem,calc(100vw-2rem))] yugen-panel p-4">
              {panel === "notifications" ? <NotificationPanel /> : null}
              {panel === "messages" ? <MessagePanel /> : null}
              {panel === "user" ? <UserPanel user={user} onSignOut={handleSignOut} /> : null}
            </div>
          ) : null}
        </header>

        <main className="mx-auto w-full max-w-[86rem] px-4 py-8 sm:px-6 lg:px-9 lg:py-9">{children}</main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-[24px] border border-yugen-clay/90 bg-yugen-oat/92 p-2 shadow-yugen backdrop-blur-xl lg:hidden" aria-label="Navegação mobile">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "grid min-h-12 place-items-center rounded-[18px] px-1 text-[0.6rem] font-medium leading-none transition",
                active ? "bg-yugen-moss text-yugen-oat" : "text-yugen-muted hover:bg-yugen-sage/60"
              )}
            >
              <Icon className="mb-1 h-4 w-4" aria-hidden="true" />
              <span className="max-w-full truncate text-center">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-yugen-ink/18" aria-label="Fechar menu" type="button" onClick={() => setMenuOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[min(22rem,88vw)] flex-col rounded-l-none border-yugen-clay/90 bg-yugen-sage/96 p-0 yugen-panel">
            <div className="flex items-center justify-between border-b border-yugen-clay/80 px-5 py-4">
              <BrandLockup size="md" />
              <Button variant="ghost" size="icon" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Menu mobile">
              {allNavItems.map((item) => (
                <NavLink key={item.href} item={item} active={pathname === item.href || pathname.startsWith(`${item.href}/`)} />
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function BrandBlock() {
  return (
    <div className="border-b border-yugen-clay/80 px-8 py-8">
      <BrandLockup size="md" />
    </div>
  );
}

function NavLink({
  item,
  active
}: {
  item: { href: string; label: string; icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }> };
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex min-h-[2.85rem] items-center gap-3 rounded-[18px] border px-4 text-[0.84rem] font-medium transition",
        active
          ? "border-transparent bg-yugen-moss text-yugen-oat shadow-[0_10px_18px_rgba(104,116,65,0.16)]"
          : "border-transparent text-yugen-ink/76 hover:bg-yugen-oat/58 hover:text-yugen-ink"
      )}
    >
      <Icon className={cn("h-4 w-4 stroke-[1.7]", active ? "text-yugen-oat" : "text-yugen-ink/68")} aria-hidden={true} />
      <span>{item.label}</span>
    </Link>
  );
}

function HeaderIconButton({
  children,
  label,
  count,
  active,
  onClick
}: {
  children: React.ReactNode;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border border-yugen-clay/85 transition sm:h-10 sm:w-10",
        active ? "bg-yugen-sage text-yugen-moss" : "bg-yugen-oat/68 text-yugen-ink hover:border-yugen-ochre/45"
      )}
      aria-label={label}
      onClick={onClick}
    >
      {children}
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-yugen-terracotta px-1 text-[0.58rem] font-bold text-yugen-oat">
          {count}
        </span>
      ) : null}
    </button>
  );
}

function NotificationPanel() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-xl">Notificações</h2>
        <Link href="/notificacoes" className="text-sm font-medium text-yugen-moss hover:text-yugen-ink">
          Ver todas
        </Link>
      </div>
      <div className="space-y-3">
        {notifications.slice(0, 4).map((item) => (
          <Link key={item.id} href="/notificacoes" className="block rounded-[16px] border border-yugen-moss/10 bg-yugen-oat/65 p-3 transition hover:border-yugen-ochre/35">
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-1 text-xs leading-5 text-yugen-muted">{item.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MessagePanel() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-xl">Mensagens</h2>
        <Mail className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
      </div>
      <div className="space-y-3">
        {messages.map((item) => (
          <article key={item.id} className="rounded-[16px] border border-yugen-moss/10 bg-yugen-oat/65 p-3">
            <p className="text-sm font-semibold">{item.subject}</p>
            <p className="mt-1 text-xs text-yugen-muted">{item.sender}</p>
            <p className="mt-2 text-xs leading-5 text-yugen-muted">{item.preview}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function UserPanel({ user, onSignOut }: { user: { name: string; email: string; avatar: string; role: string }; onSignOut: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <img src={user.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-yugen-muted">{user.email}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        <Link href="/perfil" className="flex items-center gap-2 rounded-[16px] px-3 py-2 text-sm transition hover:bg-yugen-sage/55">
          <User className="h-4 w-4" aria-hidden="true" />
          Meu perfil
        </Link>
        <button type="button" className="flex items-center gap-2 rounded-[16px] px-3 py-2 text-left text-sm transition hover:bg-yugen-sage/55" onClick={onSignOut}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sair
        </button>
      </div>
    </div>
  );
}

function pageTitle(pathname: string) {
  if (pathname.startsWith("/agenda")) return "Agenda";
  if (pathname.startsWith("/conteudos")) return "Conteúdos";
  if (pathname.startsWith("/tecnicas")) return "Técnicas Yugen";
  if (pathname.startsWith("/comunidade")) return "Comunidade";
  if (pathname.startsWith("/especialistas")) return "Especialistas";
  if (pathname.startsWith("/beneficios")) return "Benefícios";
  if (pathname.startsWith("/marketing")) return "Marketing";
  if (pathname.startsWith("/certificados")) return "Certificados";
  if (pathname.startsWith("/perfil")) return "Meu perfil";
  if (pathname.startsWith("/notificacoes")) return "Notificações";
  if (pathname.startsWith("/admin")) return "Painel administrativo";
  return "Comunidade Yugen";
}
