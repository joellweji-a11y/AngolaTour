-- 1. Create Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Trigger to create Profile on Signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid duplication errors
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Link existing users (Backfill)
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- 4. Enable RLS
alter table public.profiles enable row level security;
alter table public.empresas enable row level security;
alter table public.sos_alertas enable row level security;

-- 5. Policies for PROFILES
drop policy if exists "Public profiles are viewable by everyone" on profiles;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);

drop policy if exists "Users can insert their own profile" on profiles;
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- 6. Policies for EMPRESAS
drop policy if exists "Empresas viewable by everyone" on public.empresas;
create policy "Empresas viewable by everyone" on public.empresas for select using (true);

drop policy if exists "Admins can manage empresas" on public.empresas;
create policy "Admins can manage empresas" 
  on public.empresas 
  for all 
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 7. Policies for SOS_ALERTAS
drop policy if exists "Authenticated users can create alerts" on public.sos_alertas;
create policy "Authenticated users can create alerts" 
  on public.sos_alertas 
  for insert 
  with check (auth.role() = 'authenticated');

drop policy if exists "Admins can manage sos" on public.sos_alertas;
create policy "Admins can manage sos" 
  on public.sos_alertas 
  for all 
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 8. PROMOTE USER TO ADMIN
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'joellweji@gmail.com';
