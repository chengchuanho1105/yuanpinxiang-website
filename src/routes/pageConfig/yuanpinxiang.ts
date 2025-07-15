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
        description:
          '源品香專注於高品質有機黃豆製品，嚴選台灣在地原料，結合傳統工藝與食品安全認證，堅持純淨無添加，推廣永續農業，讓您安心享受健康美味，信賴每一口。',
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
        description:
          '源品香關於我們，介紹品牌創立初衷、經營理念與發展歷程。我們堅持選用台灣在地原料，結合傳統工藝與現代食品安全標準，致力於提供高品質有機黃豆製品，推廣健康、永續與安心的生活理念。',
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
        description:
          '源品香產品嚴選台灣在地黃豆，通過有機與多項食品安全認證，堅持無添加、純淨製程。每一項產品皆融合傳統工藝與現代品質，讓您享受健康、美味、安心的優質選擇。',
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
            description:
              '源品香產品列表，精選多款有機黃豆製品，嚴選台灣在地原料，通過多項食品安全認證。每項產品皆堅持純淨無添加，結合傳統工藝與現代品質，讓您輕鬆選購健康、安心、美味的優質食品。',
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
            description:
              '源品香產品認證專區，公開所有產品通過的驗證，從原料到製程層層把關，堅持純淨無添加，讓您安心選購，信賴每一項健康優質的黃豆製品。',
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
        description:
          '源品香媒體介紹，精選品牌新聞、影音專訪與專業報導，展現我們對品質的堅持與永續理念。透過多元媒體內容，讓您深入了解源品香的品牌故事與產品特色，安心信賴。',
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
        description:
          '掌握源品香最新消息，第一時間獲得品牌動態、產品上市、活動資訊與媒體報導。我們持續分享有機黃豆製品的健康知識與企業發展，讓您隨時了解源品香的最新動向與安心承諾。',
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
        description:
          '源品香常見問題專區，為您解答產品選購、保存方式、認證標章、訂購流程等疑問，協助您安心選擇與使用我們的有機黃豆製品，享受健康美味的每一天。',
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
        description:
          '源品香聯絡我們，歡迎您洽詢產品資訊、訂購服務、合作提案或任何建議。專業客服團隊將迅速回應您的需求，提供最貼心的協助，讓您安心選購高品質有機黃豆製品。',
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
