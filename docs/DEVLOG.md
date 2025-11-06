# 项目开发日志（DEVLOG）

最后更新：2025-11-06

本日志用于记录项目在本地与远程（GitHub Pages）上的迭代内容、关键决策、操作记录和待办事项，便于后续继续开发或切换项目后快速恢复上下文。

## 概要

- 项目：Astro 站点（仓库：zslxy1/zslxy1.github.io）
- 目标：优化结构、清理依赖、完善导航与动画、保证部署畅通

## 当前状态

- 导航左上角 Logo 已替换为 `src/image_data/head.png`
- Logo 默认旋转，点击可暂停/恢复；动画类：`logo-spin` / `logo-paused`，定义在 `src/styles/animations.css`
- `BaseLayout.astro` 中使用 `headImg.src` 作为图片路径，避免 `[object Object] 404` 问题
- 远程分支 `main` 已推送成功；GitHub Actions 自动构建部署到 Pages
- 本地开发服务器正常运行，可在 `http://localhost:4323/` 预览

## 迭代时间线

1. 代码结构优化与提交
   - 统一页面导入，归档未使用组件到 `examples/unused`
   - 将部分 React SPA 示例迁移至 `examples/react-spa`
   - 在 `src/features` 下新增多个 `index.ts` 以统一导出
   - 移除未使用依赖（如 `@astrojs/starlight`，若未用）
   - 提交完成（28 文件修改，74 处插入，1255 处删除）

2. 首次推送失败与解决
   - 两次 `git push origin main` 因网络连接被重置失败
   - 提供备选方案：重试、改用 SSH、配置/关闭代理、用户手动推送
   - 后续推送成功（见下方 Git 操作记录）

3. 旋转动画与交互
   - 检查 `src/styles/animations.css`、`src/styles/custom.css`、`src/index.css`，未发现通用旋转动画
   - 新增动画：`@keyframes spin`，类：`logo-spin`（旋转）、`logo-paused`（暂停）
   - 修改 `src/layouts/BaseLayout.astro`：移除内联旋转样式，改用类控制；添加点击切换播放/暂停脚本

4. Logo 资源替换与修复
   - 将导航左上角图标替换为 `src/image_data/head.png`
   - 修复路径使用：从直接传对象改为 `headImg.src`，解决 `/[object Object] 404`
   - 交互默认从暂停改为默认旋转，可点击暂停/恢复

5. 提交与部署
   - 提交包含：
     - feat(ui): Logo 替换为 `head.png`，默认旋转，点击暂停/恢复
     - chore(css): 增加 `logo-spin` 与 `logo-paused` 类，实现可控旋转
   - 推送到 `origin main` 成功；触发 GitHub Actions 和 Pages 部署

## 技术改动清单（文件级）

- `src/styles/animations.css`
  - 新增 `@keyframes spin`
  - 新增类：`.logo-spin`、`.logo-paused`（通过 `animation-play-state` 控制播放/暂停）

- `src/layouts/BaseLayout.astro`
  - 使用 `head.png` 作为导航 Logo
  - 切换为类控制旋转（移除内联样式）；增加点击切换播放/暂停逻辑
  - 修复资源路径为 `headImg.src`

- 结构与依赖（早期一次提交）
  - 迁移示例到 `examples/react-spa`
  - 归档未用组件到 `examples/unused`
  - `src/features` 目录下补充导出 `index.ts`
  - 清理未使用依赖（如未使用的 `@astrojs/starlight`）

## Git 操作与部署

- 远程：`origin https://github.com/zslxy1/zslxy1.github.io.git`
- 当前分支：`main`
- 分支状态：曾领先 `origin/main` 两个提交，后续已推送同步
- 推送历史：
  - 两次网络错误（连接被重置）导致推送失败
  - 后续推送成功，Actions 自动构建并发布到 Pages
- 线上地址（预计）：`https://zslxy1.github.io/`
- 本地预览：`http://localhost:4323/`

## 待办事项（Open TODOs）

1. 继续梳理依赖并移除未使用依赖（如确认未使用的 `@astrojs/starlight` 等）
2. Logo 动画细节：
   - 可调节旋转速度、仅悬停时旋转、或移除蓝色描边（ring）
3. 文档维护：将后续迭代补充进本 DEVLOG，并在每次提交后更新“时间线”与“技术改动清单”
4. 项目 Roadmap：在 GitHub 开 Issue 记录后续计划与关键决策

## 如何更新本日志

每次功能或结构调整后：
- 在“迭代时间线”增加一条记录，备注变更内容与涉及文件
- 在“技术改动清单”列出关键文件和变化点
- 在“待办事项”更新下一步计划或新增需求

如果切换到新的项目目录：
- 在新项目同样创建 `docs/DEVLOG.md`，复制“模板结构”并记录新项目的迭代

—— 以上记录旨在帮助你和协作者在回到项目时迅速恢复上下文。

