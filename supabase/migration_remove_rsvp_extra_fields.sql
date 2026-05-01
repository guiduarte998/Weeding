-- Run this on existing projects that already created the rsvps table.
alter table public.rsvps
  drop column if exists guest_count,
  drop column if exists dietary_notes;
