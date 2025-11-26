drop table if exists transactions;

create table transactions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  amount numeric(12, 2) not null,
  description text,
  memo text,
  transaction_date date not null,
  post_date date not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
