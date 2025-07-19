import type { PageConfig } from '@/routes/pageConfig/types.ts'

const brandName = 'chuanlife'
const brandDisplayName = 'Chuan Life'

export const pageConfig: PageConfig = {
  name: brandName,
  displayName: brandDisplayName,
  routes: [
    {
      path: '/',
      name: `${brandName}-Home`,
      component: () => import(`@/pages/${brandName}/index.vue`),
      meta: {
        title: `首頁 | ${brandDisplayName}`,
        description: '',
        layout: 'default',
        requiresAuth: false,
        roles: ['admin', 'user', 'guest'],
        seo: {
          sitemap: true,
          sitemapXml: true,
          robots: true,
        },
        ui: {
          navbar: true,
          navbarOrder: 1,
        },
      },
    },
    {
      path: '/about',
      name: `${brandName}-About`,
      component: () => import(`@/pages/${brandName}/about.vue`),
      meta: {
        title: `關於我們 | ${brandDisplayName}`,
        description: '',
        layout: 'default',
        requiresAuth: false,
        roles: ['admin', 'user', 'guest'],
        seo: {
          sitemap: true,
          sitemapXml: true,
          robots: true,
        },
        ui: {
          navbar: true,
          navbarOrder: 2,
        },
      },
    },
  ],
}
