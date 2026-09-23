"use client";

import { Bookmark, Clock, PlayCircle, Search, SlidersHorizontal, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";
import { EmptyState, InlineAlert } from "@/components/ui/state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { contents, getSpecialist, specialists } from "@/lib/data";
import { ContentKind, ContentLevel } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

const categories: Array<ContentKind | "Todas"> = ["Todas", "Aula", "Vídeo", "Artigo", "PDF", "Material", "Treinamento"];
const levels: Array<ContentLevel | "Todos"> = ["Todos", "Essencial", "Intermediário", "Avançado"];

export default function ConteudosPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ContentKind | "Todas">("Todas");
  const [level, setLevel] = useState<ContentLevel | "Todos">("Todos");
  const [specialistId, setSpecialistId] = useState("todos");
  const [saved, setSaved] = useLocalStorage<string[]>("yugen-saved-content", []);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return contents.filter((item) => {
      const specialist = getSpecialist(item.specialistId);
      const matchesQuery =
        !normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        specialist?.name.toLowerCase().includes(normalized);
      const matchesCategory = category === "Todas" || item.category === category;
      const matchesLevel = level === "Todos" || item.level === level;
      const matchesSpecialist = specialistId === "todos" || item.specialistId === specialistId;
      return matchesQuery && matchesCategory && matchesLevel && matchesSpecialist;
    });
  }, [category, level, query, specialistId]);

  function toggleSaved(id: string) {
    setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    setMessage(saved.includes(id) ? "Conteúdo removido dos salvos." : "Conteúdo salvo.");
    window.setTimeout(() => setMessage(""), 1800);
  }

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Biblioteca</p>
            <h1 className="font-serif text-4xl">Conteúdos Yugen</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Aulas, vídeos, artigos, PDFs e treinamentos para apoiar sua evolução profissional.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[28rem]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-yugen-moss" aria-hidden="true" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar conteúdo" className="pl-10" aria-label="Buscar conteúdo" />
            </label>
            <Select value={category} onChange={(event) => setCategory(event.target.value as ContentKind | "Todas")} aria-label="Filtrar categoria">
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-yugen-moss">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filtros
          </span>
          <Select value={level} onChange={(event) => setLevel(event.target.value as ContentLevel | "Todos")} className="w-auto" aria-label="Filtrar nível">
            {levels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
          <Select value={specialistId} onChange={(event) => setSpecialistId(event.target.value)} className="w-auto" aria-label="Filtrar especialista">
            <option value="todos">Todas especialistas</option>
            {specialists.map((specialist) => (
              <option key={specialist.id} value={specialist.id}>
                {specialist.name}
              </option>
            ))}
          </Select>
        </div>
      </section>

      {message ? <InlineAlert>{message}</InlineAlert> : null}

      {filtered.length === 0 ? (
        <EmptyState title="Nenhum conteúdo encontrado." description="Ajuste a busca ou remova algum filtro." />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => {
            const specialist = getSpecialist(item.specialistId);
            const isSaved = saved.includes(item.id);
            return (
              <article key={item.id} className="yugen-card overflow-hidden">
                <img src={item.cover} alt="" className="grain-image h-48 w-full object-cover" />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{item.category}</Badge>
                    <Badge>{item.level}</Badge>
                  </div>
                  <h2 className="mt-4 font-serif text-3xl leading-tight">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-yugen-ink/70">{item.description}</p>
                  <div className="mt-4 grid gap-2 text-sm text-yugen-ink/70">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                      {item.duration} · {formatDate(item.date)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                      {specialist?.name}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button>
                      <PlayCircle className="h-4 w-4" aria-hidden="true" />
                      Assistir
                    </Button>
                    <Button variant={isSaved ? "primary" : "secondary"} onClick={() => toggleSaved(item.id)}>
                      <Bookmark className={cn("h-4 w-4", isSaved ? "fill-current" : "")} aria-hidden="true" />
                      {isSaved ? "Salvo" : "Salvar"}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
