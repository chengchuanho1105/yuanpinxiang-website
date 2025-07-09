import type { BrandSEOConfig } from '../types'
import { brandInfoConfig } from './yuanpinxiang.info'

import ogImage from '@/assets/media/og-img/yuanpinxiang/og-img.png'

export const brandSEOConfig: BrandSEOConfig = {
  defaultTitle: brandInfoConfig.shortName, // 預設標題
  defaultDescription: brandInfoConfig.slogan || '', // 預設描述
  keywords: [
    '源品香',
    '源品香企業行',
    '源品香豆皮',
    '源品香豆包',
    '源品香豆漿',
    '源品香豆花',
    '源品香豆漿',
    '源品香豆漿',
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
