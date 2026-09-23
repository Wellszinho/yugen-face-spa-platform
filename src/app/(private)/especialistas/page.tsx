import Link from "next/link";
import { ArrowRight, CalendarDays, LibraryBig, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { events, specialists } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function EspecialistasPage() {
  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Especialistas Yugen</p>
        <h1 className="font-serif text-4xl">Mentoras e instrutoras</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Conheça as especialistas que conduzem aulas, encontros e protocolos da comunidade.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {specialists.map((specialist) => {
          const nextEvent = events.find((event) => event.id === specialist.nextEventId);
          return (
            <article key={specialist.id} className="yugen-card overflow-hidden">
              <img src={specialist.cover} alt="" className="grain-image h-44 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <img src={specialist.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
                  <div>
                    <h2 className="font-serif text-3xl leading-tight">{specialist.name}</h2>
                    <p className="mt-1 text-sm font-medium text-yugen-moss">{specialist.specialty}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-yugen-ink/70">{specialist.bio}</p>
                <div className="mt-5 grid gap-3 text-sm text-yugen-ink/72">
                  <span className="inline-flex items-center gap-2">
                    <LibraryBig className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                    {specialist.contentCount} conteúdos
                  </span>
                  {nextEvent ? (
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                      {formatDate(nextEvent.date)}
                    </span>
                  ) : null}
                </div>
                <Link href={`/especialistas/${specialist.id}`} className={buttonClassName({ variant: "secondary", className: "mt-5 w-full" })}>
                  Ver perfil
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="yugen-panel p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Star className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
          <h2 className="font-serif text-3xl">Formato das mentorias</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-yugen-ink/72">
          As especialistas podem conduzir aulas, responder dúvidas, participar de encontros ao vivo e publicar orientações no painel administrativo.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge>Conteúdos</Badge>
          <Badge>Eventos</Badge>
          <Badge>Protocolos</Badge>
          <Badge>Comunidade</Badge>
        </div>
      </section>
    </div>
  );
}
