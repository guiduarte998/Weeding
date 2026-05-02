-- Core tables for wedding site v1
create table if not exists public.events (
  id bigserial primary key,
  event_type text not null check (event_type in ('civil', 'reception', 'other')),
  title text not null,
  starts_at timestamptz not null,
  location_name text not null,
  address text,
  maps_url text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.rsvps (
  id bigserial primary key,
  guest_name text not null,
  guest_email text not null,
  guest_cpf text not null,
  attending boolean not null default true,
  has_companion boolean not null default false,
  companion_name text,
  companion_cpf text,
  created_at timestamptz not null default now(),
  constraint rsvps_guest_cpf_format check (char_length(guest_cpf) = 11 and guest_cpf ~ '^[0-9]+$'),
  constraint rsvps_companion_cpf_format check (
    companion_cpf is null or (char_length(companion_cpf) = 11 and companion_cpf ~ '^[0-9]+$')
  ),
  constraint rsvps_companion_consistency check (
    (not has_companion and companion_name is null and companion_cpf is null)
    or (
      has_companion
      and companion_name is not null
      and length(trim(companion_name)) > 0
      and companion_cpf is not null
      and char_length(companion_cpf) = 11
    )
  )
);

create index if not exists rsvps_guest_email_idx on public.rsvps (guest_email);

create table if not exists public.gifts (
  id bigserial primary key,
  title text not null,
  description text,
  amount_cents integer not null check (amount_cents > 0),
  image_url text,
  status text not null default 'available' check (status in ('available', 'reserved', 'gifted')),
  created_at timestamptz not null default now()
);

create table if not exists public.gift_orders (
  id bigserial primary key,
  gift_id bigint not null references public.gifts(id),
  payer_name text,
  payer_email text,
  amount_cents integer not null check (amount_cents > 0),
  payment_provider text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  provider_reference text,
  message text,
  created_at timestamptz not null default now()
);

-- Seed data for first preview
insert into public.events (event_type, title, starts_at, location_name, address, maps_url, notes)
values
  ('civil', 'Civil Ceremony', '2026-09-21 10:00:00+00', 'City Hall', 'Main Street 123', 'https://maps.google.com', 'Bring ID document.'),
  ('reception', 'Reception Party', '2026-09-21 19:00:00+00', 'Garden Venue', 'Sunset Avenue 777', 'https://maps.google.com', 'Cocktail attire.')
on conflict do nothing;

insert into public.gifts (title, description, amount_cents, image_url, status)
values
  ('Dinner for two', 'Help us celebrate on honeymoon.', 18000, 'https://picsum.photos/800/600?1', 'available'),
  ('Hotel night', 'A cozy stay after the wedding.', 35000, 'https://picsum.photos/800/600?2', 'available'),
  ('Photo album', 'Printed memory book.', 12000, 'https://picsum.photos/800/600?3', 'available')
on conflict do nothing;
