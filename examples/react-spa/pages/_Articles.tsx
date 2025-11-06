import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';

// 模拟文章数据
const articlesData = [
  {
    id: 1,
    title: 'React 18新特性详解与实战',
    excerpt: '探索React 18带来的并发特性和自动批处理功能，深入了解新的API如startTransition和Suspense的使用场景。',
    date: '2023-11-01',
    category: '前端开发',
    tags: ['React', 'JavaScript'],
    readTime: '8分钟',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=React%2018%20features%2C%20code%20snippets%2C%20web%20development%2C%20modern%20UI&sign=fa2322e35b16a278f4b653146fb4ef55'
  },
  {
    id: 2,
    title: '使用Tailwind CSS构建现代UI界面',
    excerpt: '如何利用Tailwind CSS的工具类快速构建响应式界面，以及如何扩展和定制主题以满足项目需求。',
    date: '2023-10-15',
    category: 'CSS',
    tags: ['Tailwind', 'UI/UX', '响应式设计'],
    readTime: '6分钟',imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Tailwind%20CSS%20code%2C%20UI%20design%2C%20modern%20web%20interface%2C%20responsive%20layout&sign=e059e3eaea3e65af7e09616e72a01664'
  },
  {
    id: 3,
    title: 'TypeScript类型系统进阶指南',
    excerpt: '深入理解TypeScript的高级类型特性和最佳实践，包括泛型、条件类型、映射类型和类型保护等概念。',
    date: '2023-09-28',
    category: 'TypeScript',
    tags: ['TypeScript', '编程技巧', '类型系统'],
    readTime: '10分钟',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=TypeScript%20code%2C%20type%20system%2C%20programming%20concepts%2C%20code%20editor&sign=63265925273a7b1a7dcaaa3b02074fe5'
  },
  {
    id: 4,
    title: '前端性能优化实战指南',
    excerpt: '从网络加载、资源处理、渲染优化等多个维度，分享前端性能优化的实用技巧和工具。',
    date: '2023-09-10',
    category: '性能优化',
    tags: ['Performance', 'JavaScript', 'Web Vitals'],
    readTime: '12分钟',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Web%20performance%20optimization%2C%20speed%20metrics%2C%20code%20optimization&sign=556ca61a79f76df7eb99043e0b7dbcc9'
  },
  {
    id: 5,
    title: '构建可访问的前端应用',
    excerpt: '了解Web可访问性的重要性，学习如何使用ARIA标签、语义化HTML和键盘导航构建更具包容性的Web应用。',
    date: '2023-08-25',
    category: '可访问性',
    tags: ['Accessibility', 'HTML', 'UX'],
    readTime: '7分钟',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Web%20accessibility%2C%20inclusive%20design%2C%20screen%20reader%20compatibility&sign=5e63d149364912f8cc7c19a721530e86'
  },
  {
    id: 6,
    title: '现代CSS布局技巧',
    excerpt: '探索Grid和Flexbox布局的高级用法，学习如何使用CSS变量和计算属性创建灵活且可维护的布局系统。',
    date: '2023-08-10',
    category: 'CSS',
    tags: ['CSS', 'Layout', 'Grid', 'Flexbox'],
    readTime: '9分钟',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Modern%20CSS%20layout%2C%20Grid%20and%20Flexbox%2C%20web%20design%20patterns&sign=71e1e8677b64b59181430005a90316f6'
  }
];

// 提取所有分类和标签
const categories = [...new Set(articlesData.map(article => article.category))];
const allTags = [...new Set(articlesData.flatMap(article => article.tags))];

const Articles: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [filteredArticles, setFilteredArticles] = useState(articlesData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // 过滤文章
  useEffect(() => {
    let result = articlesData;
    
    // 按分类过滤
    if (selectedCategory) {
      result = result.filter(article => article.category === selectedCategory);
    }
    
    // 按标签过滤
    if (selectedTag) {
      result = result.filter(article => article.tags.includes(selectedTag));
    }
    
    // 按搜索关键词过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        article => 
          article.title.toLowerCase().includes(query) || 
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredArticles(result);
    
    // 如果没有结果，显示提示
    if (result.length === 0) {
      toast('没有找到匹配的文章');
    }
  }, [selectedCategory, selectedTag, searchQuery, toast]);

  // 清除所有筛选
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery('');
  };

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
            <Link to="/articles" className="font-medium text-blue-500 transition-colors">文章</Link>
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
      
      {/* 文章列表页面标题 */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              技术文章
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 text-lg"
            >
              分享前端开发的知识、技巧和最佳实践
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* 筛选和搜索区域 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 搜索框 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索文章标题、内容或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-5 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 placeholder-gray-500' : 'bg-white border-gray-200 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                  aria-label="搜索"
                >
                  <i className="fa-solid fa-search"></i>
                </button>
              </div>
            </motion.div>
            
            {/* 筛选条件 */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* 分类筛选 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <h3 className="text-lg font-semibold mb-3">分类</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === null 
                        ? 'bg-blue-500 text-white' 
                        : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    全部
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category 
                          ? 'bg-blue-500 text-white' 
                          : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      } transition-colors`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
              
              {/* 标签筛选 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <h3 className="text-lg font-semibold mb-3">标签</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTag === null 
                        ? 'bg-blue-500 text-white' 
                        : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    全部
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTag === tag 
                          ? 'bg-blue-500 text-white' 
                          : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      } transition-colors`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* 活跃筛选条件和清除按钮 */}
            {(selectedCategory || selectedTag || searchQuery) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 rounded-lg border flex items-center justify-between"
                style={{ 
                  backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.7)',
                  borderColor: theme === 'dark' ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.7)'
                }}
              >
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">已应用筛选:</span>
                  {selectedCategory && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      分类: {selectedCategory}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      标签: {selectedTag}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      搜索: {searchQuery}
                    </span>
                  )}
                </div>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                >
                  <i className="fa-solid fa-times-circle"></i> 清除所有筛选
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      {/* 文章列表 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    className={`rounded-xl overflow-hidden shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700 transition-all`}
                  >
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-blue-500 font-medium">{article.category}</span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <i className="fa-solid fa-clock mr-1"></i>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 hover:text-blue-500 transition-colors">
                        <Link to={`/articles/${article.id}`}>{article.title}</Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{article.date}</span>
                        <Link 
                          to={`/articles/${article.id}`}
                          className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
                        >
                          阅读更多 <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                  <i className="fa-solid fa-search text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">未找到文章</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">尝试调整筛选条件或搜索其他关键词</p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  清除所有筛选
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 页脚 */}
      <footer className={`mt-16 py-12 border-t ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
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

export default Articles;