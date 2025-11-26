const I=`---
id: 1
title: "CS16 目标检测与自动瞄准项目"
description: "基于 YOLOv8 的 CS16 屏幕区域检测与自动瞄准工具，支持 GPU/CPU、自定义模型与训练。"
date: "2025-07-20"
category: "计算机视觉"
tags: ["Python","YOLOv8","OpenCV","Windows"]
image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80"
---

# CS16 目标检测与自动瞄准项目 
这是一个基于 YOLOv8 模型的 CS16 游戏辅助工具，核心功能包括屏幕区域截取、目标检测（默认检测敌人）和自动瞄准，支持 GPU/CPU 自适应运行，可实时显示检测结果并置顶窗口。 
(B站：【用YOLO实现游戏的角色的检测】https://www.bilibili.com/video/BV1aBGEzpEfy?vd_source=5937c1b5efb6fa88bf399ad846a69ddf) 


## 一、项目功能 
1. **实时屏幕截取**：通过 \`mss\` 库截取指定屏幕区域（默认截取屏幕中间 1/3 区域，避免全屏显示过于杂乱）。 
2. **目标检测与筛选**：加载自定义训练的 \`cs16.pt\` 模型，仅检测目标类别（默认类别 \`0\`，对应游戏敌人），且过滤置信度低于 0.3 的低可信度结果。 
3. **自动瞄准（锁人）**：计算检测到的目标与屏幕中心的距离，自动锁定最近目标，并通过 \`win32api\` 控制鼠标移动到目标中心。 
4. **自适应运行**：自动检测设备是否支持 GPU（CUDA），优先使用 GPU 加速推理，无 GPU 时自动切换为 CPU。 
5. **窗口置顶**：检测结果窗口默认置顶显示，方便游戏时实时查看目标标注。 


## 二、环境依赖 
运行前需安装以下 Python 库，建议使用 Python 3.8+ 版本： 
\`\`\`
# 安装依赖命令 
pip install opencv-python numpy ultralytics torch mss pywin32 
\`\`\`
- **核心库说明**： 
  - \`ultralytics\`：YOLOv8 模型的核心依赖，用于加载模型和推理。 
  - \`torch\`：深度学习框架，提供 GPU/CPU 计算支持。 
  - \`mss\`：高效屏幕截取工具，比传统截图方法更流畅。 
  - \`pywin32\`（\`win32api\`/\`win32gui\`）：Windows 系统下的鼠标控制和窗口管理工具。 
  - \`opencv-python\`（\`cv2\`）：图像显示和标注处理。 


## 三、文件说明 
| 文件名/文件夹       | 作用说明                                  | 
|--------------------|-------------------------------------------| 
| \`main.py\`（示例名）| 项目主程序，包含截图、检测、自动瞄准逻辑   | 
| \`cs16.pt\`          | 自定义训练的 CS16 目标检测模型（需自行准备）| 
| \`yolo_sources/\`    | YOLOv8 预训练模型存放文件夹（示例中为 \`yolov8n.pt\`）| 
| \`data.yaml\`        | 模型训练时的数据集配置文件（训练阶段使用）| 


## 四、使用步骤 
### 1. 准备模型文件 
- 确保 \`cs16.pt\`（自定义目标检测模型）放在主程序同级目录； 
- 若需重新训练模型，需准备 \`data.yaml\` 配置文件（指定数据集路径、类别数等），并确保数据集格式符合 YOLO 要求。 

### 2. 调整基础参数（可选） 
打开主程序文件，根据自己的屏幕分辨率修改以下参数： 
\`\`\`
# 屏幕分辨率（默认 1920x1080，需与你的游戏分辨率一致） 
screen_width, screen_height = 1920, 1080 
# 截取区域（默认中间 1/3，可根据需求调整 left/top/width/height） 
WINDOW_LEFT,WINDOW_TOP,WINDOW_WIDTH,WINDOW_HEIGHT = screen_width//3,screen_height//3,screen_width//3,screen_height//3 
\`\`\`

### 3. 运行程序 
\`\`\`
# 在终端执行主程序（将 main.py 替换为你的实际文件名） 
python main.py 
\`\`\`
- 程序启动后会自动显示设备信息（GPU 型号或 CPU）； 
- 检测窗口会置顶显示，按 \`q\` 键可退出程序。 


## 五、模型训练说明（可选） 
若需重新训练 \`cs16.pt\` 模型，可使用以下代码（已包含在项目中）： 
\`\`\`
from ultralytics import YOLO 
# 加载 YOLOv8 预训练模型（n 代表 nano 版，体积小、速度快） 
model = YOLO('yolo_sources/yolov8n.pt') 
# 开始训练 
model.train( 
    data = 'data.yaml',  # 数据集配置文件路径 
    epochs = 200,        # 训练轮次（可根据需求调整，轮次越多精度可能越高） 
    imgsz = 640,         # 输入图像尺寸（YOLOv8 推荐 640x640） 
    batch = 4,           # 批次大小（根据 GPU 显存调整，显存不足可减小） 
    device = 0,          # 训练设备（0 代表第 1 块 GPU，-1 代表 CPU） 
    workers = 0          # 数据加载线程数（Windows 系统建议设为 0，避免报错） 
) 
\`\`\`
- 训练前需确保 \`data.yaml\` 配置正确，且数据集包含 \`images\`（图片）和 \`labels\`（标注文件）文件夹。 


## 六、注意事项 
1. **系统兼容性**：仅支持 Windows 系统，因为使用了 \`pywin32\` 库控制鼠标和窗口，Linux/macOS 无法运行。 
2. **游戏规则**：本工具仅用于学习和技术研究，请勿在官方竞技或禁止辅助工具的场景中使用，避免违反游戏协议。 
3. **GPU 依赖**：若需使用 GPU 加速，需提前安装对应版本的 CUDA 和 CuDNN（需与 \`torch\` 版本匹配，可参考 \`https://pytorch.org/\`  安装命令）。 
4. **错误处理**：运行中若出现报错，可查看终端输出的“有错误：XXX”信息，常见问题包括模型文件缺失、依赖库版本不兼容、屏幕分辨率不匹配等。
`,h=`---
id: 2
title: "我的个人博客项目：Astro + React + Tailwind 构建与发布"
description: "采用 Astro + React Islands + TailwindCSS 的个人博客架构；main 作为源码分支，使用 GitHub Actions（pages.yml）自动发布到 GitHub Pages。"
date: "2025-11-05"
category: "Web 开发"
tags: ["Astro","React","Tailwind","Supabase","GitHub Pages","Actions"]
image: "https://images.unsplash.com/photo-1526378722781-01b034aa3b69?auto=format&fit=crop&w=1200&q=80"
---

# 我的个人博客项目：Astro + React + Tailwind 构建与发布

本博客聚焦“内容为王 + 轻交互”，采用 **Astro** 作为静态站点框架，在需要交互的局部使用 **React Islands**（如主题切换、留言板、过渡动画），样式层由 **TailwindCSS** 与少量自定义 CSS 共同完成。另外，数据层集成了 **Supabase**（用于留言板与认证），并通过 **GitHub Actions** 自动构建与发布到 GitHub Pages。

---

## 一、项目概览
- 架构：Astro SSR/静态输出 + React Islands + TailwindCSS + Supabase
- 目标：首屏快、可读性强、主题一致、易扩展
- 内容组织：元数据与 Markdown 分离；React 组件渲染 GitHub 风格 Markdown + Prism 代码高亮
- 部署：推送到 main 即触发 CI 构建与发布（见 .github/workflows/pages.yml）

## 二、核心技术栈与选型
- Astro：仅在必要的岛组件进行客户端激活，降低 JS 体积与水合成本
- React（Islands）：主题切换、留言板、过渡动画等交互由独立岛组件实现
- TailwindCSS：快速响应式布局；自定义 CSS 负责 Markdown 深浅主题细粒度覆盖
- Markdown 渲染：marked + marked-highlight + Prism；保留 GitHub 风格但做适配
- Supabase：提供认证与数据库读写（留言板）；RLS 策略保证数据安全

## 三、目录与模块
项目关键目录结构如下：

\`\`\`
src/
  islands/            # React Islands（ThemeToggle、Guestbook、LatestArticles 等）
  layouts/BaseLayout.astro  # 全局布局 + 主题初始化（SSR 阶段设置 .dark/.light）
  lib/
    articlesData.ts   # 文章元数据（title、date、tags、封面等）
    articlesContent.ts# 文章 Markdown 文本（id -> string）
    supabase.ts       # Supabase 客户端初始化（读取环境变量）
  styles/custom.css   # Markdown 深/浅色主题的精细覆盖与基础排版
\`\`\`

## 四、主题系统（避免“闪一下”与灰度问题）
- 在 BaseLayout.astro 的同步脚本中，优先从 localStorage 读取用户主题；若无则回退到系统偏好。
- 将主题类直接设置在 \`html\`：\`.dark/.light\`，确保 SSR 与客户端一致，避免水合时闪烁。
- 自定义 \`src/styles/custom.css\` 提供更强覆盖：夜间正文与代码使用纯白（#FFFFFF），标题纯白，链接更亮蓝（#93c5fd），并适度提升行高（1.9）与字距（0.01em）。

<details>
<summary>useTheme Hook 与同步逻辑</summary>

通过 \`useTheme\` 在客户端保持主题与 \`documentElement.class\` 同步：

\`\`\`
// 摘自 src/hooks/useTheme.ts
const initialTheme = () => {
  const el = document.documentElement;
  if (el.classList.contains('dark')) return 'dark';
  if (el.classList.contains('light')) return 'light';
  const saved = localStorage.getItem('theme');
  return saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
};
\`\`\`

</details>

## 五、内容组织与渲染
- 元数据在 \`articlesData.ts\`（例如日期、封面、标签）；正文 Markdown 在 \`articlesContent.ts\`。
- 详情页使用 marked 渲染 Markdown，并套用 \`.markdown-body\` 基础排版 + 深浅主题覆盖；同时 Prism 提供代码高亮。
- 为避免“标题重复”，渲染时会移除正文中的第一个 H1（与页面标题一致的那一行）。

## 六、数据层：Supabase 留言板
数据层由 Supabase 提供，包含认证与表读写。前端通过环境变量注入连接信息。核心初始化如下：

\`\`\`
// src/lib/supabase.ts（兼容 PUBLIC_ 与 VITE_ 前缀）
import { createClient } from '@supabase/supabase-js';
export function getSupabaseClient() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
  const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon);
}
\`\`\`

留言表结构与安全策略（RLS）见 \`supabase/guestbook.sql\`：
- 表字段：\`author\`、\`content\`（<= 500 字）、\`created_at\`、\`user_id\`、\`client_id\`
- 策略：
  - 所有人可读（select）
  - 登录用户可写入自己的行（insert with check user_id=auth.uid()）
  - 匿名允许插入，但必须携带 \`client_id\`（便于限流与追踪）
- 触发器：每日次数限制（登录用户 10 次、匿名 3 次），并同步 \`inserted_at\`

前端使用（简化示例）：

\`\`\`
const supabase = getSupabaseClient();
// 拉取列表
const { data } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false });
// 插入留言（匿名需携带 client_id）
await supabase.from('guestbook').insert({ content: '你好～', author: '我', client_id: localStorage.getItem('gb_client_id') });
\`\`\`

> 注意：匿名插入依赖 client_id，前端会在首次进入页面生成并保存在 localStorage。

## 七、自动化部署（GitHub Actions / GitHub Pages）
部署流程位于 \`.github/workflows/pages.yml\`：
- 触发：推送到 main 分支
- 步骤：checkout → 安装依赖（\`npm ci\`）→ 构建（\`npm run build\`）→ 上传构建产物 → \`deploy-pages\` 发布到 GitHub Pages
- Pages 设置：在仓库 Settings → Pages 中将 Source 选择为 “GitHub Actions”

如需连接 Supabase，可在仓库 Secrets 中配置：

\`\`\`
env:
  PUBLIC_SUPABASE_URL: \\\${{ secrets.PUBLIC_SUPABASE_URL }}
  PUBLIC_SUPABASE_ANON_KEY: \\\${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
\`\`\`

> 提示：anon key 仅用于前端公共访问，敏感写入需通过 RLS 与触发器控制；main 分支作为唯一源码分支，CI 将直接从 main 构建并发布。

## 八、开发与构建
### 本地运行
\`\`\`
npm install
npm run dev
\`\`\`

### 生产构建与预览
\`\`\`
npm run build
npm run preview
\`\`\`

## 九、性能与可访问性
- 仅激活必要的 React 岛，减少客户端 JS
- 提升夜间主题对比度与文本可读性（纯白正文、标题、代码；更亮链接）
- 图片采用固定尺寸与 \`object-cover\`，避免布局抖动
- 使用更语义化标签与字号层级（h1~h6、列表、引用、表格等）

## 十、后续计划
- 目录（TOC）与滚动高亮、代码块复制按钮
- 支持文章搜索与标签筛选
- 细化 SEO 与 OG 标签，完善社交分享卡片
- 扩展留言板：支持编辑与删除、分页与加载更多

> 如果你对实现细节或功能扩展感兴趣，欢迎在文章下方或留言板留言交流！
`,b=`---
id: 3
title: "本地人声分离服务：Demucs 优先 + Spleeter 回退"
description: "由于我的创作需要使用人声分离来处理音频文件，因此我使用trae做了一个一个基于 FastAPI 的本地人声分离服务，优先使用 Demucs，失败时自动回退 Spleeter，支持 Web 上传与 REST 下载。"
date: "2025-11-07"
category: "音频处理"
tags: ["FastAPI","Demucs","Spleeter","FFmpeg","Python"]
image: "https://images.unsplash.com/photo-1511671782779-c97d3da53f9b?auto=format&fit=crop&w=1200&q=80"
---

# 本地人声分离服务：Demucs 优先 + Spleeter 回退

由于我的创作需要使用人声分离来处理音频文件，因此我使用trae做了一个一个基于 FastAPI 的本地人声分离服务，支持上传音频并输出人声（vocals）与伴奏（accompaniment）。默认优先使用 **Demucs（PyTorch）** 进行分离；若 Demucs 不可用或失败则自动回退到 **Spleeter**。项目位于 \`Vocal_Isolation/\`，适合在 Windows + Anaconda 环境下本地运行与二次开发。

---

## 一、特性概览
- Web 页面上传并分离（支持 mp3 / wav / flac / ogg / m4a）
- REST API：健康检查、上传分离、分离结果下载
- 优先 Demucs，避免 Windows 上 TensorFlow 兼容问题；必要时自动回退 Spleeter
- 所有生成文件按 session_id 分组存储，便于清理/定位

## 二、运行环境与依赖
- 系统：Windows（推荐使用 Anaconda 管理 Python 3.10 环境）
- 依赖：需安装并配置 **FFmpeg**（将 \`ffmpeg/bin\` 加入 PATH）

### 创建环境与安装依赖
\`\`\`
conda create -n vocal_isolation python=3.10 -y
conda activate vocal_isolation
pip install -r requirements.txt
\`\`\`

### 启动服务
\`\`\`
uvicorn main:app --host 0.0.0.0 --port 8000
# 访问 http://127.0.0.1:8000/
\`\`\`

## 三、API 设计
后端入口为 \`main.py\`，核心路由如下：

- \`GET /health\`：健康检查
- \`POST /api/separate\`：上传并分离（\`multipart/form-data\`，字段名为 \`file\`）
- \`GET /download/{session_id}/{stem}\`：下载分离结果（\`stem\` 为 \`vocals\` 或 \`accompaniment\`）

### 调用示例
上传并分离：
\`\`\`
curl -F "file=@your_audio.mp3" http://127.0.0.1:8000/api/separate
# 响应示例：
{
  "session_id": "9f1...",
  "vocals_url": "/download/9f1.../vocals",
  "accompaniment_url": "/download/9f1.../accompaniment"
}
\`\`\`

下载结果：
\`\`\`
curl -O http://127.0.0.1:8000/download/9f1.../vocals
curl -O http://127.0.0.1:8000/download/9f1.../accompaniment
\`\`\`

## 四、内部实现要点（摘自 \`main.py\`）
1. 静态资源挂载：\`/static\` 提供前端页面（\`index.html\`、\`script.js\`、\`style.css\`）
2. 文件存储：\`uploads/\` 保存原始上传；\`outputs/{session_id}/\` 保存分离结果
3. Demucs 分离流程：
   - 通过命令行调用：\`python -m demucs --two-stems vocals -o <output_dir> <upload_path>\`
   - 遍历输出目录，定位 \`vocals.wav\` 与 \`no_vocals/accompaniment.wav\`，重命名为标准下载路径
4. 回退到 Spleeter：
   - 使用 \`AudioAdapter.default()\` 读取/保存音频（兼容 Spleeter 2.4 API 变更）
   - 分离后保存到 \`outputs/{session_id}/vocals.wav\` 与 \`accompaniment.wav\`

## 五、目录结构（简要）
\`\`\`
Vocal_Isolation/
├── main.py                # 后端服务入口
├── static/                # 前端页面与资源（通过 /static 提供）
│   ├── index.html
│   ├── script.js
│   └── style.css
├── uploads/               # 上传的原始音频（按 session_id 命名）
├── outputs/               # 分离后的结果（vocals.wav / accompaniment.wav）
└── requirements.txt       # 依赖清单
\`\`\`

## 六、常见问题与排错
1. FFmpeg 报错或找不到：确保命令行执行 \`ffmpeg -version\` 成功；检查 PATH 设置
2. 首次运行耗时：模型下载/编译与加载较慢，后续同一模型更快
3. Demucs 保存阶段异常（TorchCodec 动态库问题）：
   - 尝试安装 VC++ 运行库或调整 \`torch/torchaudio/torchcodec\` 版本组合
   - 临时使用 Spleeter 回退方案
4. Spleeter 在 Windows 的兼容性：需 TensorFlow + FFmpeg；若配置复杂，推荐优先使用 Demucs

## 七、使用建议
- 将 \`uploads/\` 与 \`outputs/\` 作为持久化目录（不纳入版本管理）
- 远程访问时，放行防火墙端口（默认 8000），或通过内网穿透映射
- 前端页面已内置上传与状态提示，适合普通用户；开发者可直接使用 API 脚本化批处理

> 提醒：此项目仅用于技术演示，请遵守相关模型与依赖的许可证要求。
`,S=`---
id: 4
title: "Suno 音乐生成模型：简介与我自己的改编实践"
description: "Suno 是一款端到端 AI 音乐生成工具，支持歌词、风格、节奏等多维提示，适合改编与原创。这里我想主要介绍一下我自己的实践经历，我改编的是《等你下课》这首歌曲。"
date: "2025-11-08"
category: "音乐生成"
tags: ["Suno","AI Music","Prompt","Remix","版权"]
image: "https://images.unsplash.com/photo-1511671782779-c97d3da53f9b?auto=format&fit=crop&w=1200&q=80"
---

# Suno 音乐生成模型：简介与改编实践

本文面向“用 AI 快速生成或改编歌曲”的场景，介绍 **Suno** 的能力边界、常用工作流、提示词写法与合规注意点，并将“第一次改编流程”置于主要部分，便于阅读与复盘。

---

## 一、我的第一次改编流程（主内容，待补充）
> 这一段由我个人补充：我在抖音发布了一首改编的音乐，用 **Suno** 改编的 **《等你下课》** 

- 你好，我想介绍一下我第一次用 Suno 改编的 《等你下课》的经历，首先我并不是音乐专业的同学，我也没系统学习过任何音乐知识，由于我看见一个抖音的博主粽子发布的改编音乐，我也想尝试一下用 Suno 改编一下。
- 起初我是改编**汤令山**的 **《颜色》** ，让他使用 **rnb** 风格，但是我改了发现可能由于他本身风格偏向rnb这边，导致我一直改编的效果都没那么好，所以我建议一开始尝试时尽量改编和自己想改编的风格不那么相似的歌曲（我也不懂，建议哈），然后在我挑选之下最后选择 **周杰伦** 这首我比较喜欢的 《等你下课》 。
- 改编的过程异常艰辛，第一次接触音乐的改编,新手小白，我对很多东西都不懂，很多也都是尝试出来的，不过花了很长实践使用**suno studio**我尝试了一些简单的修改和suno的生成和片段replace的功能，发现效果不错，其实如果会使用suno的操作系统应该会很方便我们去改编和创作。这里我非常推荐几个视频给大家学习suno（链接放在下面了）:
- 1.一个是**suno官方教程**
- 2.一个是抖音链接**@大王不爱编曲**（同时YouTube也发布了可以去看)
- 小结：最后说了很多，感兴趣的小伙伴可以去试试使用suno去进行编曲，后面的文章的几个章节内容是AI生成，**不保真，仅作参考！**

<div style="margin-top: 12px; display: flex; gap: 10px; flex-wrap: wrap;">
  <a href="https://youtu.be/qR4BefPvSiI?si=fXWOW53fO11msTWP" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:8px 12px;border-radius:8px;background:#000;color:#fff !important;text-decoration:none;font-size:14px;">
    Suno 官方教程
  </a>
  <a href="https://v.douyin.com/XbVzUXAZChc/" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:8px 12px;border-radius:8px;background:#000;color:#fff !important;text-decoration:none;font-size:14px;">
    抖音 @大王不爱编曲
  </a>
  <a href="https://v.douyin.com/3W2htamE0Sc/" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:8px 12px;border-radius:8px;background:#000;color:#fff !important;text-decoration:none;font-size:14px;">
    等你下课（suno）
  </a>
</div>

---

## 二、Suno 是什么？
**Suno** 是一个端到端的 AI 音乐生成服务，支持从文本提示（Prompt）到完整歌曲（旋律 + 编曲 + 人声演唱）的自动化生成。它的特点是：
- 输入门槛低：用自然语言描述风格/节奏/情绪/主题即可。
- 端到端：可直接得到含人声的成品，不必手动拼接伴奏或人声合成。
- 迭代便捷：支持多次重试、重生成、微调提示词与参数。
- 适合改编：结合原曲要素（风格/结构/节奏）进行再创作，保留主题但创造新表达。

> 注意：Suno 的具体模型与接口会迭代更新，本文聚焦通用工作流与提示词实践，避免过度依赖版本细节。

---

## 三、核心能力概览
- 歌曲生成（Lyrics + Melody + Vocal）：输入主题、风格、速度、情绪，自动生成旋律与人声演唱。
- 风格控制：如 Lo-fi、EDM、Pop、Rock、古风、二次元等；可混合多风格标签。
- 结构与时长：支持设置时长、歌段结构（Verse/Chorus/Bridge）。
- 迭代重生成：保留部分要素（如歌词或风格）进行再次生成，以获得更满意的版本。
- 导出与分享：通常支持 WAV/MP3 导出与链接分享。

---

## 四、常用工作流（生成/改编）
1. 目标设定：明确用途（短视频 BGM/完整单曲/片段）、时长、氛围与风格标签。
2. 草稿生成：给出简短提示词，获得若干版本草稿，用于方向筛选。
3. 精细提示：在确认方向后，加入节奏 BPM、段落结构、乐器偏好、演唱风格等细节。
4. 迭代微调：对不满意的要素（如旋律人声/编曲密度/节奏）进行重生成或局部替换。
5. 导出与后期：导出音频后可在 DAW 做少量后期（EQ、压缩、限幅等）。

---

## 五、提示词（Prompt）写法示例
以下是中文/英文混合的实用模板，可按需替换：

\`\`\`
中文：
主题：改编自「XXXX」，氛围温暖、励志，适合作为短视频 BGM。
风格：Lo-fi + Pop，偏电子，适度加入钢琴和 Pad。
节奏/时长：BPM 92，时长 60s，结构 [Intro 10s, Verse 20s, Chorus 30s]
人声：清晰、温柔，少量和声铺垫，副歌更有力量。
歌词：中文为主，关键词「XXXX、XXXX」。

English:
Style: Lofi + Pop, warm and inspiring mood; light electronic elements.
Tempo/Length: BPM 92, 60 seconds; sections [Intro, Verse, Chorus].
Vocal: Clear and soft, with subtle backing vocals; stronger chorus.
Lyrics: Mostly Chinese with keywords "XXXX".
\`\`\`

提示词技巧：
- 先从“风格 + 氛围 + 用途 + 时长”四要素出发，再逐步补充细节。
- 使用可度量的参数（BPM、时长、结构）让生成更可控。
- 遇到不满意的地方，点名具体要素重试（例如“人声更靠前，减少鼓组密度”）。

---

## 六、版权与合规
- 原曲元素使用：避免直接使用受版权保护的旋律或歌词；改编应体现足够“新作品”特征。
- 商用与平台政策：不同平台对 AI 音乐的标注/版权声明有不同要求，发布前请确认。
- 素材与授权：若混用第三方采样/音色包，需遵循对应授权协议。

---

## 七、常见问题
- 生成不稳定：尝试缩短提示词，分步骤迭代，减少相互矛盾的要求。
- 人声过小或过浑：在提示词中明确“更靠前的人声、减少混响、适度压缩”，导出后再做后期。
- 风格不贴合：多用对比标签（例如“更接近 City Pop 而非传统 Pop”）。

---

## 结语
Suno 让音乐“从想到做”更迅速。合理使用提示词与迭代策略，可以在短时间内产出可发布的成品或高质量草稿。如果你正准备做一次改编，不妨用上面的模板先跑几个方向，然后选择最贴近你期望的版本继续深化。
`,_=`---
id: 5
title: "用 Veo 3.1 + Google Flow 轻松做 AI 视频：不费劲也能好看"
description: "这是一篇不端着的入门分享：Flow 是拍视频前的分镜小本子，Veo 3.1 是帮你把画面填满的工具。还聊聊最近刷到的“北极熊 AI 视频”，它们和传统拍摄相比有啥有趣的。"
date: "2025-11-25"
category: "视频生成"
tags: ["Veo 3.1","Google Flow","AI Video","Prompt","Storyboard"]
image: "/src/image_data/flow.png"
---

# 用 Veo 3.1 + Google Flow 轻松做 AI 视频：不费劲也能好看

这篇就不讲太多术语，主要说两件事：
- 为什么我喜欢用 **Veo 3.1** 搭 **Google Flow** 来做短片；
- **Flow** 到底是什么，怎么用几行“分镜笔记”把视频串起来。

---

## 为什么是 Veo + Flow
- **Veo 3.1**：画面质量稳、镜头比较连贯，风格也好调；用来“出漂亮画面”。
- **Flow**：像拍之前写分镜的小本子，告诉它“这里推进、那里跟拍、这个地方要切字幕”；用来“把故事讲顺”。
- 一句话：Flow 负责结构，Veo 负责颜值。先把骨架搭好，再让模型把肉补上。

---

## Flow 是啥（通俗版）
别把 Flow 想复杂了，它就是“把视频拆成几个模块”：
- **Timeline**：片子多长、帧率多少、节奏点在哪；像定闹钟那样定好节拍。
- **Scene**：段落，比如“清晨城市”“黄昏海边”。
- **Shot**：具体镜头，写明从几秒到几秒、相机怎么动（推进/跟拍/摇镜）、要拍什么主体。
- **Transition**：镜头之间怎么接（直接切、淡入淡出）。
- **Prompt**：这一段大概想要什么风格，偏暖还是偏冷，要不要电影感。

总结：Flow 管结构和节奏，Veo 管把画面填得好看。两者配合，剪出来的片子更省心。

---

## Flow 该怎么写（超简版）
随手一个 20 秒的三段结构，语气轻松点：

\`\`\`
flow {
  timeline {
    duration: 20s
    fps: 24
    resolution: { width: 1920, height: 1080 }
    beats: [0s, 5s, 12s, 20s]
  }

  scene "opening" {
    at: 0s..5s
    shot {
      at: 0s..5s
      camera: { move: "push_in", speed: "slow" }
      prompt: "清晨城市街道，阳光柔和，画面干净，有电影感"
      negative: "过度锐化、强噪点、涂抹"
      guidance: 7.5
      seed: 124578
      transition_out: { type: "dissolve", duration: 0.6s }
    }
  }

  scene "main" {
    at: 5s..12s
    shot {
      at: 5s..9s
      camera: { move: "pan_right", speed: "medium" }
      subject: "年轻人奔跑经过街角的咖啡店"
      prompt: "轻快一点，街头生活感，人物清晰，肤色自然"
      constraints: { subject_consistency: true }
    }
    shot {
      at: 9s..12s
      camera: { move: "follow", speed: "fast" }
      prompt: "跟着人物穿过光影斑驳的巷子"
      transition_in: { type: "cut" }
    }
  }

  scene "ending" {
    at: 12s..20s
    shot {
      at: 12s..20s
      camera: { move: "pull_back", speed: "slow" }
      prompt: "夕阳下城市天际线，暖色调，记得留字幕位置"
      overlay: { type: "title", text: "A Day in City", position: "bottom_center" }
      transition_in: { type: "dissolve", duration: 0.8s }
    }
  }
}
\`\`\`

要点：
- 每个镜头都要有开始和结束时间，节奏才稳。
- 相机怎么动 + 想要的风格，两句话就够了。
- 字幕/Logo这类别强求模型直接生成，后期叠个覆盖更稳。

---

## 最近刷到的“北极熊 AI 视频”，有啥有趣的
说说我最近在刷到的一类 **北极熊 AI 视频**（就把它当作一个有趣的案例）：
- **北极熊AI口音**：你需要把你要说的话变成拼音，让ai去生成
- **场景更换**：使用flow可以很好的使用这个功能建议去试试看
- **拍不到的镜头也能试**：比如超长轨道、悬空俯拍、极端环境，现实里很难，AI 里很容易先试出感觉。
- **镜头语言练习像打游戏存档**：加点推进、删掉摇镜、转场改成淡入淡出，随便试，不满意就回档。

这类视频不一定是真人拍的，但在“试镜头、试节奏、试风格”这件事上，AI 的迭代速度非常有意思。

---

## 简单上手流程（不费劲版）
1. 先定三件事：时长、分辨率、主风格（暖/冷/电影/纪实）。
2. 写个小 Flow：开头一个镜头、中间两个镜头、结尾一个镜头，镜头怎么动用一个词就行（推进/跟拍）。
3. 扔给 Veo 3.1：分辨率和指导强度随便试两三个值，挑最顺的版本。
4. 不满意就回去改：镜头内容不对就改 prompt，运动不顺就换相机动作或转场。
5. 最后导出：字幕、Logo 后期叠上，省心还清晰。

---

## 常用模板（直接拿来用）
### A. 单镜头故事板（15s 内）
\`\`\`
flow {
  timeline { duration: 12s, fps: 24, resolution: { width: 1080, height: 1920 } }
  scene "one_shot" { at: 0s..12s
    shot { at: 0s..12s, camera: { move: "slow_pan" }, prompt: "清晰主体+暖色街景+电影光效", guidance: 7.0 }
  }
}
\`\`\`

### B. 多场景品牌短片（30s）
\`\`\`
flow {
  timeline { duration: 30s, fps: 25, resolution: { width: 1920, height: 1080 }, beats: [0,8,20,30] }
  scene "city_morning" { at: 0s..8s
    shot { at: 0s..8s, camera: { move: "push_in" }, asset: { ref_image: "brand_palette.jpg" }, prompt: "清晨城市+品牌色彩" }
  }
  scene "product" { at: 8s..20s
    shot { at: 8s..14s, camera: { move: "orbit" }, prompt: "产品特写+高光质感" }
    shot { at: 14s..20s, camera: { move: "follow" }, prompt: "场景应用+用户交互" }
  }
  scene "closing" { at: 20s..30s
    shot { at: 20s..30s, camera: { move: "pull_back" }, overlay: { type: "logo", src: "brand_logo.png" }, prompt: "温暖收尾+品牌标识" }
  }
}
\`\`\`

### C. 音乐节奏对齐（BPM 100）
\`\`\`
flow {
  timeline { duration: 20s, fps: 25, beats: [0,0.6,1.2,1.8, ...], audio: { src: "music.mp3", bpm: 100 } }
  scene "beat_sync" { at: 0s..20s
    shot { at: 0s..5s, camera: { move: "pan_right" }, prompt: "节奏点跟随镜头移动，轻快" }
    shot { at: 5s..10s, camera: { move: "follow" }, prompt: "速度略提升，与节拍同步" }
    shot { at: 10s..20s, camera: { move: "push_in" }, prompt: "情绪增强，结尾留字幕位" }
  }
}
\`\`\`

---

## 提示词与一致性小技巧
- 结构优先：先写 Flow 的场景/镜头，再补风格与细节，避免“长文本一锅炖”。
- 一致性约束：关键主体建议开启 \`subject_consistency\`，必要时用参考图 \`asset.ref_image\`。
- 负向提示：明确排除“涂抹/过度锐化/过暗/文字不可读”等问题。
- 种子与可复现：锁定 \`seed\` 便于横向比较；调 \`guidance\` 控制风格强度。
- 外部素材：Logo/字幕建议用 overlay，不强求模型直接生成，保证清晰。

---

## 常见问题与排错（快速版）
- 画面抖动：降低相机速度或缩短镜头时长；必要时切换转场为 \`cut\` 减少过渡失真。
- 主体走样：提高一致性约束；在每个镜头明确主体与场景要素。
- 风格不统一：在场景级设置统一的风格关键词，镜头内少改“主题风格”。
- 文本不可读：字幕/标识用 overlay；模型生成的文字容易变形。
- 版权与合规：素材引用需授权；生成内容遵守平台政策与法律法规。

---

## 结尾
总之，Flow 负责把视频“排队”，Veo 把画面“填满”。不想折腾器材又想练镜头语言，这套组合很友好。先用上面的模板跑一版，看顺不顺，再慢慢加细节。

如果你希望在网站上直接“写 Flow → 点生成 → 看结果”，我可以帮你加一个简单的工具页，支持上传素材、编辑时间线和生成预览，不改你现有的样式。

---

## 还有哪些视频模型

- OpenAI Sora：画面质感强，长镜头和物理一致性更好，适合“看起来很真实”的短片。
- Google Veo（3.1）：风格融合能力不错，和 Flow 搭配更可控，适合“先定结构再出画面”。
- Runway Gen-3：创意风格多、上手简单，适合快速出片与短视频创作。
- Pika：偏轻量、好玩，社区风格丰富，适合做趣味短片和快速尝试。
- Luma Dream Machine：生成速度快，画面细节还不错，适合快速迭代。
- Kuaishou Kling（快手）：国内表现亮眼，擅长高动作场景与连贯镜头。
- 即梦：更贴近创作者工作流，结合模板、字幕、配乐，适合“直接发布”。
- 阿里通义系（通义万相的扩展能力）：偏向一体化工具链，强调风格统一与快速出片。

小结：
- 如果追求“质感与真实感”，优先试 Sora / Veo；
- 如果追求“快速出片与创意风格”，Gen-3 / Pika / Luma 很友好；
- 如果希望“国内平台的一条龙发布”，快手 Kling、剪映的 AI 视频功能更省心。
`,w=`---
id: 6
title: "OBS_Mouse_capture：鼠标跟随与缩放脚本（新版兼容）"
description: "兼容 OBS 29/30+ 的鼠标跟随缩放脚本，适配新接口，跨平台可用，嵌套场景稳定。"
date: "2025-11-27"
category: "视频录制"
tags: ["OBS","脚本","Lua","屏幕录制","创作流程"]
image: "https://images.unsplash.com/photo-1556157382-97e9f7a49153?auto=format&fit=crop&w=1200&q=80"
---

# OBS_Mouse_capture

该脚本基于 BlankSourceCode 的 \`obs-zoom-to-mouse\` 项目进行更新。原因：原脚本在当前版本的 OBS 中已不再兼容，需要适配新的接口与行为。github:https://github.com/zslxy1/OBS_Mouse_capture

本次更新的改动概述：
- 兼容 OBS 29/30 及以上版本的场景项变换接口（在 \`get_info\`/\`set_info\` 与 \`get_transform\`/\`set_transform\` 之间做运行时适配）。
- 适配 macOS 显示源 ID 变更（根据 OBS 版本在 \`display_capture\`/\`screen_capture\` 间切换），确保跨平台可用。
- 支持在嵌套场景中查找并锁定目标源，避免场景切换或多级场景时失效。
- 自动将“变换裁剪”迁移为等效的裁剪滤镜，保证缩放与跟随逻辑一致、可控。
- 根据帧间隔设置计时器更新频率，改进缩放/跟随动画的流畅度与稳定性。
- 补充调试日志与帮助信息，便于快速定位问题与确认当前设置。

仓库内容：
- \`obs-zoom-to-mouse.lua\`：更新后的 OBS 脚本。
- \`README.md\`：本说明文件。

使用方式与原项目保持一致，将脚本加载到 OBS 的脚本管理器中即可。

温馨提示：
- 脚本对场景结构有一定依赖，建议先在测试场景中验证缩放与跟随效果，再用于正式录制。
- 如出现缩放卡顿或抖动，可适当提高计时器刷新频率并检查场景滤镜链是否过多。

`,y=Object.assign({"/src/content/articles/2025-07-20-cs16-yolov8-aimbot.md":I,"/src/content/articles/2025-11-05-astro-react-tailwind-blog.md":h,"/src/content/articles/2025-11-07-vocal-isolation.md":b,"/src/content/articles/2025-11-08-suno-music-model.md":S,"/src/content/articles/2025-11-25-veo31-google-flow-video.md":_,"/src/content/articles/2025-11-27-obs-mouse-capture.md":w});function A(n){const e="---";let t={},s=n;if(n.startsWith(e)){const r=n.indexOf(e,e.length);if(r!==-1){const i=n.slice(e.length,r).trim();s=n.slice(r+e.length).trim(),i.split(/\r?\n/).forEach(d=>{const m=/^([a-zA-Z_]+)\s*:\s*(.*)$/.exec(d.trim());if(!m)return;const c=m[1];let o=m[2].trim();if(o.startsWith("[")&&o.endsWith("]")){const u=o.slice(1,-1).split(",").map(g=>g.trim().replace(/^['"]/,"").replace(/['"]$/,"")).filter(Boolean);t[c==="tags"?"tags":c]=u}else o=o.replace(/^['"]/,"").replace(/['"]$/,""),t[c==="description"?"excerpt":c]=o})}}const a=(r,i)=>i??"",l=Number(t.id??0);return{meta:{id:Number.isFinite(l)&&l>0?l:Math.floor(Math.random()*1e9),title:a("title",t.title),excerpt:a("excerpt",t.excerpt),date:a("date",t.date),category:a("category",t.category||"未分类"),tags:Array.isArray(t.tags)?t.tags:[],imageUrl:a("imageUrl",t.image||t.imageUrl)},content:s}}const p=Object.values(y).map(n=>A(n)),f=[...p].sort((n,e)=>{const t=new Date(n.meta.date).getTime(),s=new Date(e.meta.date).getTime();return Number.isNaN(t)||Number.isNaN(s)?0:s-t}).map(n=>n.meta),v=Object.fromEntries(p.map(n=>[n.meta.id,n.content])),P=f;function M(n){return[...P].sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()).slice(0,n)}const k="/_astro/YOLO_cs2.2AI97An4.jpg",B="/_astro/web_blog.WyfuwzWs.png",O="/_astro/Vocal_Isolation.DVjCLQjV.png",G="/_astro/Suno.BSVl-Ad-.png",U="/_astro/flow.Bzv6SBB5.png",L="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjY3NSIgdmlld0JveD0iMCAwIDEyMDAgNjc1Ij4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxMTE4MjciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMWYyOTM3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NzUiIGZpbGw9InVybCgjZykiLz4KICA8cmVjdCB4PSIyMDAiIHk9IjEyMCIgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIHJ4PSIyNCIgZmlsbD0iIzBmMTcyYSIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjYiLz4KICA8cmVjdCB4PSIyMzAiIHk9IjE1MCIgd2lkdGg9Ijc0MCIgaGVpZ2h0PSIzOTAiIHJ4PSIxNiIgZmlsbD0iIzAyMDYxNyIvPgogIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjM0NSIgcj0iMTQwIiBmaWxsPSIjMGIxMjIwIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iOCIvPgogIDxwYXRoIGQ9Ik02MDAgMjQ1YzQwIDAgNjAgMjUgNjAgNTUgMCAzMC0yMCA1MC01MCA1NSAxMCAyMCAxMCA0MC0xMCA1NS0zMCAyNS03NSAxMC04NS0yNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTNjNWZkIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cmVjdCB4PSI0NjAiIHk9IjU5MCIgd2lkdGg9IjI4MCIgaGVpZ2h0PSIxNiIgcng9IjgiIGZpbGw9IiMzMzQxNTUiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjUyMCIgZm9udC1zaXplPSI1NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2U1ZTdlYiIgZm9udC1mYW1pbHk9IlNlZ29lIFVJLCBBcmlhbCwgc2Fucy1zZXJpZiI+T0JTPC90ZXh0Pgo8L3N2Zz4K";export{P as a,v as c,U as f,M as g,L as o,G as s,O as v,B as w,k as y};
