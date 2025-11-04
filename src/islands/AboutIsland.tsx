import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export default function AboutIsland() {
  const { theme } = useTheme();
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

  const aboutData = {
    name: '开发者',
    title: '高级前端开发工程师',
    bio: '我是一名热衷于前端开发的工程师，拥有多年的Web开发经验。我专注于创建美观、高效且用户友好的Web应用程序。',
    description: '我热衷于探索新技术和解决复杂的前端挑战。在我的职业生涯中，我参与了多个大型Web应用的开发，从需求分析到部署维护的全过程。我相信优秀的前端不仅要美观，还要注重性能和用户体验。',
    interests: [
      '前端框架（React、Vue、Angular）',
      '现代CSS（Tailwind CSS、CSS-in-JS）',
      'TypeScript和JavaScript',
      '性能优化和用户体验',
      '响应式设计和无障碍访问'
    ],
    skills: [
      { category: '前端技术', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js'] },
      { category: '工具与流程', items: ['Git', 'Webpack', 'Vite', 'ESLint', 'Prettier', 'Jest', 'Cypress'] },
      { category: '其他技能', items: ['Node.js', 'RESTful APIs', 'GraphQL', 'Docker', 'CI/CD', 'UI/UX设计基础'] }
    ],
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      <motion.div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollProgress}%` }} />

      {/** 统一使用 BaseLayout 的全局导航，移除本页内置导航以避免双导航 **/}

      <section className="py-12 md:py-20 relative transition-colors duration-300">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-blue-500/5 dark:to-purple-500/10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">关于我</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-600 dark:text-gray-300 text-lg">了解我的专业背景、技能和经历</motion.p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className={`max-w-4xl mx-auto p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                <img src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Software%20developer%20portrait%2C%20professional%20headshot&sign=8d5826776cfe3271f8204e531ed81666" alt={aboutData.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">{aboutData.name}</h2>
                <p className="text-blue-500 font-medium mb-4">{aboutData.title}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{aboutData.bio}</p>
                <div className="flex justify-center md:justify-start gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                  <a href="mailto:example@email.com" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors" aria-label="Email"><i className="fa-solid fa-envelope"></i></a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
