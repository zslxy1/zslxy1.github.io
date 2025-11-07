const g=`---
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
`,_=`---
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

## 七、自动化部署（GitHub Actions）
部署流程位于 \`.github/workflows/deploy.yml\`：
- 触发：推送到 main 分支
- 步骤：checkout → 安装依赖 → 构建（\`npm run build\`）→ 发布到 gh-pages
- 环境变量：在构建步骤注入 \`PUBLIC_SUPABASE_URL\` 与 \`PUBLIC_SUPABASE_ANON_KEY\`，用于静态生成阶段的配置

\`\`\`
env:
  PUBLIC_SUPABASE_URL: \\\\\${{ secrets.PUBLIC_SUPABASE_URL }}
  PUBLIC_SUPABASE_ANON_KEY: \\\\\${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
\`\`\`

> 提示：请在仓库 Settings → Secrets 中配置以上两个变量；anon key 仅用于前端公共访问，敏感写入需通过 RLS 与触发器控制。

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
`,S=`---
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
`,w=Object.assign({"/src/content/articles/2025-07-20-cs16-yolov8-aimbot.md":g,"/src/content/articles/2025-11-05-astro-react-tailwind-blog.md":_,"/src/content/articles/2025-11-07-vocal-isolation.md":S});function b(n){const e="---";let t={},s=n;if(n.startsWith(e)){const c=n.indexOf(e,e.length);if(c!==-1){const i=n.slice(e.length,c).trim();s=n.slice(c+e.length).trim(),i.split(/\r?\n/).forEach(p=>{const m=/^([a-zA-Z_]+)\s*:\s*(.*)$/.exec(p.trim());if(!m)return;const r=m[1];let a=m[2].trim();if(a.startsWith("[")&&a.endsWith("]")){const u=a.slice(1,-1).split(",").map(h=>h.trim().replace(/^['"]/,"").replace(/['"]$/,"")).filter(Boolean);t[r==="tags"?"tags":r]=u}else a=a.replace(/^['"]/,"").replace(/['"]$/,""),t[r==="description"?"excerpt":r]=a})}}const o=(c,i)=>i??"",l=Number(t.id??0);return{meta:{id:Number.isFinite(l)&&l>0?l:Math.floor(Math.random()*1e9),title:o("title",t.title),excerpt:o("excerpt",t.excerpt),date:o("date",t.date),category:o("category",t.category||"未分类"),tags:Array.isArray(t.tags)?t.tags:[],imageUrl:o("imageUrl",t.image||t.imageUrl)},content:s}}const d=Object.values(w).map(n=>b(n)),y=[...d].sort((n,e)=>{const t=new Date(n.meta.date).getTime(),s=new Date(e.meta.date).getTime();return Number.isNaN(t)||Number.isNaN(s)?0:s-t}).map(n=>n.meta),f=Object.fromEntries(d.map(n=>[n.meta.id,n.content])),P=y;function v(n){return[...P].sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()).slice(0,n)}const U="/_astro/YOLO_cs2.2AI97An4.jpg",O="/_astro/web_blog.WyfuwzWs.png",C="/_astro/Vocal_Isolation.DVjCLQjV.png";export{P as a,f as c,v as g,C as v,O as w,U as y};
