// 通用 Google Sheets CSV 讀取工具

// 取得 Google Sheets CSV 原始內容
export const fetchGoogleSheetCsv = async (csvUrl: string): Promise<string> => {
  const response = await fetch(csvUrl, {
    method: 'GET',
    headers: { Accept: 'text/csv' },
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return await response.text()
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

// 通用載入函式：處理CSV數據的載入、映射和後處理
export const loadCsvData = async <T, R>(
  csvUrl: string,
  mapper: (item: Record<string, string>) => T,
  processor?: (mappedData: T[], rawData: Record<string, string>[]) => R,
): Promise<R> => {
  const csv = await fetchGoogleSheetCsv(csvUrl)
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
