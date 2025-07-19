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
        description:
          '銓生活服務工作室致力於提供優質的網站設計、貼圖代購、3C產品代購和服務， 為您的生活提供便利與無限可能。',
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
        description: '認識銓生活服務工作室的品牌故事、理念與專業團隊。',
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
      path: '/services',
      name: `${brandName}-Services`,
      component: () => import(`@/pages/${brandName}/services.vue`),
      meta: {
        title: `專業服務 | ${brandDisplayName}`,
        description: '網站設計、貼圖代購、3C產品代購等多元服務，滿足您的各種需求。',
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
    },
    {
      path: '/news',
      name: `${brandName}-News`,
      component: () => import(`@/pages/${brandName}/news/index.vue`),
      meta: {
        title: `最新消息 | ${brandDisplayName}`,
        description: '掌握銓生活最新消息、優惠活動與服務公告。',
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
      children: [
        {
          path: ':id',
          name: `${brandName}-News-Detail`,
          component: () => import(`@/pages/${brandName}/news/[id].vue`),
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
      path: '/contact',
      name: `${brandName}-Contact`,
      component: () => import(`@/pages/${brandName}/contact.vue`),
      meta: {
        title: `聯絡我們 | ${brandDisplayName}`,
        description: '歡迎洽詢網站設計、貼圖代購、3C產品代購等服務，專人為您服務。',
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
    },
  ],
}
