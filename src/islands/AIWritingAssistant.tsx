import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';

interface AIWritingAssistantProps {
  onContentGenerated?: (content: string) => void;
  existingContent?: string;
}

export default function AIWritingAssistant({ onContentGenerated, existingContent }: AIWritingAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [writingStyle, setWritingStyle] = useState<'technical' | 'casual' | 'professional' | 'creative'>('technical');

  const writingStyles = {
    technical: { label: '技术型', desc: '专业、详细的技术文档风格' },
    casual: { label: '轻松型', desc: '通俗易懂、轻松活泼的风格' },
    professional: { label: '专业型', desc: '正式、商务的专业风格' },
    creative: { label: '创意型', desc: '富有创意和想象力的风格' }
  };

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // 模拟AI生成内容 - 实际使用时替换为真实的AI API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const styles = {
        technical: `## ${prompt}\n\n### 技术概述\n\n在这篇文章中，我将深入探讨${prompt}的技术细节。这个话题在现代Web开发中扮演着重要角色，值得我们仔细研究。\n\n### 核心概念\n\n首先，让我们理解${prompt}的基本原理。这项技术主要涉及以下几个方面：\n\n1. **基础架构** - 理解底层实现机制\n2. **核心算法** - 掌握关键的处理逻辑\n3. **性能优化** - 学习如何提升效率\n\n### 实际应用\n\n在实际项目中，${prompt}可以帮助我们解决很多复杂的问题。通过合理的使用，我们能够：\n\n- 提高开发效率\n- 优化用户体验\n- 增强系统稳定性\n\n### 总结\n\n${prompt}是一个非常有价值的技术领域，值得每个开发者深入学习和实践。`,
        
        casual: `## 聊聊${prompt}\n\n嘿，朋友们！今天想和大家聊聊${prompt}这个话题。\n\n说实话，刚开始接触这个的时候，我也是一头雾水。但是经过一段时间的摸索，发现其实还挺有意思的。\n\n### 我的学习经历\n\n记得第一次遇到${prompt}的时候，我就在想："这到底是个啥？" 后来慢慢发现，原来生活中很多地方都能用到。\n\n### 一些小技巧\n\n在这里分享几个我觉得特别有用的小技巧：\n\n- 先从简单的开始，别一上来就想搞个大新闻\n- 多动手实践，理论结合实际\n- 遇到问题别怕，查查资料问问人\n\n### 一点感悟\n\n学了这个之后，我发现看问题的角度都不一样了。希望我的分享能给你们带来一些启发！`,
        
        professional: `## ${prompt}：专业视角下的深度分析\n\n尊敬的读者，\n\n本文旨在从专业角度全面分析${prompt}在当前行业中的应用价值和发展前景。\n\n### 行业背景\n\n随着技术的不断发展，${prompt}已经成为行业内不可忽视的重要趋势。各大企业都在积极布局相关技术，以期在激烈的市场竞争中占据优势地位。\n\n### 技术优势分析\n\n通过对市场的深入调研，我们发现${prompt}具有以下几个显著优势：\n\n**1. 效率提升**\n能够显著提高工作效率，降低人力成本。\n\n**2. 质量保证**\n通过标准化的流程，确保输出质量的稳定性。\n\n**3. 扩展性强**\n具备良好的可扩展性，能够适应不同规模的需求。\n\n### 实施建议\n\n对于有意向引入${prompt}的企业，我们建议：\n\n- 制定详细的实施计划\n- 进行充分的市场调研\n- 建立完善的风险控制机制\n\n### 结语\n\n${prompt}代表了行业发展的新方向，及早布局将有助于企业在未来的竞争中赢得先机。`,
        
        creative: `## ${prompt}：当想象力遇见可能性\n\n在数字世界的深处，有一个神秘的概念叫做${prompt}。它不像流星那样耀眼，也不像诗歌那样浪漫，但它有着自己独特的魔力。\n\n### 梦境般的开始\n\n想象一下，如果${prompt}是一扇门，门后会是怎样的世界？也许是充满像素的森林，也许是数据流汇成的海洋，又或者是由算法构建的天空之城。\n\n### 魔法般的转化\n\n${prompt}就像现代炼金术，能够将平凡的想法转化为令人惊叹的现实：\n\n- 一行行代码，如同古老的咒语\n- 一个个函数，仿佛神秘的符文\n- 一次次运行，见证奇迹的诞生\n\n### 无限的可能\n\n在这个由逻辑和创意交织的世界里，${prompt}给了我们一双翅膀，让我们能够在技术的海洋中自由翱翔，探索那些从未有人到达过的领域。\n\n### 星尘般的思考\n\n也许有一天，当我们回望今天，会发现${prompt}不仅仅是一个技术概念，更是我们这个时代精神的写照——永远好奇，永远探索，永远向着未知的远方前进。`
      };
      
      const content = styles[writingStyle];
      setGeneratedContent(content);
      
      if (onContentGenerated) {
        onContentGenerated(content);
      }
    } catch (error) {
      console.error('生成内容失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const clearContent = () => {
    setPrompt('');
    setGeneratedContent('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI文章写作助手</h3>
        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full border border-yellow-300 dark:border-yellow-700">
          演示版
        </span>
      </div>

      {/* 写作风格选择 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          选择写作风格
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(writingStyles).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setWritingStyle(key as any)}
              className={`p-3 rounded-lg border text-left transition-all ${
                writingStyle === key
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="font-medium text-sm">{style.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{style.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          输入写作主题或关键词
        </label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：React Hooks最佳实践、前端性能优化、AI在Web开发中的应用..."
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            rows={3}
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
          onClick={generateContent}
          disabled={!prompt.trim() || isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              AI正在生成内容...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              生成文章内容
            </>
          )}
        </button>
      </div>

      {/* 生成结果 */}
      {generatedContent && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
        >
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">生成的内容</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              {copySuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  复制
                </>
              )}
            </button>
          </div>
          <div className="p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed max-h-96 overflow-y-auto">
              {generatedContent}
            </pre>
          </div>
        </motion.div>
      )}

      {/* 使用提示 */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-400">
          💡 提示：输入具体的主题或关键词，AI会为你生成相应风格的文章内容。你可以根据需要进一步编辑和完善生成的内容。
        </p>
      </div>
    </motion.div>
  );
}