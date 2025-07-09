export interface BrandInfoConfig {
  name: string // 品牌名稱
  displayName: string // 品牌顯示名稱
  fullName: string // 品牌全名
  shortName: string // 品牌簡稱
  logo: string // 品牌LOGO
  logoDark?: string // 品牌LOGO（暗色）
  favicon?: string // 品牌FAVICON
  faviconDark?: string // 品牌FAVICON（暗色）
  primaryColor?: string // 品牌主色
  secondaryColor?: string // 品牌輔色
  accentColor?: string // 品牌強調色
  slogan?: string // 品牌口號
  websiteUrl?: string // 品牌網站
  termsOfService?: string // 服務條款
  privacyPolicy?: string // 隱私政策
  copyright?: string // 版權
  contactEmail?: string // 聯絡信箱
  contactPhone?: string // 聯絡電話
  contactAddress?: string // 聯絡地址
  contactHours?: string // 聯絡時間
  establishedYear?: number // 成立年份
  headquarters?: string // 總部地址
  employees?: number // 員工人數
  headquartersPhone?: string // 總部電話
  headquartersEmail?: string // 總部信箱
  headquartersHours?: string // 總部營業時間
  country?: string // 國家
  city?: string // 城市
  state?: string // 州/省
  zipCode?: string // 郵遞區號
  latitude?: number // 緯度
  longitude?: number // 經度
  timezone?: string // 時區
  language?: string // 語言
  currency?: string // 貨幣
  paymentMethods?: string[] // 付款方式
  deliveryOptions?: string[] // 配送選項
  returnPolicy?: string // 退貨政策
  exchangePolicy?: string // 換貨政策
  cancellationPolicy?: string // 取消政策
  social?: {
    discord?: { id?: string; name?: string; url?: string }
    github?: { id?: string; name?: string; url?: string }
    instagram?: { id?: string; name?: string; url?: string }
    line?: { id?: string; name?: string; url?: string }
    telegram?: { id?: string; name?: string; url?: string }
    tiktok?: { id?: string; name?: string; url?: string }
    tiktok_CN?: { id?: string; name?: string; url?: string }
    twitch?: { id?: string; name?: string; url?: string }
    youtube?: { id?: string; name?: string; url?: string }
    facebook?: { id?: string; name?: string; url?: string }
    [key: string]: { id?: string; name?: string; url?: string } | undefined // 擴充彈性
  }
}

export interface BrandSEOConfig {
  defaultTitle: string // 預設標題
  defaultDescription: string // 預設描述
  keywords?: string[] // 關鍵字
  canonicalUrl?: string // 規範網址
  alternateLocales?: string[] // 替代語言
  ogTitle?: string // Open Graph標題
  ogDescription?: string // Open Graph描述
  ogImage?: string // Open Graph圖片
  ogType?: string // Open Graph類型
  ogUrl?: string // Open Graph網址
  ogSiteName?: string // Open Graph網站名稱
  ogLocale?: string // Open Graph語言
  ogLocaleAlternate?: string[] // Open Graph替代語言
  ogImageWidth?: number // Open Graph圖片寬度
  ogImageHeight?: number // Open Graph圖片高度
  twitterCard?: string // Twitter卡片
  twitterTitle?: string // Twitter標題
  twitterDescription?: string // Twitter描述
  twitterImage?: string // Twitter圖片
  twitterUrl?: string // Twitter網址
  twitterSite?: string // Twitter網站
  twitterCreator?: string // Twitter創作者
  twitterCreatorId?: string // Twitter創作者ID
  robots?: string // 機器人
  googleSiteVerification?: string // Google站台驗證
  googleAnalytics?: string // Google Analytics
  googleSearchConsole?: string // Google Search Console
  googleTagManager?: string // Google Tag Manager
  googleAds?: string // Google Ads
  googleAdsense?: string // Google AdSense
  googleAnalytics4?: string // Google Analytics 4
}
