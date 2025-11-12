# GitHub Pages 部署指南

## 部署步骤

### 1. 创建GitHub仓库
1. 登录GitHub
2. 创建新仓库，命名为 `ai-features-demo`
3. 不要初始化README，保持空仓库

### 2. 推送代码到GitHub
```bash
# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/ai-features-demo.git

# 推送代码
git push -u origin main
```

### 3. 配置GitHub Pages
1. 进入仓库的 Settings > Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "main" 分支和 "/" 根目录
4. 点击 Save

### 4. 更新配置文件
修改 `astro.config.mjs`：
```javascript
site: 'https://your-username.github.io', // 替换为你的GitHub用户名
base: '/ai-features-demo', // 替换为你的仓库名
```

### 5. 重新构建和推送
```bash
npm run build
git add .
git commit -m "Update config for GitHub Pages"
git push
```

### 6. 访问网站
部署完成后，访问：`https://your-username.github.io/ai-features-demo`

## 功能特点
- ✨ 6个AI功能演示
- 🔨 开发中提醒（演示版本）
- 📱 响应式设计
- 🌙 深色模式支持
- ⚡ 零成本运行（模拟AI）

## 注意事项
- 所有AI功能都是模拟的，不涉及真实的API调用
- 零成本运行，无需担心费用问题
- 适合作为演示和原型展示