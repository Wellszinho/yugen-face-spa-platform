create extension if not exists "pgcrypto";

create table if not exists public.roles (
  id text primary key,
  label text not null,
  description text
);

insert into public.roles (id, label, description) values
  ('licensed', 'Licenciada', 'Acesso à área privada da comunidade'),
  ('admin', 'Administrador', 'Gestão completa da plataforma'),
  ('specialist', 'Especialista', 'Conduz conteúdos e encontros'),
  ('instructor', 'Instrutora', 'Apoia treinamentos e aulas'),
  ('moderator', 'Moderadora', 'Modera comunidade e discussões'),
  ('regional_manager', 'Gestora regional', 'Acompanha grupos regionais')
on conflict (id) do nothing;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role_id text not null references public.roles(id) default 'licensed',
  avatar_url text,
  phone text,
  city text,
  region text,
  joined_at date not null default current_date,
  specialties text[] not null default '{}',
  completed_courses integer not null default 0,
  progress integer not null default 0 check (progress between 0 and 100),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace view public.users
with (security_invoker = true)
as
select
  profiles.id,
  profiles.email,
  profiles.full_name,
  profiles.role_id,
  profiles.active,
  profiles.created_at
from public.profiles;

create table if not exists public.specialists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text not null,
  bio text not null,
  avatar_url text,
  cover_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  specialist_id uuid references public.specialists(id) on delete set null,
  starts_at timestamptz not null,
  duration_minutes integer not null default 60,
  status text not null check (status in ('AO VIVO', 'EM BREVE', 'ENCERRADO')),
  type text not null,
  image_url text,
  description text,
  live_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  interested boolean not null default true,
  created_at timestamptz not null default now(),
  unique (event_id, profile_id)
);

