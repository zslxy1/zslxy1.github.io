import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Github, ExternalLink, Heart, TrendingUp, Users, Calendar, Tag } from 'lucide-react';
import type { Project } from '@/lib/types';
import { allProjects as projectData } from '@/lib/aiData';
import { scoreProjects } from '@/lib/aiUtils';

interface AIProjectRecommendationProps {
  userInterests?: string[];
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  onProjectSelect?: (project: Project) => void;
}

export default function AIProjectRecommendation({ 
  userInterests = ['react', 'ai', 'web'], 
  skillLevel = 'intermediate',
  onProjectSelect 
}: AIProjectRecommendationProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recommendations, setRecommendations] = useState<Project[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const allProjects: Project[] = projectData;

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // 模拟AI推荐算法
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 基于用户兴趣和技能水平的推荐算法
    const scoredProjects = scoreProjects(allProjects, userInterests, skillLevel);
    setRecommendations(scoredProjects.slice(0, 6));
    setIsGenerating(false);
  };

  useEffect(() => {
    setProjects(allProjects);
    generateRecommendations();
  }, []);

  useEffect(() => {
    generateRecommendations();
  }, [userInterests, skillLevel]);

  const filteredProjects = selectedCategory === 'all' && selectedDifficulty === 'all' 
    ? recommendations 
    : recommendations.filter(project => {
        const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
      });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 text-purple-500" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI项目推荐引擎</h3>
      </div>

      {/* 用户兴趣标签 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          你的兴趣标签
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {userInterests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          技能等级: <span className="font-medium">{getDifficultyLabel(skillLevel)}</span>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            项目类型
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">全部类型</option>
            <option value="web">Web开发</option>
            <option value="ai">人工智能</option>
            <option value="mobile">移动应用</option>
            <option value="tool">开发工具</option>
            <option value="game">游戏开发</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            难度等级
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">全部难度</option>
            <option value="beginner">初级</option>
            <option value="intermediate">中级</option>
            <option value="advanced">高级</option>
          </select>
        </div>
      </div>

      {/* 重新生成按钮 */}
      <div className="mb-6">
        <button
          onClick={generateRecommendations}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              AI正在推荐...
            </>
          ) : (
            <>
              <Star className="w-4 h-4" />
              重新推荐
            </>
          )}
        </button>
      </div>

      {/* 项目推荐列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onProjectSelect?.(project)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{project.title}</h4>
              <div className="flex items-center gap-1">
                {project.trending && <TrendingUp className="w-4 h-4 text-red-500" title="趋势" />}
                {project.popular && <Heart className="w-4 h-4 text-pink-500" title="热门" />}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {project.description}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(project.difficulty)}`}>
                {getDifficultyLabel(project.difficulty)}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Star className="w-3 h-3" />
                {project.stars}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 rounded text-xs">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3 h-3" />
              {project.lastUpdated}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-purple-500 hover:text-purple-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3 h-3" />
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                  演示
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && !isGenerating && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>暂无符合条件的项目推荐</p>
          <p className="text-sm mt-1">尝试调整筛选条件或重新生成推荐</p>
        </div>
      )}

      {/* 使用提示 */}
      <div className="mt-6 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
        <p className="text-sm text-purple-700 dark:text-purple-400">
          💡 提示：AI推荐引擎会根据你的兴趣标签和技能水平智能推荐合适的项目。点击项目卡片可以查看详情，点击GitHub和演示链接可以访问项目。
        </p>
      </div>
    </motion.div>
  );
}
