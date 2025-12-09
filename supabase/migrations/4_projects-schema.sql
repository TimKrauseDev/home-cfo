drop table if exists projects;
drop type if exists project_status;

create type project_status as enum ('not-started', 'in-progress', 'completed', 'on-hold', 'perpetual');

create table projects (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text not null default '',
    status project_status not null default 'not-started',
    due_date date default null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);
