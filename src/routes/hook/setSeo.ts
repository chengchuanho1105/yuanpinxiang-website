import type { Router } from 'vue-router'
import { PAGE_CONFIGS } from '@/routes'
import { BRAND_SEO_CONFIGS, MAIN_BRAND } from '@/brands'
import { useHead } from '@unhead/vue'
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

// 遞迴尋找 meta 與 meta.seo
function findRouteMetaSeo(
  routes: PageRoute[],
  path: string,
  brand: string,
  parentPath = '',
): { meta?: PageRoute['meta']; seo?: PageRoute['meta']['seo'] } {
  const normalizedPath = stripBrandPrefix(path, brand)
  for (const route of routes) {
    let fullPath = parentPath
    if (!fullPath.endsWith('/')) fullPath += '/'
    fullPath += route.path.startsWith('/') ? route.path.slice(1) : route.path
    if (!fullPath.startsWith('/')) fullPath = '/' + fullPath
    fullPath = fullPath.replace(/\\/g, '/').replace(/\/+/g, '/')
    if (pathToRegex(fullPath).test(normalizedPath)) {
      return { meta: route.meta, seo: route.meta?.seo }
    }
    if (route.children) {
      const child = findRouteMetaSeo(route.children, path, brand, fullPath)
      if (child.meta || child.seo) return child
    }
  }
  return {}
}

export function setupPageSeo(router: Router) {
  router.afterEach((to) => {
    const brand = to.meta?.brand || to.params?.brand || MAIN_BRAND
    const pageConfig = PAGE_CONFIGS[brand as keyof typeof PAGE_CONFIGS]
    const seoConfig = BRAND_SEO_CONFIGS[`${brand}SEO` as keyof typeof BRAND_SEO_CONFIGS]
    const { meta, seo } = findRouteMetaSeo(
      pageConfig && Array.isArray(pageConfig.routes) ? pageConfig.routes : [],
      typeof to.path === 'string' ? to.path : '',
      typeof brand === 'string' ? brand : '',
      '',
    )
    // title/description/keywords
    const title = meta?.title || seoConfig?.defaultTitle || ''
    const description = meta?.description || seoConfig?.defaultDescription || ''
    const keywords = seoConfig?.keywords?.join(',') || ''
    // canonical/alternate
    const canonical = seoConfig?.canonicalUrl
    const alternateLocales = seoConfig?.alternateLocales
    // og
    const og = {
      'og:title': seoConfig?.ogTitle || title,
      'og:description': seoConfig?.ogDescription || description,
      'og:image': seoConfig?.ogImage,
      'og:type': seoConfig?.ogType,
      'og:url': seoConfig?.ogUrl || canonical,
      'og:site_name': seoConfig?.ogSiteName,
      'og:locale': seoConfig?.ogLocale,
      'og:locale:alternate': seoConfig?.ogLocaleAlternate,
      'og:image:width': seoConfig?.ogImageWidth,
      'og:image:height': seoConfig?.ogImageHeight,
    }
    // twitter
    const twitter = {
      'twitter:card': seoConfig?.twitterCard,
      'twitter:title': seoConfig?.twitterTitle || title,
      'twitter:description': seoConfig?.twitterDescription || description,
      'twitter:image': seoConfig?.twitterImage,
      'twitter:url': seoConfig?.twitterUrl || canonical,
      'twitter:site': seoConfig?.twitterSite,
      'twitter:creator': seoConfig?.twitterCreator,
      'twitter:creator:id': seoConfig?.twitterCreatorId,
    }
    // robots
    const robots = seo?.robots !== undefined ? seo.robots : seoConfig?.robots
    // google
    const google = {
      'google-site-verification': seoConfig?.googleSiteVerification,
    }
    // 組合 meta
    const metaArr = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: robots },
      ...Object.entries(og).map(([property, content]) => ({ property, content })),
      ...Object.entries(twitter).map(([name, content]) => ({ name, content })),
      ...Object.entries(google).map(([name, content]) => ({ name, content })),
    ].filter((item) => item.content)
    // 組合 link
    const linkArr = []
    if (canonical) linkArr.push({ rel: 'canonical', href: canonical })
    if (alternateLocales && canonical) {
      alternateLocales.forEach((locale) => {
        linkArr.push({ rel: 'alternate', href: canonical, hreflang: locale })
      })
    }
    useHead({
      title,
      meta: metaArr,
      link: linkArr,
    })
  })
}
