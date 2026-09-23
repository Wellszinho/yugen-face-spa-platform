"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { BrandLockup, BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";
import { InlineAlert, LoadingState } from "@/components/ui/state";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, status } = useAuth();
  const [email, setEmail] = useState("licenciada@yugenface.com");
  const [password, setPassword] = useState("Yugen@2026");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextPath, setNextPath] = useState("/dashboard");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(params.get("next") || "/dashboard");
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(nextPath);
    }
  }, [nextPath, router, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);

    if (!result.ok) {
      setError(result.message ?? "Não foi possível entrar.");
      return;
    }

    router.replace(nextPath);
  }

  if (status === "loading") {
    return <LoadingState label="Preparando acesso..." />;
  }

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[0.94fr_1.06fr]">
      <section className="relative hidden overflow-hidden border-r border-yugen-moss/15 lg:block">
        <img
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=80"
          alt="Jardim japonês com caminho de pedra"
          className="grain-image h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-yugen-ink/25" />
        <div className="absolute bottom-10 left-10 max-w-lg text-yugen-sand">
          <BrandLogo size="xl" className="mb-6 border-yugen-sand/35 bg-yugen-oat/20" />
          <p className="font-serif text-5xl leading-tight">Yugen Face Spa</p>
          <p className="mt-4 max-w-md text-base leading-7 text-yugen-sand/85">
            Um espaço privado para aprendizado, encontros, comunidade e evolução profissional.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md yugen-panel p-6 sm:p-8">
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-3">
              <BrandLockup
                size="lg"
                title="Yugen Face Spa"
                subtitle="Área das licenciadas"
                titleClassName="text-2xl"
                subtitleClassName="text-xs tracking-[0.18em]"
              />
            </div>
            <h1 className="font-serif text-4xl leading-tight">Bem-vinda à sua comunidade Yugen.</h1>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <Field label="E-mail">
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
            </Field>
            <Field label="Senha">
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
            </Field>

            {error ? <InlineAlert tone="error">{error}</InlineAlert> : null}

            <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full">
              {loading ? "Entrando..." : "Entrar"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
            <Link href="/forgot-password" className="font-medium text-yugen-moss hover:text-yugen-ink">
              Esqueci minha senha
            </Link>
            <span className="inline-flex items-center gap-2 text-yugen-ink/65">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Sessão persistente
            </span>
          </div>

          <div className="mt-6 grid gap-3 border-t border-yugen-moss/15 pt-6">
            <p className="text-sm font-medium text-yugen-ink/75">Acessos demo</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setEmail("licenciada@yugenface.com");
                  setPassword("Yugen@2026");
                }}
              >
                Licenciada
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setEmail("admin@yugenface.com");
                  setPassword("Yugen@2026");
                }}
              >
                Administradora
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
