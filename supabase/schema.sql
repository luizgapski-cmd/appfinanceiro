-- =============================================================
-- SCHEMA - App de Gestão Financeira
-- Execute este script no SQL Editor do seu projeto no Supabase:
-- Dashboard → SQL Editor → New query → cole e clique em Run
-- =============================================================


-- ---------------------------------------------------------------
-- 1. TABELA DE TRANSAÇÕES
-- ---------------------------------------------------------------
create table if not exists public.transactions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount      numeric(12, 2) not null check (amount > 0),
  date        date not null,
  type        text not null check (type in ('receita', 'despesa')),
  category    text not null check (
    category in (
      'Alimentação',
      'Transporte',
      'Moradia',
      'Lazer',
      'Saúde',
      'Educação',
      'Salário',
      'Freelance',
      'Outros'
    )
  ),
  created_at  timestamptz not null default now()
);


-- ---------------------------------------------------------------
-- 2. ÍNDICES — aceleram filtros e ordenações comuns
-- ---------------------------------------------------------------
create index if not exists transactions_user_id_idx  on public.transactions (user_id);
create index if not exists transactions_date_idx      on public.transactions (date desc);
create index if not exists transactions_type_idx      on public.transactions (type);


-- ---------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS)
-- Cada usuário enxerga e manipula APENAS as próprias transações.
-- ---------------------------------------------------------------
alter table public.transactions enable row level security;

-- Leitura: só as próprias transações
create policy "Usuário lê suas transações"
  on public.transactions
  for select
  using (auth.uid() = user_id);

-- Inserção: user_id deve ser o do usuário autenticado
create policy "Usuário cria suas transações"
  on public.transactions
  for insert
  with check (auth.uid() = user_id);

-- Atualização: só as próprias transações
create policy "Usuário atualiza suas transações"
  on public.transactions
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Exclusão: só as próprias transações
create policy "Usuário deleta suas transações"
  on public.transactions
  for delete
  using (auth.uid() = user_id);
