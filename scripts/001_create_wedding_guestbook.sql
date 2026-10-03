-- Run this in Supabase once the integration is connected.

create table if not exists public.wedding_guestbook (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  guest_name text not null check (char_length(guest_name) between 2 and 80),
  relationship text not null check (
    relationship in ('Keluarga', 'Sahabat', 'Rakan Kerja', 'Rakan', 'Lain-lain')
  ),
  doa text not null check (char_length(doa) between 3 and 1000),
  photo_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'))
);

alter table public.wedding_guestbook enable row level security;

-- Guests (anonymous) may only insert pending submissions.
create policy "Guests can submit pending entries"
  on public.wedding_guestbook for insert
  to anon, authenticated
  with check (status = 'pending');

-- Anyone may read approved entries only.
create policy "Anyone can read approved entries"
  on public.wedding_guestbook for select
  to anon, authenticated
  using (status = 'approved');

-- Storage bucket for guest photos.
insert into storage.buckets (id, name, public)
values ('wedding-photos', 'wedding-photos', true)
on conflict (id) do nothing;

create policy "Guests can upload wedding photos"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'wedding-photos');
