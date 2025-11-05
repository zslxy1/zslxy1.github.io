import React, { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabase';
import { useToast } from '../hooks/useToast';

type Entry = {
  id: number;
  content: string;
  author: string | null;
  created_at: string;
};

const GuestbookIsland: React.FC = () => {
  const supabase = getSupabaseClient();
  const { success, error: toastError } = useToast();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [dailyLimit, setDailyLimit] = useState<number>(3);
  const [remaining, setRemaining] = useState<number>(3);

  useEffect(() => {
    if (!supabase) return;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      // 当前登录用户
      const { data: userData } = await supabase.auth.getUser();
      setUserId(userData?.user?.id ?? null);

      // 订阅登录状态变化
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        setUserId(session?.user?.id ?? null);
      });
      unsubscribe = () => sub?.subscription.unsubscribe();

      // 初始化客户端ID（匿名识别）
      const saved = localStorage.getItem('gb_client_id');
      const newId = saved ?? (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
      if (!saved) localStorage.setItem('gb_client_id', newId);
      setClientId(newId);

      // 拉取留言列表
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) setError(error.message);
      else setEntries(data ?? []);

      // 计算今天剩余次数
      await refreshRemaining(userData?.user?.id ?? null, newId);
    })();

    return () => {
      unsubscribe?.();
    };
  }, [supabase]);

  // 当登录状态或 clientId 变化时，刷新剩余次数
  useEffect(() => {
    if (!supabase) return;
    refreshRemaining(userId, clientId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, clientId]);

  const startOfTodayISO = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  };
  const startOfTomorrowISO = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  };

  const refreshRemaining = async (uid: string | null, cid: string | null) => {
    if (!supabase) return;
    const limit = uid ? 10 : 3;
    setDailyLimit(limit);
    // 注意：部分网络/代理会拦截 HTTP HEAD 请求，导致浏览器出现 net::ERR_ABORTED。
    // 为避免该问题，这里不使用 head:true，而是通过常规 GET 获取 count（同时 limit(1) 避免拉取大量数据）。
    // 如果匿名且还没生成 clientId，先跳过查询并保守显示未使用次数。
    if (!uid && !cid) {
      setRemaining(limit);
      return;
    }
    const base = supabase
      .from('guestbook')
      .select('id', { count: 'exact' })
      .gte('created_at', startOfTodayISO())
      .lt('created_at', startOfTomorrowISO())
      .limit(1);
    const final = uid ? base.eq('user_id', uid) : base.eq('client_id', cid as string);
    const { count, error } = await final;
    if (error) {
      // 出错时不阻断页面，仅提示
      console.warn('count error', error.message);
    }
    const used = count ?? 0;
    setRemaining(Math.max(0, limit - used));
  };

  // 本地时区名称与下次重置时间（按本地时区每日 00:00）
  const localTZ = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone ?? '本地时区', []);
  const nextResetLabel = useMemo(() => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZoneName: 'short'
    }).format(nextMidnight);
  }, []);

  // 错误文案本地化
  const translateError = (msg: string) => {
    if (!msg) return '提交失败，请稍后再试';
    if (/permission denied/i.test(msg)) return '权限不足：请检查数据库策略或登录后再试';
    if (/duplicate key/i.test(msg)) return '重复提交，请稍后再试';
    return msg; // 默认透传服务端错误（SQL 触发器已使用中文）
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!supabase) {
      setError('Supabase 未配置，请设置 PUBLIC_SUPABASE_URL 和 PUBLIC_SUPABASE_ANON_KEY 环境变量');
      setLoading(false);
      return;
    }
    // 未登录也允许提交（匿名），但受每日 3 次限制；登录用户每日 10 次
    if (remaining <= 0) {
      setError(userId ? '今天的 10 次已用完' : '今天的 3 次已用完');
      setLoading(false);
      return;
    }
    const payload = { content: content.trim(), author: author.trim() || null };
    if (!payload.content) {
      setError('请输入留言内容');
      setLoading(false);
      return;
    }
    // 匿名时携带 client_id 以便服务端限流
    if (!userId) {
      payload['client_id' as keyof typeof payload] = clientId as any;
    }
    const { data, error } = await supabase
      .from('guestbook')
      .insert(payload)
      .select('*')
      .single();
    if (error) {
      const msg = translateError(error.message);
      setError(msg);
      toastError(msg);
    }
    else {
      setEntries([data as Entry, ...entries]);
      setContent('');
      await refreshRemaining(userId, clientId);
      success('提交成功');
    }
    setLoading(false);
  };

  const signInWithGithub = async () => {
    if (!supabase) return;
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin + '/guestbook' }
    });
    if (error) setError(error.message);
    setAuthLoading(false);
  };

  const signOut = async () => {
    if (!supabase) return;
    setAuthLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
    else setUserId(null);
    setAuthLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">留言板</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">欢迎留下你的想法或建议～</p>

      {!supabase && (
        <div className="p-3 mb-4 rounded bg-yellow-50 border border-yellow-200 text-yellow-800">
          当前未配置 Supabase。请在 .env 文件中设置 PUBLIC_SUPABASE_URL 与 PUBLIC_SUPABASE_ANON_KEY，并重启开发服务器。
        </div>
      )}

      <div className="mb-4 flex items-center gap-2">
        {userId ? (
          <>
            <span className="text-sm text-gray-600 dark:text-gray-300">已登录</span>
            <button onClick={signOut} disabled={authLoading} className="px-3 py-1 rounded border text-gray-700 dark:text-gray-200">退出</button>
          </>
        ) : (
          <button onClick={signInWithGithub} disabled={authLoading} className="px-3 py-1 rounded bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">使用 GitHub 登录</button>
        )}
        <span className="ml-auto text-sm text-gray-600 dark:text-gray-300">今天还剩 {remaining}/{dailyLimit} 次</span>
      </div>

      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        重置时间：每天 00:00（{localTZ}），下次重置约为 {nextResetLabel}
      </div>

      <form onSubmit={submit} className="mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="你的名字（可选）"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="flex-1 px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? '提交中…' : '提交'}
          </button>
        </div>
        <textarea
          placeholder="写点什么吧…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700"
          rows={3}
        />
        {error && <div className="mt-2 text-red-600">{error}</div>}
      </form>

      <ul className="space-y-3">
        {entries.map((it) => (
            <li key={it.id} className="p-3 rounded border bg-transparent dark:bg-gray-900 dark:border-gray-700">
            <div className="text-gray-800 dark:text-gray-100">{it.content}</div>
            <div className="text-sm text-gray-500 mt-1">
              {it.author ? it.author : '匿名'} · {new Date(it.created_at).toLocaleString()}
            </div>
          </li>
        ))}
        {entries.length === 0 && (
          <li className="text-gray-500">暂无留言，快来第一个吧！</li>
        )}
      </ul>
    </div>
  );
};

export default GuestbookIsland;
