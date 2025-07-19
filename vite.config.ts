import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'
import generateSitemap from 'vite-plugin-pages-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Pages({
      dirs: [
        { dir: 'src/pages/yuanpinxiang', baseRoute: '' },
        { dir: 'src/pages/chuanlife', baseRoute: 'chuanlife' },
        { dir: 'src/pages/crazyclown', baseRoute: 'crazyclown' },
      ],
      extensions: ['vue'],
      // 這裡整合 sitemap 產生
      onRoutesGenerated: (routes) => {
        generateSitemap({
          routes,
          hostname: 'https://chuan.life',
        })
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
