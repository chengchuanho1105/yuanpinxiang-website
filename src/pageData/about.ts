interface FounderItem {
  name: string
  title: string
  desc: string
}

export const founderData: FounderItem[] = [
  {
    name: '林先生',
    title: '創辦人',
    desc: '36歲創業，帶著對台灣傳統豆皮工藝的熱愛與堅持，投入豆製品產業數十載。<br>他深信，唯有遵循古法手工製作，嚴選台灣在地非基因改造大豆，才能煉出真正香醇、令人安心的豆皮。<br>以職人精神，親力親為每一個製作環節，將對土地的情感，融入每一張豆皮之中。',
  },
]

interface TimelineItem {
  icon: string
  title: string
  year: string
  desc: string
}

export const timelineData: TimelineItem[] = [
  {
    icon: 'bi-geo-alt-fill',
    title: '創業起點',
    year: '1985',
    desc: '貸款數百萬，於濁水溪畔扎根。懷抱理想與毅力，創辦人投入大量資金，選址於水質優良的濁水溪畔，正式展開豆皮事業的第一步。',
  },
  {
    icon: 'bi-rocket-takeoff',
    title: '成長階段',
    year: '1988',
    desc: '製程調整，找出黃豆與石灰質水源的最佳比例。經過三年不斷嘗試與優化，團隊成功掌握原料與水質的黃金比例，使豆皮口感與品質雙雙升級，奠定市場口碑。',
  },
  {
    icon: 'bi-arrows-angle-expand',
    title: '技術升級',
    year: '2007',
    desc: '引進先進設備，提升品質與產能。因應市場需求與品質提升目標，引進先進製造設備，自動化流程逐步成形，確保穩定生產並符合國際標準。',
  },
  {
    icon: 'bi-airplane-engines',
    title: '外銷拓展',
    year: '2020',
    desc: '進軍國際市場，成為台灣之光。憑藉穩定品質與口感特色，產品成功進軍國際市場，每年外銷量逾 20 公噸。主要銷往歐美日等地，打響臺灣豆皮品牌。',
  },
]
