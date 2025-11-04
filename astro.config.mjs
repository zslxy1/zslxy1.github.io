import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://zslxy1.github.io', // 替换为你的GitHub Pages地址
  integrations: [
    react(),
    tailwind({
      // 配置Tailwind
      applyBaseStyles: false,
      config: {
        extend: {
          colors: {
            primary: '#3B82F6', // 蓝色主题
            secondary: '#8B5CF6', // 紫色辅助色
            accent: '#EC4899', // 粉色强调色
          },
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        },
      },
    }),
  ],
  // 配置图片优化
  image: {
    domains: ['space.coze.cn'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'space.coze.cn',
      pathname: '/api/coze_space/gen_image/**',
    }],
    format: ['webp'],
    quality: 80,
  },
});
