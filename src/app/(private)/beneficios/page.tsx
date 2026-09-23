"use client";

import { CalendarDays, Copy, Gift, Tag } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InlineAlert } from "@/components/ui/state";
import { benefits } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function BeneficiosPage() {
  const [message, setMessage] = useState("");

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code);
    setMessage(`Código ${code} copiado.`);
    window.setTimeout(() => setMessage(""), 1800);
  }

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Benefícios exclusivos</p>
        <h1 className="font-serif text-4xl">Acessos para licenciadas</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Parceiros, materiais, eventos, condições especiais e campanhas para apoiar sua prática.</p>
      </section>

      {message ? <InlineAlert>{message}</InlineAlert> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {benefits.map((benefit) => (
          <article key={benefit.id} className="yugen-card overflow-hidden">
            <img src={benefit.image} alt="" className="grain-image h-48 w-full object-cover" />
            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                <Badge>{benefit.category}</Badge>
                <Badge tone="upcoming">
                  <CalendarDays className="mr-1 h-3 w-3" aria-hidden="true" />
                  {formatDate(benefit.validUntil)}
                </Badge>
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-tight">{benefit.title}</h2>
              <p className="mt-2 text-sm leading-6 text-yugen-ink/70">{benefit.description}</p>
              <div className="mt-5 rounded-[18px] border border-dashed border-yugen-moss/30 bg-yugen-sand/45 p-4">
                <div className="flex items-center gap-2 text-yugen-moss">
                  <Tag className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Código</span>
                </div>
                <p className="mt-2 font-semibold">{benefit.code}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => copyCode(benefit.code)}>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copiar código
                </Button>
                <Button variant="secondary">
                  <Gift className="h-4 w-4" aria-hidden="true" />
                  Acessar
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
