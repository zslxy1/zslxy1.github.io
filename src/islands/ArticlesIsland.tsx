import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/useToast';
import SocialLinksRow from './SocialLinksRow';
import { articlesData } from '@/lib/articlesData';
// 使用 ?url 获取最终 URL，避免个别环境下图片加载失败
import yoloImgUrl from '@/image_data/YOLO_cs2.jpg?url';
import webBlogUrl from '@/image_data/web_blog.png?url';
import vocalImgUrl from '@/image_data/Vocal_Isolation.png?url';
import sunoImgUrl from '@/image_data/Suno.png?url';

const categories = [...new Set(articlesData.map(article => article.category))];
const allTags = [...new Set(articlesData.flatMap(article => article.tags))];

export default function ArticlesIsland() {
  const { toast } = useToast();
  const [filteredArticles, setFilteredArticles] = useState(articlesData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const current = window.scrollY;
        setScrollProgress(total > 0 ? (current / total) * 100 : 0);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll as EventListener);
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
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
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
                <input type="text" placeholder="搜索文章标题、内容或标签..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-5 py-3 rounded-lg border bg-white border-gray-200 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500" aria-label="搜索">
                  <i className="fa-solid fa-search"></i>
                </button>
              </div>
            </motion.div>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex-1">
                <h3 className="text-lg font-semibold mb-3">分类</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setSelectedCategory(null)} className={`px-3 py-1 rounded-full text-sm ${selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'} transition-colors`}>全部</button>
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded-full text-sm ${selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'} transition-colors`}>{cat}</button>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex-1">
                <h3 className="text-lg font-semibold mb-3">标签</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setSelectedTag(null)} className={`px-3 py-1 rounded-full text-sm ${selectedTag === null ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'} transition-colors`}>全部</button>
                  {allTags.map((tag) => (
                    <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'} transition-colors`}>{tag}</button>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <motion.a key={article.id} href={`/articles/${article.id}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-xl overflow-hidden shadow-sm bg-transparent border border-gray-200 dark:bg-gray-800 dark:border-gray-700 card-hover">
                  <img
                    src={article.id === 1 ? yoloImgUrl : article.id === 2 ? webBlogUrl : article.id === 3 ? vocalImgUrl : article.id === 4 ? sunoImgUrl : article.imageUrl}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                    decoding="async"
                    width={16}
                    height={9}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-500 font-medium">{article.category}</span>
                      {/* 将右上角的“阅读时长”改为“发布时间” */}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(article.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
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
                <button onClick={clearFilters} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">清除筛选</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 联系区域：统一社交链接与邮箱弹窗 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">联系我</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">如果你有任何问题或合作意向，欢迎随时联系我！</p>
            <SocialLinksRow />
          </div>
        </div>
      </section>
    </div>
  );
}
