import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'http://localhost:4322', // 本地测试地址
  base: '/', // 根路径，方便本地测试
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
      config: {
        extend: {
          colors: {
            primary: '#3B82F6',
            secondary: '#8B5CF6',
            accent: '#EC4899',
          },
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        },
      },
    }),
  ],
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
  // 本地测试配置
  output: 'static',
});