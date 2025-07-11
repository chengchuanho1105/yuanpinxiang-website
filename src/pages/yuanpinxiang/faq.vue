<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Faq' })

import { ref, onMounted } from 'vue'
import { fetchFaqFromGoogleSheets, getFallbackFaqData } from '@/utils/googleSheets'

interface FaqItem {
  question: string
  answer: string
}

interface FaqList {
  category: string
  items: FaqItem[]
}

// 響應式數據
const faqList = ref<FaqList[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// 每個分類各自記錄展開的 index
const openIndexes = ref<Record<string, number | null>>({})

function toggle(category: string, idx: number) {
  openIndexes.value[category] = openIndexes.value[category] === idx ? null : idx
}

// 初始化展開狀態
const initializeOpenIndexes = (data: FaqList[]) => {
  data.forEach(list => {
    openIndexes.value[list.category] = null
  })
}

// 載入 FAQ 數據
const loadFaqData = async () => {
  try {
    loading.value = true
    error.value = null

    // 嘗試從 Google Sheets 獲取數據
    const data = await fetchFaqFromGoogleSheets()

    if (data.length > 0) {
      faqList.value = data
    } else {
      // 如果 Google Sheets 沒有數據，使用備用數據
      faqList.value = getFallbackFaqData()
    }

    // 初始化展開狀態
    initializeOpenIndexes(faqList.value)

  } catch (err) {
    console.error('Failed to load FAQ data:', err)
    error.value = '無法載入 FAQ 數據，請稍後再試'
    // 使用備用數據
    faqList.value = getFallbackFaqData()
    initializeOpenIndexes(faqList.value)
  } finally {
    loading.value = false
  }
}

// 組件掛載時載入數據
onMounted(() => {
  loadFaqData()
})
</script>

<template>
  <section class="max-w-2xl mx-auto py-10 px-4">
    <div class="flex items-end justify-between mb-10">
      <h1 class="text-3xl md:text-4xl font-bold tracking-wide text-gray-800 dark:text-white">常見問題</h1>
      <span class="text-base md:text-lg text-gray-400 font-semibold tracking-widest uppercase ml-4">FAQ</span>
    </div>

    <!-- 載入狀態 -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-300">載入中...</span>
    </div>

    <!-- 錯誤訊息 -->
    <div v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
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

    <!-- FAQ 內容 -->
    <div v-if="!loading && faqList.length > 0" class="space-y-10">
      <div v-for="list in faqList" :key="list.category">
        <h2
          class="text-xl md:text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4 border-l-4 border-indigo-400 pl-3">
          {{ list.category }}</h2>
        <div class="flex flex-col gap-3">
          <div v-for="(item, idx) in list.items" :key="item.question"
            class="bg-white/90 dark:bg-indigo-950/90 rounded-xl shadow border border-gray-100 dark:border-indigo-900 overflow-hidden transition-colors">
            <button
              class="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-gray-800 dark:text-gray-100 focus:outline-none hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors"
              :aria-expanded="openIndexes[list.category] === idx" @click="toggle(list.category, idx)">
              <span>{{ item.question }}</span>
              <svg class="ml-3 transition-transform duration-300"
                :class="{ 'rotate-180': openIndexes[list.category] === idx }" width="20" height="20"
                viewBox="0 0 20 20">
                <polyline points="6 8 10 12 14 8" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div class="px-5 overflow-hidden transition-all duration-300"
              :class="openIndexes[list.category] === idx ? 'max-h-40 py-2' : 'max-h-0 py-0'">
              <div class="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 無數據狀態 -->
    <div v-else-if="!loading && faqList.length === 0" class="text-center py-20">
      <div class="text-gray-500 dark:text-gray-400">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-medium">暫無常見問題</p>
        <p class="text-sm">請稍後再試或聯繫客服</p>
      </div>
    </div>
  </section>
</template>
