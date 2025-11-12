import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles, Copy, RefreshCw, Hash, TrendingUp, Clock, Star } from 'lucide-react';
import { getRelevanceColor } from '@/lib/utils';
import TagStats from '@/components/ai/TagStats';
import TagList from '@/components/ai/TagList';
import type { GeneratedTag } from '@/lib/types';
import { tagCategories, audiences, contentTypes } from '@/lib/aiData';
import { generateTagsFromContent } from '@/lib/aiUtils';

interface AITagGeneratorProps {
  onTagsGenerated?: (tags: GeneratedTag[]) => void;
  contentType?: 'article' | 'project' | 'tutorial' | 'review';
  targetAudience?: 'beginner' | 'intermediate' | 'advanced' | 'all';
}

export default function AITagGenerator({ 
  onTagsGenerated, 
  contentType = 'article',
  targetAudience = 'all'
}: AITagGeneratorProps) {
  const [content, setContent] = useState('');
  const [generatedTags, setGeneratedTags] = useState<GeneratedTag[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['technical', 'trending', 'audience', 'seo']);

  

  const generateTags = async () => {
    if (!content.trim()) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const finalTags = generateTagsFromContent(content, contentType as any, targetAudience as any);
    setGeneratedTags(finalTags);
    onTagsGenerated?.(finalTags);
    setIsGenerating(false);
  };

  const copyAllTags = async () => {
    const tagsText = generatedTags.map(tag => tag.tag).join(', ');
    try {
      await navigator.clipboard.writeText(tagsText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const copyTag = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
    } catch (error) {
      console.error('复制标签失败:', error);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearContent = () => {
    setContent('');
    setGeneratedTags([]);
  };

  const filteredTags = generatedTags.filter(tag => 
    selectedCategories.includes(tag.category)
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      technical: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      trending: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      audience: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      seo: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
    };
    return colors[category as keyof typeof colors] || colors.technical;
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'border-green-300 bg-green-50 dark:bg-green-900/10';
    if (relevance >= 80) return 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10';
    if (relevance >= 70) return 'border-orange-300 bg-orange-50 dark:bg-orange-900/10';
    return 'border-gray-300 bg-gray-50 dark:bg-gray-900/10';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-6 h-6 text-pink-500" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI内容标签生成器</h3>
      </div>

      {/* 内容类型和受众选择 */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            内容类型
          </label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {Object.entries(contentTypes).map(([key, type]) => (
              <option key={key} value={key}>{type.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            目标受众
          </label>
          <select
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {Object.entries(audiences).map(([key, audience]) => (
              <option key={key} value={key}>{audience.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 标签类别筛选 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          标签类别
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(tagCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => toggleCategory(key)}
              className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                selectedCategories.includes(key)
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 内容输入区域 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          输入内容
        </label>
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={contentTypes[contentType].placeholder}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            rows={6}
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={clearContent}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="清空内容"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 生成按钮 */}
      <div className="mb-6">
        <button
          onClick={generateTags}
          disabled={!content.trim() || isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              AI正在生成标签...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              生成智能标签
            </>
          )}
        </button>
      </div>

      {/* 标签统计 */}
      {generatedTags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 dark:text-white">生成结果</h4>
            <button
              onClick={copyAllTags}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors"
            >
              {copySuccess ? (
                <>
                  <Hash className="w-3 h-3" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  复制全部
                </>
              )}
            </button>
          </div>
          <TagStats tags={filteredTags} />
        </div>
      )}

      {/* 生成的标签列表 */}
      {filteredTags.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h4 className="font-medium text-gray-900 dark:text-white">智能生成的标签</h4>
          <TagList tags={filteredTags} onCopy={copyTag} />
        </motion.div>
      )}

      {/* 使用提示 */}
      <div className="mt-6 p-3 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg">
        <p className="text-sm text-pink-700 dark:text-pink-400">
          💡 提示：AI标签生成器会根据你的内容类型、目标受众和内容关键词智能生成相关标签。标签按相关度排序，包含技术、热门、受众和SEO四个维度。
        </p>
      </div>
    </motion.div>
  );
}
