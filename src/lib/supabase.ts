import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  // 支持 Astro 的 PUBLIC_ 前缀，同时兼容 Vite 默认的 VITE_ 前缀，防止某些环境下 PUBLIC_ 未注入导致取不到值
  const url = (import.meta.env.PUBLIC_SUPABASE_URL as string | undefined)
    || (import.meta.env.VITE_SUPABASE_URL as string | undefined);
  const anon = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined)
    || (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);
  if (!url || !anon) return null;
  if (!cached) cached = createClient(url, anon);
  return cached;
}
