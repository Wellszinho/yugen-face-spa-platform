import Link from "next/link";
import { ArrowLeft, CalendarDays, LibraryBig } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/state";
import { contents, events, specialists } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function SpecialistDetailPage({ id }: { id: string }) {
  const specialist = specialists.find((item) => item.id === id);

  if (!specialist) {
    return <EmptyState title="Especialista não encontrada." description="Volte para a lista e escolha outro perfil." />;
  }

  const specialistContents = contents.filter((item) => item.specialistId === specialist.id);
  const specialistEvents = events.filter((item) => item.specialistId === specialist.id);

  return (
    <div className="grid gap-6">
      <Link href="/especialistas" className="inline-flex items-center gap-2 text-sm font-semibold text-yugen-moss hover:text-yugen-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar para especialistas
      </Link>

      <section className="yugen-panel overflow-hidden">
        <div className="relative min-h-[18rem]">
          <img src={specialist.cover} alt="" className="grain-image h-full min-h-[18rem] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-yugen-oat/95 via-yugen-oat/34 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-5 text-yugen-ink sm:flex-row sm:items-end sm:p-7">
            <img src={specialist.avatar} alt="" className="h-20 w-20 rounded-full border-2 border-yugen-oat object-cover" />
            <div>
              <Badge className="bg-yugen-oat/80">{specialist.specialty}</Badge>
              <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{specialist.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-muted">{specialist.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <LibraryBig className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
            <h2 className="font-serif text-3xl">Conteúdos da especialista</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {specialistContents.map((item) => (
              <Link key={item.id} href="/conteudos" className="yugen-card overflow-hidden">
                <img src={item.cover} alt="" className="grain-image h-40 w-full object-cover" />
                <div className="p-5">
                  <Badge>{item.category}</Badge>
                  <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-yugen-ink/70">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="yugen-panel p-5">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
            <h2 className="font-serif text-3xl">Próximos eventos</h2>
          </div>
          <div className="mt-4 grid gap-3">
            {specialistEvents.length === 0 ? (
              <p className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4 text-sm text-yugen-ink/70">Nenhum evento agendado.</p>
            ) : (
              specialistEvents.map((event) => (
                <Link key={event.id} href={`/agenda/${event.id}`} className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4 transition hover:border-yugen-ochre/55">
                  <Badge tone={event.status === "AO VIVO" ? "live" : event.status === "EM BREVE" ? "upcoming" : "closed"}>{event.status}</Badge>
                  <p className="mt-3 font-semibold">{event.title}</p>
                  <p className="mt-1 text-sm text-yugen-ink/65">{formatDate(event.date)}</p>
                </Link>
              ))
            )}
          </div>
          <Link href="/agenda" className={buttonClassName({ variant: "secondary", className: "mt-5 w-full" })}>
            Ver agenda completa
          </Link>
        </aside>
      </section>
    </div>
  );
}
