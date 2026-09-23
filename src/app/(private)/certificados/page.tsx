"use client";

import { Download, Eye, FileBadge } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InlineAlert } from "@/components/ui/state";
import { certificates } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function CertificadosPage() {
  const [message, setMessage] = useState("");

  function showAction(course: string, action: "visualizar" | "baixar") {
    setMessage(action === "visualizar" ? `Visualização de ${course} aberta.` : `Download de ${course} preparado.`);
    window.setTimeout(() => setMessage(""), 1800);
  }

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Certificados</p>
        <h1 className="font-serif text-4xl">Conquistas e formações</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Estrutura preparada para geração futura de certificados em PDF.</p>
      </section>

      {message ? <InlineAlert>{message}</InlineAlert> : null}

      <section className="grid gap-4">
        {certificates.map((certificate) => (
          <article key={certificate.id} className="grid gap-4 rounded-[22px] border border-yugen-moss/18 bg-yugen-sand/45 p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-yugen-ochre/35 bg-yugen-oat/30 text-yugen-moss">
                <FileBadge className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone={certificate.status === "Disponível" ? "closed" : "upcoming"}>{certificate.status}</Badge>
                  <Badge>{certificate.hours}h</Badge>
                </div>
                <h2 className="mt-3 font-serif text-3xl leading-tight">{certificate.course}</h2>
                <p className="mt-1 text-sm text-yugen-ink/65">{formatDate(certificate.date)}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => showAction(certificate.course, "visualizar")} disabled={certificate.status !== "Disponível"}>
                <Eye className="h-4 w-4" aria-hidden="true" />
                Visualizar
              </Button>
              <Button onClick={() => showAction(certificate.course, "baixar")} disabled={certificate.status !== "Disponível"}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Baixar
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
