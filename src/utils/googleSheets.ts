interface FaqItem {
  question: string
  answer: string
}

interface FaqList {
  category: string
  items: FaqItem[]
}

// Google Sheets 的公開 URL (CSV 格式)
const GOOGLE_SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBfQ7Y7BhxlwA-9BJ7FFLbMNLxhZh_Q8gHe5tXuwhk62Ofy6BX1lSVuyZybzQTLFvz3TeARDlEpj3_/pub?gid=0&single=true&output=csv'

// 解析 CSV 數據
const parseCsv = (csvText: string): FaqList[] => {
  try {
    const lines = csvText.trim().split('\n')

    // 如果沒有數據，返回空數組
    if (lines.length < 2) {
      return []
    }

    // 跳過標題行，從第二行開始處理數據
    const dataLines = lines.slice(1)

    // 按分類分組
    const groupedData: Record<string, FaqItem[]> = {}

    dataLines.forEach((line) => {
      // 處理 CSV 行，考慮引號內的逗號
      const values: string[] = []
      let current = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      values.push(current.trim()) // 添加最後一個值

      // 移除引號
      const cleanValues = values.map((v) => v.replace(/^"|"$/g, ''))

      const category = cleanValues[0] || '其他'
      const question = cleanValues[1] || ''
      const answer = cleanValues[2] || ''

      if (question && answer) {
        if (!groupedData[category]) {
          groupedData[category] = []
        }
        groupedData[category].push({ question, answer })
      }
    })

    // 轉換為 FaqList 格式
    return Object.entries(groupedData).map(([category, items]) => ({
      category,
      items,
    }))
  } catch (error) {
    console.error('Error parsing CSV:', error)
    return []
  }
}

// 從 Google Sheets 獲取 FAQ 數據
export const fetchFaqFromGoogleSheets = async (): Promise<FaqList[]> => {
  try {
    console.log('Fetching FAQ data from Google Sheets...')

    const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
      method: 'GET',
      headers: {
        Accept: 'text/csv',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    console.log('CSV data received:', csvText.substring(0, 200) + '...')

    const data = parseCsv(csvText)
    console.log('Parsed FAQ data:', data)

    return data
  } catch (error) {
    console.error('Error fetching FAQ data from Google Sheets:', error)
    // 如果無法從 Google Sheets 獲取數據，返回空數組
    return []
  }
}

// 備用方案：如果 Google Sheets 無法訪問，使用本地數據
export const getFallbackFaqData = (): FaqList[] => {
  return [
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
      ],
    },
    {
      category: '產品資訊',
      items: [
        {
          question: '產品可以保存多久？',
          answer: '新鮮豆皮建議冷藏保存3至5天，冷凍可延長至30天，請依包裝標示為準。',
        },
      ],
    },
  ]
}
