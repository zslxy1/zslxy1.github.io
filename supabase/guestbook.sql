-- Guestbook schema and RLS policies
create table if not exists public.guestbook (
  id bigint generated always as identity primary key,
  author text not null default '匿名',
  content text not null check (char_length(content) <= 500),
  -- 兼容现有前端使用 created_at 字段，同时保留 inserted_at
  created_at timestamptz not null default now(),
  inserted_at timestamptz not null default now(),
  -- 记录留言的用户；默认取当前登录用户 ID
  user_id uuid default auth.uid(),
  -- 匿名用户的客户端标识（来源于前端生成并持久化在 localStorage/cookie）
  client_id text
);

alter table public.guestbook enable row level security;

-- Read: everyone can read
drop policy if exists "Public read" on public.guestbook;
create policy "Public read" on public.guestbook
  for select
  using (true);

-- Insert: 仅认证用户可插入，且行归属于本人
drop policy if exists "Anon insert" on public.guestbook;
create policy "Authenticated insert (own row)" on public.guestbook
  for insert
  with check (auth.role() = 'authenticated' and user_id = auth.uid());

-- 匿名插入：允许 anon 角色插入，但必须没有 user_id 且提供 client_id
drop policy if exists "Anon insert with client_id" on public.guestbook;
create policy "Anon insert with client_id" on public.guestbook
  for insert
  with check (auth.role() = 'anon' and user_id is null and client_id is not null);

-- 每位用户每天最多 3 次：使用触发器在插入前进行计数校验
create or replace function public.enforce_guestbook_limit_per_day()
returns trigger
language plpgsql
security definer
as $$
begin
  -- 仅在 user_id 非空时生效（匿名用户不允许插入，见 RLS）
  if new.user_id is not null then
    -- 登录用户每天最多 10 次
    if (
      select count(*) from public.guestbook
      where user_id = new.user_id
        and date_trunc('day', created_at) = date_trunc('day', now())
    ) >= 10 then
      raise exception '登录用户每天最多可留言 10 次';
    end if;
  else
    -- 匿名用户：必须携带 client_id；每天最多 3 次
    if new.client_id is null then
      raise exception '匿名留言必须携带 client_id';
    end if;
    if (
      select count(*) from public.guestbook
      where client_id = new.client_id
        and date_trunc('day', created_at) = date_trunc('day', now())
    ) >= 3 then
      raise exception '匿名用户每天最多可留言 3 次';
    end if;
  end if;

  -- 同步 inserted_at（若有客户端仅使用该字段）
  new.inserted_at := coalesce(new.created_at, now());
  return new;
end;
$$;

drop trigger if exists guestbook_limit_per_day on public.guestbook;
create trigger guestbook_limit_per_day
before insert on public.guestbook
for each row
when (new.user_id is not null)
execute function public.enforce_guestbook_limit_per_day();

-- 索引：按时间倒序与日维度统计优化
create index if not exists guestbook_created_at_idx on public.guestbook (created_at desc);
-- 注意：index 表达式中不能使用非 IMMUTABLE 的函数（如 date_trunc）。
-- 改为组合索引，适配按 user_id/client_id + created_at 的时间范围查询
create index if not exists guestbook_user_created_idx on public.guestbook (user_id, created_at);
create index if not exists guestbook_client_created_idx on public.guestbook (client_id, created_at);
