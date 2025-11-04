import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';

// 模拟文章详情数据
const articlesData = [
  {
    id: 1,
    title: 'React 18新特性详解与实战',
    content: `
# React 18新特性详解与实战

随着React 18的发布，我们迎来了一系列令人兴奋的新特性和改进。本文将深入探讨React 18的核心变化，并通过实际示例展示如何在项目中应用这些新功能。

## 1. 并发特性（Concurrent Features）

React 18的最大亮点是引入了并发特性，这是一组新的功能，使React能够中断、暂停、恢复或放弃渲染，从而提高应用程序的响应速度。

### 1.1 startTransition API

\`startTransition\`是并发特性的核心API之一，它允许你将某些更新标记为"非紧急"，React会优先处理用户交互等紧急更新。

\`\`\`javascript
import { startTransition, useState } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleSearch(value) {
    setQuery(value);
    startTransition(() => {
      // 这个更新被标记为非紧急
      setResults(getSearchResults(value));
    });
  }
  
  // 组件其余部分...
}
\`\`\`

### 1.2 useTransition Hook

\`useTransition\`是一个Hook，它返回一个状态值表示过渡是否正在进行，以及一个启动过渡的函数。

\`\`\`javascript
import { useTransition, useState } from 'react';

function ImageGallery() {
  const [filter, setFilter] = useState('all');
  const [isPending, startTransition] = useTransition();
  
  function handleFilterChange(newFilter) {
    startTransition(() => {
      setFilter(newFilter);
    });
  }
  
  // 组件其余部分...
}
\`\`\`

## 2. 自动批处理（Automatic Batching）

React 18在更多场景下自动批处理状态更新，减少渲染次数，提高应用性能。

### 2.1 什么是批处理？

批处理是React将多个状态更新组合成一次重新渲染的优化技术。

在React 17中，只有在React事件处理函数中的更新才会被批处理：

\`\`\`javascript
// React 17中，这两个状态更新会被批处理成一次渲染
function handleClick() {
  setCount(count + 1);
  setFlag(flag => !flag);
}
\`\`\`

但在Promise、setTimeout等异步操作中，更新不会被批处理：

\`\`\`javascript
// React 17中，这两个状态更新会导致两次渲染
fetchData().then(() => {
  setCount(count + 1);
  setFlag(flag => !flag);
});
\`\`\`

### 2.2 React 18中的自动批处理

在React 18中，无论更新发生在哪里，都会自动批处理：

\`\`\`javascript
// React 18中，这两个状态更新会被批处理成一次渲染
fetchData().then(() => {
  setCount(count + 1);
  setFlag(flag => !flag);
});
\`\`\`

## 3. Suspense的改进

React 18对Suspense进行了重大改进，使其能够在服务器端渲染（SSR）中工作得更好。

### 3.1 Suspense与数据获取

Suspense允许组件"等待"某些操作完成后再渲染，最常见的用例是数据获取：

\`\`\`jsx
<Suspense fallback={<LoadingSpinner />}>
  <ProfileDetails />
</Suspense>
\`\`\`

### 3.2 流式服务器渲染

React 18引入了流式服务器渲染，允许服务器分段发送HTML，浏览器可以逐步渲染页面，而不必等待整个页面都准备好。

## 4. 新的客户端和服务器渲染API

React 18引入了新的客户端渲染API \`createRoot\`和服务器渲染API \`hydrateRoot\`。

### 4.1 createRoot

\`createRoot\`替代了旧的\`ReactDOM.render\`方法，提供了对并发渲染的支持：

\`\`\`javascript
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
\`\`\`

### 4.2 hydrateRoot

\`hydrateRoot\`替代了旧的\`ReactDOM.hydrate\`方法，用于服务器端渲染的应用：

\`\`\`javascript
import { hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = hydrateRoot(container, <App />);
\`\`\`

## 5. 实战：在现有项目中升级到React 18

### 5.1 步骤1：安装React 18

首先，需要更新你的package.json文件，将React和React DOM的版本更新到18：

\`\`\`bash
npm install react@18 react-dom@18
\`\`\`

### 5.2 步骤2：替换渲染API

将\`ReactDOM.render\`替换为\`createRoot\`：

\`\`\`javascript
// 旧代码
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// 新代码
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
\`\`\`

### 5.3 步骤3：尝试新特性

一旦升级完成，你就可以开始在项目中尝试React 18的新特性了。从\`startTransition\`和自动批处理开始，然后根据需要逐步采用其他功能。

## 6. 总结

React 18通过并发特性、自动批处理和改进的Suspense等功能，为开发者提供了构建更流畅、更响应迅速的用户界面的能力。虽然升级过程相对简单，但充分利用这些新功能需要时间和实践。

随着React生态系统的发展，我们可以期待看到更多利用React 18强大功能的库和工具的出现。现在就开始探索React 18，为你的用户提供更好的体验吧！
`,
    date: '2023-11-01',
    category: '前端开发',
    tags: ['React', 'JavaScript'],
    readTime: '8分钟',
    author: '开发者',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=React%2018%20features%2C%20code%20snippets%2C%20web%20development%2C%20modern%20UI&sign=fa2322e35b16a278f4b653146fb4ef55'
  }
];

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // 查找文章
  useEffect(() => {
    setIsLoading(true);
    
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const foundArticle = articlesData.find(article => article.id === parseInt(id));
      
      if (foundArticle) {
        setArticle(foundArticle);
        
        // 解析文章中的标题，用于生成目录
        const headings = parseHeadings(foundArticle.content);
        if (headings.length > 0) {
          setActiveSection(headings[0].id);
        }
      } else {
        toast.error('文章不存在或已被删除');
        navigate('/articles');
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id, navigate, toast]);
  
  // 解析文章中的标题，生成目录
  const parseHeadings = (content: string) => {
    const headingRegex = /^(##?)\s+(.+)$/gm;
    const headings: { level: number, text: string, id: string }[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      headings.push({ level, text, id });
    }
    
    return headings;
  };
  
  // 滚动进度条效果
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
      
      // 更新当前活跃的章节
      if (article) {
        const headings = parseHeadings(article.content);
        for (const heading of headings) {
          const element = document.getElementById(heading.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(heading.id);
              break;
            }
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);
  
  // 渲染文章内容
  const renderArticleContent = (content: string) => {
    // 将Markdown转换为JSX元素
    // 这是一个简单的实现，实际项目中可能需要使用专门的Markdown渲染库
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    
    let currentParagraph = '';
    let inCodeBlock = false;
    let currentCode = '';
    
    lines.forEach((line, index) => {
      // 代码块
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // 代码块结束
          elements.push(
            <pre key={`code-${index}`} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
              <code className="text-sm">{currentCode}</code>
            </pre>
          );
          currentCode = '';
          inCodeBlock = false;
        } else {
          // 代码块开始
          inCodeBlock = true;
          if (currentParagraph.trim()) {
            elements.push(
              <p key={`p-${index}`} className="my-4">
                {currentParagraph}
              </p>
            );
            currentParagraph = '';
          }
        }
        return;
      }
      
      if (inCodeBlock) {
        currentCode += line + '\n';
        return;
      }
      
      // 标题
      if (line.startsWith('## ')) {
        if (currentParagraph.trim()) {
          elements.push(
            <p key={`p-${index}`} className="my-4">
              {currentParagraph}
            </p>
          );
          currentParagraph = '';
        }
        
        const text = line.substring(3);
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        
        elements.push(
          <h2 key={`h2-${index}`} id={id} className="text-2xl font-bold mt-8 mb-4">
            {text}
          </h2>
        );
        return;
      }
      
      if (line.startsWith('# ')) {
        if (currentParagraph.trim()) {
          elements.push(
            <p key={`p-${index}`} className="my-4">
              {currentParagraph}
            </p>
          );
          currentParagraph = '';
        }
        
        const text = line.substring(2);
        
        elements.push(
          <h1 key={`h1-${index}`} className="text-3xl font-bold mt-4 mb-6">
            {text}
          </h1>
        );
        return;
      }
      
      // 普通段落
      if (line === '') {
        if (currentParagraph.trim()) {
          elements.push(
            <p key={`p-${index}`} className="my-4">
              {currentParagraph}
            </p>
          );
          currentParagraph = '';
        }
      } else {
        currentParagraph += line + ' ';
      }
    });
    
    // 处理剩余的段落
    if (currentParagraph.trim()) {
      elements.push(
        <p key="p-last" className="my-4">
          {currentParagraph}
        </p>
      );
    }
    
    return elements;
  };
  
  // 跳转到指定章节
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">加载中...</p>
        </div>
      </div>
    );
  }
  
  if (!article) {
    return null;
  }
  
  const headings = parseHeadings(article.content);
  
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
      
      {/* 文章详情 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* 文章内容 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8"
              >
                {/* 文章头部 */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Link 
                      to="/articles" 
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center"
                    >
                      <i className="fa-solid fa-arrow-left mr-1"></i> 返回文章列表
                    </Link>
                  </div>
                  
                  <span className="inline-block text-sm font-semibold text-blue-500 mb-2">{article.category}</span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user mr-2"></i>
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fa-solid fa-calendar-days mr-2"></i>
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fa-solid fa-clock mr-2"></i>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* 文章封面图 */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8 overflow-hidden rounded-xl"
                >
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </motion.div>
                
                {/* 文章正文 */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`prose dark:prose-invert max-w-none p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}
                >
                  {renderArticleContent(article.content)}
                </motion.div>
                
                {/* 文章标签 */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* 文章反馈 */}
                <div className="mt-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-4">这篇文章对你有帮助吗？</h3>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 rounded-lg flex items-center gap-2"
                    >
                      <i className="fa-solid fa-thumbs-up"></i>
                      <span>有帮助</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg flex items-center gap-2"
                    >
                      <i className="fa-solid fa-thumbs-down"></i>
                      <span>需要改进</span>
                    </motion.button>
                  </div>
                </div>
                
                {/* 作者信息 */}
                <div className="mt-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Software%20developer%20portrait%2C%20professional%20headshot&sign=8d5826776cfe3271f8204e531ed81666" 
                        alt={article.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{article.author}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">高级前端开发工程师</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        热衷于探索前端新技术，分享开发经验和最佳实践。
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* 侧边栏 */}
              <div className="lg:col-span-4">
                {/* 文章目录 */}
                {headings.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`sticky top-24 p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}
                  >
                    <h3 className="text-lg font-bold mb-4">文章目录</h3>
                    <nav>
                      <ul className="space-y-2">
                        {headings.map((heading) => (
                          <li key={heading.id}>
                            <button
                              onClick={() => scrollToSection(heading.id)}
                              className={`text-sm w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                                activeSection === heading.id
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
                            >
                              {heading.text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </motion.div>
                )}
              </div>
            </div>
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

export default ArticleDetail;