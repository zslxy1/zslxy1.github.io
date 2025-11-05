import { motion } from 'framer-motion';

export default function ContactHeaderIsland() {
  return (
    <div className="text-center mb-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100"
      >
        联系我
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-2 text-gray-600 dark:text-gray-300"
      >
        如果你有任何问题或合作意向，欢迎随时联系我！
      </motion.p>
    </div>
  );
}

