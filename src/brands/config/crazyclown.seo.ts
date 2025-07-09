import type { BrandSEOConfig } from '../types'
import { brandInfoConfig } from './crazyclown.info'

import ogImage from '@/assets/media/og-img/crazyclown/og-img.png'

export const brandSEOConfig: BrandSEOConfig = {
  defaultTitle: brandInfoConfig.shortName, // 預設標題
  defaultDescription: brandInfoConfig.slogan || '', // 預設描述
  keywords: [
    'CRCL',
    'Crazy_Clown',
    'Crazy Clown',
    'PUBG Crazy_Clown',
    'PUBG Crazy Clown',
    'CRCL 戰隊',
    'CRCL 公會',
    'PUBG',
    'PUBG 公會',
    'PUBG 戰隊',
    '吃雞 戰隊',
    '吃雞 公會',
    'PUBG 台灣 戰隊',
    'PUBG 台灣 公會',
    'PUBG 交友',
    'PUBG 組隊',
    'PUBG 社群',
    'PUBG 夥伴',
    'Crazy_Clown 戰隊',
    'Crazy_Clown 公會',
    '加入 PUBG 公會',
    'PUBG 台灣 戰隊',
    'PUBG 遊戲 夥伴',
    'PUBG 團隊合作',
    'PUBG 遊戲朋友',
    '吃雞 好玩 公會',
    '吃雞 找朋友',
  ], // 關鍵字

  canonicalUrl: brandInfoConfig.websiteUrl, // 規範網址
  alternateLocales: ['zh-TW', 'en-US'], // 替代語言

  ogTitle: brandInfoConfig.shortName, // Open Graph標題
  ogDescription: brandInfoConfig.slogan || '', // Open Graph描述
  ogImage: ogImage, // Open Graph圖片
  ogType: 'website', // Open Graph類型
  ogUrl: brandInfoConfig.websiteUrl, // Open Graph網址
  ogSiteName: brandInfoConfig.shortName, // Open Graph網站名稱
  ogLocale: brandInfoConfig.language, // Open Graph語言
  ogLocaleAlternate: ['en-US'], // Open Graph替代語言
  ogImageWidth: 600, // Open Graph圖片寬度
  ogImageHeight: 400, // Open Graph圖片高度

  twitterCard: 'summary_large_image', // Twitter卡片
  twitterTitle: brandInfoConfig.shortName, // Twitter標題
  twitterDescription: brandInfoConfig.slogan || '', // Twitter描述
  twitterImage: ogImage, // Twitter圖片
  twitterUrl: brandInfoConfig.websiteUrl, // Twitter網址
  twitterSite: brandInfoConfig.social?.twitter?.url, // Twitter網站
  twitterCreator: brandInfoConfig.social?.twitter?.name, // Twitter創作者
  twitterCreatorId: brandInfoConfig.social?.twitter?.id, // Twitter創作者ID

  robots: 'index, follow', // 機器人

  googleSiteVerification: 'google-site-verification=1234567890', // Google站台驗證
  googleAnalytics: 'G-1234567890', // Google Analytics
  googleSearchConsole: 'G-1234567890', // Google Search Console
  googleTagManager: 'G-1234567890', // Google Tag Manager
  googleAds: 'G-1234567890', // Google Ads
  googleAdsense: 'G-1234567890', // Google AdSense
  googleAnalytics4: 'G-1234567890', // Google Analytics 4
}
