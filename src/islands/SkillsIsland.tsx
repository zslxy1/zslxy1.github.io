import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML/CSS', level: 50 },
  { name: 'Node.js', level: 50 },
  { name: 'JavaScript', level: 50 },
  { name: 'Git', level: 50 },
  { name: 'Trae', level: 50 },
  { name: 'Cursor', level: 50 },
];

export default function SkillsIsland() {

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100"
        >
          我的技能
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-2 text-gray-600 dark:text-gray-300"
        >
          这里展示了我掌握的技术技能和专长，包括前端开发、工具使用和其他相关技能。
        </motion.p>
      </div>

      {/* 标签云 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-8 flex flex-wrap gap-3 justify-center"
      >
        {skills.map((s, i) => (
          <motion.span
            key={s.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium shadow-sm hover:shadow-md transition-all"
          >
            {s.name}
          </motion.span>
        ))}
      </motion.div>

      {/* 技能进度卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {skills.slice(0, 6).map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-gray-500">{s.level}%</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 w-full rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${s.level}%`,
                  background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <motion.a
          href="/articles"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all"
        >
          去看文章
        </motion.a>
      </div>
    </div>
  );
}
