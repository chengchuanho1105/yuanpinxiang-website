import type { Router } from 'vue-router'
import { useDark } from '@vueuse/core'
import { watch } from 'vue'
import { BRAND_INFOS, MAIN_BRAND } from '@/brands'

/**
 * 設定頁面 favicon
 * 根據當前品牌和主題動態切換 favicon
 */
export function setupFavicon(router: Router) {
  const isDark = useDark()

  // 更新 favicon 的函數
  const updateFavicon = (brandKey: string) => {
    const brandInfo = BRAND_INFOS[`${brandKey}Info` as keyof typeof BRAND_INFOS]

    if (!brandInfo) {
      console.warn(`Brand info not found for: ${brandKey}`)
      return
    }

    // 根據主題選擇 favicon
    let faviconUrl = ''
    if (isDark.value && brandInfo.faviconDark) {
      faviconUrl = brandInfo.faviconDark
    } else if (brandInfo.favicon) {
      faviconUrl = brandInfo.favicon
    }

    if (!faviconUrl) {
      console.warn(`Favicon not found for brand: ${brandKey}`)
      return
    }

    // 移除現有的 favicon 連結
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]')
    existingFavicons.forEach((link) => link.remove())

    // 建立新的 favicon 連結
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/x-icon'
    link.href = faviconUrl
    document.head.appendChild(link)

    // 同時設定 apple-touch-icon（如果需要的話）
    const appleTouchIcon = document.createElement('link')
    appleTouchIcon.rel = 'apple-touch-icon'
    appleTouchIcon.href = faviconUrl
    document.head.appendChild(appleTouchIcon)

    console.log(`Favicon updated for brand: ${brandKey}, theme: ${isDark.value ? 'dark' : 'light'}`)
  }

  // 路由切換時更新 favicon
  router.afterEach((to) => {
    const brand = to.meta?.brand || to.params?.brand || MAIN_BRAND
    updateFavicon(typeof brand === 'string' ? brand : MAIN_BRAND)
  })

  // 主題切換時更新 favicon
  const unwatchDark = watch(isDark, () => {
    const currentRoute = router.currentRoute.value
    const brand = currentRoute.meta?.brand || currentRoute.params?.brand || MAIN_BRAND
    updateFavicon(typeof brand === 'string' ? brand : MAIN_BRAND)
  })

  // 清理函數
  return () => {
    unwatchDark()
  }
}
