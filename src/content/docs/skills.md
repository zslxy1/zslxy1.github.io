---
title: 技能标签
description: 我的技术技能和专长
---

# 我的技能

这里展示了我掌握的技术技能和专长，包括前端开发、工具使用和其他相关技能。

## 技能标签云

<div className="tag-cloud my-12">
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">React</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">TypeScript</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">JavaScript</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">HTML5</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">CSS3</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Tailwind CSS</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Next.js</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Node.js</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Git</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Webpack</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Vite</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">ESLint</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Prettier</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Jest</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Cypress</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">RESTful APIs</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">GraphQL</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">Docker</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">CI/CD</a>
  </motion.span>
  <motion.span 
    className="skill-tag"
    whileHover={{ scale: 1.1 }}
  >
    <a href="#">UI/UX设计基础</a>
  </motion.span>
</div>

## 技能分类

### 前端技术

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  {[
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'JavaScript', level: 92 },
    { name: 'HTML5/CSS3', level: 95 },
    { name: 'Tailwind CSS', level: 88 },
    { name: 'Next.js', level: 80 }
  ].map((skill, index) => (
    <motion.div 
      key={skill.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div 
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  ))}
</div>

### 工具与流程

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  {[
    { name: 'Git', level: 80 },
    { name: 'Webpack', level: 75 },
    { name: 'Vite', level: 85 },
    { name: 'ESLint/Prettier', level: 90 },
    { name: 'Jest/Cypress', level: 70 },
    { name: 'CI/CD', level: 75 }
  ].map((skill, index) => (
    <motion.div 
      key={skill.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div 
          className="bg-purple-500 h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  ))}
</div>

### 其他技能

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  {[
    { name: 'Node.js', level: 75 },
    { name: 'RESTful APIs', level: 85 },
    { name: 'GraphQL', level: 65 },
    { name: 'Docker', level: 60 },
    { name: 'UI/UX设计', level: 70 },
    { name: '性能优化', level: 80 }
  ].map((skill, index) => (
    <motion.div 
      key={skill.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div 
          className="bg-pink-500 h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  ))}
</div>

<div className="mt-12 text-center">
  <motion.a
    href="/articles"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all"
  >
    查看我的文章
  </motion.a>
</div>