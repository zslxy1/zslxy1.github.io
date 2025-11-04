import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  // SSR 安全的初始值，避免在服务器环境访问 window/localStorage
  const [theme, setTheme] = useState<Theme>('light');

  // 首次挂载时读取本地存储与系统偏好
  useEffect(() => {
    try {
      const savedTheme = typeof window !== 'undefined'
        ? (localStorage.getItem('theme') as Theme | null)
        : null;
      const prefersDark = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false;
      const initial = savedTheme ?? (prefersDark ? 'dark' : 'light');
      setTheme(initial);
    } catch {
      // ignore
    }
  }, []);

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
