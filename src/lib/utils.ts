import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getColorClasses(color: string) {
  const colors = {
    blue: {
      bg: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-600 dark:text-blue-400',
      light: 'bg-blue-50 dark:bg-blue-900/20',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: {
      bg: 'bg-green-500',
      hover: 'hover:bg-green-600',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-600 dark:text-green-400',
      light: 'bg-green-50 dark:bg-green-900/20',
      gradient: 'from-green-500 to-green-600'
    },
    purple: {
      bg: 'bg-purple-500',
      hover: 'hover:bg-purple-600',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-600 dark:text-purple-400',
      light: 'bg-purple-50 dark:bg-purple-900/20',
      gradient: 'from-purple-500 to-purple-600'
    },
    indigo: {
      bg: 'bg-indigo-500',
      hover: 'hover:bg-indigo-600',
      border: 'border-indigo-200 dark:border-indigo-800',
      text: 'text-indigo-600 dark:text-indigo-400',
      light: 'bg-indigo-50 dark:bg-indigo-900/20',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    orange: {
      bg: 'bg-orange-500',
      hover: 'hover:bg-orange-600',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-600 dark:text-orange-400',
      light: 'bg-orange-50 dark:bg-orange-900/20',
      gradient: 'from-orange-500 to-orange-600'
    },
    pink: {
      bg: 'bg-pink-500',
      hover: 'hover:bg-pink-600',
      border: 'border-pink-200 dark:border-pink-800',
      text: 'text-pink-600 dark:text-pink-400',
      light: 'bg-pink-50 dark:bg-pink-900/20',
      gradient: 'from-pink-500 to-pink-600'
    }
  } as const
  return colors[color as keyof typeof colors] || colors.blue
}

export function getLevelColor(level: number) {
  if (level >= 8) return 'bg-green-500'
  if (level >= 6) return 'bg-yellow-500'
  if (level >= 4) return 'bg-orange-500'
  return 'bg-red-500'
}

export function getLevelText(level: number) {
  if (level >= 8) return '专家级'
  if (level >= 6) return '熟练级'
  if (level >= 4) return '入门级'
  return '初学级'
}

export function getRelevanceColor(relevance: number) {
  if (relevance >= 90) return 'border-green-300 bg-green-50 dark:bg-green-900/10'
  if (relevance >= 80) return 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10'
  if (relevance >= 70) return 'border-orange-300 bg-orange-50 dark:bg-orange-900/10'
  return 'border-gray-300 bg-gray-50 dark:bg-gray-900/10'
}
