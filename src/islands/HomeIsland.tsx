import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ContactIsland from './ContactIsland';
import SnakeGame from './SnakeGame';
import LatestArticlesIsland from './LatestArticlesIsland';

export default function HomeIsland() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const texts = [
    '前端开发爱好者',
    'AI使用探索者',
    'AI开发爱好者',
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

  // 首页“联系我”改为展示联系板块，不再弹窗

  // 首页恢复为简洁的介绍 + 联系我，不在首页展示“历程”和“技能”板块

  return (
    <div className={"min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300"}>
      <motion.div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollProgress}%` }} />

      {/**
       * 为避免双导航，这里移除了 HomeIsland 自带的导航栏。
       * 全站导航统一由 BaseLayout.astro 提供。
       * 如需在全局导航中保留主题切换，可在 BaseLayout 中挂载一个轻量的 React 岛组件实现。
       */}

      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* 背景：贪吃蛇作为趣味动效，轻微模糊与低不透明度在组件内处理 */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SnakeGame titleHidden={true} backgroundMode={true} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                你好，我是<span className="text-blue-500">重度AI爱好者</span>
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
                <motion.a href="/about" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium rounded-lg transition-all">
                  了解更多
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 游戏区暂时移除；背景为贪吃蛇，俄罗斯方块与其他小游戏不展示 */}

      {/* 最新文章预览：默认透明，避免深色模式初次渲染闪白 */}
      <section className="py-12 bg-transparent dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">最新文章</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">最近发布的内容预览</p>
            </div>
            <LatestArticlesIsland />
          </div>
        </div>
      </section>

      {/* 联系我板块 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">联系我</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">如果你有任何问题或合作意向，欢迎随时联系我！</p>
          </div>
          <ContactIsland />
        </div>
      </section>
    </div>
  );
}
