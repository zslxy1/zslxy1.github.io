import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const timeline = [
  { title: '高级前端开发工程师', period: '2023年 - 现在', desc: '负责核心产品的前端架构与性能优化，带领团队完成重要项目。' },
  { title: '前端开发工程师', period: '2020年 - 2023年', desc: '参与多个Web应用开发，实现响应式界面与交互功能。' },
  { title: 'Web开发实习生', period: '2017年 - 2020年', desc: '学习前端技术，参与小型项目开发与维护。' },
  { title: '计算机科学与技术学士', period: '2013年 - 2017年', desc: '系统学习计算机基础课程，GPA 3.8/4.0。' },
];

export default function TimelineIsland() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100"
        >
          我的历程
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-2 text-gray-600 dark:text-gray-300"
        >
          记录学习与工作的关键阶段，见证成长与进步。
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto">
        {timeline.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={(isDark ? 'bg-gray-800' : 'bg-white') + ' p-6 rounded-xl border mb-4 ' + (isDark ? 'border-gray-700' : 'border-gray-200')}
          >
            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-blue-500 font-medium mb-3">{item.period}</p>
            <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <motion.a
          href="/skills"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all"
        >
          查看我的技能
        </motion.a>
      </div>
    </div>
  );
}
