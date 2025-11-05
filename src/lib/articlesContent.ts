// 用户文章的Markdown内容映射（id -> markdown字符串）
export const articlesContent: Record<number, string> = {
  1: `# CS16 目标检测与自动瞄准项目 
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
 \`\`\`bash 
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
 \`\`\`python 
 # 屏幕分辨率（默认 1920x1080，需与你的游戏分辨率一致） 
 screen_width, screen_height = 1920, 1080 
 # 截取区域（默认中间 1/3，可根据需求调整 left/top/width/height） 
 WINDOW_LEFT,WINDOW_TOP,WINDOW_WIDTH,WINDOW_HEIGHT = screen_width//3,screen_height//3,screen_width//3,screen_height//3 
 \`\`\` 
 
 ### 3. 运行程序 
 \`\`\`bash 
 # 在终端执行主程序（将 main.py 替换为你的实际文件名） 
 python main.py 
 \`\`\` 
 - 程序启动后会自动显示设备信息（GPU 型号或 CPU）； 
 - 检测窗口会置顶显示，按 \`q\` 键可退出程序。 
 
 
 ## 五、模型训练说明（可选） 
 若需重新训练 \`cs16.pt\` 模型，可使用以下代码（已包含在项目中）： 
 \`\`\`python 
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
 4. **错误处理**：运行中若出现报错，可查看终端输出的“有错误：XXX”信息，常见问题包括模型文件缺失、依赖库版本不兼容、屏幕分辨率不匹配等。`
  ,
  2: `# 我的个人博客项目：Astro + React + Tailwind 构建与发布

本项目是一个以内容为中心、加载快速的个人博客，采用 **Astro** 作为站点框架，
在需要交互的部分使用 **React Islands**（如主题切换、动画、留言板）来提升体验，
同时使用 **TailwindCSS** 保持一致的设计系统与响应式布局。

## 一、项目亮点
- **超快首屏**：Astro 的服务端渲染 + 仅在必要时客户端激活（Islands）
- **主题一致性**：在 SSR 阶段就确定主题，避免水合时“闪一下”或样式不匹配
- **内容即页面**：文章数据与 Markdown 内容分离，便于维护与扩展
- **开发体验**：Vite 构建，热更新迅速；Tailwind 原子类高效布局

## 二、技术栈
- 框架：Astro
- 交互：React（islands 模式）
- 样式：TailwindCSS + 自定义 CSS（支持深浅主题覆盖）
- Markdown：marked + marked-highlight + Prism 高亮 + GitHub 风格样式

## 三、页面结构
- 首页（Home）：最近文章预览、社交链接、联系我
- 文章列表（Articles）：按发布日期排序展示文章卡片
- 文章详情（ArticleDetail）：封面图 + 标题/日期 + Markdown 正文（支持代码、表格、引用等）
- 关于（About）：项目介绍与技术栈、作品卡片
- 留言板（Guestbook）：基于 Supabase 的简单留言功能（可选）

## 四、主题系统
在 \`src/layouts/BaseLayout.astro\` 中提前应用主题：
- 优先读取 \`localStorage\` 中的主题设置
- 若无本地设置，则根据系统偏好（prefers-color-scheme）判断
- 通过在 \`html\` 上设置 \`.dark/.light\` class，避免 SSR 与客户端切换造成水合不匹配

## 五、文章与内容
文章的元信息（标题/分类/标签/封面等）存放在 \`src/lib/articlesData.ts\`；
正文 Markdown 存放在 \`src/lib/articlesContent.ts\`，按 id 映射。
组件在渲染时会把 Markdown 转为 HTML，并套用 GitHub 风格与代码高亮。

## 六、开发与构建
### 本地运行
\`\`\`bash
npm install
npm run dev
\`\`\`

### 生产构建
\`\`\`bash
npm run build
\`\`\`

## 七、后续计划
- 添加代码块复制按钮与目录滚动高亮
- 支持文章搜索与标签筛选
- 引入部署脚本，一键部署到静态托管平台（如 GitHub Pages / Vercel）

> 如果你对实现细节或功能扩展感兴趣，欢迎在文章下方或留言板留言交流！`
};
