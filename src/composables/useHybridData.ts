import { ref } from 'vue'
import { loadCsvData } from '@/utils/googleSheets'

export function useHybridData<T>(
  localData: T[],
  sheetUrl: string,
  mapFn: (item: Record<string, string>) => T,
  delay = 500,
) {
  const data = ref<T[]>(localData)
  const isUsingLocal = ref(true)
  const loading = ref(false)

  const load = async () => {
    data.value = localData
    isUsingLocal.value = true
    loading.value = true

    setTimeout(async () => {
      try {
        const sheetData = await loadCsvData<T, T[]>(sheetUrl, mapFn, undefined, true)
        if (sheetData && sheetData.length > 0) {
          data.value = sheetData
          isUsingLocal.value = false
        }
      } finally {
        loading.value = false
      }
    }, delay)
  }

  return { data, isUsingLocal, loading, load }
}
