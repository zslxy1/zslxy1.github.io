---
id: 3
title: "本地人声分离服务：Demucs 优先 + Spleeter 回退"
description: "由于我的创作需要使用人声分离来处理音频文件，因此我使用trae做了一个一个基于 FastAPI 的本地人声分离服务，优先使用 Demucs，失败时自动回退 Spleeter，支持 Web 上传与 REST 下载。"
date: "2025-11-07"
category: "音频处理"
tags: ["FastAPI","Demucs","Spleeter","FFmpeg","Python"]
image: "https://images.unsplash.com/photo-1511671782779-c97d3da53f9b?auto=format&fit=crop&w=1200&q=80"
---

# 本地人声分离服务：Demucs 优先 + Spleeter 回退

由于我的创作需要使用人声分离来处理音频文件，因此我使用trae做了一个一个基于 FastAPI 的本地人声分离服务，支持上传音频并输出人声（vocals）与伴奏（accompaniment）。默认优先使用 **Demucs（PyTorch）** 进行分离；若 Demucs 不可用或失败则自动回退到 **Spleeter**。项目位于 `Vocal_Isolation/`，适合在 Windows + Anaconda 环境下本地运行与二次开发。

---

## 一、特性概览
- Web 页面上传并分离（支持 mp3 / wav / flac / ogg / m4a）
- REST API：健康检查、上传分离、分离结果下载
- 优先 Demucs，避免 Windows 上 TensorFlow 兼容问题；必要时自动回退 Spleeter
- 所有生成文件按 session_id 分组存储，便于清理/定位

## 二、运行环境与依赖
- 系统：Windows（推荐使用 Anaconda 管理 Python 3.10 环境）
- 依赖：需安装并配置 **FFmpeg**（将 `ffmpeg/bin` 加入 PATH）

### 创建环境与安装依赖
```
conda create -n vocal_isolation python=3.10 -y
conda activate vocal_isolation
pip install -r requirements.txt
```

### 启动服务
```
uvicorn main:app --host 0.0.0.0 --port 8000
# 访问 http://127.0.0.1:8000/
```

## 三、API 设计
后端入口为 `main.py`，核心路由如下：

- `GET /health`：健康检查
- `POST /api/separate`：上传并分离（`multipart/form-data`，字段名为 `file`）
- `GET /download/{session_id}/{stem}`：下载分离结果（`stem` 为 `vocals` 或 `accompaniment`）

### 调用示例
上传并分离：
```
curl -F "file=@your_audio.mp3" http://127.0.0.1:8000/api/separate
# 响应示例：
{
  "session_id": "9f1...",
  "vocals_url": "/download/9f1.../vocals",
  "accompaniment_url": "/download/9f1.../accompaniment"
}
```

下载结果：
```
curl -O http://127.0.0.1:8000/download/9f1.../vocals
curl -O http://127.0.0.1:8000/download/9f1.../accompaniment
```

## 四、内部实现要点（摘自 `main.py`）
1. 静态资源挂载：`/static` 提供前端页面（`index.html`、`script.js`、`style.css`）
2. 文件存储：`uploads/` 保存原始上传；`outputs/{session_id}/` 保存分离结果
3. Demucs 分离流程：
   - 通过命令行调用：`python -m demucs --two-stems vocals -o <output_dir> <upload_path>`
   - 遍历输出目录，定位 `vocals.wav` 与 `no_vocals/accompaniment.wav`，重命名为标准下载路径
4. 回退到 Spleeter：
   - 使用 `AudioAdapter.default()` 读取/保存音频（兼容 Spleeter 2.4 API 变更）
   - 分离后保存到 `outputs/{session_id}/vocals.wav` 与 `accompaniment.wav`

## 五、目录结构（简要）
```
Vocal_Isolation/
├── main.py                # 后端服务入口
├── static/                # 前端页面与资源（通过 /static 提供）
│   ├── index.html
│   ├── script.js
│   └── style.css
├── uploads/               # 上传的原始音频（按 session_id 命名）
├── outputs/               # 分离后的结果（vocals.wav / accompaniment.wav）
└── requirements.txt       # 依赖清单
```

## 六、常见问题与排错
1. FFmpeg 报错或找不到：确保命令行执行 `ffmpeg -version` 成功；检查 PATH 设置
2. 首次运行耗时：模型下载/编译与加载较慢，后续同一模型更快
3. Demucs 保存阶段异常（TorchCodec 动态库问题）：
   - 尝试安装 VC++ 运行库或调整 `torch/torchaudio/torchcodec` 版本组合
   - 临时使用 Spleeter 回退方案
4. Spleeter 在 Windows 的兼容性：需 TensorFlow + FFmpeg；若配置复杂，推荐优先使用 Demucs

## 七、使用建议
- 将 `uploads/` 与 `outputs/` 作为持久化目录（不纳入版本管理）
- 远程访问时，放行防火墙端口（默认 8000），或通过内网穿透映射
- 前端页面已内置上传与状态提示，适合普通用户；开发者可直接使用 API 脚本化批处理

> 提醒：此项目仅用于技术演示，请遵守相关模型与依赖的许可证要求。
