import type { Router } from 'vue-router'
import { PAGE_CONFIGS } from '@/routes/pageConfig'
import type { PageRoute } from '@/routes/pageConfig/types'

// 移除品牌前綴
function stripBrandPrefix(path: string, brand: string) {
  if (path.startsWith(`/${brand}`)) {
    return path.replace(`/${brand}`, '') || '/'
  }
  return path
}

// 將 /foo/:id/bar 轉成 /^\/foo\/[^/]+\/bar$/
function pathToRegex(path: string) {
  return new RegExp('^' + path.replace(/:[^/]+/g, '[^/]+') + '$')
}

// 遞迴尋找 meta.description，組合父路徑以支援子路由
function findRouteDescription(
  routes: PageRoute[],
  path: string,
  brand: string,
  parentPath = '',
): string | undefined {
  const normalizedPath = stripBrandPrefix(path, brand)
  for (const route of routes) {
    // 組合完整路徑
    let fullPath = parentPath
    if (!fullPath.endsWith('/')) fullPath += '/'
    fullPath += route.path.startsWith('/') ? route.path.slice(1) : route.path
    if (!fullPath.startsWith('/')) fullPath = '/' + fullPath
    fullPath = fullPath.replace(/\\/g, '/').replace(/\/+/g, '/')
    // 比對（支援動態參數）
    if (pathToRegex(fullPath).test(normalizedPath)) {
      return route.meta.description
    }
    if (route.children) {
      const childDescription = findRouteDescription(route.children, path, brand, fullPath)
      if (childDescription) return childDescription
    }
  }
  return undefined
}

// 設定 description
export function setupPageDescription(router: Router) {
  router.afterEach((to) => {
    // 1. 取得品牌名稱
    const brand = to.meta?.brand || to.params?.brand || 'yuanpinxiang'
    // 2. 取得品牌 pageConfig
    const pageConfig = PAGE_CONFIGS[brand as keyof typeof PAGE_CONFIGS]
    // 3. 遞迴尋找 meta.description
    const metaDescription = findRouteDescription(
      pageConfig && Array.isArray(pageConfig.routes) ? pageConfig.routes : [],
      typeof to.path === 'string' ? to.path : '',
      typeof brand === 'string' ? brand : '',
      '',
    )
    // 4. fallback 品牌 displayName
    const brandDescription =
      pageConfig && typeof pageConfig.displayName === 'string' ? pageConfig.displayName : ''
    // 5. 設定 description
    const descriptionContent = metaDescription || brandDescription
    let metaTag = document.querySelector('meta[name="description"]')
    if (!metaTag) {
      metaTag = document.createElement('meta')
      metaTag.setAttribute('name', 'description')
      document.head.appendChild(metaTag)
    }
    metaTag.setAttribute('content', descriptionContent)
  })
}
