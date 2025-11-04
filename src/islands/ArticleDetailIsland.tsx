import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';

const articlesData = [
  {
    id: 1,
    title: 'React 18新特性详解与实战',
    content: `# React 18新特性详解与实战\n\n...`,
    date: '2023-11-01',
    category: '前端开发',
    tags: ['React', 'JavaScript'],
    readTime: '8分钟',
    author: '开发者',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=React%2018%20features%2C%20code%20snippets%2C%20web%20development%2C%20modern%20UI&sign=fa2322e35b16a278f4b653146fb4ef55'
  }
];

function parseHeadings(content: string) {
  const headingRegex = /^(##?)\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    headings.push({ level, text, id });
  }
  return headings;
}

export default function ArticleDetailIsland({ id }: { id: string }) {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = articlesData.find(a => a.id === parseInt(id));
      if (found) {
        setArticle(found);
        const headings = parseHeadings(found.content);
        if (headings.length > 0) setActiveSection(headings[0].id);
      } else {
        toast.error('文章不存在或已被删除');
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id, toast]);

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

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>加载中...</div>
    );
  }

  if (!article) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>文章不存在</div>
    );
  }

  const headings = parseHeadings(article.content);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      <motion.div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollProgress}%` }} />

      {/** 使用 BaseLayout 的全局导航，移除本页内置导航以避免重复 **/}

      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8">
            <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover rounded-xl mb-6" />
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="prose dark:prose-invert max-w-none">
              <pre>{article.content}</pre>
            </div>
            <div className="mt-6">
              <a href="/articles" className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                <i className="fa-solid fa-arrow-left mr-2"></i>返回文章列表
              </a>
            </div>
          </article>
          <aside className={`lg:col-span-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-lg font-semibold mb-3">目录</h2>
            <ul className="space-y-2">
              {headings.map(h => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className={`text-sm ${activeSection === h.id ? 'text-blue-500' : ''}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
