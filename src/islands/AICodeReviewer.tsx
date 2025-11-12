import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Search, AlertCircle, CheckCircle, Info, Copy, RefreshCw } from 'lucide-react';
import type { CodeIssue } from '@/lib/types';
import { analyzeCodeMock } from '@/lib/aiUtils';

interface AICodeReviewerProps {
  onIssuesFound?: (issues: CodeIssue[]) => void;
}

export default function AICodeReviewer({ onIssuesFound }: AICodeReviewerProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'javascript' | 'typescript' | 'python' | 'react'>('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const languages = {
    javascript: { label: 'JavaScript', ext: 'js' },
    typescript: { label: 'TypeScript', ext: 'ts' },
    python: { label: 'Python', ext: 'py' },
    react: { label: 'React', ext: 'jsx' }
  };

  const analyzeCode = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      const mockIssues: CodeIssue[] = analyzeCodeMock(code, language);
      setIssues(mockIssues);
      
      if (onIssuesFound) {
        onIssuesFound(mockIssues);
      }
    } catch (error) {
      console.error('代码分析失败:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getIssueIcon = (type: CodeIssue['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'suggestion':
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: CodeIssue['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const copySuggestions = async () => {
    const suggestionsText = issues.map(issue => 
      `第${issue.line}行 (${issue.type}): ${issue.message}\n建议: ${issue.suggestion}`
    ).join('\n\n');
    
    try {
      await navigator.clipboard.writeText(suggestionsText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const clearAll = () => {
    setCode('');
    setIssues([]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 mb-6">
        <Code className="w-6 h-6 text-green-500" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI代码审查员</h3>
      </div>

      {/* 语言选择 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          选择编程语言
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(languages).map(([key, lang]) => (
            <button
              key={key}
              onClick={() => setLanguage(key as any)}
              className={`p-3 rounded-lg border text-left transition-all ${
                language === key
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="font-medium text-sm">{lang.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">.{lang.ext}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 代码输入区域 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          输入你的代码
        </label>
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`请输入你的${languages[language].label}代码...\n\n例如：\nfunction example() {\n  console.log('Hello World');\n}`}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
            rows={10}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={clearAll}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="清空代码"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 分析按钮 */}
      <div className="mb-6">
        <button
          onClick={analyzeCode}
          disabled={!code.trim() || isAnalyzing}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isAnalyzing ? (
            <>
              <Search className="w-5 h-5 animate-pulse" />
              AI正在分析代码...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              开始代码审查
            </>
          )}
        </button>
      </div>

      {/* 分析结果统计 */}
      {issues.length > 0 && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 dark:text-white">代码审查结果</h4>
            <button
              onClick={copySuggestions}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            >
              {copySuccess ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  复制建议
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {issues.filter(i => i.type === 'error').length}
              </div>
              <div className="text-xs text-red-500 dark:text-red-400">错误</div>
            </div>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {issues.filter(i => i.type === 'warning').length}
              </div>
              <div className="text-xs text-yellow-500 dark:text-yellow-400">警告</div>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {issues.filter(i => i.type === 'suggestion').length}
              </div>
              <div className="text-xs text-blue-500 dark:text-blue-400">建议</div>
            </div>
          </div>
        </div>
      )}

      {/* 详细问题列表 */}
      {issues.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">详细问题分析</h4>
          {issues.map((issue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
            >
              <div className="flex items-start gap-3">
                {getIssueIcon(issue.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                      第{issue.line}行
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      issue.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      issue.type === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {issue.type === 'error' ? '错误' : issue.type === 'warning' ? '警告' : '建议'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      issue.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {issue.severity === 'high' ? '高' : issue.severity === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{issue.message}</p>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>建议：</strong>{issue.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 使用提示 */}
      <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-400">
          💡 提示：AI代码审查员会分析你的代码质量，发现潜在问题并提供改进建议。支持JavaScript、TypeScript、Python和React代码分析。
        </p>
      </div>
    </motion.div>
  );
}
