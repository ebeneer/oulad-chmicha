-- Oulad Chmicha core schema
-- Run in Supabase SQL editor.

create extension if not exists "uuid-ossp";

create table if not exists public.guests (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text,
  phone text,
  language text default 'fr',
  notes text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.units (
  id text primary key,
  name text not null,
  unit_type text not null check (unit_type in ('bungalow_dry_toilet','room_standard_toilet')),
  capacity int not null,
  nightly_rate_dh int not null
);

create table if not exists public.reservations (
  id uuid primary key default uuid_generate_v4(),
  guest_id uuid references public.guests(id) on delete set null,
  channel text not null check (channel in ('airbnb','booking','direct')),
  unit_id text not null references public.units(id),
  check_in date not null,
  check_out date not null,
  guests_count int not null default 1,
  status text not null check (status in ('pending','confirmed','checked_in','checked_out')),
  created_at timestamptz not null default now()
);

create table if not exists public.templates (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  label text not null,
  body text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default uuid_generate_v4(),
  reservation_id uuid references public.reservations(id) on delete set null,
  guest_id uuid references public.guests(id) on delete set null,
  amount_dh int not null,
  status text not null check (status in ('draft','sent','partial','paid')),
  issued_at date not null default current_date,
  due_at date
);

create table if not exists public.stock_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null check (category in ('kitchen','cleaning','maintenance')),
  unit text not null,
  current_qty numeric not null default 0,
  min_qty numeric not null default 0
);

create table if not exists public.settings (
  id int primary key default 1,
  property_name text not null default 'Oulad Chmicha',
  directions_template text default '',
  checkin_template text default '',
  checkout_template text default ''
);

alter table public.guests enable row level security;
alter table public.units enable row level security;
alter table public.reservations enable row level security;
alter table public.templates enable row level security;
alter table public.invoices enable row level security;
alter table public.stock_items enable row level security;
alter table public.settings enable row level security;

-- Single-admin model: authenticated users can read/write.
create policy if not exists "auth_rw_guests" on public.guests
  for all to authenticated using (true) with check (true);
create policy if not exists "auth_rw_units" on public.units
  for all to authenticated using (true) with check (true);
create policy if not exists "auth_rw_reservations" on public.reservations
  for all to authenticated using (true) with check (true);
create policy if not exists "auth_rw_templates" on public.templates
  for all to authenticated using (true) with check (true);
create policy if not exists "auth_rw_invoices" on public.invoices
  for all to authenticated using (true) with check (true);
create policy if not exists "auth_rw_stock" on public.stock_items
  for all to authenticated using (true) with check (true);
create policy if not exists "auth_rw_settings" on public.settings
  for all to authenticated using (true) with check (true);
