import type { Project, Skill, SkillAnalysis, GeneratedTag, CodeIssue, ChatMessage, LanguageKey } from '@/lib/types'
import { contentTypes, audiences, tagCategories } from '@/lib/aiData'

export function scoreProjects(projects: Project[], userInterests: string[], skillLevel: 'beginner'|'intermediate'|'advanced') {
  return projects.map(project => {
    let score = 0
    const interestMatches = project.tags.filter(tag =>
      userInterests.some(interest =>
        tag.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(tag.toLowerCase())
      )
    ).length
    score += interestMatches * 10

    if (project.difficulty === skillLevel) {
      score += 15
    } else if (
      (skillLevel === 'beginner' && project.difficulty === 'intermediate') ||
      (skillLevel === 'intermediate' && project.difficulty === 'advanced')
    ) {
      score += 10
    }

    if (project.popular) score += 8
    if (project.trending) score += 12

    const daysSinceUpdate = Math.floor((Date.now() - new Date(project.lastUpdated).getTime()) / (1000*60*60*24))
    score += Math.max(0, 5 - daysSinceUpdate)

    return { ...project, score }
  }).sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
}

export function generateTagsFromContent(content: string, contentTypeKey: keyof typeof contentTypes, audienceKey: keyof typeof audiences): GeneratedTag[] {
  const mock: GeneratedTag[] = []
  const lower = content.toLowerCase()

  if (contentTypeKey === 'article') {
    mock.push(
      { tag: 'React', relevance: 95, category: 'technical', explanation: '内容涉及React技术' },
      { tag: '前端开发', relevance: 90, category: 'technical', explanation: '前端开发相关' },
      { tag: 'TypeScript', relevance: 88, category: 'technical', explanation: 'TypeScript技术栈' },
      { tag: 'Web开发', relevance: 85, category: 'technical', explanation: 'Web开发领域' },
      { tag: 'AI应用', relevance: 82, category: 'trending', explanation: '当前AI技术热门' },
      { tag: '教程', relevance: 80, category: 'audience', explanation: '适合学习参考' },
      { tag: '最佳实践', relevance: 78, category: 'seo', explanation: 'SEO友好关键词' },
      { tag: '性能优化', relevance: 75, category: 'technical', explanation: '技术深度内容' }
    )
  } else if (contentTypeKey === 'project') {
    mock.push(
      { tag: '开源项目', relevance: 92, category: 'technical', explanation: '开源项目展示' },
      { tag: 'GitHub', relevance: 88, category: 'technical', explanation: '代码托管平台' },
      { tag: '全栈开发', relevance: 85, category: 'technical', explanation: '全栈技术项目' },
      { tag: '现代化', relevance: 82, category: 'trending', explanation: '使用现代技术' },
      { tag: '响应式设计', relevance: 80, category: 'technical', explanation: '移动端适配' },
      { tag: '开发者工具', relevance: 78, category: 'audience', explanation: '面向开发者' },
      { tag: '项目展示', relevance: 75, category: 'seo', explanation: '项目相关SEO' }
    )
  }

  if (audienceKey === 'beginner') {
    mock.push(
      { tag: '入门教程', relevance: 90, category: 'audience', explanation: '适合初学者' },
      { tag: '基础知识', relevance: 85, category: 'audience', explanation: '基础概念讲解' },
      { tag: '循序渐进', relevance: 80, category: 'audience', explanation: '学习路径清晰' }
    )
  } else if (audienceKey === 'advanced') {
    mock.push(
      { tag: '高级技巧', relevance: 90, category: 'audience', explanation: '高级开发者适用' },
      { tag: '架构设计', relevance: 88, category: 'technical', explanation: '架构层面内容' },
      { tag: '性能调优', relevance: 85, category: 'technical', explanation: '深度优化内容' }
    )
  }

  const words = lower.split(/\s+/)
  if (words.some(w => ['ai','人工智能','机器学习'].includes(w))) {
    mock.push(
      { tag: '机器学习', relevance: 85, category: 'technical', explanation: 'AI技术相关' },
      { tag: '深度学习', relevance: 82, category: 'trending', explanation: '深度学习热门' }
    )
  }
  if (words.some(w => ['react','vue','angular'].includes(w))) {
    mock.push(
      { tag: '前端框架', relevance: 88, category: 'technical', explanation: '前端框架相关' },
      { tag: '组件化', relevance: 85, category: 'technical', explanation: '组件化开发' }
    )
  }
  mock.sort((a,b) => b.relevance - a.relevance)
  return mock.slice(0,12)
}

