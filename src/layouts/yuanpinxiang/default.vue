<script setup lang="ts">
defineOptions({ name: 'Layout-Yuanpinxiang-Default' })

// ---------- Vue 核心工具函式 ----------
import { computed, ref, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'

// ---------- 組件引入區（版面用） ----------
import Navbar from '@/components/layouts/navbar/Navbar.vue'
import UnderConstructionBanner from '@/components/UnderConstructionBanner.vue'
import Banner from '@/components/layouts/Banner.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import Breadcrumb from '@/components/layouts/Breadcrumb.vue'
import Footer from '@/components/layouts/Footer.vue'

// ---------- 工具函式與資料來源 ----------
import { loadCsvData } from '@/utils/googleSheets' // Google Sheets CSV 載入工具
import localHomeCarouselData from '@/data/pageData/home/carouselData.json' // 本地輪播圖資料

// 判斷是否為首頁
const route = useRoute() // 取得當前路由
const isHomePage = computed(() => {
  return route.path === '/'
})

/** ========== Home Carousel Data 資料處裡 ========== */

/** 1. Home Carousel Data 的資料格式 */
interface HomeCarouselData {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  bgImage?: string
  videoUrl?: string
  videoType?: 'mp4' | 'webm' | unknown
}

/** 2. 定義 Home Carousel Data 初始狀態 */
const homeCarouselData = ref<HomeCarouselData[]>(localHomeCarouselData as HomeCarouselData[]) // 預設為使用 Local Home Carousel Data
const isUsingLocalHomeCarouselData = ref(true) // Home Carousel Data 是否使用 Local Home Carousel Data

/** 3. 取得 Home Carousel Data CSV 來源 */
const HOMECAROUSELDATA_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQl-nHGxTEuXLa7SO8bJrWoZLPI-7CacUzyYiJv6OtQIzRJbkZSqHm_pIqqOnZCcYdUi95AUB6B2xgb/pub?output=csv'

/** 4. 定義 CSV 欄位轉換函式 */
const mapHomeCarouselData = (item: Record<string, string>): HomeCarouselData => {
  return {
    title: item.title || '',
    description: item.description || '',
    buttonText: item.buttonText || '',
    buttonLink: item.buttonLink || '',
    bgImage: item.bgImage || '',
    videoUrl: item.videoUrl || '',
    videoType: item.videoType || 'mp4',
  }
}

/** 5. 載入 Home Carousel Data */
const loadHomeCarouselData = async () => {
  if (!isHomePage.value) return  // 如果不是首頁，則不載入任何 Home Carousel Data

  homeCarouselData.value = localHomeCarouselData as HomeCarouselData[]  // 立即顯示 Local Home Carousel Data
  isUsingLocalHomeCarouselData.value = true  // 保持使用 Local Home Carousel Data

  /** 背景載入 Google Sheets Home Carousel Data */
  setTimeout(async () => {
    // 載入 Google Sheets Home Carousel Data
    const sheetData = await loadCsvData<HomeCarouselData, HomeCarouselData[]>(
      HOMECAROUSELDATA_CSV_URL,
      mapHomeCarouselData,
      undefined,
      true // 使用快取
    )
    // 若成功從 Google Sheets 取得資料則覆蓋 Local Home Carousel Data
    if (sheetData && sheetData.length > 0) {
      homeCarouselData.value = sheetData
      isUsingLocalHomeCarouselData.value = false
    }
  }, 500) // 0.5秒後開始背景載入
}

/** 6. 在頁面載入時，載入 Google Sheets Home Carousel Data */
onMounted(() => {
  loadHomeCarouselData()
})
</script>

<template>
  <div class="min-h-screen bg-sky-50 dark:bg-sky-950">
    <header>
      <Navbar />
      <UnderConstructionBanner />
      <Banner>
        <template v-if="isHomePage">
          <ImageCarousel :items="homeCarouselData" :auto-play="true" :interval="5000" :show-indicators="true"
            :show-arrows="true" />
        </template>
        <template v-else>
          <div class="relative w-full h-full bg-black">
            <img src="/src/assets/media/og-img/yuanpinxiang/og-img.png"
              class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="relative z-10 flex flex-col items-center justify-center h-full">
              <h1 class="text-4xl md:text-6xl font-extrabold text-white"></h1>
              <p class="mt-4 text-lg text-white/80"></p>
            </div>
          </div>
        </template>
      </Banner>
      <Breadcrumb :style="'default'" />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped></style>
