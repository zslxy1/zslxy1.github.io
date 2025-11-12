import type { Project, Skill } from '@/lib/types'

export const allProjects: Project[] = [
  {
    id: '1',
    title: 'AI博客写作助手',
    description: '基于React和AI技术的智能写作工具，支持多种写作风格',
    tags: ['react', 'ai', 'typescript', 'writing'],
    github: 'https://github.com/example/ai-writing-assistant',
    demo: 'https://ai-writer-demo.com',
    stars: 245,
    category: 'ai',
    difficulty: 'intermediate',
    trending: true,
    popular: true,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    title: '智能代码审查工具',
    description: 'AI驱动的代码质量分析工具，支持多种编程语言',
    tags: ['ai', 'code-review', 'javascript', 'typescript'],
    github: 'https://github.com/example/ai-code-reviewer',
    stars: 189,
    category: 'tool',
    difficulty: 'advanced',
    trending: true,
    popular: false,
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    title: '个人作品集网站',
    description: '现代化的个人作品集展示网站，支持深色模式和动画效果',
    tags: ['react', 'portfolio', 'tailwind', 'animation'],
    github: 'https://github.com/example/portfolio-website',
    demo: 'https://portfolio-demo.com',
    stars: 156,
    category: 'web',
    difficulty: 'beginner',
    trending: false,
    popular: true,
    lastUpdated: '2024-01-12'
  },
  {
    id: '4',
    title: 'AI图像识别应用',
    description: '使用机器学习技术进行图像分类和识别的Web应用',
    tags: ['ai', 'machine-learning', 'python', 'react'],
    github: 'https://github.com/example/ai-image-recognition',
    stars: 312,
    category: 'ai',
    difficulty: 'advanced',
    trending: true,
    popular: true,
    lastUpdated: '2024-01-08'
  },
  {
    id: '5',
    title: '移动端记账应用',
    description: '简洁优雅的移动端记账应用，支持数据同步和图表分析',
    tags: ['react-native', 'mobile', 'finance', 'charts'],
    github: 'https://github.com/example/mobile-expense-tracker',
    stars: 98,
    category: 'mobile',
    difficulty: 'intermediate',
    trending: false,
    popular: false,
    lastUpdated: '2024-01-05'
  },
  {
    id: '6',
    title: '贪吃蛇游戏',
    description: '经典贪吃蛇游戏的现代实现，支持多种难度和主题',
    tags: ['javascript', 'game', 'canvas', 'animation'],
    github: 'https://github.com/example/snake-game',
    demo: 'https://snake-game-demo.com',
    stars: 67,
    category: 'game',
    difficulty: 'beginner',
    trending: false,
    popular: true,
    lastUpdated: '2024-01-03'
  }
]

export const defaultSkills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    level: 8,
    experience: 18,
    projects: 12,
    trend: 'up',
    lastUsed: '2024-01-15',
    relatedSkills: ['JavaScript', 'TypeScript', 'Next.js']
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 7,
    experience: 12,
    projects: 10,
    trend: 'up',
    lastUsed: '2024-01-20',
    relatedSkills: ['JavaScript', 'React', 'Node.js']
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 6,
    experience: 15,
    projects: 8,
    trend: 'stable',
    lastUsed: '2024-01-10',
    relatedSkills: ['JavaScript', 'Express', 'MongoDB']
  },
  {
    name: 'Python',
    category: 'ai',
    level: 5,
    experience: 8,
    projects: 4,
    trend: 'up',
    lastUsed: '2024-01-05',
    relatedSkills: ['TensorFlow', 'PyTorch', 'Pandas']
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 9,
    experience: 20,
    projects: 15,
    trend: 'up',
    lastUsed: '2024-01-22',
    relatedSkills: ['CSS', 'Responsive Design']
  },
  {
    name: 'Git',
    category: 'tool',
    level: 7,
    experience: 24,
    projects: 20,
    trend: 'stable',
    lastUsed: '2024-01-23',
    relatedSkills: ['GitHub', 'Version Control']
  },
  {
    name: 'Machine Learning',
    category: 'ai',
    level: 4,
    experience: 6,
    projects: 3,
    trend: 'up',
    lastUsed: '2024-01-08',
    relatedSkills: ['Python', 'TensorFlow', 'Data Science']
  },
  {
    name: 'Problem Solving',
    category: 'soft',
    level: 8,
    experience: 30,
    projects: 25,
    trend: 'up',
    lastUsed: '2024-01-23',
    relatedSkills: ['Critical Thinking', 'Debugging']
  }
]

export const tagCategories = {
  technical: { label: '技术标签', icon: '🔧', color: 'blue' },
  trending: { label: '热门标签', icon: '🔥', color: 'red' },
  audience: { label: '受众标签', icon: '👥', color: 'green' },
  seo: { label: 'SEO标签', icon: '🔍', color: 'purple' }
}

export const audiences = {
  beginner: { label: '初学者', description: '适合刚入门的开发者' },
  intermediate: { label: '中级开发者', description: '有一定经验的开发者' },
  advanced: { label: '高级开发者', description: '经验丰富的专业开发者' },
  all: { label: '所有水平', description: '适合各个水平的开发者' }
}

export const contentTypes = {
  article: { label: '技术文章', placeholder: '粘贴你的文章内容，AI会分析并生成相关标签...' },
  project: { label: '项目介绍', placeholder: '描述你的项目，包括功能、技术栈、特点等...' },
  tutorial: { label: '教程内容', placeholder: '输入教程的主要内容和学习目标...' },
  review: { label: '评测内容', placeholder: '描述评测的产品、体验和评价要点...' }
}

export const defaultKnowledgeBase: string[] = [
  'AI博客写作助手可以帮助你生成技术文章',
  '代码审查工具可以分析JavaScript、TypeScript、Python等语言的代码质量',
  '项目推荐引擎会根据你的兴趣和技能水平推荐合适的项目',
  '技能分析器可以帮助你了解技术栈和学习路径',
  '标签生成器可以为文章自动生成相关标签和关键词',
  '这个网站使用Astro + React + TypeScript技术栈开发',
  '支持深色模式和响应式设计',
  '集成了多种AI功能来提升用户体验'
]
