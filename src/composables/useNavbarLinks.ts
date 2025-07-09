import { computed } from 'vue'
import { MAIN_BRAND } from '@/brands'
import { useCurrentBrand } from '@/composables/useCurrentBrand'
import type { PageRoute } from '@/routes/pageConfig/types'

export interface NavbarLink {
  path: string
  name: string
  title: string
  children?: NavbarLink[]
  isActive: boolean
}

/**
 * 取得當前品牌的 navbar 連結
 */
export function useNavbarLinks() {
  const { brandKey, brandConfig } = useCurrentBrand()

  // 遞迴處理路由，轉換為 navbar 連結
  const processRoutes = (
    routes: PageRoute[],
    parentPath = '',
    parentRoute?: PageRoute,
  ): NavbarLink[] => {
    return routes
      .filter((route) => route.meta.ui?.navbar) // 只顯示有設定 navbar: true 的路由
      .map((route) => {
        // 修正路徑組合邏輯
        let fullPath = ''
        if (parentPath === '') {
          // 根路由
          if (brandKey.value === MAIN_BRAND) {
            fullPath = route.path
          } else {
            fullPath = `/${brandKey.value}${route.path}`
          }
        } else {
          // 子路由 - 使用父路徑 + 子路徑（移除開頭的 /）
          const childPath = route.path.startsWith('/') ? route.path.slice(1) : route.path
          fullPath = `${parentPath}/${childPath}`
        }

        // 判斷是否為當前頁面
        const currentRoutePath = route.path
        const isActive =
          currentRoutePath === '/' ? route.path === '/' : route.path.startsWith(currentRoutePath)

        const link: NavbarLink = {
          path: fullPath,
          name: route.name,
          title: route.meta.title,
          isActive: isActive,
        }

        // 如果有子路由，遞迴處理並排序
        if (route.children && route.children.length > 0) {
          link.children = processRoutes(route.children, fullPath, route)
        }

        return link
      })
      .sort((a, b) => {
        // 根據 navbarOrder 排序
        let aOrder = 999
        let bOrder = 999

        if (parentRoute) {
          // 子路由排序
          const aChild = parentRoute.children?.find((r) => r.name === a.name)
          const bChild = parentRoute.children?.find((r) => r.name === b.name)
          aOrder = aChild?.meta.ui?.navbarOrder || 999
          bOrder = bChild?.meta.ui?.navbarOrder || 999
        } else {
          // 根路由排序
          const aRoute = brandConfig.value?.routes.find((r) => r.name === a.name)
          const bRoute = brandConfig.value?.routes.find((r) => r.name === b.name)
          aOrder = aRoute?.meta.ui?.navbarOrder || 999
          bOrder = bRoute?.meta.ui?.navbarOrder || 999
        }

        return aOrder - bOrder
      })
  }

  const navbarLinks = computed(() => {
    if (!brandConfig.value?.routes) return []
    return processRoutes(brandConfig.value.routes)
  })

  return {
    brandKey,
    navbarLinks,
  }
}
