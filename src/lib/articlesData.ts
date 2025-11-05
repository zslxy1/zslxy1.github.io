export type Article = {
  id: number;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: string;
  tags: string[];
  // readTime 不再作为卡片右上角显示，但保留字段以兼容；可选
  readTime?: string;
  imageUrl: string;
};

// 仅保留用户提供的文章，移除旧的示例文章
export const articlesData: Article[] = [
  {
    id: 1,
    title: 'CS16 目标检测与自动瞄准项目',
    excerpt:
      '这是一个基于 YOLOv8 的 CS16 游戏辅助工具，核心功能包括屏幕区域截取、目标检测（默认检测敌人）和自动瞄准，支持 GPU/CPU 自适应运行，可实时显示检测结果并置顶窗口。',
    date: '2025-11-05',
    category: '计算机视觉',
    tags: ['YOLOv8', 'OpenCV', 'Python', 'Windows'],
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: '我的个人博客项目：Astro + React + Tailwind 构建与发布',
    excerpt:
      '介绍本博客项目的技术栈、页面结构、主题系统与开发/部署流程，并开源可复用的结构。',
    date: '2025-11-05',
    category: '前端开发',
    tags: ['Astro', 'React', 'TailwindCSS', 'Vite'],
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
];

export function getLatest(n: number): Article[] {
  return [...articlesData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
}
