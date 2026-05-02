-- RSVP: CPF do convidado (11 dígitos, sem máscara) + acompanhante opcional
-- Execute no Supabase: SQL Editor → New query → colar e Run.
-- Se a tabela `rsvps` já existir sem estas colunas, este script é seguro (IF NOT EXISTS).

alter table public.rsvps
  add column if not exists guest_cpf text,
  add column if not exists has_companion boolean not null default false,
  add column if not exists companion_name text,
  add column if not exists companion_cpf text;

comment on column public.rsvps.guest_cpf is '11 dígitos numéricos, sem pontuação (normalizado na API).';
comment on column public.rsvps.has_companion is 'true se houver acompanhante; companion_* obrigatórios nesse caso.';
comment on column public.rsvps.companion_cpf is '11 dígitos quando has_companion = true; senão NULL.';

-- Formato quando preenchido (permite NULL em bases antigas até backfill)
alter table public.rsvps drop constraint if exists rsvps_guest_cpf_format;
alter table public.rsvps
  add constraint rsvps_guest_cpf_format check (
    guest_cpf is null or (char_length(guest_cpf) = 11 and guest_cpf ~ '^[0-9]+$')
  );

alter table public.rsvps drop constraint if exists rsvps_companion_cpf_format;
alter table public.rsvps
  add constraint rsvps_companion_cpf_format check (
    companion_cpf is null or (char_length(companion_cpf) = 11 and companion_cpf ~ '^[0-9]+$')
  );

alter table public.rsvps drop constraint if exists rsvps_companion_consistency;
alter table public.rsvps
  add constraint rsvps_companion_consistency check (
    (not has_companion and companion_name is null and companion_cpf is null)
    or (
      has_companion
      and companion_name is not null
      and length(trim(companion_name)) > 0
      and companion_cpf is not null
      and char_length(companion_cpf) = 11
    )
  );

-- Opcional: exigir CPF em todos os registos novos (só ative se não houver linhas antigas sem CPF)
-- alter table public.rsvps alter column guest_cpf set not null;
