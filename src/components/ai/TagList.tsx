import { motion } from 'framer-motion'
import { Hash, Copy, TrendingUp } from 'lucide-react'
import type { GeneratedTag } from '@/lib/types'
import { getRelevanceColor } from '@/lib/utils'
import { tagCategories } from '@/lib/aiData'

export default function TagList({ tags, onCopy }: { tags: GeneratedTag[]; onCopy: (tag: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tags.map((tag, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-3 rounded-lg border ${getRelevanceColor(tag.relevance)}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs`}>
                {tagCategories[tag.category as keyof typeof tagCategories]?.icon}
                {tagCategories[tag.category as keyof typeof tagCategories]?.label}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-gray-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{tag.relevance}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-pink-500" />
              <span className="font-medium text-gray-900 dark:text-white">{tag.tag}</span>
            </div>
            <button
              onClick={() => onCopy(tag.tag)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="复制标签"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{tag.explanation}</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div
                className={`h-1 rounded-full ${
                  tag.relevance >= 90
                    ? 'bg-green-500'
                    : tag.relevance >= 80
                    ? 'bg-yellow-500'
                    : tag.relevance >= 70
                    ? 'bg-orange-500'
                    : 'bg-gray-500'
                }`}
                style={{ width: `${tag.relevance}%` }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
