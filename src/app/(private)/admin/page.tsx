"use client";

import {
  BarChart3,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  Plus,
  Save,
  Search,
  Trash2,
  UsersRound
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/form";
import { EmptyState, InlineAlert } from "@/components/ui/state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  adminMetrics,
  benefits,
  certificates,
  contents,
  events,
  marketingAssets,
  notifications,
  posts,
  specialists,
  techniques,
  users
} from "@/lib/data";
import { cn } from "@/lib/utils";

type AdminRecord = { id: string; published?: boolean; [key: string]: unknown };
type AdminData = Record<string, AdminRecord[]>;

const modules = [
  { id: "users", label: "Usuárias", primaryKey: "name", secondaryKey: "email", detailKey: "region" },
  { id: "specialists", label: "Especialistas", primaryKey: "name", secondaryKey: "specialty", detailKey: "bio" },
  { id: "events", label: "Eventos", primaryKey: "title", secondaryKey: "status", detailKey: "description" },
  { id: "contents", label: "Conteúdos", primaryKey: "title", secondaryKey: "category", detailKey: "description" },
  { id: "techniques", label: "Técnicas", primaryKey: "title", secondaryKey: "category", detailKey: "indication" },
  { id: "posts", label: "Comunidade", primaryKey: "content", secondaryKey: "tab", detailKey: "authorId" },
  { id: "benefits", label: "Benefícios", primaryKey: "title", secondaryKey: "category", detailKey: "description" },
  { id: "marketing", label: "Marketing", primaryKey: "title", secondaryKey: "category", detailKey: "description" },
  { id: "certificates", label: "Certificados", primaryKey: "course", secondaryKey: "status", detailKey: "date" },
  { id: "notifications", label: "Notificações", primaryKey: "title", secondaryKey: "type", detailKey: "body" }
] as const;

const defaultAdminData: AdminData = {
  users: mapRecords(users),
  specialists: mapRecords(specialists),
  events: mapRecords(events),
  contents: mapRecords(contents),
  techniques: mapRecords(techniques),
  posts: mapRecords(posts),
  benefits: mapRecords(benefits),
  marketing: mapRecords(marketingAssets),
  certificates: mapRecords(certificates),
  notifications: mapRecords(notifications)
};

