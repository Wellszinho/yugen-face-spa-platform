"use client";

import Link from "next/link";
import { CalendarCheck, CalendarDays, Clock, Filter, Heart, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClassName } from "@/components/ui/button";
import { Select } from "@/components/ui/form";
import { EmptyState } from "@/components/ui/state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { events, getSpecialist } from "@/lib/data";
import { EventStatus } from "@/lib/types";
import { cn, formatDate, formatShortDate } from "@/lib/utils";

const statusOptions: Array<EventStatus | "TODOS"> = ["TODOS", "AO VIVO", "EM BREVE", "ENCERRADO"];

export default function AgendaPage() {
  const [status, setStatus] = useState<EventStatus | "TODOS">("TODOS");
  const [interested, setInterested] = useLocalStorage<string[]>("yugen-interested-events", []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => status === "TODOS" || event.status === status);
  }, [status]);

  function toggleInterest(id: string) {
    setInterested((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="grid gap-6">
      <section className="grid gap-6 xl:grid-cols-[22rem_1fr]">
        <div className="yugen-panel p-5">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-yugen-moss" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Calendário</p>
              <h2 className="font-serif text-3xl">Setembro 2026</h2>
            </div>
          </div>
          <CalendarMini />
        </div>

        <div className="yugen-panel p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Agenda</p>
              <h1 className="font-serif text-4xl">Encontros e masterclasses</h1>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
              <Select value={status} onChange={(event) => setStatus(event.target.value as EventStatus | "TODOS")} aria-label="Filtrar por status">
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            </label>
          </div>

          <div className="mt-6 grid gap-4">
            {filteredEvents.length === 0 ? (
              <EmptyState title="Nenhum encontro agendado no momento." description="Troque o filtro para consultar outros eventos." />
            ) : (
              filteredEvents.map((event) => {
                const specialist = getSpecialist(event.specialistId);
                const isInterested = interested.includes(event.id);
                return (
                  <article key={event.id} className="grid gap-4 rounded-[22px] border border-yugen-moss/18 bg-yugen-sand/45 p-4 sm:grid-cols-[12rem_1fr]">
                    <img src={event.image} alt="" className="grain-image h-48 w-full rounded-[18px] object-cover sm:h-full" />
                    <div className="flex flex-col justify-between gap-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone={event.status === "AO VIVO" ? "live" : event.status === "EM BREVE" ? "upcoming" : "closed"}>{event.status}</Badge>
                          <Badge>{event.type}</Badge>
                        </div>
                        <h2 className="mt-3 font-serif text-3xl">{event.title}</h2>
                        <p className="mt-1 font-medium text-yugen-moss">{event.subtitle}</p>
                        <p className="mt-3 text-sm leading-6 text-yugen-ink/70">{event.description}</p>
                      </div>
                      <div className="grid gap-3 text-sm text-yugen-ink/75 sm:grid-cols-3">
                        <span className="inline-flex items-center gap-2">
                          <CalendarCheck className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                          {formatDate(event.date)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                          {event.time} · {event.duration}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <UserRound className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                          {specialist?.name}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link href={`/agenda/${event.id}`} className={buttonClassName({})}>
                          {event.status === "ENCERRADO" ? "Ver detalhes" : "Participar"}
                        </Link>
                        <Button variant={isInterested ? "primary" : "secondary"} onClick={() => toggleInterest(event.id)}>
                          <Heart className={cn("h-4 w-4", isInterested ? "fill-current" : "")} aria-hidden="true" />
                          {isInterested ? "Interesse marcado" : "Tenho interesse"}
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function CalendarMini() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const eventDays = new Set(events.map((event) => Number(event.date.split("-")[2])));

  return (
    <div className="mt-5">
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-yugen-moss">
        {["S", "T", "Q", "Q", "S", "S", "D"].map((day, index) => (
          <span key={`${day}-${index}`} className="py-2">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const hasEvent = eventDays.has(day);
          return (
            <div
              key={day}
              className={cn(
                "grid aspect-square place-items-center rounded-2xl text-sm transition",
                hasEvent ? "bg-yugen-moss font-semibold text-yugen-sand" : "bg-yugen-sand/40 text-yugen-ink/70"
              )}
              title={hasEvent ? `Evento em ${formatShortDate(`2026-09-${String(day).padStart(2, "0")}`)}` : undefined}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
