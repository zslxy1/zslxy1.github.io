import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

const About: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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
  
  // 关于页面数据
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
    education: [
      {
        degree: '计算机科学与技术学士',
        school: '某大学',
        period: '2013年 - 2017年',
        description: '主修计算机科学，学习了编程语言、数据结构、算法、操作系统等基础课程，GPA 3.8/4.0'
      }
    ],
    experience: [
      {
        position: '高级前端开发工程师',
        company: '某科技公司',
        period: '2023年 - 现在',
        description: '负责公司核心产品的前端架构设计和开发，优化用户体验和性能。带领前端团队完成多个重要项目，引入现代化开发流程。'
      },
      {
        position: '前端开发工程师',
        company: '某互联网公司',
        period: '2020年 - 2023年',
        description: '参与多个Web应用开发，实现响应式界面和交互功能。优化前端性能，提高应用加载速度和运行效率。'
      },
      {
        position: 'Web开发实习生',
        company: '某软件公司',
        period: '2017年 - 2020年',
        description: '学习前端技术，参与小型项目开发和维护。协助团队完成项目文档编写和测试工作。'
      }
    ],
    projects: [
      {
        title: '电商平台前端重构',
        description: '使用React和TypeScript重构了公司的电商平台，提高了页面加载速度和用户体验。',
        technologies: ['React', 'TypeScript', 'Redux', 'Tailwind CSS']
      },
      {
        title: '企业级数据可视化平台',
        description: '开发了一个数据可视化平台，支持多种图表类型和数据交互功能。',
        technologies: ['React', 'D3.js', 'Redux', 'Ant Design']
      },
      {
        title: '移动响应式官网',
        description: '为客户设计并开发了响应式官网，确保在各种设备上都有良好的显示效果。',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
      }
    ]
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
            <Link to="/articles" className="font-medium hover:text-blue-500 transition-colors">文章</Link>
            <Link to="/about" className="font-medium text-blue-500 transition-colors">关于</Link>
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
      
      {/* 关于页面标题 */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              关于我
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 text-lg"
            >
              了解我的专业背景、技能和经历
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* 个人信息卡片 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`max-w-4xl mx-auto p-8 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                <img 
                  src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Software%20developer%20portrait%2C%20professional%20headshot&sign=8d5826776cfe3271f8204e531ed81666" 
                  alt={aboutData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">{aboutData.name}</h2>
                <p className="text-blue-500 font-medium mb-4">{aboutData.title}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{aboutData.bio}</p>
                
                <div className="flex justify-center md:justify-start gap-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                    aria-label="GitHub"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a 
                    href="mailto:example@email.com" 
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                    aria-label="Email"
                  >
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* 关于我详情 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">我的简介</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutData.description}
              </p>
            </motion.div>
            
            {/* 兴趣爱好 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">我的兴趣</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutData.interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-star text-blue-500"></i>
                    </div>
                    <span>{interest}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* 技能 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">我的技能</h2>
              <div className="space-y-6">
                {aboutData.skills.map((skillCategory, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-lg font-semibold mb-3">{skillCategory.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                          } transition-colors`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* 教育经历 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">教育经历</h2>
              <div className="space-y-6">
                {aboutData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md border border-gray-200 dark:border-gray-700`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <span className="text-sm text-blue-500 font-medium">{edu.period}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-600 dark:text-gray-300">{edu.school}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* 工作经历 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">工作经历</h2>
              <div className="space-y-8">
                {aboutData.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center z-10">
                        <i className="fa-solid fa-briefcase text-blue-500"></i>
                      </div>
                      {index < aboutData.experience.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 absolute top-12 left-6"></div>
                      )}
                    </div>
                    <div className={`flex-1 p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{exp.position}</h3>
                        <span className="text-sm text-blue-500 font-medium">{exp.period}</span>
                      </div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-600 dark:text-gray-300">{exp.company}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* 项目经验 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 inline-block border-b-2 border-blue-500 pb-2">项目经验</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}className={`p-6 rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white'} border border-gray-200 dark:border-gray-700 transition-all`}
                  >
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 联系我 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              联系我
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 mb-8"
            >
              如果你有任何问题或合作意向，欢迎随时联系我！
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all"
              >
                返回首页
              </Link>
            </motion.div>
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

export default About;