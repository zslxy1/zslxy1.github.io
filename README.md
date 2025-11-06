# 个人博客项目(zslxy1.github.io)

简要说明：这是基于 Astro + React Islands 架构的个人网站，已接入 Supabase 作为数据层，支持在 GitHub Pages 自动部署。

主要功能（当前已上线）
- 页面：首页、关于、技能、历程、文章列表、留言板
- 留言板：
  - 显示“今天还剩 X/Y 次”
  - 提示每日重置时间（按本地时区，每天 00:00）
  - 提交成功后自动刷新剩余次数，并弹出提示
  - 常见错误中文本地化（权限不足、重复提交等）

技术栈
- Astro 4 + React Islands
- Tailwind CSS（样式）
- Framer Motion（动效）
- Sonner（全局消息提示）
- Supabase（数据库、认证）

在线地址
- 主页：https://zslxy1.github.io/
- 留言板：https://zslxy1.github.io/guestbook

本地开发
1. 安装依赖：
   - 推荐使用 npm（已提供 package-lock.json 用于锁定依赖版本）
   - 运行：`npm install`
2. 配置环境变量：在项目根目录创建 `.env` 文件，内容包含以下两项（来自你的 Supabase 项目）：
   - `PUBLIC_SUPABASE_URL=<你的 Supabase 项目 URL>`
   - `PUBLIC_SUPABASE_ANON_KEY=<你的 Supabase anon key>`
3. 启动开发：`npm run dev`，默认地址 `http://localhost:4321/`

生产构建
- `npm run build`，输出在 `dist/`

GitHub Pages 自动部署
1. 仓库 Secrets：在仓库 Settings > Secrets and variables > Actions 添加：
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
2. 工作流：`.github/workflows/deploy.yml` 已配置以下内容：
   - Node 20
   - `npm install` + `npm run build`
   - 注入 Supabase 环境变量
   - 使用 `peaceiris/actions-gh-pages@v4` 发布 `dist` 到 `gh-pages` 分支
3. 赋权：在 Settings > Actions > General 将 Workflow permissions 设置为 “Read and write permissions”；同时工作流已声明 `permissions: contents: write`。
4. Pages：Settings > Pages > Build and deployment 选择 “Deploy from a branch”，分支 `gh-pages`，目录 `/`。

Supabase 说明
- 环境变量：只在前端使用 anon key；服务端管理员密钥不要放到客户端或仓库里。
- 一键 SQL（可选，后续执行）：`supabase/guestbook.sql` 包含建表、RLS 策略、触发器与索引，用于将“登录 10 次 / 匿名 3 次”的每日限流与安全策略下沉到数据库侧。可在 Supabase 控制台 > SQL，将脚本粘贴执行。
- GitHub OAuth（可选，后续启用）：
  1) 在 GitHub 创建 OAuth App（回调地址为 `https://<project-ref>.supabase.co/auth/v1/callback`）
  2) 在 Supabase > Authentication > Providers 启用 GitHub，填入 Client ID/Secret
  3) Site URL 建议设置为 `https://zslxy1.github.io`，并根据需要添加额外重定向 URL（如 `https://zslxy1.github.io/guestbook`）

目录结构（简略）
- `.github/workflows/deploy.yml`：自动部署工作流
- `src/pages/*.astro`：页面入口
- `src/islands/*`：React 交互组件（Islands）
- `src/lib/supabase.ts`：Supabase 客户端初始化
- `supabase/guestbook.sql`：数据库初始化脚本（可选）

注意事项与常见问题
- 请勿提交本地密钥：`.gitignore` 已忽略 `.env`，不要把私密信息写入仓库。
- 大文件推送失败（GH001）：本仓库已忽略 `.backup/` 与 `npm-cache/`；若曾被跟踪，执行 `git rm -r --cached .backup npm-cache` 后再提交。
- 部署 403：若 Actions 推送到 `gh-pages` 报 403，确保：
  - 工作流包含 `permissions: contents: write`
  - 仓库 Settings > Actions 的 Workflow permissions 设为 “Read and write permissions”
  - 若对 `gh-pages` 开了保护分支，需调整规则以允许机器人推送
- 依赖管理：CI 使用 `npm install`，避免升级到不兼容的 Vite 版本导致构建失败。

License
- MIT（如需更改请自行替换）

变更记录（今天）
- 修复 GitHub Pages 构建与部署：注入 Supabase 环境变量、添加写入权限、处理 gh-pages 推送 403。
- 清理并重推仓库历史：移除大文件（`.backup`、`npm-cache`），使用孤儿分支创建干净的 `main`。
- 留言板 UI 增强：显示每日重置时间（本地时区）、提交成功自动刷新并提示、错误中文本地化。

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

### 模块说明（features/）
- `src/features/home`：首页 islands 聚合导出（如 HomeIsland、LatestArticlesIsland）
- `src/features/articles`：文章列表 islands 与数据导出（ArticlesIsland、articlesData）
- `src/features/article-detail`：文章详情 islands 与内容导出（ArticleDetailIsland、articlesContent）
- `src/features/about`：关于页 islands（AboutIsland、SkillsIsland）
- `src/features/guestbook`：留言板 islands（GuestbookIsland、GuestbookHeaderIsland）
- `src/features/contact`：联系页 islands（ContactIsland、ContactHeaderIsland）
- `src/features/common`：通用组件（ThemeToggle、ToasterHost、SocialLinksRow）

说明：页面层优先从 `src/features/*` 导入命名导出，统一管理模块边界与依赖。

### 示例说明（examples/）
- `examples/react-spa/`：历史 React SPA 示例入口（index.html、main.tsx、App.tsx 及 pages）。已与 Astro 主站隔离，避免影响预览与构建。
- `examples/unused/`：暂未使用的组件归档（如 PageTransition、Empty），保留以便后续参考或复用。

## License
MIT
