import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';

const articlesData = [
  { id: 1, title: 'React 18新特性详解与实战', excerpt: '探索React 18带来的并发特性和自动批处理功能，深入了解新的API如startTransition和Suspense的使用场景。', date: '2023-11-01', category: '前端开发', tags: ['React', 'JavaScript'], readTime: '8分钟', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=React%2018%20features%2C%20code%20snippets%2C%20web%20development%2C%20modern%20UI&sign=fa2322e35b16a278f4b653146fb4ef55' },
  { id: 2, title: '使用Tailwind CSS构建现代UI界面', excerpt: '如何利用Tailwind CSS的工具类快速构建响应式界面，以及如何扩展和定制主题以满足项目需求。', date: '2023-10-15', category: 'CSS', tags: ['Tailwind', 'UI/UX', '响应式设计'], readTime: '6分钟', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Tailwind%20CSS%20code%2C%20UI%20design%2C%20modern%20web%20interface%2C%20responsive%20layout&sign=e059e3eaea3e65af7e09616e72a01664' },
  { id: 3, title: 'TypeScript类型系统进阶指南', excerpt: '深入理解TypeScript的高级类型特性和最佳实践，包括泛型、条件类型、映射类型和类型保护等概念。', date: '2023-09-28', category: 'TypeScript', tags: ['TypeScript', '编程技巧', '类型系统'], readTime: '10分钟', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=TypeScript%20code%2C%20type%20system%2C%20programming%20concepts%2C%20code%20editor&sign=63265925273a7b1a7dcaaa3b02074fe5' },
  { id: 4, title: '前端性能优化实战指南', excerpt: '从网络加载、资源处理、渲染优化等多个维度，分享前端性能优化的实用技巧和工具。', date: '2023-09-10', category: '性能优化', tags: ['Performance', 'JavaScript', 'Web Vitals'], readTime: '12分钟', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Web%20performance%20optimization%2C%20speed%20metrics%2C%20code%20optimization&sign=556ca61a79f76df7eb99043e0b7dbcc9' },
  { id: 5, title: '构建可访问的前端应用', excerpt: '了解Web可访问性的重要性，学习如何使用ARIA标签、语义化HTML和键盘导航构建更具包容性的Web应用。', date: '2023-08-25', category: '可访问性', tags: ['Accessibility', 'HTML', 'UX'], readTime: '7分钟', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Web%20accessibility%2C%20inclusive%20design%2C%20screen%20reader%20compatibility&sign=5e63d149364912f8cc7c19a721530e86' },
  { id: 6, title: '现代CSS布局技巧', excerpt: '探索Grid和Flexbox布局的高级用法，学习如何使用CSS变量和计算属性创建灵活且可维护的布局系统。', date: '2023-08-10', category: 'CSS', tags: ['CSS', 'Layout', 'Grid', 'Flexbox'], readTime: '9分钟', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Modern%20CSS%20layout%2C%20Grid%20and%20Flexbox%2C%20web%20design%20patterns&sign=71e1e8677b64b59181430005a90316f6' },
];

const categories = [...new Set(articlesData.map(article => article.category))];
const allTags = [...new Set(articlesData.flatMap(article => article.tags))];

export default function ArticlesIsland() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [filteredArticles, setFilteredArticles] = useState(articlesData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    let result = articlesData;
    if (selectedCategory) result = result.filter(article => article.category === selectedCategory);
    if (selectedTag) result = result.filter(article => article.tags.includes(selectedTag));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(article => article.title.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q) || article.tags.some(tag => tag.toLowerCase().includes(q)));
    }
    setFilteredArticles(result);
    if (result.length === 0) toast('没有找到匹配的文章');
  }, [selectedCategory, selectedTag, searchQuery, toast]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery('');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      <motion.div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollProgress}%` }} />
      {/**
       * 统一使用 BaseLayout 的全局导航，避免双导航
       */}

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">技术文章</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-600 dark:text-gray-300 text-lg">分享前端开发的知识、技巧和最佳实践</motion.p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
              <div className="relative">
                <input type="text" placeholder="搜索文章标题、内容或标签..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full px-5 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 placeholder-gray-500' : 'bg-white border-gray-200 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`} />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500" aria-label="搜索">
                  <i className="fa-solid fa-search"></i>
                </button>
              </div>
            </motion.div>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex-1">
                <h3 className="text-lg font-semibold mb-3">分类</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setSelectedCategory(null)} className={`px-3 py-1 rounded-full text-sm ${selectedCategory === null ? 'bg-blue-500 text-white' : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>全部</button>
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded-full text-sm ${selectedCategory === cat ? 'bg-blue-500 text-white' : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>{cat}</button>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex-1">
                <h3 className="text-lg font-semibold mb-3">标签</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setSelectedTag(null)} className={`px-3 py-1 rounded-full text-sm ${selectedTag === null ? 'bg-blue-500 text-white' : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>全部</button>
                  {allTags.map((tag) => (
                    <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag ? 'bg-blue-500 text-white' : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>{tag}</button>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <motion.a key={article.id} href={`/articles/${article.id}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`rounded-xl overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} card-hover`}> 
                  <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" loading="lazy" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-500 font-medium">{article.category}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {(selectedCategory || selectedTag || searchQuery) && (
              <div className="mt-8">
                <button onClick={clearFilters} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">清除筛选</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