export function analyzeCodeMock(code: string, language: LanguageKey): CodeIssue[] {
  const issues: CodeIssue[] = []
  if (language === 'javascript') {
    issues.push(
      { line: 1, type: 'warning', message: '建议使用严格模式', suggestion: '在文件开头添加 "use strict";', severity: 'low' },
      { line: 5, type: 'suggestion', message: '可以使用箭头函数简化代码', suggestion: '考虑使用 const func = () => {} 语法', severity: 'medium' },
      { line: 10, type: 'error', message: '变量未定义', suggestion: '请确保在使用变量前先定义它', severity: 'high' }
    )
  } else if (language === 'typescript') {
    issues.push(
      { line: 3, type: 'warning', message: '缺少类型注解', suggestion: '为函数参数添加类型注解', severity: 'medium' },
      { line: 8, type: 'suggestion', message: '可以使用枚举替代魔法字符串', suggestion: '考虑使用 enum 类型来提高可读性', severity: 'low' },
      { line: 15, type: 'error', message: '类型不匹配', suggestion: '检查变量类型，确保赋值正确', severity: 'high' }
    )
  } else if (language === 'react') {
    issues.push(
      { line: 2, type: 'warning', message: '缺少key属性', suggestion: '在列表渲染时添加唯一的key属性', severity: 'medium' },
      { line: 7, type: 'suggestion', message: '可以使用React Hooks优化状态管理', suggestion: '考虑使用useState或useReducer', severity: 'low' },
      { line: 12, type: 'error', message: '内存泄漏风险', suggestion: '确保在useEffect中正确清理副作用', severity: 'high' }
    )
  }
  if (code.length > 1000) {
    issues.push({ line: Math.floor(code.split('\n').length/2), type: 'suggestion', message: '函数过长，建议拆分', suggestion: '拆分为多个小函数，提高可读性', severity: 'medium' })
  }
  if (code.includes('console.log')) {
    issues.push({ line: code.split('\n').findIndex(l => l.includes('console.log')) + 1, type: 'warning', message: '生产环境中建议移除console语句', suggestion: '使用专业日志系统替代console.log', severity: 'low' })
  }
  return issues
}

export function analyzeSkillsReport(skills: Skill[]): SkillAnalysis {
  const strengths = skills.filter(s => s.level >= 7).sort((a,b)=>b.level-a.level).slice(0,3).map(s=>`${s.name} (Lv.${s.level})`)
  const improvements = skills.filter(s => s.level < 6 && s.trend === 'up').map(s=>`${s.name} - 当前Lv.${s.level}，建议重点提升`)
  const recommendations = [
    '建议学习云服务和容器化技术，如Docker和Kubernetes',
    '可以考虑深入学习微服务架构',
    '建议参与开源项目来提升实战经验',
    '可以考虑获得相关技术认证'
  ]
  const learningPath = [
    '巩固现有核心技能，达到专家级别',
    '学习新兴技术，如Web3、边缘计算等',
    '提升系统设计和架构能力',
    '培养团队管理和项目管理技能'
  ]
  const careerSuggestions = [
    '高级前端工程师 - 专注于React生态和性能优化',
    '全栈开发工程师 - 扩展后端和DevOps技能',
    'AI工程师 - 深化机器学习和深度学习',
    '技术负责人 - 提升架构设计和团队管理能力'
  ]
  return { strengths, improvements, recommendations, learningPath, careerSuggestions }
}

export function generateBotReply(userMessage: string, knowledgeBase: string[]): Pick<ChatMessage,'content'|'suggestions'> {
  const lower = userMessage.toLowerCase()
  let content = ''
  let suggestions: string[] = []
  if (lower.includes('ai功能') || lower.includes('功能')) {
    content = `这个网站集成了多种AI功能来增强用户体验：\n\n📝 AI写作助手\n🔍 代码审查员\n⭐ 项目推荐引擎\n💬 智能聊天助手\n\n每种功能都设计得很直观，你可以直接试用看看！`
    suggestions = ['如何使用写作助手？','代码审查支持哪些语言？','推荐一些AI项目']
  } else if (lower.includes('写作助手') || lower.includes('写作')) {
    content = `AI写作助手支持多种写作风格，输入主题即可生成内容。`
    suggestions = ['生成技术文章','写作风格有哪些？','写作技巧分享']
  } else if (lower.includes('代码审查') || lower.includes('代码')) {
    content = `AI代码审查员支持 JavaScript / TypeScript / Python / React，自动检测问题并给出建议。`
    suggestions = ['审查JavaScript代码','代码优化技巧','支持哪些语言？']
  } else if (lower.includes('项目推荐') || lower.includes('推荐')) {
    content = `项目推荐引擎会根据兴趣与技能水平推荐 Web、AI、移动、工具、游戏等类型项目。`
    suggestions = ['推荐AI项目','初级项目推荐','热门项目有哪些？']
  } else if (lower.includes('你好') || lower.includes('hi') || lower.includes('hello')) {
    content = '你好！我是这个网站的AI助手，随时可以帮你了解和使用各种AI功能。'
    suggestions = ['网站有哪些功能？','如何使用AI工具？','推荐学习资源']
  } else if (lower.includes('谢谢') || lower.includes('感谢')) {
    content = '不客气！很高兴能帮到你。如果还有其他问题，随时问我哦！'
    suggestions = ['还有其他功能吗？','使用技巧','反馈建议']
  } else {
    const relevant = knowledgeBase.filter(k => userMessage.split(' ').some(w => w.length > 2 && k.toLowerCase().includes(w.toLowerCase())))
    if (relevant.length > 0) {
      content = `根据你的问题，我找到了一些相关信息：\n\n${relevant[0]}\n\n如果你需要更具体的信息，可以告诉我你想了解哪个方面！`
    } else {
      content = `这是个好问题！你可以问我关于网站的AI功能、使用方法、技术相关的问题或项目建议。`
    }
    suggestions = ['AI功能介绍','使用教程','技术栈介绍']
  }
  return { content, suggestions }
}
