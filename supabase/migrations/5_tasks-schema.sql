drop table if exists tasks;
drop type if exists tasks_status;

create type tasks_status as enum (
  'not-started',
  'in-progress',
  'completed',
  'on-hold',
  'repeating',
  'perpetual'
);

create type repeating_type as enum (
  'day',
  'week',
  'month',
  'quarter',
  'annual'
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade null,
  name text not null,
  description text not null default '',
  status tasks_status not null default 'not-started',
  due_date date default null,
  repeating_type repeating_type default null,
  repeating_interval integer default null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
