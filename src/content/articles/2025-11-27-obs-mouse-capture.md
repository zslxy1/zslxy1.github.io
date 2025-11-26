---
id: 6
title: "OBS_Mouse_capture：鼠标跟随与缩放脚本（新版兼容）"
description: "兼容 OBS 29/30+ 的鼠标跟随缩放脚本，适配新接口，跨平台可用，嵌套场景稳定。"
date: "2025-11-27"
category: "视频录制"
tags: ["OBS","脚本","Lua","屏幕录制","创作流程"]
image: "https://images.unsplash.com/photo-1556157382-97e9f7a49153?auto=format&fit=crop&w=1200&q=80"
---

# OBS_Mouse_capture

该脚本基于 BlankSourceCode 的 `obs-zoom-to-mouse` 项目进行更新。原因：原脚本在当前版本的 OBS 中已不再兼容，需要适配新的接口与行为。github:https://github.com/zslxy1/OBS_Mouse_capture

本次更新的改动概述：
- 兼容 OBS 29/30 及以上版本的场景项变换接口（在 `get_info`/`set_info` 与 `get_transform`/`set_transform` 之间做运行时适配）。
- 适配 macOS 显示源 ID 变更（根据 OBS 版本在 `display_capture`/`screen_capture` 间切换），确保跨平台可用。
- 支持在嵌套场景中查找并锁定目标源，避免场景切换或多级场景时失效。
- 自动将“变换裁剪”迁移为等效的裁剪滤镜，保证缩放与跟随逻辑一致、可控。
- 根据帧间隔设置计时器更新频率，改进缩放/跟随动画的流畅度与稳定性。
- 补充调试日志与帮助信息，便于快速定位问题与确认当前设置。

仓库内容：
- `obs-zoom-to-mouse.lua`：更新后的 OBS 脚本。
- `README.md`：本说明文件。

使用方式与原项目保持一致，将脚本加载到 OBS 的脚本管理器中即可。

温馨提示：
- 脚本对场景结构有一定依赖，建议先在测试场景中验证缩放与跟随效果，再用于正式录制。
- 如出现缩放卡顿或抖动，可适当提高计时器刷新频率并检查场景滤镜链是否过多。

