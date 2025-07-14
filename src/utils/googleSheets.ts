// 通用 Google Sheets CSV 讀取工具

// 本地快取
const cache = new Map<string, { data: string; timestamp: number; ttl: number }>()

// 快取管理
const getCachedData = (key: string): string | null => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return cached.data
  }
  return null
}

const setCachedData = (key: string, data: string, ttl: number = 5 * 60 * 1000) => {
  cache.set(key, { data, timestamp: Date.now(), ttl })
}

// 取得 Google Sheets CSV 原始內容（帶快取）
export const fetchGoogleSheetCsv = async (
  csvUrl: string,
  useCache: boolean = true,
): Promise<string> => {
  // 檢查快取
  if (useCache) {
    const cached = getCachedData(csvUrl)
    if (cached) {
      return cached
    }
  }

  const response = await fetch(csvUrl, {
    method: 'GET',
    headers: { Accept: 'text/csv' },
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

  const data = await response.text()

  // 儲存到快取
  if (useCache) {
    setCachedData(csvUrl, data)
  }

  return data
}

// 通用 CSV 解析，回傳 Record<string, string>[]
export const parseCsv = (csvText: string): Record<string, string>[] => {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  // 清理欄位名稱，移除 \r 等特殊字符
  const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').replace(/\r/g, ''))
  return lines.slice(1).map((line) => {
    const values: string[] = []
    let current = '',
      inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') inQuotes = !inQuotes
      else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else current += char
    }
    values.push(current.trim())

    const obj: Record<string, string> = {}
    headers.forEach((h, i) => {
      // 清理值中的 \r 字符
      obj[h] = (values[i] || '').replace(/^"|"$/g, '').replace(/\r/g, '')
    })
    return obj
  })
}

// 通用映射函式：將CSV數據映射成指定結構
export const mapCsvData = <T>(
  data: Record<string, string>[],
  mapper: (item: Record<string, string>) => T,
): T[] => {
  return data.map(mapper)
}

// 通用載入函式：處理CSV數據的載入、映射和後處理（帶快取）
export const loadCsvData = async <T, R>(
  csvUrl: string,
  mapper: (item: Record<string, string>) => T,
  processor?: (mappedData: T[], rawData: Record<string, string>[]) => R,
  useCache: boolean = true,
): Promise<R> => {
  const csv = await fetchGoogleSheetCsv(csvUrl, useCache)
  const rawData = parseCsv(csv)

  // 先映射數據
  const mappedData = mapCsvData(rawData, mapper)

  // 如果有後處理函式，則執行後處理
  if (processor) {
    return processor(mappedData, rawData)
  }

  // 否則直接返回映射後的數據
  return mappedData as unknown as R
}

// 背景更新快取
export const refreshCacheInBackground = async (csvUrl: string) => {
  try {
    console.log('背景更新快取...')
    await fetchGoogleSheetCsv(csvUrl, false) // 不使用快取，強制更新
    console.log('快取更新完成')
  } catch (error) {
    console.error('背景更新快取失敗:', error)
  }
}
