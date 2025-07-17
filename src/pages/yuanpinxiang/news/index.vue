<script setup lang="ts">
defineOptions({ name: 'ChuanLife-News' })

// ---------- Vue 核心工具函式 ----------
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'

// ---------- 組件引入區（版面用） ----------
import DecorSection from '@/components/DecorSection.vue'

// ---------- 工具函式 ----------
import { useHybridData } from '@/composables/useHybridData'

// ---------- 資料來源 ----------
import localNewsData from '@/data/pageData/yuanpinxiang/news/newsData.json' // 本地新聞資料

/** ========== News Data 資料處裡 ========== */

/** 1. News Data 的資料格式 */
interface NewsData {
  id: string
  slot: string
  title: string
  content: string
  category?: string
  date?: string
  image?: string
  author?: string
  tags?: string
  featured?: boolean
}

/** 2. 取得 News Data CSV 來源 */
const NEWS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSpK4IAJ0lQCD_pEHh4smflPpCiMbgsMqUfp24uQc-0Ru87ZN2izl7W-O9GbL97Ej6mPGb1eHfd37hx/pub?output=csv'

/** 3. 定義 CSV 欄位轉換函式 */
const mapNewsData = (item: Record<string, string>): NewsData => {
  return {
    id: item.id || '',
    slot: item.slot || '',
    category: item.category || '',
    date: item.date || '',
    author: item.author || '',
    image: item.image || '',
    tags: item.tags || '',
    title: item.title || '',
    content: item.content || ''
  }
}

const {
  data: newsData,
  load: loadNewsData
} = useHybridData<NewsData>(
  localNewsData as unknown as NewsData[],
  NEWS_CSV_URL,
  mapNewsData
)

onMounted(() => {
  loadNewsData()
})

// 分頁設定
const PAGE_SIZE = 6

// 過濾資料
const regularNewsList = computed(() => newsData.value.filter(n => n.slot !== 'none' && n.slot !== 'featured'))
const featuredNewsList = computed(() => newsData.value.filter(n => n.slot === 'featured'))

// 最新消息分頁
const regularPage = ref(1)
const regularTotalPages = computed(() => Math.ceil(regularNewsList.value.length / PAGE_SIZE))
const regularPaged = computed(() => regularNewsList.value.slice((regularPage.value - 1) * PAGE_SIZE, regularPage.value * PAGE_SIZE))

// 特色新聞分頁
const featuredPage = ref(1)
const featuredTotalPages = computed(() => Math.ceil(featuredNewsList.value.length / PAGE_SIZE))
const featuredPaged = computed(() => featuredNewsList.value.slice((featuredPage.value - 1) * PAGE_SIZE, featuredPage.value * PAGE_SIZE))

// 同頁面跳轉新聞詳情
const router = useRouter()
function openNewsDetail(news: NewsData) {
  router.push(`/news/${news.id}`)
}

// 日期格式化
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
}

const regularSectionRef = ref<InstanceType<typeof DecorSection> | null>(null)
const featuredSectionRef = ref<InstanceType<typeof DecorSection> | null>(null)

function scrollToSection(sectionRef: Ref<InstanceType<typeof DecorSection> | null>) {
  const el = sectionRef.value?.$el || sectionRef.value
  if (el && typeof el.getBoundingClientRect === 'function') {
    const navbarHeight = 80 // 請依實際 navbar 高度調整
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function goToRegularPage(page: number) {
  scrollToSection(regularSectionRef)
  regularPage.value = page
}
function goToFeaturedPage(page: number) {
  scrollToSection(featuredSectionRef)
  featuredPage.value = page
}

</script>

<template>
  <div class="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
    <!-- 最新消息區塊 -->
    <DecorSection ref="regularSectionRef" main-title="最新消息" en-title="LATEST NEWS">
      <div v-if="regularPaged.length > 0" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="news in regularPaged" :key="news.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            @click="openNewsDetail(news)">
            <div class="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <img :src="news.image" :alt="news.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full">
                  {{ news.category }}
                </span>
                <span v-if="news.slot && news.slot !== 'none' && news.slot !== 'featured'"
                  class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                  {{ news.slot }}
                </span>
              </div>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {{ news.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {{ news.content }}
              </p>
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{{ formatDate(news.date || '') }}</span>
                <span>{{ news.author }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 分頁控制 -->
        <div v-if="regularTotalPages > 1" class="flex justify-center items-center gap-2 mt-6">
          <button @click="goToRegularPage(regularPage - 1)" :disabled="regularPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
            上一頁
          </button>
          <div class="flex gap-1">
            <button v-for="page in regularTotalPages" :key="page" @click="goToRegularPage(page)" :class="[
              'px-3 py-2 text-sm font-medium rounded-md',
              regularPage === page
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
            ]">
              {{ page }}
            </button>
          </div>
          <button @click="goToRegularPage(regularPage + 1)" :disabled="regularPage === regularTotalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
            下一頁
          </button>
        </div>
      </div>
      <div v-else class="text-center py-20 text-gray-500 dark:text-gray-400">沒有最新消息</div>
    </DecorSection>

    <!-- 特色新聞區塊 -->
    <DecorSection ref="featuredSectionRef" main-title="特色新聞" en-title="FEATURED NEWS">
      <div v-if="featuredPaged.length > 0" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="news in featuredPaged" :key="news.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            @click="openNewsDetail(news)">
            <div class="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <img :src="news.image" :alt="news.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-full">
                  {{ news.category }}
                </span>
                <span v-if="news.featured"
                  class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full">
                  特色
                </span>
                <span v-if="news.slot && news.slot !== 'none'"
                  class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                  {{ news.slot }}
                </span>
              </div>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {{ news.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {{ news.content }}
              </p>
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{{ formatDate(news.date || '') }}</span>
                <span>{{ news.author }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 分頁控制 -->
        <div v-if="featuredTotalPages > 1" class="flex justify-center items-center gap-2 mt-6">
          <button @click="goToFeaturedPage(featuredPage - 1)" :disabled="featuredPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
            上一頁
          </button>
          <div class="flex gap-1">
            <button v-for="page in featuredTotalPages" :key="page" @click="goToFeaturedPage(page)" :class="[
              'px-3 py-2 text-sm font-medium rounded-md',
              featuredPage === page
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
            ]">
              {{ page }}
            </button>
          </div>
          <button @click="goToFeaturedPage(featuredPage + 1)" :disabled="featuredPage === featuredTotalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
            下一頁
          </button>
        </div>
      </div>
      <div v-else class="text-center py-20 text-gray-500 dark:text-gray-400">沒有特色新聞</div>
    </DecorSection>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
}
</style>
