import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import type { Skill } from '@/lib/types'
import { getLevelColor, getLevelText } from '@/lib/utils'

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
            Lv.{skill.level}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className={`w-4 h-4 ${skill.trend === 'up' ? 'text-green-500' : skill.trend === 'down' ? 'text-red-500 rotate-180' : 'text-gray-400'}`} />
          <span className="text-xs text-gray-600 dark:text-gray-400">{skill.trend}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-300">熟练度</span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{getLevelText(skill.level)}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className={`h-2 rounded-full ${getLevelColor(skill.level)}`} style={{ width: `${skill.level * 10}%` }} />
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <div>经验: {skill.experience}个月</div>
        <div>项目: {skill.projects}个</div>
        <div>最近使用: {skill.lastUsed}</div>
      </div>

      {skill.relatedSkills.length > 0 && (
        <div className="mt-3">
          <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">相关技能:</div>
          <div className="flex flex-wrap gap-1">
            {skill.relatedSkills.slice(0,3).map((rs, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                {rs}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
