import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkillsIsland from './SkillsIsland';
import SocialLinksRow from './SocialLinksRow';

export default function AboutIsland() {
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
    name: '热爱用AI做开发的爱好者',
    title: '马上毕业的大学生',
    bio: '由于上一份工作原因，不经意找了一份计算机相关的工作，并且使用AI开发了这个博客',
    description: '我喜欢去探索AI做自己的开发，未来我打算使用AI打造自己的个人IP',
    interests: [
      '健身',
      '网站开发',
      'AI开发',
      '探索最新的AI技术',
      '睡觉',
      'C++/Python',
      '嵌入式开发',
      '看点二次元',
      '机器人开发',
      '正在尝试探索除编码以外的模型'
    ],
    skills: [
      { category: '前端技术', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js'] },
      { category: '工具与流程', items: ['Git', 'Webpack', 'Vite', 'ESLint', 'Prettier', 'Jest', 'Cypress'] },
      { category: '其他技能', items: ['Node.js', 'RESTful APIs', 'GraphQL', 'Docker', 'CI/CD', 'UI/UX设计基础'] }
    ],
  };

  const education = [
    {
      title: '智能制造工程（本科）',
      org: '广州某大学',
      period: '2022-2026（还未毕业，没准哪天就改了）',
      desc: '机械设计基础,机器人开发,C/C++/Python编程, 嵌入式开发,Pytorch深度学习,人工智能基础'
    }
  ];

  const work = [
    {
      title: '工业机器人工程师',
      org: 'ABB',
      period: '2025.7-2025.9',
      desc: '主要是做机器人调试和电气调试的，应该跟我现在做的关系不大吧，哈哈'
    },
    {
      title: '网络运维',
      org: '某科技公司',
      period: '2025.10-2025.11',
      desc: '这个是做网络运维，本身自己不是做计算机方面的工作，有点难倒我了，后续自己开发网站，打算再往后找找看'
    }
  ];

  const projects = [
    {
      title: '个人博客项目(zslxy1.github.io)',
      desc: '基于 Astro + React 的静态博客与内容站，支持深色模式、文章搜索与评论系统。',
      tags: ['Astro', 'React', 'Tailwind'],
      link: 'https://github.com/zslxy1/zslxy1.github.io'
    },
    {
      title: '基于YOLOv8的cs1.6游戏人物检测',
      desc: '这是一个基于 YOLOv8 模型的 CS16 游戏辅助工具，核心功能包括屏幕区域截取、目标检测（默认检测敌人）和自动瞄准，支持 GPU/CPU 自适应运行，可实时显示检测结果并置顶窗口。',
      tags: ['YOLOv8', 'Pytorch', 'Python'],
      link: 'https://github.com/zslxy1/aaayolov8_cs1.6_lxy'
    },
    {
      title: 'Jaka六轴机器人击打乒乓球',
      desc: '这个是一个竞赛项目，没什么写的了，只能把这个写上去凑个数了，主要是编写了一个控制Jaka六轴机器人的程序，实现了自动击打乒乓球的功能，分为静态击打和动态击打两种模式，使用C++编写，在Jaka机器人上运行。',
      tags: ['C++', 'Jaka', '数学'],
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
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
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="max-w-4xl mx-auto p-8 rounded-2xl shadow-lg bg-transparent dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                <img src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Software%20developer%20portrait%2C%20professional%20headshot&sign=8d5826776cfe3271f8204e531ed81666" alt={aboutData.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">{aboutData.name}</h2>
                <p className="text-blue-500 font-medium mb-4">{aboutData.title}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{aboutData.bio}</p>
                <SocialLinksRow size={40} gapClass="gap-4" className="justify-center md:justify-start" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 兴趣爱好 */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">兴趣与关注</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-gray-600 dark:text-gray-300 mb-6">{aboutData.description}</motion.p>
            <div className="flex flex-wrap gap-3">
              {aboutData.interests.map((it) => (
                <motion.span key={it} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  {it}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 技能展示（复用 SkillsIsland） */}
      {/* 默认透明，避免深色模式初次渲染闪白 */}
      <section className="py-12 bg-transparent dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SkillsIsland />
          </div>
        </div>
      </section>

      {/* 教育经历与工作经验 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">教育经历与工作经验</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">教育经历</h3>
                <div className="space-y-5">
                  {education.map((e) => (
                    <motion.div key={e.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative pl-6">
                      <span className="absolute left-0 top-2 w-3 h-3 rounded-full bg-blue-500"></span>
                      <div className="text-gray-900 dark:text-gray-100 font-medium">{e.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{e.org} · {e.period}</div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{e.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">工作经验</h3>
                <div className="space-y-5">
                  {work.map((w) => (
                    <motion.div key={`${w.title}-${w.org}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative pl-6">
                      <span className="absolute left-0 top-2 w-3 h-3 rounded-full bg-purple-500"></span>
                      <div className="text-gray-900 dark:text-gray-100 font-medium">{w.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{w.org} · {w.period}</div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{w.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目经验 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">项目经验</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p) => (
      <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-transparent dark:bg-gray-800 shadow-sm">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{p.title}</h3>
                    <a href={p.link} className="text-blue-500 hover:underline text-sm">详情</a>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 联系区域：与首页/文章页保持一致的样式与行为（放在最后） */}
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
