<script setup lang="ts">
defineOptions({ name: 'CrazyClown-Home' })

// ---------- Vue 核心工具函式 ----------
import { onMounted } from 'vue'

// ---------- 組件引入區（版面用） ----------
import FeatureImageSection from '@/components/FeatureImageSection.vue'

// ---------- 工具函式 ----------
import { useHybridData } from '@/composables/useHybridData'

// ---------- 資料來源 ----------
import localHomeHeroData from '@/data/pageData/crazyclown/home/heroData.json'

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

/** 2. 取得 Home Hero Data CSV 來源 */
const HOMEHERODATA_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRzBzSCLW9Ch8Hdo6fPDZKfdT1qhlFr9h3o-r3y4ZQsx7BvnkFw4hwCilPvU5bwWaP2N3llAX0S_Ud/pub?output=csv'

/** 3. 定義 CSV 欄位轉換函式 */
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

const {
  data: homeHeroData,
  loading: homeHeroLoading,
  load: loadHomeHeroData
} = useHybridData<HomeHeroData>(
  localHomeHeroData as HomeHeroData[],
  HOMEHERODATA_CSV_URL,
  mapHomeHeroData
)

onMounted(() => {
  loadHomeHeroData()
})
</script>

<template>
  <div v-if="homeHeroLoading" class="flex justify-center items-center py-20">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    <span class="ml-3 text-gray-600 dark:text-gray-300">載入中...</span>
  </div>
  <div v-else-if="homeHeroData.length === 0" class="bg-red-50 ...">
    <p class="text-sm text-red-700 dark:text-red-300">無法載入首頁資料</p>
  </div>
  <template v-else>
    <FeatureImageSection v-for="item in homeHeroData" :key="item.title" :title="item.title"
      :description="item.description" :button-text="item.buttonText" :button-link="item.buttonLink" :align="item.align"
      :bg-image="item.bgImage" :aos="item.aos" :scroll-down="item.scrollDown" />
  </template>
</template>

<style scoped></style>
