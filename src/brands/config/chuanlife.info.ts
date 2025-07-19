import type { BrandInfoConfig } from '../types'

import logoLight from '@/assets/media/logo/chuanlife/logo-light.png'
import logoDark from '@/assets/media/logo/chuanlife/logo-dark.png'

export const brandInfoConfig: BrandInfoConfig = {
  name: 'chuanlife', // 品牌名稱
  displayName: '銓生活', // 品牌顯示名稱
  fullName: '銓生活工作室', // 品牌全名
  shortName: '銓生活', // 品牌簡稱
  logo: logoLight, // 品牌LOGO
  logoDark: logoDark, // 品牌LOGO（暗色）
  favicon: 'https://chuan.life/assets/favicon/chuanlife/favicon-light.ico', // 品牌FAVICON
  faviconDark: 'https://chuan.life/assets/favicon/chuanlife/favicon-dark.ico', // 品牌FAVICON（暗色）
  primaryColor: '#000000', // 品牌主色
  secondaryColor: '#000000', // 品牌輔色
  accentColor: '#000000', // 品牌強調色
  slogan: '銓生活，品味生活', // 品牌口號
  websiteUrl: 'https://chuan.life', // 品牌網站
  copyright: '© 2025 Crazy Clown. All rights reserved.', // 版權
  contactEmail: 'chengchuanho1105@gmail.com', // 聯絡信箱
  paymentMethods: ['bank-transfer', 'cash'], // 付款方式
  language: 'zh-TW', // 語言
  currency: 'TWD', // 貨幣
  social: {
    discord: { id: '3TEHPZhYUK', name: 'Crazy_Clown', url: 'https://discord.gg/3TEHPZhYUK' },
    line: { id: 'MvNfwjVwKA', name: '銓生活', url: 'https://line.me/R/ti/g/MvNfwjVwKA' },
  },
}
