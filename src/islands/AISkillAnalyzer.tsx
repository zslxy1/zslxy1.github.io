import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, BookOpen, Target, Award, ChevronRight, Zap, Shield, Star } from 'lucide-react';
import { getLevelColor, getLevelText } from '@/lib/utils';
import SkillCard from '@/components/ai/SkillCard';
import type { Skill, SkillAnalysis } from '@/lib/types';
import { defaultSkills } from '@/lib/aiData';

interface AISkillAnalyzerProps {
  skills?: Skill[];
  careerGoal?: string;
  onAnalysisComplete?: (analysis: SkillAnalysis) => void;
}

export default function AISkillAnalyzer({ 
  skills = [], 
  careerGoal = '全栈开发工程师',
  onAnalysisComplete 
}: AISkillAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'level' | 'experience' | 'trend' | 'lastUsed'>('level');

  // 模拟技能数据
  const fallbackSkills: Skill[] = defaultSkills;

  const skillCategories = {
    frontend: { label: '前端开发', color: 'blue', icon: '🎨' },
    backend: { label: '后端开发', color: 'green', icon: '⚙️' },
    ai: { label: '人工智能', color: 'purple', icon: '🤖' },
    tool: { label: '开发工具', color: 'orange', icon: '🔧' },
    soft: { label: '软技能', color: 'pink', icon: '💡' }
  };

  const analyzeSkills = async () => {
    setIsAnalyzing(true);
    
    // 模拟AI分析过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const skillData = skills.length > 0 ? skills : fallbackSkills;
    
    // 生成智能分析结果
    const strengths = skillData
      .filter(skill => skill.level >= 7)
      .sort((a, b) => b.level - a.level)
      .slice(0, 3)
      .map(skill => `${skill.name} (Lv.${skill.level})`);
    
    const improvements = skillData
      .filter(skill => skill.level < 6 && skill.trend === 'up')
      .map(skill => `${skill.name} - 当前Lv.${skill.level}，建议重点提升`);
    
    const recommendations = [
      '建议学习云服务和容器化技术，如Docker和Kubernetes',
      '可以考虑深入学习微服务架构',
      '建议参与开源项目来提升实战经验',
      '可以考虑获得相关技术认证'
    ];
    
    const learningPath = [
      '巩固现有核心技能，达到专家级别',
      '学习新兴技术，如Web3、边缘计算等',
      '提升系统设计和架构能力',
      '培养团队管理和项目管理技能'
    ];
    
    const careerSuggestions = [
      '高级前端工程师 - 专注于React生态和性能优化',
      '全栈开发工程师 - 扩展后端和DevOps技能',
      'AI工程师 - 深化机器学习和深度学习',
      '技术负责人 - 提升架构设计和团队管理能力'
    ];
    
    const analysisResult: SkillAnalysis = {
      strengths,
      improvements,
      recommendations,
      learningPath,
      careerSuggestions
    };
    
    setAnalysis(analysisResult);
    onAnalysisComplete?.(analysisResult);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    analyzeSkills();
  }, []);

  const getLevelColor = (level: number) => {
    if (level >= 8) return 'bg-green-500';
    if (level >= 6) return 'bg-yellow-500';
    if (level >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getLevelText = (level: number) => {
    if (level >= 8) return '专家级';
    if (level >= 6) return '熟练级';
    if (level >= 4) return '入门级';
    return '初学级';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const filteredSkills = selectedCategory === 'all' 
    ? (skills.length > 0 ? skills : fallbackSkills)
    : (skills.length > 0 ? skills : fallbackSkills).filter(skill => skill.category === selectedCategory);

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'level': return b.level - a.level;
      case 'experience': return b.experience - a.experience;
      case 'trend': return (b.trend === 'up' ? 1 : 0) - (a.trend === 'up' ? 1 : 0);
      case 'lastUsed': return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
      default: return 0;
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI技能分析器</h3>
      </div>

      {/* 控制面板 */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            技能分类
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">全部分类</option>
            {Object.entries(skillCategories).map(([key, category]) => (
              <option key={key} value={key}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            排序方式
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="level">按等级排序</option>
            <option value="experience">按经验排序</option>
            <option value="trend">按趋势排序</option>
            <option value="lastUsed">按最近使用排序</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={analyzeSkills}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                分析中...
              </div>
            ) : (
              '重新分析'
            )}
          </button>
        </div>
      </div>

      {/* 技能概览 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">技能概览</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>

      {/* AI分析结果 */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">AI智能分析结果</h4>
          
          {/* 优势分析 */}
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
          
          {/* 改进建议 */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
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
          
          {/* 学习路径 */}
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
          
          {/* 职业建议 */}
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
      )}

      {/* 使用提示 */}
      <div className="mt-6 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
        <p className="text-sm text-orange-700 dark:text-orange-400">
          💡 提示：技能分析器会根据你的技能数据生成个性化的分析报告，包括优势识别、改进建议、学习路径规划和职业发展方向推荐。
        </p>
      </div>
    </motion.div>
  );
}
