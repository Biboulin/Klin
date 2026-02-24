# Supabase Setup Guide for KLIN

Follow these steps to get Supabase running with KLIN.

## 1. Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up (free tier is fine for MVP)
3. Create a new project
4. Wait for the project to initialize (~2 min)

## 2. Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - `Project URL` (= `EXPO_PUBLIC_SUPABASE_URL`)
   - `anon public` key (= `EXPO_PUBLIC_SUPABASE_ANON_KEY`)

3. Create `.env` in `/klin/`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Create Database Schema

1. Go to **SQL Editor** in Supabase Dashboard
2. Paste the entire SQL schema below
3. Click "Run"

### SQL Schema

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid primary key,
  email text not null unique,
  name text not null,
  avatar text,
  timezone text default 'UTC',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Households table
create table public.households (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_by uuid not null references public.users(id) on delete cascade,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Household members table
create table public.household_members (
  id uuid primary key default uuid_generate_v4(),
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role text check (role in ('admin', 'member')) default 'member',
  joined_at timestamp default now(),
  unique(household_id, user_id)
);

-- Tasks table (templates)
create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  household_id uuid not null references public.households(id) on delete cascade,
  title text not null,
  description text,
  emoji text,
  recurrence text check (recurrence in ('daily', 'weekly', 'oneoff')) default 'weekly',
  due_day_of_week integer check (due_day_of_week >= 0 and due_day_of_week <= 6),
  created_by uuid not null references public.users(id),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Task instances (actual occurrences)
create table public.task_instances (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  household_id uuid not null references public.households(id) on delete cascade,
  assigned_to uuid not null references public.users(id),
  due_date date not null,
  completed_at timestamp,
  completed_by uuid references public.users(id),
  photo_url text,
  points_awarded integer default 0,
  created_at timestamp default now()
);

-- User streaks
create table public.user_streaks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  household_id uuid not null references public.households(id) on delete cascade,
  current_streak integer default 0,
  last_task_completed_at timestamp,
  is_active boolean default true,
  streak_started_at timestamp,
  broken_at timestamp,
  unique(user_id, household_id)
);

-- User points
create table public.user_points (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  household_id uuid not null references public.households(id) on delete cascade,
  total_points integer default 0,
  last_updated_at timestamp default now(),
  unique(user_id, household_id)
);

-- Badges
create table public.badges (
  id text primary key,
  name text not null,
  emoji text not null,
  condition text not null,
  description text
);

-- User badges (earned)
create table public.user_badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  household_id uuid not null references public.households(id) on delete cascade,
  badge_id text not null references public.badges(id),
  earned_at timestamp default now()
);

-- Notifications
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  data jsonb,
  created_at timestamp default now(),
  read_at timestamp
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.tasks enable row level security;
alter table public.task_instances enable row level security;
alter table public.user_streaks enable row level security;
alter table public.user_points enable row level security;
alter table public.user_badges enable row level security;
alter table public.notifications enable row level security;

-- Users can read their own data
create policy "Users can read own data"
on public.users for select
using (auth.uid() = id);

-- Users can update their own data
create policy "Users can update own data"
on public.users for update
using (auth.uid() = id);

-- Households - users can read if they're a member
create policy "Members can read household"
on public.households for select
using (
  exists (
    select 1 from public.household_members
    where household_members.household_id = households.id
    and household_members.user_id = auth.uid()
  )
);

-- Household members - users can read if they're in the household
create policy "Members can read household_members"
on public.household_members for select
using (
  exists (
    select 1 from public.household_members hm
    where hm.household_id = household_members.household_id
    and hm.user_id = auth.uid()
  )
);

-- Similar RLS policies for other tables (tasks, task_instances, etc.)
```

## 4. Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. Go to **Auth** → **Policies** and set:
   - Confirm email: OFF (for MVP - allow signup without confirmation)

## 5. Setup Storage (for photos - optional for MVP)

1. Go to **Storage**
2. Create a new bucket: `task-photos`
3. Set to **Public**

## 6. Test the App

```bash
cd klin
npm start
# Press 'w' for web
```

Sign up with any email/password and create a household!

## Troubleshooting

**"SUPABASE_URL not set"**
- Make sure `.env` file exists in `/klin/` folder
- Restart `npm start`

**"Invalid credentials"**
- Double-check your ANON_KEY and PROJECT URL
- Make sure Email auth is enabled in Supabase

**Can't create household**
- Check Supabase SQL editor for errors running the schema
- Make sure RLS policies are set correctly

## Next: Implement Tasks

Once auth works, we'll build:
- Task CRUD
- Task instances (daily/weekly auto-creation)
- Mark as done
- Photos upload
