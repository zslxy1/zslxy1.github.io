---
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

```
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
```

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
```
flow {
  timeline { duration: 12s, fps: 24, resolution: { width: 1080, height: 1920 } }
  scene "one_shot" { at: 0s..12s
    shot { at: 0s..12s, camera: { move: "slow_pan" }, prompt: "清晰主体+暖色街景+电影光效", guidance: 7.0 }
  }
}
```

### B. 多场景品牌短片（30s）
```
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
```

### C. 音乐节奏对齐（BPM 100）
```
flow {
  timeline { duration: 20s, fps: 25, beats: [0,0.6,1.2,1.8, ...], audio: { src: "music.mp3", bpm: 100 } }
  scene "beat_sync" { at: 0s..20s
    shot { at: 0s..5s, camera: { move: "pan_right" }, prompt: "节奏点跟随镜头移动，轻快" }
    shot { at: 5s..10s, camera: { move: "follow" }, prompt: "速度略提升，与节拍同步" }
    shot { at: 10s..20s, camera: { move: "push_in" }, prompt: "情绪增强，结尾留字幕位" }
  }
}
```

---

## 提示词与一致性小技巧
- 结构优先：先写 Flow 的场景/镜头，再补风格与细节，避免“长文本一锅炖”。
- 一致性约束：关键主体建议开启 `subject_consistency`，必要时用参考图 `asset.ref_image`。
- 负向提示：明确排除“涂抹/过度锐化/过暗/文字不可读”等问题。
- 种子与可复现：锁定 `seed` 便于横向比较；调 `guidance` 控制风格强度。
- 外部素材：Logo/字幕建议用 overlay，不强求模型直接生成，保证清晰。

---

## 常见问题与排错（快速版）
- 画面抖动：降低相机速度或缩短镜头时长；必要时切换转场为 `cut` 减少过渡失真。
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
