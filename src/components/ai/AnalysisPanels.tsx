import { motion } from 'framer-motion'
import { Award, ChevronRight, BookOpen, Zap, Shield, Star } from 'lucide-react'
import type { SkillAnalysis } from '@/lib/types'

export default function AnalysisPanels({ analysis }: { analysis: SkillAnalysis }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">AI智能分析结果</h4>

      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h5 className="font-semibold text-green-800 dark:text-green-400">核心优势</h5>
        </div>
        <ul className="space-y-1">
          {analysis.strengths.map((strength, index) => (
            <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
              <Star className="w-3 h-3" />
              {strength}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <ChevronRight className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <h5 className="font-semibold text-yellow-800 dark:text-yellow-400">提升建议</h5>
        </div>
        <ul className="space-y-1">
          {analysis.improvements.map((improvement, index) => (
            <li key={index} className="text-sm text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
              <ChevronRight className="w-3 h-3" />
              {improvement}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h5 className="font-semibold text-blue-800 dark:text-blue-400">学习路径</h5>
        </div>
        <ol className="space-y-2">
          {analysis.learningPath.map((step, index) => (
            <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
              <span className="font-bold">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h5 className="font-semibold text-purple-800 dark:text-purple-400">职业发展方向</h5>
        </div>
        <ul className="space-y-1">
          {analysis.careerSuggestions.map((suggestion, index) => (
            <li key={index} className="text-sm text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <Shield className="w-3 h-3" />
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
