import type { PageConfig } from '@/routes/pageConfig/types.ts'

const brandName = 'yuanpinxiang'
const brandDisplayName = '源品香'

export const pageConfig: PageConfig = {
  name: brandName,
  displayName: brandDisplayName,
  routes: [
    {
      path: '/',
      name: `${brandName}-Home`,
      component: () => import('@/pages/yuanpinxiang/index.vue'),
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
      component: () => import('@/pages/yuanpinxiang/about.vue'),
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
    {
      path: '/product',
      name: `${brandName}-Product`,
      component: () => import('@/pages/yuanpinxiang/product/index.vue'),
      meta: {
        title: `產品 | ${brandDisplayName}`,
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
          navbarOrder: 3,
        },
      },
      children: [
        {
          path: 'list',
          name: `${brandName}-Product-List`,
          component: () => import('@/pages/yuanpinxiang/product/list/index.vue'),
          meta: {
            title: `產品列表 | ${brandDisplayName}`,
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
          path: 'list/:id',
          name: `${brandName}-Product-List-Detail`,
          component: () => import('@/pages/yuanpinxiang/product/list/[id].vue'),
          meta: {
            title: `產品詳情 | ${brandDisplayName}`,
            description: '',
            layout: 'default',
            requiresAuth: false,
            roles: ['admin', 'user', 'guest'],
            seo: {
              sitemap: false,
              sitemapXml: false,
              robots: true,
            },
            ui: {
              navbar: false,
            },
          },
        },
        {
          path: 'certification',
          name: `${brandName}-Product-Certification`,
          component: () => import('@/pages/yuanpinxiang/product/certification.vue'),
          meta: {
            title: `產品認證 | ${brandDisplayName}`,
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
    },
    {
      path: '/media',
      name: `${brandName}-Media`,
      component: () => import('@/pages/yuanpinxiang/media.vue'),
      meta: {
        title: `媒體介紹 | ${brandDisplayName}`,
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
          navbarOrder: 4,
        },
      },
    },
    {
      path: '/news',
      name: `${brandName}-News`,
      component: () => import('@/pages/yuanpinxiang/news/index.vue'),
      meta: {
        title: `最新消息 | ${brandDisplayName}`,
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
          navbarOrder: 5,
        },
      },
      children: [
        {
          path: ':id',
          name: `${brandName}-News-Detail`,
          component: () => import('@/pages/yuanpinxiang/news/[id].vue'),
          meta: {
            title: `最新消息詳情 | ${brandDisplayName}`,
            description: '',
            layout: 'default',
            requiresAuth: false,
            roles: ['admin', 'user', 'guest'],
            seo: {
              sitemap: false,
              sitemapXml: false,
              robots: true,
            },
            ui: {
              navbar: false,
            },
          },
        },
      ],
    },
    {
      path: '/faq',
      name: `${brandName}-Faq`,
      component: () => import('@/pages/yuanpinxiang/faq.vue'),
      meta: {
        title: `常見問題 | ${brandDisplayName}`,
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
          navbarOrder: 6,
        },
      },
    },
    {
      path: '/contact',
      name: `${brandName}-Contact`,
      component: () => import('@/pages/yuanpinxiang/contact.vue'),
      meta: {
        title: `聯絡我們 | ${brandDisplayName}`,
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
          navbarOrder: 7,
        },
      },
    },
  ],
}
