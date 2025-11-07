import { articlesList } from './articlesRepo';
export type { Article } from './articlesRepo';

export const articlesData = articlesList;

export function getLatest(n: number) {
  return [...articlesData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
}
