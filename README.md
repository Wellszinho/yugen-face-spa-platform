# Yugen Face Spa Platform

Portal privado para licenciadas e especialistas do Yugen Face Spa.

## Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Supabase + PostgreSQL
- Supabase Storage

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Acessos demo

Enquanto o Supabase não estiver configurado, o app usa autenticação local demonstrável:

- Licenciada: `licenciada@yugenface.com` / `Yugen@2026`
- Administradora: `admin@yugenface.com` / `Yugen@2026`

## Variáveis de ambiente

Crie `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Quando essas variáveis estiverem preenchidas, o login passa a tentar autenticação pelo Supabase. Sem elas, o modo demo permanece ativo.

## Banco de dados

A estrutura principal está em:

```bash
supabase/migrations/001_initial_schema.sql
supabase/seed.sql
```

Tabelas preparadas:

- `profiles`, `roles`
- `events`, `event_registrations`
- `content`, `content_categories`
- `techniques`
- `specialists`
- `community_posts`, `community_comments`, `community_likes`
- `groups`, `group_members`
- `benefits`
- `marketing_assets`
- `certificates`
- `notifications`
- `messages`

Também são criados buckets de Storage para `avatars`, `content`, `marketing` e `certificates`.

## Supabase

1. Crie um projeto no Supabase.
2. Execute a migration em `supabase/migrations/001_initial_schema.sql`.
3. Execute o seed em `supabase/seed.sql`.
4. Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Crie a primeira usuária pelo Supabase Auth.
6. Promova a usuária para administradora:

```sql
update public.profiles
set role_id = 'admin'
where email = 'seu-email@yugenface.com';
```

## Segurança

A migration habilita Row Level Security nas tabelas principais. A interface nunca deve ser a única barreira de permissão: ações administrativas devem continuar protegidas por RLS, papéis e validação no banco.

## Scripts

```bash
npm run dev        # ambiente local
npm run typecheck  # checagem TypeScript
npm run build      # build de produção
```

## Deploy

Para Vercel ou plataforma compatível com Next.js:

1. Configure as variáveis de ambiente do Supabase.
2. Rode as migrations no Supabase.
3. Publique o projeto.
4. Teste login, rotas privadas, painel admin e RLS.
