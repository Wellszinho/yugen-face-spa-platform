"use client";

import Link from "next/link";
import { ArrowLeft, Clock, FileText, MessageCircle, Play, Send, UserRound } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClassName } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form";
import { EmptyState } from "@/components/ui/state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { events, getEvent, getSpecialist } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function EventDetailPage({ id }: { id: string }) {
  const event = getEvent(id);
  const [questions, setQuestions] = useLocalStorage<Array<{ id: string; body: string }>>(`yugen-event-questions-${id}`, []);
  const [question, setQuestion] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    if (!event) return null;
    const target = new Date(`${event.date}T${event.time}:00`);
    const diff = Math.max(target.getTime() - now.getTime(), 0);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return { days, hours, minutes };
  }, [event, now]);

  if (!event) {
    return <EmptyState title="Evento não encontrado." description="Volte para a agenda e escolha outro encontro." />;
  }

  const specialist = getSpecialist(event.specialistId);

  function handleQuestion(eventSubmit: FormEvent<HTMLFormElement>) {
    eventSubmit.preventDefault();
    if (!question.trim()) return;
    setQuestions((current) => [{ id: crypto.randomUUID(), body: question.trim() }, ...current]);
    setQuestion("");
  }

  return (
    <div className="grid gap-6">
      <Link href="/agenda" className="inline-flex items-center gap-2 text-sm font-semibold text-yugen-moss hover:text-yugen-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar para agenda
      </Link>

      <section className="yugen-panel overflow-hidden">
        <div className="relative min-h-[19rem]">
          <img src={event.image} alt="" className="grain-image h-full min-h-[19rem] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-yugen-oat/95 via-yugen-oat/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-yugen-ink sm:p-7">
            <Badge tone={event.status === "AO VIVO" ? "live" : event.status === "EM BREVE" ? "upcoming" : "closed"} className="bg-yugen-oat/80">
              {event.status}
            </Badge>
            <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">{event.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-yugen-muted">{event.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-yugen-muted">
              <span>{formatDate(event.date)}</span>
              <span>{event.time} · {event.duration}</span>
              <span>{specialist?.name}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="grid gap-6">
          <div className="yugen-panel p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Transmissão</p>
                <h2 className="font-serif text-3xl">{event.status === "AO VIVO" ? "Sala ao vivo" : "Entrada do evento"}</h2>
              </div>
              {event.status !== "ENCERRADO" ? (
                <Link href="#" className={buttonClassName({})}>
                  Entrar na sala
                  <Play className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>

            <div className="mt-5 grid min-h-[18rem] place-items-center rounded-[20px] border border-yugen-moss/10 bg-yugen-sage/55 p-6 text-center text-yugen-ink">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-yugen-moss/15 bg-yugen-oat/55">
                  <Play className="h-6 w-6 text-yugen-moss" aria-hidden="true" />
                </div>
                <p className="mt-5 font-serif text-2xl">{event.status === "AO VIVO" ? "Transmissão preparada" : "Aguardando o horário"}</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-yugen-muted">
                  Esta área está preparada para receber YouTube Live, Vimeo, Zoom, Google Meet ou outro provedor de streaming.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="yugen-panel p-5">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
                <h2 className="font-serif text-3xl">Perguntas</h2>
              </div>
              <form className="mt-4 grid gap-3" onSubmit={handleQuestion}>
                <Textarea value={question} onChange={(eventQuestion) => setQuestion(eventQuestion.target.value)} placeholder="Escreva sua pergunta para a especialista." aria-label="Pergunta para o evento" />
                <Button type="submit">
                  Enviar pergunta
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
              <div className="mt-5 grid gap-3">
                {questions.length === 0 ? (
                  <p className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4 text-sm text-yugen-ink/70">Nenhuma pergunta enviada ainda.</p>
                ) : (
                  questions.map((item) => (
                    <p key={item.id} className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4 text-sm">
                      {item.body}
                    </p>
                  ))
                )}
              </div>
            </div>

            <div className="yugen-panel p-5">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
                <h2 className="font-serif text-3xl">Materiais</h2>
              </div>
              <div className="mt-4 grid gap-3">
                {["Resumo da aula", "Checklist de prática", "Ficha de observações"].map((material) => (
                  <button key={material} type="button" className="flex items-center justify-between rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4 text-left text-sm font-semibold transition hover:border-yugen-ochre/55">
                    {material}
                    <FileText className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-6">
          <div className="yugen-panel p-5">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
              <h2 className="font-serif text-3xl">Contador</h2>
            </div>
            {countdown ? (
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <TimeBox label="dias" value={countdown.days} />
                <TimeBox label="horas" value={countdown.hours} />
                <TimeBox label="min" value={countdown.minutes} />
              </div>
            ) : null}
          </div>

          <div className="yugen-panel p-5">
            <div className="flex items-center gap-3">
              <UserRound className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
              <h2 className="font-serif text-3xl">Especialista</h2>
            </div>
            {specialist ? (
              <div className="mt-4 flex items-center gap-3">
                <img src={specialist.avatar} alt="" className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{specialist.name}</p>
                  <p className="text-sm text-yugen-ink/65">{specialist.specialty}</p>
                </div>
              </div>
            ) : null}
            <p className="mt-4 text-sm leading-6 text-yugen-ink/70">{event.description}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/40 p-3">
      <p className="font-serif text-3xl leading-none">{String(value).padStart(2, "0")}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-yugen-moss">{label}</p>
    </div>
  );
}
