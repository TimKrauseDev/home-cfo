drop table if exists transactions;
drop type if exists transaction_type;

create type transaction_type as enum ('sale', 'payment', 'transfer', 'refund', 'fee', 'other');

create table transactions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  description text not null,
  amount numeric(12, 2) not null,
  transaction_type transaction_type not null,
  memo text,
  transaction_date date not null,
  post_date date not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
