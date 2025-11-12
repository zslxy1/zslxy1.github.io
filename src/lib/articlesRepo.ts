// 统一从 src/content/articles 目录读取 Markdown，并解析 frontmatter 生成文章数据与内容映射
// 说明：
// - 文件命名建议：YYYY-MM-DD-slug.md（例如 2025-11-07-vocal-isolation.md）
// - frontmatter 字段：id, title, description/excerpt, date, category, tags, image
// - 内容区为 Markdown 正文

export type Article = {
  id: number;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: string;
  tags: string[];
  imageUrl: string;
};

type ParsedMd = {
  meta: Article;
  content: string;
};

// 读取所有 Markdown（作为原始字符串）
const mdFiles = import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parseFrontmatter(raw: string): ParsedMd {
  const sep = '---';
  let meta: Partial<Article> = {};
  let body = raw;
  if (raw.startsWith(sep)) {
    const end = raw.indexOf(sep, sep.length);
    if (end !== -1) {
      const fm = raw.slice(sep.length, end).trim();
      body = raw.slice(end + sep.length).trim();
      // 解析常见的 key: value 与数组格式 [a, b, c]
      // 简易解析器，满足本项目使用场景（title/description/date/category/tags/image/id）
      fm.split(/\r?\n/).forEach((line) => {
        const m = /^([a-zA-Z_]+)\s*:\s*(.*)$/.exec(line.trim());
        if (!m) return;
        const key = m[1];
        let value = m[2].trim();
        if (value.startsWith('[') && value.endsWith(']')) {
          // 数组：按逗号分割并去除引号
          const arr = value
            .slice(1, -1)
            .split(',')
            .map((s) => s.trim().replace(/^['"]/,'').replace(/['"]$/,''))
            .filter(Boolean);
          (meta as any)[key === 'tags' ? 'tags' : key] = arr;
        } else {
          // 去除包裹引号
          value = value.replace(/^['"]/,'').replace(/['"]$/,'');
          (meta as any)[key === 'description' ? 'excerpt' : key] = value;
        }
      });
    }
  }

  // 字段兜底
  const ensure = (k: string, v: any) => (v !== undefined && v !== null ? v : '');
  const idNum = Number((meta as any).id ?? 0);
  const article: Article = {
    id: Number.isFinite(idNum) && idNum > 0 ? idNum : Math.floor(Math.random() * 1e9),
    title: ensure('title', meta.title),
    excerpt: ensure('excerpt', meta.excerpt),
    date: ensure('date', meta.date),
    category: ensure('category', meta.category || '未分类'),
    tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
    imageUrl: ensure('imageUrl', (meta as any).image || (meta as any).imageUrl),
  };

  return { meta: article, content: body };
}

// 构建文章列表与内容映射
const parsedList: ParsedMd[] = Object.values(mdFiles).map((raw) => parseFrontmatter(raw));

// 按日期倒序排列（新→旧）；若日期格式不合法则保持原顺序
const articlesList: Article[] = [...parsedList]
  .sort((a, b) => {
    const ta = new Date(a.meta.date).getTime();
    const tb = new Date(b.meta.date).getTime();
    if (Number.isNaN(ta) || Number.isNaN(tb)) return 0;
    return tb - ta;
  })
  .map((p) => p.meta);

const contentMap: Record<number, string> = Object.fromEntries(
  parsedList.map((p) => [p.meta.id, p.content])
);

export { articlesList, contentMap };

