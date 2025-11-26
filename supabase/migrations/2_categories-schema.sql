drop table if exists categories;

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
