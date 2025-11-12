import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, Star, MessageCircle, Brain, Tag, ChevronRight, Palette, Zap, Shield, TrendingUp, Hash } from 'lucide-react';
import AIWritingAssistant from '@/islands/AIWritingAssistant';
import AICodeReviewer from '@/islands/AICodeReviewer';
import AIProjectRecommendation from '@/islands/AIProjectRecommendation';
import AIChatAssistant from '@/islands/AIChatAssistant';
import AISkillAnalyzer from '@/islands/AISkillAnalyzer';
import AITagGenerator from '@/islands/AITagGenerator';
import { getColorClasses } from '@/lib/utils';

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  component: React.ComponentType<any>;
  category: 'content' | 'development' | 'recommendation' | 'interaction' | 'analysis';
}

export default function AIFeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [userInterests] = useState(['react', 'ai', 'typescript', 'web']);
  const [skillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const aiFeatures: AIFeature[] = [
    {
      id: 'writing',
      title: 'AI文章写作助手',
      description: '智能生成多种风格的技术文章和博客内容',
      icon: Sparkles,
      color: 'blue',
      component: AIWritingAssistant,
      category: 'content'
    },
    {
      id: 'code-review',
      title: 'AI代码审查员',
      description: '智能分析代码质量，提供专业的改进建议',
      icon: Code,
      color: 'green',
      component: AICodeReviewer,
      category: 'development'
    },
    {
      id: 'project-rec',
      title: 'AI项目推荐引擎',
      description: '基于兴趣和技能水平智能推荐开发项目',
      icon: Star,
      color: 'purple',
      component: AIProjectRecommendation,
      category: 'recommendation'
    },
    {
      id: 'chat',
      title: 'AI智能助手',
      description: '实时对话，解答关于AI功能的各种问题',
      icon: MessageCircle,
      color: 'indigo',
      component: AIChatAssistant,
      category: 'interaction'
    },
    {
      id: 'skill-analyzer',
      title: 'AI技能分析器',
      description: '智能分析技能水平，提供个性化学习建议',
      icon: Brain,
      color: 'orange',
      component: AISkillAnalyzer,
      category: 'analysis'
    },
    {
      id: 'tag-generator',
      title: 'AI标签生成器',
      description: '智能生成内容标签，提升SEO和曝光度',
      icon: Hash,
      color: 'pink',
      component: AITagGenerator,
      category: 'content'
    }
  ];

  

  const ActiveComponent = activeFeature 
    ? aiFeatures.find(f => f.id === activeFeature)?.component 
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 头部区域 */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Brain className="w-12 h-12 text-blue-500" />
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI智能功能
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                探索集成了多种AI功能的智能工具，提升你的开发效率和创作体验
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                  🔨 功能开发中 - 当前为演示版本
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>智能高效</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>创意无限</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>安全可靠</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 功能选择区域 */}
      {!activeFeature && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">选择AI功能</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  点击下面的功能卡片，体验不同的AI智能工具
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiFeatures.map((feature, index) => {
                  const colorClasses = getColorClasses(feature.color);
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl border-2 ${colorClasses.border} ${colorClasses.light} cursor-pointer group transition-all duration-300 hover:shadow-lg`}
                      onClick={() => setActiveFeature(feature.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${colorClasses.bg} group-hover:${colorClasses.hover} transition-colors`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-2 ${colorClasses.text}`}>
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {feature.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${colorClasses.text}`}>
                              {feature.category === 'content' && '内容创作'}
                              {feature.category === 'development' && '开发工具'}
                              {feature.category === 'recommendation' && '智能推荐'}
                              {feature.category === 'interaction' && '交互助手'}
                              {feature.category === 'analysis' && '分析工具'}
                            </span>
                            <ChevronRight className={`w-5 h-5 ${colorClasses.text} group-hover:translate-x-1 transition-transform`} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 功能展示区域 */}
      {activeFeature && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* 返回按钮 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                <button
                  onClick={() => setActiveFeature(null)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  返回功能选择
                </button>
              </motion.div>

              {/* 功能标题 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  {(() => {
                    const feature = aiFeatures.find(f => f.id === activeFeature);
                    const colorClasses = feature ? getColorClasses(feature.color) : getColorClasses('blue');
                    return (
                      <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                        {feature && <feature.icon className="w-8 h-8 text-white" />}
                      </div>
                    );
                  })()}
                  <h2 className="text-3xl font-bold">
                    {aiFeatures.find(f => f.id === activeFeature)?.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {aiFeatures.find(f => f.id === activeFeature)?.description}
                </p>
              </motion.div>

              {/* 功能组件 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {activeFeature === 'writing' && <AIWritingAssistant />}
                {activeFeature === 'code-review' && <AICodeReviewer />}
                {activeFeature === 'project-rec' && (
                  <AIProjectRecommendation 
                    userInterests={userInterests}
                    skillLevel={skillLevel}
                  />
                )}
                {activeFeature === 'skill-analyzer' && <AISkillAnalyzer />}
                {activeFeature === 'tag-generator' && <AITagGenerator />}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* AI聊天助手始终显示 */}
      <AIChatAssistant />
    </div>
  );
}
