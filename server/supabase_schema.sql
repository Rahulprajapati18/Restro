-- ── SAMRIDHII RESTAURANT — SUPABASE SCHEMA ──────────────────────

-- 1. USERS (extends Supabase auth.users)
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  email text not null,
  phone text default '',
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Public read profiles" on profiles for select using (true);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);
create policy "Service insert profiles" on profiles for insert with check (true);

-- 2. MENU ITEMS (public read, admin write)
create table if not exists menu_items (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text default '',
  price numeric not null check (price >= 0),
  category text not null,
  image text default '',
  is_available boolean default true,
  is_vegetarian boolean default false,
  is_best_seller boolean default false,
  spice_level text default 'None' check (spice_level in ('Mild','Medium','Hot','Extra Hot','None')),
  tags text[] default '{}',
  created_at timestamptz default now()
);
alter table menu_items enable row level security;
create policy "Anyone can read menu" on menu_items for select using (true);
create policy "Admin can manage menu" on menu_items for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 3. BOOKINGS
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  date timestamptz not null,
  time text not null,
  guests integer not null check (guests between 1 and 20),
  special_requests text default '',
  status text default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  created_at timestamptz default now()
);
alter table bookings enable row level security;
create policy "Anyone can create booking" on bookings for insert with check (true);
create policy "Users see own bookings" on bookings for select using (
  auth.uid() = user_id or
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin manages bookings" on bookings for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Users delete own bookings" on bookings for delete using (
  auth.uid() = user_id or
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 4. ORDERS
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text default '',
  items jsonb not null default '[]',
  total_amount numeric not null,
  order_type text default 'dine-in' check (order_type in ('dine-in','takeaway','delivery')),
  add_on_message text default '',
  delivery_address text default '',
  payment_method text default 'cod' check (payment_method in ('cod','online')),
  payment_detail text default '',
  payment_status text default 'pending' check (payment_status in ('pending','paid')),
  status text default 'pending' check (status in ('pending','confirmed','preparing','ready','delivered','cancelled')),
  created_at timestamptz default now()
);
alter table orders enable row level security;
create policy "Anyone can create order" on orders for insert with check (true);
create policy "Users see own orders" on orders for select using (
  auth.uid() = user_id or
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admin manages orders" on orders for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 5. FEEDBACK
create table if not exists feedback (
  id uuid default gen_random_uuid() primary key,
  name text default 'Anonymous',
  rating integer not null check (rating between 1 and 5),
  message text default '',
  created_at timestamptz default now()
);
alter table feedback enable row level security;
create policy "Anyone can submit feedback" on feedback for insert with check (true);
create policy "Admin reads feedback" on feedback for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
