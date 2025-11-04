import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';

export default function HomeIsland() {
  const { theme, toggleTheme } = useTheme();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { toast } = useToast();
  const texts = [
    '前端开发工程师',
    'React爱好者',
    'TypeScript实践者',
    'UI/UX设计爱好者',
    '终身学习者'
  ];
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeout: number;
    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(texts[currentTextIndex].substring(0, displayText.length - 1));
        if (displayText.length === 1) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(texts[currentTextIndex].substring(0, displayText.length + 1));
        if (displayText.length === texts[currentTextIndex].length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 150);
    }
    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    toast('功能开发中，敬请期待！');
  };

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 88 },
    { name: 'JavaScript', level: 92 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'Node.js', level: 75 },
    { name: 'Git', level: 80 },
    { name: 'UI/UX Design', level: 70 },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      <motion.div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollProgress}%` }} />

      {/**
       * 为避免双导航，这里移除了 HomeIsland 自带的导航栏。
       * 全站导航统一由 BaseLayout.astro 提供。
       * 如需在全局导航中保留主题切换，可在 BaseLayout 中挂载一个轻量的 React 岛组件实现。
       */}

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                你好，我是<span className="text-blue-500">开发者</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
                我是一名
                <span className="relative inline-block ml-2">
                  <span ref={typewriterRef} className="font-semibold text-blue-500">{displayText}</span>
                  <motion.span className="absolute -right-3 top-0 w-1 h-full bg-blue-500" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a href="/articles" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all">
                  浏览我的文章
                </motion.a>
                <motion.a href="/about" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-gray-2 00 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium rounded-lg transition-all">
                  了解更多
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-16`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">我的技能</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.1, boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)' }} className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium flex items-center gap-2 transition-all">
                <span>{skill.name}</span>
                <div className="w-16 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <button onClick={handleContactClick} className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-all">联系我</button>
        </div>
      </section>
    </div>
  );
}
