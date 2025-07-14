<script setup lang="ts">
defineOptions({ name: 'YuanPinXiang-Home' })

// ---------- Vue 核心工具函式 ----------
import { ref, onMounted } from 'vue'

// ---------- 組件引入區（版面用） ----------
import FeatureImageSection from '@/components/FeatureImageSection.vue'

// ---------- 工具函式 ----------
import { loadCsvData } from '@/utils/googleSheets' // Google Sheets CSV 載入工具

// ---------- 資料來源 ----------
import localHomeHeroData from '@/data/pageData/home/heroData.json' // 本地輪播圖資料

/** ========== Home Hero Data 資料處裡 ========== */

/** 1. Home Hero Data 的資料格式 */
interface HomeHeroData {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  align: 'left' | 'right' | undefined
  bgImage: string
  aos: string
  scrollDown?: boolean
}

/** 2. 定義 Home Hero Data 初始狀態 */
const homeHeroData = ref<HomeHeroData[]>(localHomeHeroData as HomeHeroData[]) // 預設為使用 Local Home Hero Data
const isUsingLocalHomeHeroData = ref(true) // Home Hero Data 是否使用 Local Home Hero Data

/** 3. 取得 Home Hero Data CSV 來源 */
const HOMEHERODATA_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvyWYaAHF29Jn2svQBJFhfZH-MKW4QfVqIG5o_a0GKTWZd2-qAxKevUe5d7qYUCgmIIVL_OMRehIVf/pub?gid=0&single=true&output=csv'

/** 4. 定義 CSV 欄位轉換函式 */
const mapHomeHeroData = (item: Record<string, string>): HomeHeroData => {
  return {
    title: item.title || '',
    description: item.description || '',
    buttonText: item.buttonText || '',
    buttonLink: item.buttonLink || '',
    align: (item.align === 'left' || item.align === 'right') ? item.align : 'left',
    bgImage: item.bgImage || '',
    aos: item.aos || '',
    scrollDown:
      typeof item.scrollDown === 'string'
        ? (item.scrollDown.trim().toLowerCase() === 'true'
          ? true
          : item.scrollDown.trim().toLowerCase() === 'false'
            ? false
            : undefined)
        : typeof item.scrollDown === 'boolean'
          ? item.scrollDown
          : undefined,
  }
}

/** 5. 載入 Home Hero Data */
const loadHomeHeroData = async () => {
  // 立即顯示 Local Home Hero Data，並修正型別轉換問題
  homeHeroData.value = (localHomeHeroData as unknown as HomeHeroData[])
  isUsingLocalHomeHeroData.value = true  // 保持使用 Local Home Hero Data

  /** 背景載入 Google Sheets Home Hero Data */
  setTimeout(async () => {
    // 載入 Google Sheets Home Hero Data
    const sheetData = await loadCsvData<HomeHeroData, HomeHeroData[]>(
      HOMEHERODATA_CSV_URL,
      mapHomeHeroData,
      undefined,
      true // 使用快取
    )
    // 若成功從 Google Sheets 取得資料則覆蓋 Local Home Hero Data
    if (sheetData && sheetData.length > 0) {
      homeHeroData.value = sheetData
      isUsingLocalHomeHeroData.value = false
    }
  }, 500) // 0.5秒後開始背景載入
}

/** 6. 在頁面載入時，載入 Google Sheets Home Hero Data */
onMounted(() => {
  loadHomeHeroData()
})
</script>

<template>
  <div class="min-h-screen">
    <div v-if="isUsingLocalHomeHeroData && (!homeHeroData || homeHeroData.length === 0)"
      class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-300">載入中...</span>
    </div>
    <div v-else-if="homeHeroData.length === 0" class="bg-red-50 ...">
      <p class="text-sm text-red-700 dark:text-red-300">無法載入首頁資料</p>
    </div>
    <template v-else>
      <FeatureImageSection v-for="item in homeHeroData" :key="item.title" :title="item.title"
        :description="item.description" :button-text="item.buttonText" :button-link="item.buttonLink"
        :align="item.align" :bg-image="item.bgImage" :aos="item.aos" :scroll-down="item.scrollDown" />
    </template>
  </div>
</template>

<style scoped></style>
