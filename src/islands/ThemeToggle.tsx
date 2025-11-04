import { useTheme } from '@/hooks/useTheme';

// 滑块式主题切换，视觉参考用户提供的样式
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="切换主题"
      role="switch"
      aria-checked={isDark}
      title={isDark ? '切换为浅色' : '切换为深色'}
      className="relative inline-flex items-center h-8 w-16 rounded-full ring-1 ring-gray-400/40 dark:ring-gray-500/40 transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: isDark ? '#0f172a' : '#f8fafc', // slate-900 / slate-50
      }}
    >
      {/* 左侧太阳图标（轨道内淡化显示） */}
      <i
        className={
          'fa-solid fa-sun absolute left-2 text-xs transition-colors duration-300 ' +
          (isDark ? 'text-slate-400/60' : 'text-yellow-500')
        }
      />

      {/* 滑块圆钮 */}
      <span
        className={
          'absolute inline-flex h-7 w-7 rounded-full shadow-md transition-transform duration-300 ease-in-out ' +
          (isDark ? 'translate-x-8' : 'translate-x-1')
        }
        style={{
          background: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)', // 紫色渐变
          boxShadow: isDark
            ? '0 0 0 2px rgba(148,163,184,0.3) inset'
            : '0 0 0 2px rgba(148,163,184,0.2) inset',
        }}
      >
        <i
          className={
            'fa-solid fa-moon m-auto text-sm transition-colors duration-300 ' +
            (isDark ? 'text-slate-900' : 'text-slate-800')
          }
        />
      </span>
    </button>
  );
}
