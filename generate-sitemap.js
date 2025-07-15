// type: module
import Sitemap from 'vue-router-sitemap'
import path from 'path'
import fs from 'fs'
import newsData from './src/data/pageData/news/newsData.json' assert { type: 'json' }

// 動態路由展開
const dynamicNewsRoutes = Array.isArray(newsData) ? newsData.map((news) => `/news/${news.id}`) : []

// 靜態頁面路徑（可依實際需求擴充）
const staticRoutes = [
  '/',
  '/about',
  '/product',
  '/product/list',
  '/product/certification',
  '/media',
  '/faq',
  '/contact',
  '/news',
]

const allRoutes = [...staticRoutes, ...dynamicNewsRoutes]

function generateSitemap() {
  return new Sitemap({
    routes: allRoutes,
    base: 'https://yuanpinxiang.com',
  })
    .build()
    .save(path.resolve('./dist/sitemap.xml'))
}

generateSitemap()
