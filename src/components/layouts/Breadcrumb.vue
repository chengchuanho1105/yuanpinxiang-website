<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrentBrand } from '@/composables/useCurrentBrand'
import { MAIN_BRAND } from '@/brands'
import type { PageRoute } from '@/routes/pageConfig/types'
import { isHomePage as isHomePageUtil } from '@/utils/pathUtils'

defineOptions({ name: 'Layout-Breadcrumb' })

const route = useRoute()
const { brandKey, brandConfig } = useCurrentBrand()

// 判斷是否為首頁
const isHomePage = computed(() => {
  const homePath = brandKey.value === MAIN_BRAND ? '/' : `/${brandKey.value}`
  return isHomePageUtil(route.path, homePath)
})

// 根據路徑段查找對應的路由配置
const findRouteBySegment = (routes: PageRoute[], segment: string): PageRoute | null => {
  for (const route of routes) {
    // 移除開頭的斜線進行比較
    const routePath = route.path.startsWith('/') ? route.path.slice(1) : route.path
    if (routePath === segment) {
      return route
    }
    if (route.children) {
      const found = findRouteBySegment(route.children, segment)
      if (found) return found
    }
  }
  return null
}

// 生成麵包屑路徑
const breadcrumbItems = computed(() => {
  if (isHomePage.value) return []

  const pathSegments = route.path.split('/').filter(Boolean)
  const items: Array<{
    name: string
    path: string
    isHome: boolean
    isLast: boolean
  }> = []

  // 添加首頁
  const homePath = brandKey.value === MAIN_BRAND ? '/' : `/${brandKey.value}`
  items.push({
    name: '首頁',
    path: homePath,
    isHome: true,
    isLast: false
  })

  // 過濾掉品牌名稱路徑段
  const filteredSegments = pathSegments.filter(segment => segment !== brandKey.value)

  // 添加路徑段
  let currentPath = ''
  filteredSegments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // 從路由配置中獲取顯示名稱
    let displayName = segment
    if (brandConfig.value?.routes) {
      const routeConfig = findRouteBySegment(brandConfig.value.routes, segment)
      if (routeConfig?.meta?.title) {
        // 使用與Navbar相同的方法處理標題
        displayName = routeConfig.meta.title.replace(/\s*\|\s*[^|]+$/, '')
      } else {
        // 如果找不到配置，使用預設處理
        displayName = segment.charAt(0).toUpperCase() + segment.slice(1)
      }
    }

    items.push({
      name: displayName,
      path: currentPath,
      isHome: false,
      isLast: index === filteredSegments.length - 1
    })
  })

  return items
})

// 當前選中的風格 (可以通過props傳入)
const props = defineProps<{
  style?: 'default' | 'minimal' | 'dots' | 'arrows' | 'cards' | 'gradient' | 'outline' | 'rounded' | 'underline' | 'modern'
}>()

const currentStyle = computed(() => props.style || 'default')
</script>

