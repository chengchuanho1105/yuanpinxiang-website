interface FaqItem {
  question: string
  answer: string
}

interface faqList {
  category: string
  items: FaqItem[]
}

export const faqList: faqList[] = [
  {
    category: '原料與製程',
    items: [
      {
        question: '源品香豆皮的黃豆哪裡來的？',
        answer:
          '我們採用台灣在地的單一品種非基因改造黃豆，確保風味純正、品質穩定，同時支持本土農業。',
      },
      {
        question: '是否含有添加物或防腐劑？',
        answer: '源品香堅持手工製作，不添加任何化學成分或防腐劑，讓每一口都安心。',
      },
      {
        question: '豆皮是怎麼製作的？',
        answer:
          '製作豆皮需將黃豆磨漿、煮漿後在表面自然凝結成皮，經手工挑起後再經處理完成，全程純手工。',
      },
      {
        question: '豆皮是全素嗎？',
        answer: '是的，我們的豆皮全程使用植物性原料，符合純素飲食者的需求。',
      },
    ],
  },
  {
    category: '產品資訊',
    items: [
      {
        question: '產品可以保存多久？',
        answer: '新鮮豆皮建議冷藏保存3至5天，冷凍可延長至30天，請依包裝標示為準。',
      },
      {
        question: '豆皮有分哪些種類？',
        answer: '目前提供傳統濕豆皮、乾燥豆皮與油炸豆皮等品項，依用途可選擇不同款式。',
      },
    ],
  },
  {
    category: '購買與服務',
    items: [
      {
        question: '有提供大量訂購或團購優惠嗎？',
        answer: '有的，我們提供大量採購及團購優惠，歡迎透過聯絡頁面與我們洽詢細節。',
      },
      {
        question: '可以直接到工廠現場購買嗎？',
        answer: '我們歡迎顧客現場選購，建議提前來電或線上預約，以便我們為您準備最新鮮的產品。',
      },
      {
        question: '是否有提供宅配服務？',
        answer: '是的，台灣本島皆可宅配，滿額還享免運優惠，詳情請見購買說明頁。',
      },
    ],
  },
  {
    category: '料理建議',
    items: [
      {
        question: '要怎麼加熱或料理豆皮？',
        answer: '豆皮可用煎、炸、煮、燉、涼拌等方式料理，建議先浸泡或汆燙能提升口感。',
      },
    ],
  },
]
