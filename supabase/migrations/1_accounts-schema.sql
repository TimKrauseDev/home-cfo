drop table if exists accounts;
drop type if exists account_type;

create type account_type as enum ('checking', 'savings', 'credit_card', 'investment', 'loan', 'other');

create table accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  institution text not null,
  account_type account_type not null,
  avatar_url text,
  balance numeric(12, 2) not null default 0.00,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
