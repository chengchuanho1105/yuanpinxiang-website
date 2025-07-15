import fs from 'fs'
import path from 'path'

// 讀取新聞資料
const newsData = JSON.parse(fs.readFileSync('./src/data/pageData/news/newsData.json', 'utf-8'))

// 動態路由
const dynamicNewsRoutes = Array.isArray(newsData) ? newsData.map((news) => `/news/${news.id}`) : []

// 靜態頁面
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

const baseUrl = 'https://yuanpinxiang.com'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes
  .map(
    (route) =>
      `\n  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`,
  )
  .join('')}\n</urlset>\n`

fs.writeFileSync(path.resolve('./dist/sitemap.xml'), sitemap)
console.log('Sitemap generated!')
