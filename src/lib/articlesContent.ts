// 统一改为从 articlesRepo 读取内容映射，避免在单文件硬编码所有文章
import { contentMap } from './articlesRepo';
export const articlesContent: Record<number, string> = contentMap;
