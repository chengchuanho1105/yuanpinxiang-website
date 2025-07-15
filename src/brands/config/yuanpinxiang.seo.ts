import type { BrandSEOConfig } from '../types'
import { brandInfoConfig } from './yuanpinxiang.info'

import ogImage from '@/assets/media/og-img/yuanpinxiang/og-img.png'

export const brandSEOConfig: BrandSEOConfig = {
  defaultTitle: brandInfoConfig.shortName,
  defaultDescription: brandInfoConfig.slogan || brandInfoConfig.fullName,
  keywords: [
    '源品香',
    '源品香豆皮',
    '源品香豆包',
    '台灣豆皮',
    '台灣豆包',
    '手工豆皮',
    '手工豆包',
    '非基改黃豆',
    '傳統豆製品',
    '素食豆皮',
    '素食豆包',
    '高雄豆皮',
    '高雄豆包',
    '豆製品批發',
    '豆皮批發',
    '豆包批發',
    '豆漿批發',
    '豆花批發',
    '豆製品工廠',
    '豆皮工廠',
    '豆包工廠',
    '健康食品',
    '植物蛋白',
    '早餐推薦',
    '素食推薦',
    '高蛋白食品',
    '在地品牌',
    '台灣品牌',
    '雲林美食',
    '豆製品專家',
  ],

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

  googleSiteVerification: 'pEOfGMhOo2uh7ZdPPuOk04bziLp3-NwjZ1JmnNfm-wk', // Google站台驗證
  googleAnalytics: 'G-1234567890', // Google Analytics
  googleSearchConsole: 'G-1234567890', // Google Search Console
  googleTagManager: 'G-1234567890', // Google Tag Manager
  googleAds: 'G-1234567890', // Google Ads
  googleAdsense: 'G-1234567890', // Google AdSense
  googleAnalytics4: 'G-1234567890', // Google Analytics 4
}
