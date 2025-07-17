<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useHybridData } from '@/composables/useHybridData'
import rawLocalNewsData from '@/data/pageData/yuanpinxiang/news/newsData.json'

// 直接使用原始資料，先轉 unknown 再轉 Record<string, string>[]
const localNewsData = rawLocalNewsData as unknown as Record<string, string>[]

// 取得路由參數
const route = useRoute()
const newsId = computed(() => route.params.id as string)

// 取得所有新聞資料
const {
  data: newsData,
  load: loadNewsData
} = useHybridData<{
  id: string
  slot: string
  category: string
  date: string
  author: string
  image: string
  tags: string
  title: string
  content: string
}>(localNewsData as unknown as { id: string; slot: string; category: string; date: string; author: string; image: string; tags: string; title: string; content: string; }[], 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSpK4IAJ0lQCD_pEHh4smflPpCiMbgsMqUfp24uQc-0Ru87ZN2izl7W-O9GbL97Ej6mPGb1eHfd37hx/pub?output=csv', (item: Record<string, string>) => ({
  id: item.id || '',
  slot: item.slot || '',
  category: item.category || '',
  date: item.date || '',
  author: item.author || '',
  image: item.image || '',
  tags: Array.isArray(item.tags) ? JSON.stringify(item.tags) : (item.tags || ''),
  title: item.title || '',
  content: item.content || ''
}))

onMounted(() => {
  loadNewsData()
})

// 找到對應新聞
const news = computed(() => newsData.value.find(n => n.id === newsId.value))

function parseTags(tags: string): string[] {
  if (typeof tags !== 'string') return []
  try {
    return JSON.parse(tags)
  } catch {
    try {
      const fixed = tags.replace(/'/g, '"')
      return JSON.parse(fixed)
    } catch {
      return tags.split(',').map(t => t.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
    }
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <div v-if="news">
      <div class="mb-6">
        <img v-if="news.image" :src="news.image" :alt="news.title" class="w-full rounded-lg mb-4" />
        <h1 class="text-3xl font-bold mb-2">{{ news.title }}</h1>
        <div class="flex flex-wrap gap-2 mb-2">
          <span v-if="news.category" class="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">{{
            news.category }}</span>
          <span v-if="news.slot && news.slot !== 'none'"
            class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{{ news.slot }}</span>
          <span v-if="news.author" class="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">{{
            news.author }}</span>
          <span v-if="news.date" class="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">{{
            news.date }}</span>
        </div>
        <div v-if="news.tags" class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in parseTags(news.tags as string)" :key="tag"
            class="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">#{{ tag }}</span>
        </div>
      </div>
      <div class="prose max-w-none text-gray-700 dark:text-gray-300 leading-relaxed" v-html="news.content"></div>
    </div>
    <div v-else class="text-center text-gray-500 py-20">
      找不到此新聞
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NewsDetail'
}
</script>
