"use client";

import { Save, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";
import { InlineAlert } from "@/components/ui/state";

export default function PerfilPage() {
  const { user, updateProfile } = useAuth();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    city: user?.city ?? "",
    region: user?.region ?? "",
    specialties: user?.specialties.join(", ") ?? ""
  });

  if (!user) return null;

  const currentUser = user;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateProfile({
      ...currentUser,
      name: form.name,
      phone: form.phone,
      city: form.city,
      region: form.region,
      specialties: form.specialties
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    });
    setMessage("Perfil atualizado.");
    window.setTimeout(() => setMessage(""), 1800);
  }

  return (
    <div className="grid gap-6">
      <section className="yugen-panel p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <img src={currentUser.avatar} alt="" className="h-24 w-24 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yugen-moss">Meu perfil</p>
            <h1 className="font-serif text-4xl">{currentUser.name}</h1>
            <p className="mt-2 text-sm text-yugen-ink/68">{currentUser.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {currentUser.specialties.map((specialty) => (
                <Badge key={specialty}>{specialty}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {message ? <InlineAlert>{message}</InlineAlert> : null}

      <section className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <form className="yugen-panel grid gap-4 p-5 sm:p-6" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-yugen-moss" aria-hidden="true" />
            <h2 className="font-serif text-3xl">Informações editáveis</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome">
              <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
            </Field>
            <Field label="Telefone">
              <Input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
            </Field>
            <Field label="Cidade">
              <Input value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
            </Field>
            <Field label="Região">
              <Input value={form.region} onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))} />
            </Field>
          </div>
          <Field label="Especialidades" hint="Separe por vírgula.">
            <Input value={form.specialties} onChange={(event) => setForm((current) => ({ ...current, specialties: event.target.value }))} />
          </Field>
          <Button type="submit" className="w-fit">
            <Save className="h-4 w-4" aria-hidden="true" />
            Salvar perfil
          </Button>
        </form>

        <aside className="yugen-panel p-5">
          <h2 className="font-serif text-3xl">Progresso</h2>
          <div className="mt-5">
            <div className="h-3 overflow-hidden rounded-full bg-yugen-oat/35">
              <div className="h-full rounded-full bg-yugen-moss" style={{ width: `${currentUser.progress}%` }} />
            </div>
            <p className="mt-3 text-sm font-semibold">{currentUser.progress}% da trilha concluída</p>
          </div>
          <div className="mt-6 grid gap-3 text-sm">
            <p className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4">{currentUser.completedCourses} cursos concluídos</p>
            <p className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4">Entrada: {new Intl.DateTimeFormat("pt-BR").format(new Date(`${currentUser.joinedAt}T12:00:00`))}</p>
            <p className="rounded-[18px] border border-yugen-moss/15 bg-yugen-sand/35 p-4">Perfil: {currentUser.role === "admin" ? "Administrador" : "Licenciada"}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
