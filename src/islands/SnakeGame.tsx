import { useEffect, useRef, useState } from 'react';

type Point = { x: number; y: number };

// 轻量贪吃蛇：自动运行、撞墙或自撞后重开
export default function SnakeGame({ titleHidden = false, backgroundMode = false, className = '' }: { titleHidden?: boolean; backgroundMode?: boolean; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);
  const [sceneKey, setSceneKey] = useState(0); // 触发场景重建用（窗口尺寸变化时）
  const gridSize = 20; // 单元格大小（保持方格比例不变）
  const baseCols = 24; // 基础网格宽度（用于计算保持原始比例）
  const baseRows = 14; // 基础网格高度（用于计算保持原始比例）
  const speedMs = backgroundMode ? 80 : 90; // 移动速度更快

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 根据背景模式动态计算场景大小：不使用 CSS 缩放，改为增加场景网格数量，保持原始比例
    const parent = canvas.parentElement as HTMLElement | null;
    const containerWidth = parent?.clientWidth ?? window.innerWidth;
    const containerHeight = parent?.clientHeight ?? window.innerHeight;

    let cols: number;
    let rows: number;
    if (backgroundMode) {
      // 改为“贴合容器像素网格”：按固定 cell 大小推导可容纳的列与行，尽量贴合容器且不超出。
      cols = Math.max(baseCols, Math.floor(containerWidth / gridSize));
      rows = Math.max(baseRows, Math.floor(containerHeight / gridSize));
    } else {
      cols = baseCols;
      rows = baseRows;
    }

    let snake: Point[] = [
      { x: 5, y: 7 },
      { x: 4, y: 7 },
      { x: 3, y: 7 },
    ];
    let dir: Point = { x: 1, y: 0 };
    let food: Point = { x: 12, y: 7 };
    let last = 0;
    let rafId = 0;
    let ateCount = 0; // 已吃食物计数
    let targetEats = 20 + Math.floor(Math.random() * 5); // 最少20个后自杀（20~24）
    let suicideMode = false; // 进入自杀模式（撞墙）
    // 障碍物：随机生成若干不可穿越的格子
    const obstacles: Point[] = [];
    const obstacleCount = Math.max(16, Math.floor(cols * rows * 0.06));
    const occupied = (p: Point) => snake.some((s) => s.x === p.x && s.y === p.y) || (food.x === p.x && food.y === p.y);
    const addObstacle = (p: Point) => {
      // 避免重复和越界
      if (p.x < 0 || p.y < 0 || p.x >= cols || p.y >= rows) return;
      if (obstacles.some((o) => o.x === p.x && o.y === p.y)) return;
      if (occupied(p)) return;
      obstacles.push(p);
    };
    // 生成随机障碍分布（以棋盘中心辐射，留出出生点）
    for (let i = 0; i < obstacleCount; i++) {
      let tries = 0;
      while (tries < 200) {
        const p = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
        const nearSpawn = Math.abs(p.x - 5) + Math.abs(p.y - 7) < 3; // 出生点周围保留空间
        const nearFood = Math.abs(p.x - food.x) + Math.abs(p.y - food.y) < 2;
        if (!nearSpawn && !nearFood) {
          addObstacle(p);
          break;
        }
        tries++;
      }
    }

    const placeFood = () => {
      // 在不与蛇身体或障碍重叠的位置放置食物
      let tries = 0;
      while (tries < 1000) {
        const candidate = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
        const onSnake = snake.some((p) => p.x === candidate.x && p.y === candidate.y);
        const onObstacle = obstacles.some((o) => o.x === candidate.x && o.y === candidate.y);
        if (!onSnake && !onObstacle) {
          food = candidate;
          return;
        }
        tries++;
      }
      // 兜底：如果实在找不到，就放在头部附近
      food = { x: Math.max(0, Math.min(cols - 1, snake[0].x + 2)), y: snake[0].y };
    };

    const manhattan = (a: Point, b: Point) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    const add = (p: Point, d: Point): Point => ({ x: p.x + d.x, y: p.y + d.y });
    const outOfBounds = (p: Point) => p.x < 0 || p.y < 0 || p.x >= cols || p.y >= rows;
    const onBody = (p: Point) => snake.some((s) => s.x === p.x && s.y === p.y);
    const onObstacle = (p: Point) => obstacles.some((o) => o.x === p.x && o.y === p.y);

    const safeDirs: Point[] = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    const chooseSuicideDir = (): Point => {
      const head = snake[0];
      // 距离四个墙的曼哈顿距离，选择最近的墙方向
      const distances = [
        { d: { x: -1, y: 0 }, dist: head.x }, // 左墙
        { d: { x: 1, y: 0 }, dist: cols - 1 - head.x }, // 右墙
        { d: { x: 0, y: -1 }, dist: head.y }, // 上墙
        { d: { x: 0, y: 1 }, dist: rows - 1 - head.y }, // 下墙
      ];
      distances.sort((a, b) => a.dist - b.dist);
      // 选第一个安全的方向，否则就选最近方向
      for (const cand of distances) {
        const np = add(head, cand.d);
        if (!outOfBounds(np)) {
          return cand.d;
        }
      }
      return distances[0].d;
    };

    const chooseSmartDir = (): Point => {
      const head = snake[0];
      const currentDist = manhattan(head, food);
      const candidates = safeDirs
        .map((d) => ({ d, np: add(head, d) }))
        .filter((x) => !outOfBounds(x.np) && !onBody(x.np) && !onObstacle(x.np));

      // 首选能缩短距离的安全方向
      const improving = candidates.filter((x) => manhattan(x.np, food) < currentDist);
      if (improving.length > 0) {
        // 在多个候选中，倾向于直行，否则选随机一个
        const straight = improving.find((x) => x.d.x === dir.x && x.d.y === dir.y);
        return straight ? straight.d : improving[Math.floor(Math.random() * improving.length)].d;
      }
      // 次选：任意安全方向（避免卡死）
      if (candidates.length > 0) {
        const straight = candidates.find((x) => x.d.x === dir.x && x.d.y === dir.y);
        return straight ? straight.d : candidates[Math.floor(Math.random() * candidates.length)].d;
      }
      // 没有安全方向，维持当前方向（可能会撞）
      return dir;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 背景：根据 html 的暗色类判断
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#111827' : '#f9fafb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 网格轻微可视化
      ctx.strokeStyle = '#e5e7eb40';
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * gridSize, 0);
        ctx.lineTo(x * gridSize, rows * gridSize);
        ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * gridSize);
        ctx.lineTo(cols * gridSize, y * gridSize);
        ctx.stroke();
      }

      // 障碍
      ctx.fillStyle = '#6b7280';
      obstacles.forEach((o) => {
        ctx.fillRect(o.x * gridSize, o.y * gridSize, gridSize, gridSize);
      });

      // 食物
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

      // 蛇
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? '#3b82f6' : '#60a5fa';
        ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize, gridSize);
      });
    };

    const step = (ts: number) => {
      rafId = requestAnimationFrame(step);
      if (!running) return;
      if (ts - last < speedMs) return;
      last = ts;

      // 在移动前，决定方向
      dir = suicideMode ? chooseSuicideDir() : chooseSmartDir();
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      // 撞墙或自撞，自动重开
      const hitWall = head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows;
      const hitSelf = snake.some((p) => p.x === head.x && p.y === head.y);
      const hitObstacle = obstacles.some((o) => o.x === head.x && o.y === head.y);
      if (hitWall || hitSelf || hitObstacle) {
        // 撞后重置并生成新的目标数量
        snake = [ { x: 5, y: 7 }, { x: 4, y: 7 }, { x: 3, y: 7 } ];
        dir = { x: 1, y: 0 };
        ateCount = 0;
        targetEats = 20 + Math.floor(Math.random() * 5);
        suicideMode = false;
        placeFood();
        draw();
        return;
      }

      snake.unshift(head);
      // 吃到食物
      if (head.x === food.x && head.y === food.y) {
        ateCount++;
        // 达到随机目标后进入自杀模式
        if (ateCount >= targetEats) {
          suicideMode = true;
        }
        placeFood();
      } else {
        snake.pop();
      }

      // 轻微随机抖动，避免完全机械（仅在非自杀模式）
      if (!suicideMode && Math.random() < 0.03) {
        dir = chooseSmartDir();
      }

      draw();
    };

    // 提升清晰度：根据设备像素比设置实际像素尺寸，并将绘制坐标缩放到设备像素比
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const logicalW = cols * gridSize;
    const logicalH = rows * gridSize;
    // 用 CSS 尺寸控制展示大小，不做 CSS 缩放
    canvas.style.width = logicalW + 'px';
    canvas.style.height = logicalH + 'px';
    // 实际像素尺寸乘以 dpr，确保高清渲染
    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    // 设置绘制变换为 dpr 缩放，避免多次 scale 叠加
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
    rafId = requestAnimationFrame(step);

    // 监听窗口尺寸变化，重建场景以保持覆盖且比例不变
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => {
        cancelAnimationFrame(rafId);
        setSceneKey((k) => k + 1); // 触发 useEffect 重新运行并重建场景
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [running, backgroundMode, sceneKey]);

  return (
    <div className={ backgroundMode ? "absolute inset-0 pointer-events-none" : "mx-auto w-full flex flex-col items-center" }>
      {!titleHidden && !backgroundMode && (
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-300">小游戏：智能寻食（至少吃满20个后进入自杀重开）</span>
          <button onClick={() => setRunning((r) => !r)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm">{running ? '暂停' : '继续'}</button>
        </div>
      )}
      {titleHidden && !backgroundMode && (
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => setRunning((r) => !r)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm">{running ? '暂停' : '继续'}</button>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={
          backgroundMode
            ? ("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-85 " + className)
            : ("rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm " + className)
        }
      />
    </div>
  );
}
