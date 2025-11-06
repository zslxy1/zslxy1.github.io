import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import SocialLinksRow from '@/islands/SocialLinksRow';

// 技能数据
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

// 时间线数据
const timelineData = [
  {
    year: '2023 - 现在',
    title: '高级前端开发工程师',
    description: '负责公司核心产品的前端架构设计和开发，优化用户体验和性能。',
  },
  {
    year: '2020 - 2023',
    title: '前端开发工程师',
    description: '参与多个Web应用开发，实现响应式界面和交互功能。',
  },
  {
    year: '2017 - 2020',
    title: 'Web开发实习生',
    description: '学习前端技术，参与小型项目开发和维护。',
  },
  {
    year: '2013 - 2017',
    title: '计算机科学学士',
    description: '主修计算机科学，学习编程基础和软件开发方法。',
  },
];

// 文章数据
const recentArticles = [
  {
    id: 1,
    title: 'React 18新特性详解与实战',
    excerpt: '探索React 18带来的并发特性和自动批处理功能...',
    date: '2023-11-01',
    category: '前端开发',
    tags: ['React', 'JavaScript'],
  },
  {
    id: 2,
    title: '使用Tailwind CSS构建现代UI界面',
    excerpt: '如何利用Tailwind CSS的工具类快速构建响应式界面...',
    date: '2023-10-15',
    category: 'CSS',
    tags: ['Tailwind', 'UI/UX'],
  },
  {
    id: 3,
    title: 'TypeScript类型系统进阶指南',
    excerpt: '深入理解TypeScript的高级类型特性和最佳实践...',
    date: '2023-09-28',
    category: 'TypeScript',
    tags: ['TypeScript', '编程技巧'],
  },
];

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
 
  
  const texts = [
    '前端开发工程师',
    'React爱好者',
    'TypeScript实践者',
    'UI/UX设计爱好者',
    '终身学习者'
  ];
  
  const typewriterRef = useRef<HTMLSpanElement>(null);
  
  // 打字机动画效果
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
  
  // 滚动进度条效果
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
  
// 处理联系按钮点击（暂不使用，保留占位）
// const handleContactClick = () => {
//   // 这里可以加入其他交互逻辑
// };
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      {/* 滚动进度条 */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* 导航栏 */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-opacity-80 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white"
            >
              <i className="fa-solid fa-code"></i>
            </motion.div>
            <span className="text-xl font-bold">个人博客</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-blue-500 transition-colors">首页</Link>
            <Link to="/articles" className="font-medium hover:text-blue-500 transition-colors">文章</Link>
            <Link to="/about" className="font-medium hover:text-blue-500 transition-colors">关于</Link>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <i className="fa-solid fa-sun text-yellow-400"></i>
              ) : (
                <i className="fa-solid fa-moon text-gray-600"></i>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* 英雄区域 */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                你好，我是<span className="text-blue-500">开发者</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
                我是一名
                <span className="relative inline-block ml-2">
                  <span ref={typewriterRef} className="font-semibold text-blue-500">
                    {displayText}
                  </span>
                  <motion.span
                    className="absolute -right-3 top-0 w-1 h-full bg-blue-500"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/articles"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all"
                >
                  浏览我的文章
                </motion.a>
                <motion.a
                  href="/about"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium rounded-lg transition-all"
                >
                  了解更多
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 技能标签云 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">我的技能</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                }}
                className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium flex items-center gap-2 transition-all"
              >
                <span>{skill.name}</span>
                <div className="w-16 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 个人历程时间线 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">我的历程</h2>
          <div className="max-w-3xl mx-auto">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-4 mb-12 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center z-10">
                    <i className="fa-solid fa-calendar-days text-blue-500"></i>
                  </div>
                  {index < timelineData.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 absolute top-12 left-6"></div>
                  )}
                </div>
                <div className={`flex-1 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-100 dark:border-gray-700`}>
                  <span className="inline-block text-sm font-semibold text-blue-500 mb-2">{item.year}</span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 最新文章 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">最新文章</h2>
            <Link to="/articles" className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">
              查看全部 <i className="fa-solid fa-arrow-right text-sm"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recentArticles.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                className={`rounded-xl overflow-hidden shadow-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} border border-gray-100 dark:border-gray-600 transition-all`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-blue-500 font-medium">{article.category}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-blue-500 transition-colors">
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      
      {/* 联系区域 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">联系我</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              如果你有任何问题或合作意向，欢迎随时联系我！
            </p>
            <SocialLinksRow gapClass="gap-6" />
          </div>
        </div>
      </section>
      
      {/* 页脚 */}
      <footer className={`py-12 border-t ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
                  <i className="fa-solid fa-code"></i>
                </div>
                <span className="text-lg font-bold">个人博客</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">分享前端开发的知识和经验</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                © {new Date().getFullYear()} 个人博客. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">隐私政策</Link>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">使用条款</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
