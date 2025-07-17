<script setup lang="ts">
defineOptions({ name: 'FloatingButtons' })
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useCurrentBrand } from '@/composables/useCurrentBrand'

const { brandSocial, brandName } = useCurrentBrand()

// 滾動到頂部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 檢查是否顯示 Top 按鈕
const showTopButton = ref(false)

// 聯絡方式氣泡框狀態
const showContactBubble = ref(false)

// 監聽滾動事件
onMounted(() => {
  const handleScroll = () => {
    showTopButton.value = window.scrollY > 0
  }

  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

// 切換聯絡方式氣泡框
const toggleContactBubble = () => {
  showContactBubble.value = !showContactBubble.value
}

// 關閉聯絡方式氣泡框
const closeContactBubble = () => {
  showContactBubble.value = false
}

// 聯絡方式配置
const contactMethods = computed(() => {
  const methods = []

  // Discord
  if (brandSocial.value?.discord?.url) {
    methods.push({
      name: 'Discord',
      icon: 'bi-discord',
      url: brandSocial.value.discord.url,
      color: 'bg-indigo-600 hover:bg-indigo-700'
    })
  }

  // Line
  if (brandSocial.value?.line?.url) {
    methods.push({
      name: 'Line',
      icon: 'bi-chat-dots',
      url: brandSocial.value.line.url,
      color: 'bg-green-500 hover:bg-green-600'
    })
  }

  // Facebook
  if (brandSocial.value?.facebook?.url) {
    methods.push({
      name: 'Facebook',
      icon: 'bi-facebook',
      url: brandSocial.value.facebook.url,
      color: 'bg-blue-600 hover:bg-blue-700'
    })
  }

  // Instagram
  if (brandSocial.value?.instagram?.url) {
    methods.push({
      name: 'Instagram',
      icon: 'bi-instagram',
      url: brandSocial.value.instagram.url,
      color: 'bg-pink-500 hover:bg-pink-600'
    })
  }

  // YouTube
  if (brandSocial.value?.youtube?.url) {
    methods.push({
      name: 'YouTube',
      icon: 'bi-youtube',
      url: brandSocial.value.youtube.url,
      color: 'bg-red-600 hover:bg-red-700'
    })
  }

  // 電話
  if (brandSocial.value?.phone) {
    methods.push({
      name: '電話',
      icon: 'bi-telephone',
      url: `tel:${brandSocial.value.phone}`,
      color: 'bg-green-600 hover:bg-green-700'
    })
  }

  // Email
  if (brandSocial.value?.email) {
    methods.push({
      name: 'Email',
      icon: 'bi-envelope',
      url: `mailto:${brandSocial.value.email}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    })
  }

  return methods
})
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <!-- 回到頂部按鈕 -->
    <transition enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform translate-y-4 scale-95"
      enter-to-class="opacity-100 transform translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0 scale-100"
      leave-to-class="opacity-0 transform translate-y-4 scale-95">
      <button v-if="showTopButton" @click="scrollToTop"
        class="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        title="回到頂部">
        <i class="bi bi-arrow-up text-lg group-hover:scale-110 transition-transform duration-200"></i>
      </button>
    </transition>

    <!-- 聯絡方式按鈕和氣泡框容器 -->
    <div class="relative">
      <!-- 聯絡方式氣泡框 -->
      <transition enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-x-4 scale-95"
        enter-to-class="opacity-100 transform translate-x-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-x-0 scale-100"
        leave-to-class="opacity-0 transform translate-x-4 scale-95">
        <div v-if="showContactBubble"
          class="absolute bottom-0 right-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 mb-0 w-48">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">聯絡我們</h3>
            <button @click="closeContactBubble" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="bi bi-x-lg text-sm"></i>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a v-for="method in contactMethods" :key="method.name" :href="method.url" target="_blank"
              :class="`${method.color} text-white rounded-lg p-3 flex flex-col items-center justify-center text-xs transition-all duration-200 hover:scale-105`"
              :title="method.name">
              <i :class="`bi ${method.icon} text-lg mb-1`"></i>
              <span>{{ method.name }}</span>
            </a>
          </div>
        </div>
      </transition>

      <!-- 聯絡方式按鈕 -->
      <button @click="toggleContactBubble"
        class="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        :title="`聯絡 ${brandName}`">
        <i class="bi bi-headset text-lg group-hover:scale-110 transition-transform duration-200"></i>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
