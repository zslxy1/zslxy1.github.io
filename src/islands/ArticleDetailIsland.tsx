import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import SocialLinksRow from './SocialLinksRow';
import { articlesData } from '@/lib/articlesData';
import { articlesContent } from '@/lib/articlesContent';
// 使用 ?url 以获得最终 URL，避免图片无法显示
import yoloImgUrl from '@/image_data/YOLO_cs2.jpg?url';
import webBlogUrl from '@/image_data/web_blog.png?url';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import 'github-markdown-css/github-markdown.css';

// 配置 marked 高亮（一次性配置）
marked.use(
  markedHighlight({
    highlight(code, lang) {
      try {
        if (lang && prism.languages[lang]) {
          return prism.highlight(code, prism.languages[lang], lang);
        }
      } catch (e) {
        // 忽略高亮错误，降级为原始代码
      }
      return code;
    },
  })
);

function parseHeadings(content: string) {
  // 支持 1~6 级标题，生成目录用
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
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

// 去除 Markdown 中第一个与页面标题重复的一级标题，避免“标题重复”
function stripFirstH1(md: string, title: string) {
  const lines = md.split('\n');
  if (lines.length > 0) {
    const first = lines[0].trim();
    const h1 = /^#\s+(.+)$/.exec(first);
    if (h1 && h1[1].trim() === title.trim()) {
      return lines.slice(1).join('\n');
    }
  }
  return md;
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
        const content = articlesContent[found.id] || '# 文章内容未找到';
        setArticle({ ...found, content });
        const headings = parseHeadings(content);
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
      <div className={`min-h-screen`}>加载中...</div>
    );
  }

  if (!article) {
    return (
      <div className={`min-h-screen`}>文章不存在</div>
    );
  }

  const headings = parseHeadings(article.content);

  // 页面背景与文字颜色由 BaseLayout 的 body class 控制；
  // 为避免水合时因主题切换造成的 class 不匹配，这里不再根据 theme 动态设置颜色类。
  return (
    <div className={`min-h-screen`}>
      <motion.div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollProgress}%` }} />

      {/** 使用 BaseLayout 的全局导航，移除本页内置导航以避免重复 **/}

      <section className="py-12">
        {/* 仅文章内容，无侧栏时居中展示 */}
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <img src={article.id === 1 ? yoloImgUrl : article.id === 2 ? webBlogUrl : article.imageUrl} alt={article.title} className="w-full h-56 object-cover rounded-xl mb-6" />
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              发布于：{new Date(article.date).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}
            </p>
            {/* GitHub 风格 Markdown 容器：移除暗色反相，改用自定义暗色覆盖样式，避免“割裂感” */}
            <div className="markdown-body max-w-none">
              {/** 使用 marked 完整渲染 Markdown（支持列表、表格、链接、代码块等） **/}
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(stripFirstH1(article.content, article.title)) as string,
                }}
              />
            </div>
          <div className="mt-6">
            <a href="/articles" className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              <i className="fa-solid fa-arrow-left mr-2"></i>返回文章列表
            </a>
          </div>
          {/* 联系区域：统一社交链接与邮箱弹窗 */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">联系我</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">如果你有任何问题或合作意向，欢迎随时联系我！</p>
            <SocialLinksRow />
          </div>
          </article>
          {/* 目录侧栏：默认隐藏以减少视觉干扰。如需显示，改为 hidden lg:block 并恢复样式 */}
          {/* <aside className="hidden lg:block max-w-xs mx-auto lg:mx-0 lg:col-span-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-3">目录</h2>
            <ul className="space-y-2">
              {headings.map(h => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className={`text-sm ${activeSection === h.id ? 'text-blue-500' : ''}`}>{h.text}</a>
                </li>
              ))}
            </ul>
          </aside> */}
        </div>
      </section>
    </div>
  );
}
