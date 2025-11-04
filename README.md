# 个人博客项目

这是一个基于Astro+Starlight+Tailwind CSS的个人博客项目，包含个人介绍、文章系统、技能展示等功能。

## 技术栈

- **核心框架**: [Astro 5.12](https://astro.build/) - 静态优先，混合框架支持，默认零JS
- **主题**: [Starlight](https://starlight.astro.build/) - 基于Astro，i18n支持，极简设计
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 响应式设计，动画效果
- **部署**: GitHub Pages + GitHub Actions - 自动构建部署

## 项目功能

### 1. 个人介绍页
- 动态文字渐显效果
- 个人历程时间线（CSS Grid布局）
- 技能标签云（悬停放大效果）

### 2. 文章系统
- Markdown/MDX支持（代码高亮、数学公式）
- 文章分类与标签页
- 图片懒加载与lightbox效果

### 3. 交互特效
- 页面切换淡入淡出（Astro视图过渡）
- 卡片悬停阴影变化（CSS transform）
- 滚动进度条（JS监听滚动事件）

## 环境搭建

### 1. 安装Node.js
- 访问 [Node.js官网](https://nodejs.org/) 下载LTS版本（推荐20.x）
- 验证安装：打开终端输入 `node -v` 和 `npm -v`，显示版本号即成功

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发
```bash
npm run dev
```

### 4. 构建项目
```bash
npm run build
```

### 5. 预览构建结果
```bash
npm run preview
```

## 内容管理

### 文章目录结构
所有文章都存放在 `src/content/docs/articles/` 目录下，使用Markdown格式编写。

### Markdown Frontmatter规范
```markdown
---
title: 文章标题
description: 文章描述
date: 2023-11-01
category: 分类
tags: [标签1, 标签2]
image: 图片URL
readTime: 阅读时间
---
```

### 图片资源管理
所有图片资源都应放在 `public/images/` 目录下，然后通过相对路径引用。

## 主题定制

### 主题色修改
在 `astro.config.mjs` 文件中修改 `tailwind` 配置的 `colors` 部分：
```javascript
tailwind({
  config: {
    extend: {
      colors: {
        primary: '#3B82F6', // 蓝色主题
        secondary: '#8B5CF6', // 紫色辅助色
        accent: '#EC4899', // 粉色强调色
      },
    },
  },
}),
```

### 添加CSS动画
在 `src/styles/animations.css` 文件中添加自定义动画：
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
```

## GitHub Pages部署

### 前置检查
1. 确保仓库名称为 `<username>.github.io`
2. 确保仓库为公开（Settings → General → Visibility → Public）

### 自动部署流程
1. 项目已经配置了GitHub Actions工作流（`.github/workflows/deploy.yml`）
2. 当代码推送到main分支时，自动触发构建和部署
3. 部署成功后，可以通过 `https://<username>.github.io` 访问网站

### 部署失败排查
1. 检查仓库是否公开（GitHub Pages免费版仅支持公开仓库）
2. 确认`deploy.yml`中`publish_dir`是否为`./dist`（Astro默认构建目录）
3. 若提示"Permission denied"，需在仓库设置中开启Actions权限：
   Settings → Actions → General → Workflow permissions → 勾选"Read and write permissions"

## 维护指南

### 定期依赖更新
```bash
npm update
```

### 备份策略
- 使用Git分支管理不同版本
- 定期推送到GitHub远程仓库
- 重要版本可以创建Git标签

### 性能优化建议
- 图片压缩：使用工具压缩图片后再上传
- 缓存配置：在`astro.config.mjs`中配置适当的缓存策略
- 代码分割：合理组织代码，避免不必要的依赖

## License
MIT