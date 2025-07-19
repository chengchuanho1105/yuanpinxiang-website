import type { BrandInfoConfig } from '../types'

import logoLight from '@/assets/media/logo/yuanpinxiang/logo-light.png'
import logoDark from '@/assets/media/logo/yuanpinxiang/logo-dark.png'

export const brandInfoConfig: BrandInfoConfig = {
  name: 'yuanpinxiang', // 品牌名稱
  displayName: '源品香', // 品牌顯示名稱
  fullName: '源品香企業行', // 品牌全名
  shortName: '源品香', // 品牌簡稱
  logo: logoLight, // 品牌LOGO
  logoDark: logoDark, // 品牌LOGO（暗色）
  favicon: 'https://yuanpinxiang.com/assets/favicon/yuanpinxiang/favicon-light.ico', // 品牌FAVICON
  faviconDark: 'https://yuanpinxiang.com/assets/favicon/yuanpinxiang/favicon-dark.ico', // 品牌FAVICON（暗色）
  primaryColor: '#000000', // 品牌主色
  secondaryColor: '#000000', // 品牌輔色
  accentColor: '#000000', // 品牌強調色
  slogan: '源自初心滋養廣，品餘至誠鑄芬芳，香隨歲月傳千里，讚立人間業世昌。', // 品牌口號
  websiteUrl: 'https://yuanpinxiang.com', // 品牌網站
  copyright: 'Chuan Life', // 版權方
  copyrightUrl: 'https://chuan.life', // 版權方Url
  contactEmail: 'a0965814092@gmail.com', // 聯絡信箱
  contactPhone: '0965814092', // 聯絡電話
  paymentMethods: ['bank-transfer', 'cash'], // 付款方式
  language: 'zh-TW', // 語言
  currency: 'TWD', // 貨幣
  social: {
    line: { id: '@353qtzhb', name: '銓生活', url: 'https://lin.ee/2J3meSM' },
  },
}
