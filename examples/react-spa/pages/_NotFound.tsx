import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

const NotFound: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      {/* 导航栏 */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-opacity-80 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white"
            >
              <i className="fa-solid fa-code"></i>
            </motion.div>
            <span className="text-xl font-bold">个人博客</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-blue-500 transition-colors">首页</Link>
            <Link to="/articles" className="font-medium hover:text-blue-500 transition-colors">文章</Link>
            <Link to="/about" className="font-medium hover:text-blue-500 transition-colors">关于</Link>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <i className="fa-solid fa-sun text-yellow-400"></i>
              ) : (
                <i className="fa-solid fa-moon text-gray-600"></i>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* 404页面内容 */}
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          <div className="mb-8 relative">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-40 h-40 mx-auto rounded-full border-8 border-blue-500 border-t-transparent"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-blue-500"
            >
              404
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            页面未找到
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-300 mb-8"
          >
            抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或者返回首页继续浏览。
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all"
            >
              <i className="fa-solid fa-home mr-2"></i>
              返回首页
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* 页脚 */}
      <footer className={`py-12 border-t ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
                  <i className="fa-solid fa-code"></i>
                </div>
                <span className="text-lg font-bold">个人博客</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">分享前端开发的知识和经验</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                © {new Date().getFullYear()} 个人博客. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">隐私政策</Link>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">使用条款</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;