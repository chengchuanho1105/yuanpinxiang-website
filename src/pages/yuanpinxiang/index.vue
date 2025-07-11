<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Home' })

import { ref, onMounted } from 'vue'

import FeatureImageSection from '@/components/FeatureImageSection.vue'

import { loadCsvData } from '@/utils/googleSheets'

const HOME_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQl-nHGxTEuXLa7SO8bJrWoZLPI-7CacUzyYiJv6OtQIzRJbkZSqHm_pIqqOnZCcYdUi95AUB6B2xgb/pub?gid=0&single=true&output=csv'

interface HomeItem {
  title: string
  desc: string
  buttonText: string
  buttonLink: string
  align: 'left' | 'right' | undefined
  bgImage: string
  aos: string
  scrollDown?: boolean
}

const homeData = ref<HomeItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

type AlignType = 'left' | 'right'

// 首頁數據映射函式
const mapHomeItem = (item: Record<string, string>): HomeItem => {
  return {
    title: item.title || '',
    desc: item.desc || '',
    buttonText: item.buttonText || '',
    buttonLink: item.buttonLink || '',
    align: (item.align === 'left' || item.align === 'right') ? item.align as AlignType : 'left',
    bgImage: item.bgImage || '',
    aos: item.aos || '',
    scrollDown: true, // 預設值，稍後處理
  }
}

// 處理 scrollDown 邏輯
const processScrollDown = (items: HomeItem[], rawData: Record<string, string>[]): HomeItem[] => {
  return items.map((item, index) => {
    const scrollDownValue = rawData[index]?.scrollDown || ''
    const scrollDown = scrollDownValue === '' ? true :
      scrollDownValue.toUpperCase() === 'FALSE' ? false : true

    return {
      ...item,
      scrollDown
    }
  })
}

const loadHomeData = async () => {
  loading.value = true
  error.value = null
  try {
    homeData.value = await loadCsvData(
      HOME_CSV_URL,
      mapHomeItem,
      processScrollDown,
    )
  } catch {
    error.value = '無法載入首頁資料'
    homeData.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadHomeData()
})
</script>

<template>
  <div class="min-h-screen">
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-300">載入中...</span>
    </div>
    <div v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 max-w-xl mx-auto mt-10">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
        </div>
      </div>
    </div>
    <template v-else>
      <FeatureImageSection v-for="item in homeData" :key="item.title" :title="item.title" :description="item.desc"
        :button-text="item.buttonText" :button-link="item.buttonLink" :align="item.align" :bg-image="item.bgImage"
        :aos="item.aos" :scroll-down="item.scrollDown" />
    </template>
  </div>
</template>

<style scoped></style>
