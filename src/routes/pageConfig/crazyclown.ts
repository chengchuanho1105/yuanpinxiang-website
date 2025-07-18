import type { PageConfig } from '@/routes/pageConfig/types.ts'

const brandName = 'crazyclown'
const brandDisplayName = 'CrazyClown'

export const pageConfig: PageConfig = {
  name: brandName,
  displayName: brandDisplayName,
  routes: [
    {
      path: '/',
      name: `${brandName}-Home`,
      component: () => import('@/pages/crazyclown/index.vue'),
      meta: {
        title: `首頁 | ${brandDisplayName}`,
        description:
          'Crazy_Clown 是一個活躍於《PUBG》的玩家戰隊，致力於打造充滿樂趣與團隊合作的遊戲環境。無論你是尋找並肩作戰的夥伴，還是想在每場對戰中盡情表演，Crazy_Clown 都歡迎你的加入。一起享受瘋狂的戰場秀，在每一場對戰中上演瘋狂又精彩的表演，體驗最瘋狂的吃雞旅程！',
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
      component: () => import('@/pages/crazyclown/about.vue'),
      meta: {
        title: `關於我們 | ${brandDisplayName}`,
        description:
          '認識 Crazy_Clown — 一個熱血又瘋狂的《PUBG》戰隊。我們相信遊戲不只是競技，更是找到歡樂與朋友的地方。了解我們的理念、成員文化與一起吃雞的精彩旅程！',
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
      path: '/store',
      name: `${brandName}-Store`,
      component: () => import('@/pages/crazyclown/store.vue'),
      meta: {
        title: `特惠商店 | ${brandDisplayName}`,
        description: 'G-Coin 是 Crazy_Clown 戰隊的獨家貨幣，可以購買戰隊獨享優惠。',
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
      path: '/join',
      name: `${brandName}-Join`,
      component: () => import('@/pages/crazyclown/join.vue'),
      meta: {
        title: `加入我們 | ${brandDisplayName}`,
        description:
          '想在《PUBG》中找到並肩作戰的夥伴嗎？加入 Crazy_Clown 戰隊，與一群熱血玩家一起歡樂吃雞、互相支援，打造屬於我們的瘋狂戰場！現在就成為我們的一員！',
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
  ],
}
