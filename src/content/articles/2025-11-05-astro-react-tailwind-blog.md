---
id: 2
title: "我的个人博客项目：Astro + React + Tailwind 构建与发布"
description: "采用 Astro + React Islands + TailwindCSS 的个人博客架构，强调内容为王与轻交互，集成 Supabase 与 GitHub Actions。"
date: "2025-11-05"
category: "Web 开发"
tags: ["Astro","React","Tailwind","Supabase"]
image: "https://images.unsplash.com/photo-1526378722781-01b034aa3b69?auto=format&fit=crop&w=1200&q=80"
---

# 我的个人博客项目：Astro + React + Tailwind 构建与发布

本博客聚焦“内容为王 + 轻交互”，采用 **Astro** 作为静态站点框架，在需要交互的局部使用 **React Islands**（如主题切换、留言板、过渡动画），样式层由 **TailwindCSS** 与少量自定义 CSS 共同完成。另外，数据层集成了 **Supabase**（用于留言板与认证），并通过 **GitHub Actions** 自动构建与发布到 GitHub Pages。

---

## 一、项目概览
- 架构：Astro SSR/静态输出 + React Islands + TailwindCSS + Supabase
- 目标：首屏快、可读性强、主题一致、易扩展
- 内容组织：元数据与 Markdown 分离；React 组件渲染 GitHub 风格 Markdown + Prism 代码高亮
- 部署：推送到 main 即触发 CI 构建与发布（见 .github/workflows/deploy.yml）

## 二、核心技术栈与选型
- Astro：仅在必要的岛组件进行客户端激活，降低 JS 体积与水合成本
- React（Islands）：主题切换、留言板、过渡动画等交互由独立岛组件实现
- TailwindCSS：快速响应式布局；自定义 CSS 负责 Markdown 深浅主题细粒度覆盖
- Markdown 渲染：marked + marked-highlight + Prism；保留 GitHub 风格但做适配
- Supabase：提供认证与数据库读写（留言板）；RLS 策略保证数据安全

## 三、目录与模块
项目关键目录结构如下：

```
src/
  islands/            # React Islands（ThemeToggle、Guestbook、LatestArticles 等）
  layouts/BaseLayout.astro  # 全局布局 + 主题初始化（SSR 阶段设置 .dark/.light）
  lib/
    articlesData.ts   # 文章元数据（title、date、tags、封面等）
    articlesContent.ts# 文章 Markdown 文本（id -> string）
    supabase.ts       # Supabase 客户端初始化（读取环境变量）
  styles/custom.css   # Markdown 深/浅色主题的精细覆盖与基础排版
```

## 四、主题系统（避免“闪一下”与灰度问题）
- 在 BaseLayout.astro 的同步脚本中，优先从 localStorage 读取用户主题；若无则回退到系统偏好。
- 将主题类直接设置在 `html`：`.dark/.light`，确保 SSR 与客户端一致，避免水合时闪烁。
- 自定义 `src/styles/custom.css` 提供更强覆盖：夜间正文与代码使用纯白（#FFFFFF），标题纯白，链接更亮蓝（#93c5fd），并适度提升行高（1.9）与字距（0.01em）。

<details>
<summary>useTheme Hook 与同步逻辑</summary>

通过 `useTheme` 在客户端保持主题与 `documentElement.class` 同步：

```
// 摘自 src/hooks/useTheme.ts
const initialTheme = () => {
  const el = document.documentElement;
  if (el.classList.contains('dark')) return 'dark';
  if (el.classList.contains('light')) return 'light';
  const saved = localStorage.getItem('theme');
  return saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
};
```

</details>

## 五、内容组织与渲染
- 元数据在 `articlesData.ts`（例如日期、封面、标签）；正文 Markdown 在 `articlesContent.ts`。
- 详情页使用 marked 渲染 Markdown，并套用 `.markdown-body` 基础排版 + 深浅主题覆盖；同时 Prism 提供代码高亮。
- 为避免“标题重复”，渲染时会移除正文中的第一个 H1（与页面标题一致的那一行）。

## 六、数据层：Supabase 留言板
数据层由 Supabase 提供，包含认证与表读写。前端通过环境变量注入连接信息。核心初始化如下：

```
// src/lib/supabase.ts（兼容 PUBLIC_ 与 VITE_ 前缀）
import { createClient } from '@supabase/supabase-js';
export function getSupabaseClient() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
  const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon);
}
```

留言表结构与安全策略（RLS）见 `supabase/guestbook.sql`：
- 表字段：`author`、`content`（<= 500 字）、`created_at`、`user_id`、`client_id`
- 策略：
  - 所有人可读（select）
  - 登录用户可写入自己的行（insert with check user_id=auth.uid()）
  - 匿名允许插入，但必须携带 `client_id`（便于限流与追踪）
- 触发器：每日次数限制（登录用户 10 次、匿名 3 次），并同步 `inserted_at`

前端使用（简化示例）：

```
const supabase = getSupabaseClient();
// 拉取列表
const { data } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false });
// 插入留言（匿名需携带 client_id）
await supabase.from('guestbook').insert({ content: '你好～', author: '我', client_id: localStorage.getItem('gb_client_id') });
```

> 注意：匿名插入依赖 client_id，前端会在首次进入页面生成并保存在 localStorage。

## 七、自动化部署（GitHub Actions）
部署流程位于 `.github/workflows/deploy.yml`：
- 触发：推送到 main 分支
- 步骤：checkout → 安装依赖 → 构建（`npm run build`）→ 发布到 gh-pages
- 环境变量：在构建步骤注入 `PUBLIC_SUPABASE_URL` 与 `PUBLIC_SUPABASE_ANON_KEY`，用于静态生成阶段的配置

```
env:
  PUBLIC_SUPABASE_URL: \\${{ secrets.PUBLIC_SUPABASE_URL }}
  PUBLIC_SUPABASE_ANON_KEY: \\${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
```

> 提示：请在仓库 Settings → Secrets 中配置以上两个变量；anon key 仅用于前端公共访问，敏感写入需通过 RLS 与触发器控制。

## 八、开发与构建
### 本地运行
```
npm install
npm run dev
```

### 生产构建与预览
```
npm run build
npm run preview
```

## 九、性能与可访问性
- 仅激活必要的 React 岛，减少客户端 JS
- 提升夜间主题对比度与文本可读性（纯白正文、标题、代码；更亮链接）
- 图片采用固定尺寸与 `object-cover`，避免布局抖动
- 使用更语义化标签与字号层级（h1~h6、列表、引用、表格等）

## 十、后续计划
- 目录（TOC）与滚动高亮、代码块复制按钮
- 支持文章搜索与标签筛选
- 细化 SEO 与 OG 标签，完善社交分享卡片
- 扩展留言板：支持编辑与删除、分页与加载更多

> 如果你对实现细节或功能扩展感兴趣，欢迎在文章下方或留言板留言交流！
