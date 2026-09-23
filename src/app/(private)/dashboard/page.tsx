"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Gift,
  GraduationCap,
  PlayCircle,
  Sparkles,
  Star,
  UserRound,
  Users,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClassName } from "@/components/ui/button";
import { contents, events, getSpecialist, notifications } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

const featureCards = [
  { href: "/agenda", title: "Encontros ao vivo", description: "Agenda e transmissões", icon: PlayCircle },
  { href: "/tecnicas", title: "Técnicas Yugen", description: "Biblioteca de conhecimento", icon: Sparkles },
  { href: "/conteudos", title: "Conteúdos", description: "Aulas, vídeos e materiais", icon: BookOpen },
  { href: "/comunidade", title: "Comunidade", description: "Trocas entre licenciadas", icon: Users },
  { href: "/especialistas", title: "Especialistas", description: "Equipe e mentorias", icon: Star },
  { href: "/beneficios", title: "Benefícios", description: "Acessos exclusivos", icon: Gift }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const nextEvent = events.find((event) => event.status === "AO VIVO") ?? events.find((event) => event.status === "EM BREVE") ?? events[0];
  const specialist = getSpecialist(nextEvent.specialistId);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("yugen-welcome-dismissed");
    if (!dismissed) {
      setShowWelcome(true);
    }
  }, []);

  function dismissWelcome() {
    window.localStorage.setItem("yugen-welcome-dismissed", "true");
    setShowWelcome(false);
  }

  return (
    <div className="grid gap-10">
      <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_20.75rem]">
        <div className="yugen-panel overflow-hidden bg-yugen-oat/78">
          <div className="grid min-h-[21rem] lg:grid-cols-[0.94fr_1.06fr]">
            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-9">
              <div>
                <span className="kanji-line text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-yugen-ochre">Início</span>
                <h2 className="mt-5 max-w-[32rem] font-serif text-[2.25rem] leading-[1.06] text-yugen-ink sm:text-[2.55rem] lg:text-[2.65rem]">
                  Bem-vinda à sua
                  <br />
                  comunidade Yugen
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-yugen-muted">Seu espaço para aprender, evoluir e compartilhar.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Metric icon={CheckCircle2} label="Progresso" value={`${user?.progress ?? 0}%`} />
                <Metric icon={GraduationCap} label="Cursos" value={`${user?.completedCourses ?? 0}`} />
                <Metric icon={Bell} label="Alertas" value={`${notifications.filter((item) => !item.read).length}`} />
              </div>
            </div>

            <div className="relative min-h-[21rem] overflow-hidden bg-yugen-oat">
              <img src={nextEvent.image} alt="" className="grain-image h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-yugen-ink/46 via-yugen-ink/12 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-yugen-oat sm:p-7">
                <Badge tone={nextEvent.status === "AO VIVO" ? "live" : "upcoming"} className="border-yugen-oat/55 bg-yugen-oat/88 text-yugen-ink">
                  {nextEvent.status}
                </Badge>
                <h3 className="mt-4 font-serif text-[1.85rem] leading-tight">{nextEvent.title}</h3>
                <p className="mt-2 text-sm text-yugen-oat/88">{nextEvent.subtitle}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-yugen-oat/88">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatDate(nextEvent.date)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {nextEvent.time}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                    {specialist?.name}
                  </span>
                </div>
                <Link href={`/agenda/${nextEvent.id}`} className={buttonClassName({ className: "mt-5 bg-yugen-moss/92" })}>
                  Participar
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <aside className="yugen-panel bg-yugen-oat/72 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl">Hoje</h3>
            <Badge tone="live">ao vivo</Badge>
          </div>
          <p className="mt-4 text-sm leading-7 text-yugen-muted">{nextEvent.description}</p>
          <div className="mt-6 grid gap-3">
            <SmallAction href="/agenda" icon={CalendarDays} label="Ver agenda" />
            <SmallAction href="/notificacoes" icon={Bell} label="Notificações" />
            <SmallAction href="/perfil" icon={Users} label="Meu progresso" />
          </div>
        </aside>
      </section>

      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-yugen-moss">Ecossistema</p>
            <h2 className="mt-1 font-serif text-[2rem] leading-tight">Áreas principais</h2>
          </div>
          <Link href="/conteudos" className="inline-flex items-center gap-2 text-sm font-semibold text-yugen-moss hover:text-yugen-ink">
            Ver biblioteca
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.title} href={card.href} className="yugen-card group min-h-[8.75rem] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-9 w-9 place-items-center rounded-full border border-yugen-ochre/32 bg-yugen-oat/62 text-yugen-moss">
                    <Icon className="h-[1.1rem] w-[1.1rem] stroke-[1.6]" aria-hidden="true" />
                  </div>
                  <ArrowRight className="mt-8 h-4 w-4 text-yugen-ochre transition group-hover:translate-x-1 group-hover:text-yugen-moss" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-serif text-[1.35rem] leading-tight text-yugen-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-5 text-yugen-muted">{card.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-3xl">Continuar aprendendo</h2>
            <Link href="/conteudos" className="text-sm font-semibold text-yugen-moss hover:text-yugen-ink">
              Todos
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {contents.slice(0, 2).map((item) => (
              <Link key={item.id} href="/conteudos" className="yugen-card overflow-hidden">
                <img src={item.cover} alt="" className="grain-image h-40 w-full object-cover" />
                <div className="p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-yugen-moss">{item.category}</p>
                  <h3 className="mt-2 font-serif text-xl leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-yugen-muted">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="yugen-panel p-5">
          <h2 className="font-serif text-3xl">Notificações recentes</h2>
          <div className="mt-4 grid gap-3">
            {notifications.slice(0, 3).map((item) => (
              <Link key={item.id} href="/notificacoes" className={cn("rounded-[16px] border p-4 transition hover:border-yugen-ochre/35", item.read ? "border-yugen-moss/10 bg-yugen-oat/50" : "border-yugen-ochre/25 bg-yugen-ochre/10")}>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-yugen-muted">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {showWelcome ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-yugen-ink/25 px-4 backdrop-blur-sm">
          <section className="w-full max-w-lg yugen-panel p-6 sm:p-7" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-yugen-moss">Primeiro acesso</p>
                <h2 id="welcome-title" className="mt-2 font-serif text-3xl">Bem-vinda ao Yugen.</h2>
              </div>
              <Button variant="ghost" size="icon" aria-label="Pular apresentação" onClick={dismissWelcome}>
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-4 text-sm leading-7 text-yugen-muted">Este é o seu espaço exclusivo para aprender, compartilhar e evoluir como licenciada Yugen.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Conteúdos", "Comunidade", "Agenda", "Benefícios"].map((item) => (
                <div key={item} className="rounded-[16px] border border-yugen-moss/10 bg-yugen-oat/65 p-4 text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
            <Button className="mt-6 w-full" onClick={dismissWelcome}>
              Começar
            </Button>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] border border-yugen-clay/85 bg-yugen-oat/58 p-4">
      <Icon className="mb-3 h-[1.1rem] w-[1.1rem] text-yugen-moss" aria-hidden={true} />
      <p className="font-serif text-2xl leading-none text-yugen-ink">{value}</p>
      <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-yugen-moss">{label}</p>
    </div>
  );
}

function SmallAction({
  href,
  icon: Icon,
  label
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
}) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-[18px] border border-yugen-clay/85 bg-yugen-oat/54 px-4 py-3.5 text-sm font-semibold transition hover:border-yugen-ochre/40 hover:bg-yugen-oat/78">
      <span className="inline-flex items-center gap-3">
        <Icon className="h-4 w-4 text-yugen-moss stroke-[1.7]" aria-hidden={true} />
        {label}
      </span>
      <ArrowRight className="h-3.5 w-3.5 text-yugen-ochre" aria-hidden="true" />
    </Link>
  );
}
