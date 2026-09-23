"use client";

import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { BrandLockup } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";
import { InlineAlert } from "@/components/ui/state";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    const result = await requestPasswordReset(email);
    setLoading(false);

    if (result.ok) {
      setMessage(result.message);
    } else {
      setError(result.message);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md yugen-panel p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <BrandLockup
            size="lg"
            title="Recuperar senha"
            subtitle="Informe o e-mail cadastrado."
            titleClassName="text-2xl"
            subtitleClassName="text-sm font-normal normal-case tracking-normal text-yugen-ink/65"
          />
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Field label="E-mail">
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          </Field>

          {message ? <InlineAlert>{message}</InlineAlert> : null}
          {error ? <InlineAlert tone="error">{error}</InlineAlert> : null}

          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar instruções"}
            <Send className="h-4 w-4" aria-hidden="true" />
          </Button>
        </form>

        <Link href="/login" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-yugen-moss hover:text-yugen-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao login
        </Link>
      </section>
    </main>
  );
}
