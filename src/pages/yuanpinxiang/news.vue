<script setup lang="ts">
defineOptions({ name: 'ChuanLife-News' })

import { ref, computed, onMounted } from 'vue'
import DecorSection from '@/components/DecorSection.vue'
import { loadCsvData } from '@/utils/googleSheets'

// Google Sheets URL
const NEWS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQl-nHGxTEuXLa7SO8bJrWoZLPI-7CacUzyYiJv6OtQIzRJbkZSqHm_pIqqOnZCcYdUi95AUB6B2xgb/pub?gid=1&single=true&output=csv'

// 新聞項目介面
interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  date: string
  image?: string
  author?: string
  tags?: string[]
  featured?: boolean
}

// 狀態管理
const newsData = ref<NewsItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const selectedCategory = ref('全部')
const selectedNews = ref<NewsItem | null>(null)
const showNewsDetail = ref(false)

// 分類選項（目前未使用，保留供未來搜尋功能使用）
// const categories = computed(() => {
//   const cats = ['全部', ...new Set(newsData.value.map(item => item.category))]
//   return cats
// })

// 篩選後的新聞
const filteredNews = computed(() => {
  let filtered = newsData.value

  // 分類篩選
  if (selectedCategory.value !== '全部') {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }

  // 搜尋篩選
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// 特色新聞分頁
const featuredNewsPage = ref(1)
const featuredNewsPerPage = 3

// 特色新聞
const featuredNews = computed(() => {
  const allFeatured = newsData.value.filter(item => item.featured)
  const start = (featuredNewsPage.value - 1) * featuredNewsPerPage
  return allFeatured.slice(start, start + featuredNewsPerPage)
})

// 特色新聞總頁數
const featuredNewsTotalPages = computed(() => {
  const total = newsData.value.filter(item => item.featured).length
  return Math.ceil(total / featuredNewsPerPage)
})

// 一般新聞
const regularNews = computed(() =>
  filteredNews.value.filter(item => !item.featured)
)

// 新聞數據映射函式
const mapNewsItem = (item: Record<string, string>): NewsItem => {
  return {
    id: item.id || Math.random().toString(36).substr(2, 9),
    title: item.title || '',
    content: item.content || '',
    category: item.category || '一般',
    date: item.date || new Date().toISOString().split('T')[0],
    image: item.image || '',
    author: item.author || '源品香團隊',
    tags: item.tags ? item.tags.split(',').map(tag => tag.trim()) : [],
    featured: item.featured === 'true'
  }
}

// 載入新聞數據
const loadNewsData = async () => {
  loading.value = true
  error.value = null
  try {
    newsData.value = await loadCsvData(
      NEWS_CSV_URL,
      mapNewsItem
    )
  } catch {
    // 如果Google Sheets載入失敗，使用預設數據
    newsData.value = [
      {
        id: '1',
        title: '源品香豆皮榮獲',
        content: '我們很榮幸地宣布，源品香豆皮在年評鑑中榮獲。這項殊榮肯定了我們在產品品質、食品安全和傳統工藝傳承方面的堅持與努力。評審委員特別讚揚我們的豆皮口感Q彈、香氣濃郁，且完全無添加防腐劑，是真正健康美味的豆製品。',
        category: '獲獎消息',
        date: '2099-12-15',
        image: 'https://picsum.photos/400/250?random=1',
        author: '源品香團隊',
        tags: ['獲獎', '品質認證', '豆皮'],
        featured: true
      },
      {
        id: '2',
        title: '新產品上市：有機XX系列',
        content: '為了回應消費者對有機食品的需求，我們特別推出有機XX系列。這系列產品採用100%有機認證的台灣黃豆製作，從種植到加工全程有機管理，讓您享受最純淨的美味。',
        category: '產品資訊',
        date: '2024-12-10',
        image: 'https://picsum.photos/400/250?random=2',
        author: '產品研發部',
        tags: ['新產品', '有機', '黃豆'],
        featured: false
      },
      {
        id: '3',
        title: '源品香參與2099年XX食品展',
        content: '源品香將於2099年12月20-23日參與XX國際食品展，展位號碼為A區123號。我們將展示最新的產品系列，並提供現場試吃活動。歡迎各位朋友前來參觀，體驗源品香的獨特風味。',
        category: '活動訊息',
        date: '2099-12-05',
        image: 'https://picsum.photos/400/250?random=3',
        author: '行銷部',
        tags: ['展覽', '試吃', '台北'],
        featured: false
      },
      {
        id: '4',
        title: '豆皮製作工藝傳承：老師傅的堅持',
        content: '在現代化製程當道的時代，源品香仍堅持傳統手工製作豆皮。我們的老師傅們擁有超過30年的製作經驗，每一張豆皮都承載著職人的堅持與對品質的追求。這篇文章將帶您深入了解豆皮製作的傳統工藝。',
        category: '品牌故事',
        date: '2024-12-01',
        image: 'https://picsum.photos/400/250?random=4',
        author: '品牌故事部',
        tags: ['工藝', '傳承', '老師傅'],
        featured: true
      },
      {
        id: '5',
        title: '豆皮營養價值解析：為什麼豆皮是健康選擇？',
        content: '豆皮不僅美味，更是營養豐富的健康食品。它富含優質蛋白質、膳食纖維和多種維生素礦物質。本文將詳細解析豆皮的營養成分，以及如何將豆皮融入日常飲食中，為您的健康加分。',
        category: '健康資訊',
        date: '2024-11-25',
        image: 'https://picsum.photos/400/250?random=5',
        author: '營養師',
        tags: ['營養', '健康', '蛋白質'],
        featured: true
      },
      {
        id: '6',
        title: '源品香榮獲ISO 22000食品安全管理系統認證',
        content: '我們很榮幸地宣布，源品香已成功通過ISO 22000食品安全管理系統認證。這項國際認證肯定了我們在食品安全管理方面的專業水準，確保每一張豆皮都符合最高品質標準。',
        category: '品質認證',
        date: '2024-11-20',
        image: 'https://picsum.photos/400/250?random=6',
        author: '品質管理部',
        tags: ['ISO認證', '食品安全', '品質管理'],
        featured: true
      },
      {
        id: '7',
        title: '傳統豆皮製作技藝列入文化遺產保護',
        content: '源品香傳承的傳統豆皮製作技藝已被列入地方文化遺產保護名錄。這項殊榮不僅是對我們技藝的肯定，更是對傳統美食文化傳承的重要里程碑。',
        category: '文化傳承',
        date: '2024-11-15',
        image: 'https://picsum.photos/400/250?random=7',
        author: '文化傳承部',
        tags: ['文化遺產', '傳統技藝', '傳承'],
        featured: true
      }
    ]
  } finally {
    loading.value = false
  }
}

// 查看新聞詳情
const viewNewsDetail = (news: NewsItem) => {
  selectedNews.value = news
  showNewsDetail.value = true
}

// 關閉新聞詳情
const closeNewsDetail = () => {
  showNewsDetail.value = false
  selectedNews.value = null
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  loadNewsData()
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 md:p-8">

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

    <!-- 新聞內容 -->
    <div v-else class="space-y-8">
      <!-- 搜尋和篩選
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div class="flex flex-col md:flex-row gap-4">

          <div class="flex-1">
            <div class="relative">
              <input v-model="searchQuery" type="text" placeholder="搜尋新聞標題、內容或標籤..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>


          <div class="md:w-48">
            <select v-model="selectedCategory"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>
      -->

      <!-- 最新消息 -->
      <DecorSection main-title="最新消息" en-title="LATEST NEWS">
        <div v-if="regularNews.length > 0" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="news in regularNews" :key="news.id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              @click="viewNewsDetail(news)">
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
                </div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {{ news.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {{ news.content }}
                </p>
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{{ formatDate(news.date) }}</span>
                  <span>{{ news.author }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DecorSection>

      <!-- 特色新聞 -->
      <DecorSection main-title="特色新聞" en-title="FEATURED NEWS">
        <div v-if="featuredNews.length > 0" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="news in featuredNews" :key="news.id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              @click="viewNewsDetail(news)">
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
                </div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {{ news.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {{ news.content }}
                </p>
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{{ formatDate(news.date) }}</span>
                  <span>{{ news.author }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 分頁控制 -->
          <div v-if="featuredNewsTotalPages > 1" class="flex justify-center items-center gap-2 mt-6">
            <button @click="featuredNewsPage = Math.max(1, featuredNewsPage - 1)" :disabled="featuredNewsPage === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
              上一頁
            </button>

            <div class="flex gap-1">
              <button v-for="page in featuredNewsTotalPages" :key="page" @click="featuredNewsPage = page" :class="[
                'px-3 py-2 text-sm font-medium rounded-md',
                featuredNewsPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
              ]">
                {{ page }}
              </button>
            </div>

            <button @click="featuredNewsPage = Math.min(featuredNewsTotalPages, featuredNewsPage + 1)"
              :disabled="featuredNewsPage === featuredNewsTotalPages"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
              下一頁
            </button>
          </div>
        </div>
      </DecorSection>

      <!-- 無結果 -->
      <div v-if="!loading && filteredNews.length === 0" class="text-center py-20">
        <div class="text-gray-500 dark:text-gray-400">
          <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-lg font-medium">沒有找到相關新聞</p>
          <p class="text-sm">請嘗試調整搜尋條件或分類篩選</p>
        </div>
      </div>
    </div>

    <!-- 新聞詳情彈窗 -->
    <div v-if="showNewsDetail && selectedNews"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <!-- 關閉按鈕 -->
          <button @click="closeNewsDetail"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- 新聞圖片 -->
          <div v-if="selectedNews.image"
            class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
            <img :src="selectedNews.image" :alt="selectedNews.title" class="w-full h-full object-cover">
          </div>

          <!-- 新聞標題 -->
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ selectedNews.title }}
          </h1>

          <!-- 新聞資訊 -->
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span>{{ formatDate(selectedNews.date) }}</span>
            <span>{{ selectedNews.author }}</span>
            <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
              {{ selectedNews.category }}
            </span>
          </div>

          <!-- 標籤 -->
          <div v-if="selectedNews.tags && selectedNews.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in selectedNews.tags" :key="tag"
              class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
              #{{ tag }}
            </span>
          </div>

          <!-- 新聞內容 -->
          <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>{{ selectedNews.content }}</p>
          </div>
        </div>
      </div>
    </div>
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