<template>
  <nav v-if="!isHomePage && breadcrumbItems.length > 0" class="breadcrumb-container">

    <!-- 風格1: 預設風格 -->
    <div v-if="currentStyle === 'default'" class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center space-x-2 px-4 py-3">
        <template v-for="(item, index) in breadcrumbItems" :key="item.path">
          <router-link v-if="!item.isLast" :to="item.path"
            class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
            <svg v-if="item.isHome" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
              </path>
            </svg>
            <span v-else>{{ item.name }}</span>
          </router-link>
          <span v-else class="text-gray-900 dark:text-gray-100 font-medium">
            {{ item.name }}
          </span>
          <svg v-if="index < breadcrumbItems.length - 1" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </template>
      </div>
    </div>

    <!-- 風格2: 極簡風格 -->
    <div v-else-if="currentStyle === 'minimal'" class="flex items-center space-x-1 px-4 py-2 text-sm">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          {{ item.name }}
        </router-link>
        <span v-else class="text-gray-900 dark:text-gray-100">
          {{ item.name }}
        </span>
        <span v-if="index < breadcrumbItems.length - 1" class="text-gray-300">/</span>
      </template>
    </div>

    <!-- 風格3: 點狀風格 -->
    <div v-else-if="currentStyle === 'dots'" class="flex items-center space-x-3 px-4 py-3">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
          <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span>{{ item.name }}</span>
        </router-link>
        <div v-else class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span class="text-gray-900 dark:text-gray-100 font-medium">{{ item.name }}</span>
        </div>
        <div v-if="index < breadcrumbItems.length - 1" class="w-1 h-1 bg-gray-300 rounded-full"></div>
      </template>
    </div>

    <!-- 風格4: 箭頭風格 -->
    <div v-else-if="currentStyle === 'arrows'" class="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-900">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
          <span>{{ item.name }}</span>
        </router-link>
        <span v-else class="text-gray-900 dark:text-gray-100 font-semibold">
          {{ item.name }}
        </span>
        <svg v-if="index < breadcrumbItems.length - 1" class="w-4 h-4 text-gray-400 mx-2" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </template>
    </div>

    <!-- 風格5: 卡片風格 -->
    <div v-else-if="currentStyle === 'cards'" class="flex items-center space-x-2 px-4 py-3">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
          {{ item.name }}
        </router-link>
        <span v-else class="px-3 py-1 bg-blue-500 text-white rounded-md font-medium">
          {{ item.name }}
        </span>
        <svg v-if="index < breadcrumbItems.length - 1" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </template>
    </div>

    <!-- 風格6: 漸層風格 -->
    <div v-else-if="currentStyle === 'gradient'"
      class="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
          {{ item.name }}
        </router-link>
        <span v-else class="text-blue-600 dark:text-blue-400 font-semibold">
          {{ item.name }}
        </span>
        <div v-if="index < breadcrumbItems.length - 1"
          class="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
      </template>
    </div>

    <!-- 風格7: 外框風格 -->
    <div v-else-if="currentStyle === 'outline'" class="flex items-center space-x-2 px-4 py-3">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all">
          {{ item.name }}
        </router-link>
        <span v-else
          class="px-3 py-1 border-2 border-blue-500 dark:border-blue-400 rounded-lg text-blue-600 dark:text-blue-400 font-semibold">
          {{ item.name }}
        </span>
        <svg v-if="index < breadcrumbItems.length - 1" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </template>
    </div>

    <!-- 風格8: 圓角風格 -->
    <div v-else-if="currentStyle === 'rounded'" class="flex items-center space-x-1 px-4 py-3">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
          {{ item.name }}
        </router-link>
        <span v-else class="px-4 py-2 bg-blue-500 text-white rounded-full font-medium">
          {{ item.name }}
        </span>
        <div v-if="index < breadcrumbItems.length - 1" class="w-2 h-2 bg-gray-300 rounded-full"></div>
      </template>
    </div>

    <!-- 風格9: 底線風格 -->
    <div v-else-if="currentStyle === 'underline'"
      class="flex items-center space-x-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors relative group">
          {{ item.name }}
          <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300">
          </div>
        </router-link>
        <span v-else class="text-gray-900 dark:text-gray-100 font-semibold border-b-2 border-blue-500 pb-1">
          {{ item.name }}
        </span>
        <svg v-if="index < breadcrumbItems.length - 1" class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </template>
    </div>

    <!-- 風格10: 現代風格 -->
    <div v-else-if="currentStyle === 'modern'"
      class="flex items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <template v-for="(item, index) in breadcrumbItems" :key="item.path">
        <router-link v-if="!item.isLast" :to="item.path"
          class="flex items-center space-x-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105">
          <svg v-if="item.isHome" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
            </path>
          </svg>
          <span v-else>{{ item.name }}</span>
        </router-link>
        <span v-else class="flex items-center space-x-2 text-gray-900 dark:text-gray-100 font-bold">
          <span>{{ item.name }}</span>
        </span>
        <div v-if="index < breadcrumbItems.length - 1" class="flex items-center mx-3">
          <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div class="w-3 h-px bg-gray-300 mx-1"></div>
          <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </template>
    </div>

  </nav>
</template>

<style scoped></style>
