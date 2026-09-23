"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle2, Layers3, PackageCheck, PlayCircle, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";
import { EmptyState } from "@/components/ui/state";
import { contents, techniques } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["Todas", "Face Spa", "Drenagem", "Relaxamento", "Lifting", "Técnicas avançadas", "Protocolos"];

export default function TecnicasPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [selectedId, setSelectedId] = useState(techniques[0]?.id ?? "");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return techniques.filter((technique) => {
      const matchesCategory = category === "Todas" || technique.category === category;
      const matchesQuery =
        !normalized ||
        technique.title.toLowerCase().includes(normalized) ||
        technique.indication.toLowerCase().includes(normalized) ||
        technique.category.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const selected = techniques.find((item) => item.id === selectedId) ?? filtered[0] ?? techniques[0];
  const related = contents.find((item) => item.id === selected?.relatedContentId);

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Biblioteca de conhecimento</p>
            <h1 className="font-serif text-4xl">Técnicas Yugen</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Protocolos, indicações, contraindicações e passo a passo para consulta segura.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[28rem]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-yugen-moss" aria-hidden="true" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar técnica" className="pl-10" aria-label="Buscar técnica" />
            </label>
            <Select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filtrar categoria">
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <EmptyState title="Nenhuma técnica encontrada." description="Tente outro termo ou categoria." />
      ) : (
        <section className="grid gap-6 xl:grid-cols-[22rem_1fr]">
          <nav className="grid gap-3" aria-label="Técnicas">
            {filtered.map((technique) => (
              <button
                key={technique.id}
                type="button"
                className={cn(
                  "rounded-[20px] border p-4 text-left transition",
                  selected?.id === technique.id
                    ? "border-yugen-ochre/60 bg-yugen-ochre/16"
                    : "border-yugen-moss/18 bg-yugen-sand/45 hover:border-yugen-ochre/50"
                )}
                onClick={() => setSelectedId(technique.id)}
              >
                <Badge>{technique.category}</Badge>
                <p className="mt-3 font-serif text-2xl leading-tight">{technique.title}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-yugen-ink/70">{technique.indication}</p>
              </button>
            ))}
          </nav>

          {selected ? (
            <article className="yugen-panel p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Badge>{selected.category}</Badge>
                  <h2 className="mt-3 font-serif text-4xl leading-tight">{selected.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-yugen-ink/72">{selected.notes}</p>
                </div>
                {related ? (
                  <Link href="/conteudos" className={buttonClassName({ variant: "secondary" })}>
                    <PlayCircle className="h-4 w-4" aria-hidden="true" />
                    Conteúdo relacionado
                  </Link>
                ) : null}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <InfoBlock icon={CheckCircle2} title="Indicação" body={selected.indication} />
                <InfoBlock icon={AlertTriangle} title="Contraindicações" body={selected.contraindications} />
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Layers3 className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
                    <h3 className="font-serif text-3xl">Passo a passo</h3>
                  </div>
                  <ol className="grid gap-3">
                    {selected.steps.map((step, index) => (
                      <li key={step} className="flex gap-3 rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/38 p-4">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yugen-moss text-sm font-semibold text-yugen-sand">{index + 1}</span>
                        <span className="pt-1 text-sm leading-6">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <PackageCheck className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
                    <h3 className="font-serif text-3xl">Materiais</h3>
                  </div>
                  <div className="grid gap-3">
                    {selected.materials.map((material) => (
                      <div key={material} className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/38 p-4 text-sm font-medium">
                        {material}
                      </div>
                    ))}
                  </div>
                  {related ? (
                    <div className="mt-5 rounded-[20px] border border-yugen-ochre/35 bg-yugen-ochre/12 p-4">
                      <div className="flex items-center gap-2 text-yugen-moss">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        <p className="text-sm font-semibold">Relacionado</p>
                      </div>
                      <p className="mt-2 font-serif text-2xl">{related.title}</p>
                      <p className="mt-2 text-sm leading-6 text-yugen-ink/70">{related.description}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ) : null}
        </section>
      )}
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  body
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[20px] border border-yugen-moss/15 bg-yugen-sand/38 p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-yugen-moss" aria-hidden={true} />
        <h3 className="font-serif text-2xl">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-yugen-ink/72">{body}</p>
    </div>
  );
}
