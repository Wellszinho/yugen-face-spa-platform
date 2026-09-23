"use client";

import { Bell, CheckCheck } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { notifications as initialNotifications } from "@/lib/data";

export default function NotificacoesPage() {
  const [readIds, setReadIds] = useLocalStorage<string[]>("yugen-read-notifications", initialNotifications.filter((item) => item.read).map((item) => item.id));

  const notifications = useMemo(() => {
    return initialNotifications.map((item) => ({ ...item, read: readIds.includes(item.id) }));
  }, [readIds]);

  function markAllRead() {
    setReadIds(initialNotifications.map((item) => item.id));
  }

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Notificações</p>
            <h1 className="font-serif text-4xl">Atualizações importantes</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Eventos, conteúdos, comunidade, benefícios e certificados.</p>
          </div>
          <Button variant="secondary" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4" aria-hidden="true" />
            Marcar tudo como lido
          </Button>
        </div>
      </section>

      {notifications.length === 0 ? (
        <EmptyState title="Você está em dia." description="Novas notificações aparecerão aqui." />
      ) : (
        <section className="grid gap-3">
          {notifications.map((notification) => (
            <article key={notification.id} className="flex gap-4 rounded-[22px] border border-yugen-moss/18 bg-yugen-sand/45 p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-yugen-ochre/35 bg-yugen-oat/30 text-yugen-moss">
                <Bell className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{notification.type}</Badge>
                  {!notification.read ? <Badge tone="upcoming">Novo</Badge> : null}
                </div>
                <h2 className="mt-3 font-serif text-2xl">{notification.title}</h2>
                <p className="mt-1 text-sm leading-6 text-yugen-ink/70">{notification.body}</p>
              </div>
              {!notification.read ? (
                <Button variant="ghost" onClick={() => setReadIds((current) => [...current, notification.id])}>
                  Lida
                </Button>
              ) : null}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
