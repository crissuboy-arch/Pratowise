-- Executar uma vez no SQL Editor do Supabase.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  objetivo text,
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Só o servidor (service role) escreve. Ninguém lê pela API pública.
alter table public.waitlist enable row level security;