function mapRecords<T extends { id: string }>(items: T[]): AdminRecord[] {
  return items.map((item) => ({ ...item, published: true }));
}

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const [data, setData] = useLocalStorage<AdminData>("yugen-admin-data", defaultAdminData);
  const [activeModule, setActiveModule] = useState<(typeof modules)[number]["id"]>("events");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const activeConfig = modules.find((module) => module.id === activeModule) ?? modules[0];
  const records = data[activeModule] ?? [];
  const editingRecord = records.find((record) => record.id === editingId);

  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return records;
    return records.filter((record) => JSON.stringify(record).toLowerCase().includes(normalized));
  }, [query, records]);

  if (!isAdmin) {
    return (
      <div className="yugen-panel p-6">
        <h1 className="font-serif text-4xl">Acesso administrativo restrito</h1>
        <p className="mt-2 text-sm leading-6 text-yugen-ink/70">Entre com uma conta administradora para gerenciar conteúdos e configurações.</p>
      </div>
    );
  }

  function saveRecord(formData: FormData) {
    const primary = String(formData.get("primary") ?? "").trim();
    const secondary = String(formData.get("secondary") ?? "").trim();
    const detail = String(formData.get("detail") ?? "").trim();

    if (!primary) {
      setMessage("Informe o campo principal antes de salvar.");
      return;
    }

    setData((current) => {
      const currentRecords = current[activeModule] ?? [];
      const nextRecord: AdminRecord = {
        ...(editingRecord ?? {}),
        id: editingRecord?.id ?? crypto.randomUUID(),
        [activeConfig.primaryKey]: primary,
        [activeConfig.secondaryKey]: secondary,
        [activeConfig.detailKey]: detail,
        published: editingRecord?.published ?? true,
        updatedAt: new Date().toISOString()
      };

      const nextRecords = editingRecord
        ? currentRecords.map((record) => (record.id === editingRecord.id ? { ...record, ...nextRecord } : record))
        : [nextRecord, ...currentRecords];

      return { ...current, [activeModule]: nextRecords };
    });

    setEditingId(null);
    setMessage(editingRecord ? "Registro atualizado." : "Registro criado.");
    window.setTimeout(() => setMessage(""), 1800);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveRecord(new FormData(event.currentTarget));
    event.currentTarget.reset();
  }

  function deleteRecord(id: string) {
    setData((current) => ({
      ...current,
      [activeModule]: (current[activeModule] ?? []).filter((record) => record.id !== id)
    }));
    setEditingId(null);
    setMessage("Registro excluído.");
    window.setTimeout(() => setMessage(""), 1800);
  }

  function togglePublish(id: string) {
    setData((current) => ({
      ...current,
      [activeModule]: (current[activeModule] ?? []).map((record) => (record.id === id ? { ...record, published: !record.published } : record))
    }));
  }

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Painel administrativo</p>
            <h1 className="font-serif text-4xl">Gestão da plataforma</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-yugen-ink/70">Gerencie usuárias, eventos, conteúdos, técnicas, comunidade, benefícios e notificações.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {adminMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/38 p-4">
                <p className="font-serif text-3xl leading-none">{metric.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-yugen-moss">{metric.label}</p>
                <p className="mt-1 text-xs text-yugen-ink/58">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {message ? <InlineAlert tone={message.includes("Informe") ? "error" : "success"}>{message}</InlineAlert> : null}

      <section className="grid gap-6 xl:grid-cols-[18rem_1fr]">
        <aside className="yugen-panel p-3">
          <nav className="grid gap-1" aria-label="Módulos administrativos">
            {modules.map((module) => (
              <button
                key={module.id}
                type="button"
                className={cn(
                  "flex items-center justify-between rounded-[18px] px-4 py-3 text-left text-sm font-semibold transition",
                  activeModule === module.id ? "bg-yugen-moss text-yugen-sand" : "text-yugen-ink/74 hover:bg-yugen-oat/35"
                )}
                onClick={() => {
                  setActiveModule(module.id);
                  setEditingId(null);
                  setQuery("");
                }}
              >
                {module.label}
                <span className="text-xs opacity-70">{data[module.id]?.length ?? 0}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <form className="yugen-panel grid gap-4 p-5" onSubmit={handleSubmit} key={`${activeModule}-${editingId ?? "new"}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">{activeConfig.label}</p>
                  <h2 className="font-serif text-3xl">{editingRecord ? "Editar registro" : "Novo registro"}</h2>
                </div>
                <Plus className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
              </div>
              <Field label={fieldLabel(activeConfig.primaryKey)}>
                <Input name="primary" defaultValue={editingRecord ? stringify(editingRecord[activeConfig.primaryKey]) : ""} required />
              </Field>
              <Field label={fieldLabel(activeConfig.secondaryKey)}>
                <Input name="secondary" defaultValue={editingRecord ? stringify(editingRecord[activeConfig.secondaryKey]) : ""} />
              </Field>
              <Field label={fieldLabel(activeConfig.detailKey)}>
                <Textarea name="detail" defaultValue={editingRecord ? stringify(editingRecord[activeConfig.detailKey]) : ""} />
              </Field>
              <div className="flex flex-wrap gap-3">
                <Button type="submit">
                  <Save className="h-4 w-4" aria-hidden="true" />
                  {editingRecord ? "Salvar alterações" : "Criar"}
                </Button>
                {editingRecord ? (
                  <Button type="button" variant="secondary" onClick={() => setEditingId(null)}>
                    Cancelar
                  </Button>
                ) : null}
              </div>
            </form>

            <div className="yugen-panel p-5">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
                <h2 className="font-serif text-3xl">Atividade</h2>
              </div>
              <div className="mt-5 grid gap-4">
                {[
                  { label: "Eventos", value: 74 },
                  { label: "Conteúdos", value: 86 },
                  { label: "Comunidade", value: 62 },
                  { label: "Benefícios", value: 48 }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm font-semibold">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-yugen-oat/35">
                      <div className="h-full rounded-full bg-yugen-moss" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4">
                <div className="flex items-center gap-2">
                  <UsersRound className="h-4 w-4 text-yugen-moss" aria-hidden="true" />
                  <p className="text-sm font-semibold">Permissões</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-yugen-ink/70">A estrutura de papéis já aceita licenciada, administradora, especialista, instrutora, moderadora e gestora regional.</p>
              </div>
            </div>
          </div>

          <section className="yugen-panel p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-3xl">Registros</h2>
                <p className="text-sm text-yugen-ink/65">{filteredRecords.length} itens encontrados.</p>
              </div>
              <label className="relative sm:w-72">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-yugen-moss" aria-hidden="true" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar" className="pl-10" aria-label="Buscar registros" />
              </label>
            </div>

            <div className="mt-5 grid gap-3">
              {filteredRecords.length === 0 ? (
                <EmptyState title="Nenhum registro encontrado." description="Crie um novo registro ou ajuste a busca." />
              ) : (
                filteredRecords.map((record) => (
                  <article key={record.id} className="grid gap-4 rounded-[20px] border border-yugen-moss/15 bg-yugen-sand/36 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <Badge tone={record.published ? "closed" : "neutral"}>{record.published ? "Publicado" : "Rascunho"}</Badge>
                        {record[activeConfig.secondaryKey] ? <Badge>{stringify(record[activeConfig.secondaryKey])}</Badge> : null}
                      </div>
                      <h3 className="mt-3 font-serif text-2xl leading-tight">{stringify(record[activeConfig.primaryKey])}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-yugen-ink/68">{stringify(record[activeConfig.detailKey])}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setEditingId(record.id)}>
                        <Edit3 className="h-4 w-4" aria-hidden="true" />
                        Editar
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => togglePublish(record.id)}>
                        {record.published ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                        {record.published ? "Despublicar" : "Publicar"}
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => deleteRecord(record.id)}>
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        Excluir
                      </Button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function stringify(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined) return "";
  return String(value);
}

function fieldLabel(key: string) {
  const labels: Record<string, string> = {
    name: "Nome",
    email: "E-mail",
    region: "Região",
    specialty: "Especialidade",
    bio: "Bio",
    title: "Título",
    status: "Status",
    description: "Descrição",
    category: "Categoria",
    indication: "Indicação",
    content: "Publicação",
    tab: "Aba",
    authorId: "Autoria",
    course: "Curso",
    date: "Data",
    type: "Tipo",
    body: "Mensagem"
  };
  return labels[key] ?? key;
}
