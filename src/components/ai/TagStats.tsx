import type { GeneratedTag } from '@/lib/types'

export default function TagStats({ tags }: { tags: GeneratedTag[] }) {
  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {tags.filter(t => t.category === 'technical').length}
          </div>
          <div className="text-xs text-blue-500 dark:text-blue-400">技术标签</div>
        </div>
        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {tags.filter(t => t.category === 'trending').length}
          </div>
          <div className="text-xs text-red-500 dark:text-red-400">热门标签</div>
        </div>
        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {tags.filter(t => t.category === 'audience').length}
          </div>
          <div className="text-xs text-green-500 dark:text-green-400">受众标签</div>
        </div>
        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {tags.filter(t => t.category === 'seo').length}
          </div>
          <div className="text-xs text-purple-500 dark:text-purple-400">SEO标签</div>
        </div>
      </div>
    </div>
  )
}
