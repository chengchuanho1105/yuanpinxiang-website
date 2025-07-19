import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { MAIN_BRAND, BRANDS } from '@/brands'

// 將 vite-plugin-pages 產生的 routes 依品牌包裝
function wrapBrandRoutes(routes: RouteRecordRaw[], mainBrand: string, brands: string[]) {
  const brandRoutes = []

  for (const brand of brands) {
    if (brand === mainBrand) {
      // 主品牌：包含根路徑（/）開頭的所有路由
      brandRoutes.push(
        ...routes
          .filter((r) => !brands.some((b) => b !== mainBrand && r.path.startsWith(`/${b}`)))
          .map((r) => ({
            ...r,
            meta: { ...r.meta, brand },
          })),
      )
    } else {
      // 其他品牌加上品牌前綴
      brandRoutes.push(
        ...routes
          .filter((r) => r.path.startsWith(`/${brand}`))
          .map((r) => ({
            ...r,
            path: `/${brand}${r.path.replace(`/${brand}`, '')}`,
            meta: { ...r.meta, brand },
          })),
      )
    }
  }
  return brandRoutes
}

const routes = wrapBrandRoutes(generatedRoutes, MAIN_BRAND, BRANDS)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