create table if not exists public.content_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category_id uuid references public.content_categories(id) on delete set null,
  kind text not null,
  level text not null,
  specialist_id uuid references public.specialists(id) on delete set null,
  duration text,
  cover_url text,
  asset_url text,
  published boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.techniques (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  indication text,
  contraindications text,
  steps text[] not null default '{}',
  materials text[] not null default '{}',
  notes text,
  related_content_id uuid references public.content(id) on delete set null,
  video_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  private boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.group_members (
  group_id uuid not null references public.groups(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (group_id, profile_id)
);

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  group_id uuid references public.groups(id) on delete cascade,
  tab text not null check (tab in ('Feed', 'Discussões', 'Avisos')),
  content text not null,
  image_url text,
  pinned boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.community_likes (
  post_id uuid not null references public.community_posts(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, profile_id)
);

create table if not exists public.benefits (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  valid_until date,
  code text,
  image_url text,
  access_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketing_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  format text,
  file_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  course text not null,
  issued_at date,
  status text not null default 'Em emissão',
  hours integer not null default 0,
  pdf_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  type text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete set null,
  recipient_id uuid references public.profiles(id) on delete cascade,
  subject text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.current_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role_id from public.profiles where id = auth.uid()), 'licensed');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() = 'admin';
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.specialists enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.content_categories enable row level security;
alter table public.content enable row level security;
alter table public.techniques enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_likes enable row level security;
alter table public.benefits enable row level security;
alter table public.marketing_assets enable row level security;
alter table public.certificates enable row level security;
alter table public.notifications enable row level security;
alter table public.messages enable row level security;

create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles_update_own_or_admin" on public.profiles
  for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy "profiles_insert_admin" on public.profiles
  for insert with check (public.is_admin());
create policy "profiles_delete_admin" on public.profiles
  for delete using (public.is_admin());

create policy "admin_all_specialists" on public.specialists for all using (public.is_admin()) with check (public.is_admin());
create policy "members_read_specialists" on public.specialists for select using (published and auth.uid() is not null);

create policy "admin_all_events" on public.events for all using (public.is_admin()) with check (public.is_admin());
create policy "members_read_events" on public.events for select using (published and auth.uid() is not null);

create policy "registrations_own_or_admin" on public.event_registrations for select using (profile_id = auth.uid() or public.is_admin());
create policy "registrations_insert_own" on public.event_registrations for insert with check (profile_id = auth.uid());
create policy "registrations_update_own_or_admin" on public.event_registrations for update using (profile_id = auth.uid() or public.is_admin()) with check (profile_id = auth.uid() or public.is_admin());
create policy "registrations_delete_own_or_admin" on public.event_registrations for delete using (profile_id = auth.uid() or public.is_admin());

create policy "admin_all_content_categories" on public.content_categories for all using (public.is_admin()) with check (public.is_admin());
create policy "members_read_content_categories" on public.content_categories for select using (auth.uid() is not null);

create policy "admin_all_content" on public.content for all using (public.is_admin()) with check (public.is_admin());
create policy "members_read_content" on public.content for select using (published and auth.uid() is not null);

create policy "admin_all_techniques" on public.techniques for all using (public.is_admin()) with check (public.is_admin());
create policy "members_read_techniques" on public.techniques for select using (published and auth.uid() is not null);

create policy "admin_all_groups" on public.groups for all using (public.is_admin()) with check (public.is_admin());
create policy "members_read_groups" on public.groups for select using (auth.uid() is not null);
create policy "members_read_group_members" on public.group_members for select using (profile_id = auth.uid() or public.is_admin());
create policy "admin_all_group_members" on public.group_members for all using (public.is_admin()) with check (public.is_admin());

create policy "members_read_posts" on public.community_posts for select using (published and auth.uid() is not null);
create policy "members_insert_posts" on public.community_posts for insert with check (author_id = auth.uid());
create policy "members_update_own_posts" on public.community_posts for update using (author_id = auth.uid() or public.is_admin()) with check (author_id = auth.uid() or public.is_admin());
create policy "members_delete_own_posts" on public.community_posts for delete using (author_id = auth.uid() or public.is_admin());

create policy "members_read_comments" on public.community_comments for select using (auth.uid() is not null);
create policy "members_insert_comments" on public.community_comments for insert with check (author_id = auth.uid());
create policy "members_delete_own_comments" on public.community_comments for delete using (author_id = auth.uid() or public.is_admin());

create policy "members_read_likes" on public.community_likes for select using (auth.uid() is not null);
create policy "members_manage_own_likes" on public.community_likes for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

create policy "admin_all_benefits" on public.benefits for all using (public.is_admin()) with check (public.is_admin());
create policy "members_read_benefits" on public.benefits for select using (published and auth.uid() is not null);

create policy "admin_all_marketing_assets" on public.marketing_assets for all using (public.is_admin()) with check (public.is_admin());
create policy "members_read_marketing_assets" on public.marketing_assets for select using (published and auth.uid() is not null);

create policy "certificates_own_or_admin" on public.certificates for select using (profile_id = auth.uid() or public.is_admin());
create policy "certificates_admin_all" on public.certificates for all using (public.is_admin()) with check (public.is_admin());

create policy "notifications_own_or_admin" on public.notifications for select using (profile_id is null or profile_id = auth.uid() or public.is_admin());
create policy "notifications_update_own_or_admin" on public.notifications for update using (profile_id = auth.uid() or public.is_admin()) with check (profile_id = auth.uid() or public.is_admin());
create policy "notifications_admin_all" on public.notifications for all using (public.is_admin()) with check (public.is_admin());

create policy "messages_own_or_admin" on public.messages for select using (recipient_id = auth.uid() or sender_id = auth.uid() or public.is_admin());
create policy "messages_insert_authenticated" on public.messages for insert with check (sender_id = auth.uid() or public.is_admin());
create policy "messages_update_own_or_admin" on public.messages for update using (recipient_id = auth.uid() or public.is_admin()) with check (recipient_id = auth.uid() or public.is_admin());
create policy "messages_delete_admin" on public.messages for delete using (public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('content', 'content', false),
  ('marketing', 'marketing', false),
  ('certificates', 'certificates', false)
on conflict (id) do nothing;
