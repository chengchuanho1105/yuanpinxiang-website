<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue'
import { videos, articles } from '../../pageData/media'
import DecorSection from '@/components/DecorSection.vue'
defineOptions({ name: 'YuanPinXiang-Media' })

// 摺疊狀態
const showAllVideos = ref(false)
const showAllArticles = ref(false)
// 標籤頁切換狀態
const activeTab = ref('videos') // 'videos' 或 'articles'
const wrapperRef = ref<HTMLElement | null>(null)
const articleWrapperRef = ref<HTMLElement | null>(null)
const firstCardRef = ref<HTMLElement | null>(null)
const firstArticleRef = ref<HTMLElement | null>(null)
const maxHeight = ref('0px')
const articleMaxHeight = ref('0px')
const mediaSectionRef = ref<InstanceType<typeof DecorSection> | null>(null)

function setFirstCardRef(el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement) firstCardRef.value = el
}

function setFirstArticleRef(el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement) firstArticleRef.value = el
}

function scrollToMediaSection() {
  const el = mediaSectionRef.value?.$el || mediaSectionRef.value
  if (el && typeof el.getBoundingClientRect === 'function') {
    const navbarHeight = 80 // 根據你的 navbar 高度調整
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function handleToggleVideos() {
  if (showAllVideos.value) {
    scrollToMediaSection()
    setTimeout(() => {
      showAllVideos.value = false
    }, 400)
  } else {
    showAllVideos.value = true
  }
}

function handleToggleArticles() {
  if (showAllArticles.value) {
    scrollToMediaSection()
    setTimeout(() => {
      showAllArticles.value = false
    }, 400)
  } else {
    showAllArticles.value = true
  }
}

// 根據展開狀態計算高度
const updateHeight = () => {
  if (!wrapperRef.value) return
  const scrollHeight = wrapperRef.value.scrollHeight
  // 動態取得第一個卡片高度
  let singleVideoHeight = 0
  if (firstCardRef.value) {
    singleVideoHeight = firstCardRef.value.offsetHeight
  }
  // 取得gap高度
  let gapHeight = 0
  const gridEl = wrapperRef.value?.querySelector('.grid')
  if (gridEl) {
    const style = getComputedStyle(gridEl)
    gapHeight = parseInt(style.rowGap || '0', 10)
  }
  const collapsedHeight = singleVideoHeight > 0 ? (singleVideoHeight + gapHeight * 10) : 400
  maxHeight.value = showAllVideos.value ? `${scrollHeight}px` : `${collapsedHeight}px`
}

// 根據展開狀態計算文章高度
const updateArticleHeight = () => {
  if (!articleWrapperRef.value) return
  const scrollHeight = articleWrapperRef.value.scrollHeight
  // 動態取得第一個文章卡片高度
  let singleArticleHeight = 0
  if (firstArticleRef.value) {
    singleArticleHeight = firstArticleRef.value.offsetHeight
  }
  // 取得gap高度
  let gapHeight = 0
  const gridEl = articleWrapperRef.value?.querySelector('.grid')
  if (gridEl) {
    const style = getComputedStyle(gridEl)
    gapHeight = parseInt(style.rowGap || '0', 10)
  }
  const collapsedHeight = singleArticleHeight > 0 ? (singleArticleHeight + gapHeight * 10) : 400
  articleMaxHeight.value = showAllArticles.value ? `${scrollHeight}px` : `${collapsedHeight}px`
}

watch(showAllVideos, async () => {
  await nextTick()
  updateHeight()
})

watch(showAllArticles, async () => {
  await nextTick()
  updateArticleHeight()
})

// 切到文章標籤時，強制重新計算文章高度
watch(activeTab, async (tab) => {
  if (tab === 'articles') {
    await nextTick()
    updateArticleHeight()
  }
})

onMounted(() => {
  updateHeight()
  updateArticleHeight()
  window.addEventListener('resize', updateHeight)
  window.addEventListener('resize', updateArticleHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
  window.removeEventListener('resize', updateArticleHeight)
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-8">
    <DecorSection ref="mediaSectionRef" main-title="媒體介紹" en-title="MEDIA INTRODUCTION">



      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <!-- 標籤頁導航 -->
        <div class="flex border-b border-gray-200 dark:border-gray-700">
          <button @click="activeTab = 'videos'" :class="[
            'flex-1 py-4 px-6 text-center font-medium transition-colors',
            activeTab === 'videos'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          ]">
            <i class="bi bi-play-circle-fill mr-2"></i>
            影音介紹
          </button>
          <button @click="activeTab = 'articles'" :class="[
            'flex-1 py-4 px-6 text-center font-medium transition-colors',
            activeTab === 'articles'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          ]">
            <i class="bi bi-journal-text mr-2"></i>
            文章介紹
          </button>
        </div>

        <!-- 內容區域 -->
        <div class="p-4">
          <!-- 影音介紹 -->
          <div v-if="activeTab === 'videos'" class="relative">
            <!-- 外層包覆區塊 -->
            <div ref="wrapperRef" class="relative overflow-hidden transition-[max-height] duration-700 ease-in-out"
              :style="{ maxHeight }">
              <!-- 所有影片 -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div v-for="(video, idx) in videos" :key="video.id" :ref="idx === 0 ? setFirstCardRef : undefined"
                  class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-all duration-300">
                  <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3">
                    <iframe :src="video.embedUrl" class="w-full h-full rounded-lg" frameborder="0"
                      allowfullscreen></iframe>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ video.title }}</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-2">{{ video.description }}</p>
                  <div class="flex items-center gap-3 text-xs text-gray-500">
                    <span>{{ video.duration }}</span>
                    <span>{{ video.views }}</span>
                  </div>
                </div>
                <!-- 沒有更多了提示卡片（影片） -->
                <div
                  class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center text-gray-400 text-base font-semibold col-span-1 lg:col-span-2 select-none">
                  — 沒有更多了 —
                </div>
              </div>

              <!-- 未展開時顯示的柔邊遮罩 -->
              <div v-if="!showAllVideos"
                class="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none">
              </div>
            </div>

            <!-- 控制按鈕 -->
            <div class="text-center mt-8">
              <button v-if="videos.length >= 1"
                class="inline-flex items-center gap-2 px-5 py-2 text-indigo-700 bg-indigo-100 rounded-md
                             hover:bg-indigo-200 transition dark:text-indigo-300 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                @click="handleToggleVideos">
                <span>{{ showAllVideos ? '收合內容' : '瀏覽全部' }}</span>
                <i :class="showAllVideos ? 'bi bi-chevron-double-up' : 'bi bi-chevron-double-down'"></i>
              </button>
            </div>
          </div>

          <!-- 文章介紹 -->
          <div v-if="activeTab === 'articles'" class="relative">
            <!-- 外層包覆區塊 -->
            <div ref="articleWrapperRef"
              class="relative overflow-hidden transition-[max-height] duration-700 ease-in-out"
              :style="{ maxHeight: articleMaxHeight }">
              <!-- 所有文章 -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div v-for="(article, idx) in articles" :key="article.id"
                  :ref="idx === 0 ? setFirstArticleRef : undefined"
                  class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-all duration-300">
                  <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                    <img :src="article.image" :alt="article.title" class="w-full h-full object-cover">
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ article.title }}</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-2">{{ article.excerpt }}</p>
                  <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>{{ article.source }}</span>
                    <span>{{ article.readTime }}</span>
                  </div>
                </div>
                <!-- 沒有更多了提示卡片（文章） -->
                <div
                  class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center text-gray-400 text-base font-semibold col-span-1 lg:col-span-2 select-none">
                  — 沒有更多了 —
                </div>
              </div>

              <!-- 未展開時顯示的柔邊遮罩 -->
              <div v-if="!showAllArticles"
                class="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none">
              </div>
            </div>

            <!-- 控制按鈕 -->
            <div class="text-center mt-8">
              <button v-if="articles.length >= 1"
                class="inline-flex items-center gap-2 px-5 py-2 text-indigo-700 bg-indigo-100 rounded-md
                             hover:bg-indigo-200 transition dark:text-indigo-300 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                @click="handleToggleArticles">
                <span>{{ showAllArticles ? '收合內容' : '瀏覽全部' }}</span>
                <i :class="showAllArticles ? 'bi bi-chevron-double-up' : 'bi bi-chevron-double-down'"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

    </DecorSection>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
