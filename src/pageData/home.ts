interface HomeItem {
  title: string
  desc: string
  buttonText: string
  buttonLink: string
  align: string
  bgImage: string
  aos: string
  scrollDown?: boolean
}

export const homeData: HomeItem[] = [
  {
    title: '關於我們',
    desc: '源品香由一群熱愛土地與豆製品的職人組成。<br>並秉持「傳承、專業、誠信」，淬鍊出豆香的純粹與真誠，讓健康的飲食悄然在每一張豆皮中發芽。',
    buttonText: '了解更多',
    buttonLink: '/about',
    align: 'left',
    bgImage: 'https://picsum.photos/1920/1080?random=1',
    aos: 'fade-right',
  },
  {
    title: '精選禪品',
    desc: '產品皆由天然食材製成，無無外添加任何化學成分。<br>讓您在享受美味的同時，也能感受健康生活的美好。',
    buttonText: '挑選產品',
    buttonLink: '/product',
    align: 'right',
    bgImage: 'https://picsum.photos/1920/1080?random=2',
    aos: 'fade-left',
  },
  {
    title: '媒體介紹',
    desc: '媒體報導不只是產品的介紹，更是我們對品質與服務的承諾。<br>源品香相信能讓每一位顧客感受到我們的用心與專業。',
    buttonText: '更多介紹',
    buttonLink: '/media',
    align: 'left',
    bgImage: 'https://picsum.photos/1920/1080?random=3',
    aos: 'fade-right',
  },
  {
    title: '客戶見證',
    desc: '客戶見證是我們最好的廣告。<br>讓我們一起分享這些美好的故事。<br>邀請更多人認識源品香的堅持與美味。',
    buttonText: '聯絡購買',
    buttonLink: '/contact',
    align: 'right',
    bgImage: 'https://picsum.photos/1920/1080?random=4',
    aos: 'fade-left',
    scrollDown: false,
  },
]
