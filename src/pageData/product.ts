interface Category {
  key: string
  name: string
}

interface Product {
  id: number
  category: Category['key']
  shortName: string
  shortDesc: string
  price: string
  image: string
  hot: boolean
  new: boolean
  detail: {
    name: string
    desc: string
    expDate: string
    storage: string
    img1: string
    img2?: string
    img3?: string
    img4?: string
    img5?: string
    img6?: string
    img7?: string
    img8?: string
    img9?: string
    img10?: string
  }
}

export const categories: Category[] = [
  { key: 'oil', name: '油皮系列' },
  { key: 'bean', name: '豆包系列' },
  { key: 'jiao', name: '角羅系列' },
  { key: 'fuzhu', name: '腐竹系列' },
]

export const allProducts: Product[] = [
  {
    id: 1,
    category: 'oil',
    shortName: '黃金油皮',
    shortDesc: '人氣熱銷，口感Q彈。',
    price: 'NT$ 120',
    image: 'https://placehold.co/400x300/FF0000/fff?text=HuangJinYouPi',
    hot: true,
    new: false,
    detail: {
      name: '黃金油皮',
      desc: '人氣熱銷，口感Q彈。',
      expDate: '30天',
      storage: '常溫',
      img1: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-1',
      img2: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-2',
      img3: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-3',
      img4: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-4',
      img5: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-5',
      img6: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-6',
      img7: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-7',
      img8: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-8',
      img9: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-9',
      img10: 'https://placehold.co/400x300/indigo/fff?text=HuangJinYouPi-10',
    },
  },
  {
    id: 2,
    category: 'bean',
    shortName: '黃金豆包',
    shortDesc: '酥脆美味，百搭料理。',
    price: 'NT$ 150',
    image: 'https://placehold.co/400x300/00FF00/fff?text=HuangJinDouBao',
    hot: false,
    new: false,
    detail: {
      name: '黃金豆包',
      desc: '酥脆美味，百搭料理。',
      expDate: '30天',
      storage: '常溫',
      img1: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-1',
      img2: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-2',
      img3: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-3',
      img4: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-4',
      img5: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-5',
      img6: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-6',
      img7: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-7',
      img8: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-8',
      img9: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-9',
      img10: 'https://placehold.co/400x300/indigo/fff?text=HuangJinDouBao-10',
    },
  },
  {
    id: 3,
    category: 'jiao',
    shortName: '黃金角羅',
    shortDesc: '蔥香濃郁，回味無窮。',
    price: 'NT$ 130',
    image: 'https://placehold.co/400x300/0000FF/fff?text=HuangJinJiaoLuo',
    hot: false,
    new: true,
    detail: {
      name: '黃金角羅',
      desc: '蔥香濃郁，回味無窮。',
      expDate: '30天',
      storage: '常溫',
      img1: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-1',
      img2: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-2',
      img3: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-3',
      img4: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-4',
      img5: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-5',
      img6: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-6',
      img7: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-7',
      img8: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-8',
      img9: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-9',
      img10: 'https://placehold.co/400x300/indigo/fff?text=HuangJinJiaoLuo-10',
    },
  },
  {
    id: 4,
    category: 'fuzhu',
    shortName: '黃金腐竹',
    shortDesc: '微辣開胃，層次豐富。',
    price: 'NT$ 140',
    image: 'https://placehold.co/400x300/FF00FF/fff?text=HuangJinFuZhu',
    hot: true,
    new: true,
    detail: {
      name: '黃金腐竹',
      desc: '微辣開胃，層次豐富。',
      expDate: '30天',
      storage: '常溫',
      img1: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-1',
      img2: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-2',
      img3: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-3',
      img4: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-4',
      img5: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-5',
      img6: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-6',
      img7: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-7',
      img8: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-8',
      img9: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-9',
      img10: 'https://placehold.co/400x300/indigo/fff?text=HuangJinFuZhu-10',
    },
  },
]
