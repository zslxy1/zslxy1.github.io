import { motion } from 'framer-motion';
import { getLatest } from '@/lib/articlesData';
// 使用 ?url 获取静态资源最终 URL，避免个别环境下图片不显示
import yoloImgUrl from '@/image_data/YOLO_cs2.jpg?url';
import webBlogUrl from '@/image_data/web_blog.png?url';
import vocalImgUrl from '@/image_data/Vocal_Isolation.png?url';
import sunoImgUrl from '@/image_data/Suno.png?url';
import flowImgUrl from '@/image_data/flow.png?url';
import obsImgUrl from '@/image_data/obs.svg?url';

export default function LatestArticlesIsland({ count = 3 }: { count?: number }) {
  const latest = getLatest(count);
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((article, idx) => (
  <motion.a key={article.id} href={`/articles/${article.id}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="rounded-xl overflow-hidden shadow-sm bg-transparent border border-gray-200 dark:bg-gray-800 dark:border-gray-700 card-hover">
              <img
                src={article.id === 1 ? yoloImgUrl : article.id === 2 ? webBlogUrl : article.id === 3 ? vocalImgUrl : article.id === 4 ? sunoImgUrl : article.id === 5 ? flowImgUrl : article.id === 6 ? obsImgUrl : article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-500 font-medium">{article.category}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(article.date).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="text-xs text-gray-400 dark:text-gray-500">{article.date}</div>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="/articles" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors">
            查看更多文章 <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
