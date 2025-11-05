import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  // 更早计算初始主题：优先读取 documentElement 的 class（由 BaseLayout 的同步脚本提前设置），
  // 其次读取 localStorage，最后回退到系统偏好。这样可以避免在不同页面出现初始渲染的闪烁或重置。
  const initialTheme = (): Theme => {
    if (typeof document !== 'undefined') {
      const el = document.documentElement;
      if (el.classList.contains('dark')) return 'dark';
      if (el.classList.contains('light')) return 'light';
    }
    try {
      const saved = typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme | null) : null;
      if (saved) return saved;
    } catch {}
    const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    return prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(initialTheme());

  // 当主题变化时，应用到文档并持久化到本地存储
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', theme);
      } catch {
        // ignore
      }
    }
  }, [theme]);

  // 监听 documentElement 的 class 变化，确保所有使用 useTheme 的组件都能同步主题
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;
    const syncFromClass = () => {
      const isDark = el.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    // 初始同步一次，避免在某些情况下出现“外层切换了，主要部分未变”的现象
    syncFromClass();
    const observer = new MutationObserver(syncFromClass);
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };
} 
