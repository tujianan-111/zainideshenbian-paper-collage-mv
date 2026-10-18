# 《在你的身边》立体书版

35.5秒的横屏纸艺MV。秋叶唤回书中记忆：纸门、楼房、纸树和长椅从同一本书的折痕上展开，两人递叶、捧脸、对视、靠肩，最后机关折回，秋叶留下作书签。

![靠肩场景预览](out/预览.jpg)

**成片规格：1920×1080、24fps、852帧、H.264视频与AAC原唱音轨。**

## 观看

- [下载1080p完整成片](https://github.com/tujianan-111/zainideshenbian-paper-collage-mv/releases/download/v1.0.0/zainideshenbian-popup-1080p.mp4)
- [下载720p轻量预览](https://github.com/tujianan-111/zainideshenbian-paper-collage-mv/releases/download/v1.0.0/zainideshenbian-popup-720p.mp4)，仓库中也保存了[同一份预览](out/在你的身边_立体书版_预览720p.mp4)。
- [全片预览图](out/check/全片.jpg) · [每句一帧](out/check/每句一帧.jpg) · [实际成片抽帧](out/check/成片抽帧.jpg)
- [提示词](PROMPT.md) · [制作方法](制作方法.md) · [分镜](STORYBOARD.md) · [验收记录](QA.md)

完整成片放在Release附件中，源码和轻量预览保存在仓库。下载完整成片后，将它命名为 `在你的身边_立体书版.mp4` 放入 `out/`，即可通过[本地播放器](播放.html)观看。本仓库保存立体书版；本机上一版单独保留。

## 制作方法

先把每句歌词变成一件能看见的事，再用同一片秋叶串起递叶、近叶转场和书签。所有角色与道具由Canvas2D代码绘制，白纸边、纸纹和投影统一材质。用二维仿射投影表现立体纸片的铰接角度，底部明确画出粘贴纸舌、折痕和支撑三角。先绘人物与机关状态图，再做连续镜头与六段表演。Node.js通过puppeteer-core控制Chrome按时间逐帧绘制，FFmpeg合成原唱。

这是2.5D纸艺动画，没有调用AI绘画或AI视频模型。人物表演仍是风格化纸偶，手掌是简化纸片，并非写实手部。

## 源码与复现

- [PROMPT.md](PROMPT.md)：本版执行提示词。
- [制作方法.md](制作方法.md)：从截图提示词到实际成片的可复用做法。
- [STORYBOARD.md](STORYBOARD.md)：歌词事件、构图和转场。
- `src/cast.js`、`src/props.js`：人物和基础纸艺道具。
- `src/scenes/mv.js`：实体书、机关、表演、镜头和字幕盖印。
- `assets/lyrics_timing.json`：同一录音的逐字时间轴，MMS_FA人声对齐及起音复核。
- [QA.md](QA.md)、[verification.json](out/check/verification.json)：实际成片验收；[browser_check.json](out/check/browser_check.json)绑定同一成片哈希并记录播放、跳转和10个时刻的重画结果。

本机运行 `render.ps1` 可重渲染。这个便捷脚本和 `verify_delivery.py` 的默认工具路径沿用了制作电脑的目录；换电脑时应调整路径，或直接运行以下流程。

需要Node.js、Chrome/Chromium及带H.264/AAC支持的FFmpeg。FFmpeg和ffprobe需在PATH中，并将 `CHROME_PATH` 指向本机浏览器可执行文件。在仓库根目录运行：

```text
npm ci
node render.mjs --frames --workers=3
node render.mjs --encode --out=out/zainideshenbian-popup.mp4 --audio=assets/song.wav
```

渲染器与检查器都固定使用软件Canvas2D，避免GPU缓存切换造成极少像素的舍入差异。默认渲染会复用已有帧，改画面后需清理相应帧再重渲染。`studio.html` 用于画布拖动预览，带声音看MP4或本地播放器。依赖安装目录和852张逐帧缓存没有纳入Git。

## 验证与协作说明

已验证35.5秒成片完整解码、无黑场、六句56字逐字上屏、浏览器播放与跳转；10个时刻乱序重画的像素差均为0。具体结果和风格化限制见[验收记录](QA.md)。原始检查报告保留了制作电脑的本地路径，便于追溯。

用户确定选曲、视觉参考和制作方向，AI协作完成代码绘制、分镜表演与检查。这是创作和AI协作工程，没有把AI编写的代码描述为个人独立编写，也没有虚构人工听审或性能提升数据。

## 来源

- 纸艺技能与引擎：[paper-collage-mv](https://github.com/zexuanw958-svg/paper-collage-mv)，沿用上游许可。
- 原唱：[盛哲官方歌曲页面](https://www.youtube.com/watch?v=YJzf67S-mlc)。剪辑录音为网易云歌曲475479888公开音频入口，原曲53.3–88.8秒，正常速度。
- 字体：Noto Serif SC，SIL Open Font License，许可保存在字体目录。
- 原唱及词曲权利不随代码开源许可转让。
