import { motion } from 'framer-motion';

export default function GuestbookHeaderIsland() {
  return (
    <div className="text-center mb-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100"
      >
        留言板
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-2 text-gray-600 dark:text-gray-300"
      >
        欢迎留下你的想法与建议～
      </motion.p>
    </div>
  );
}
