<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isVisible = ref(true)

// 監聽路由變化，每次切換頁面時重新顯示
const resetBanner = () => {
  isVisible.value = true
}

// 關閉通知
const closeBanner = () => {
  isVisible.value = false
}

// 監聽路由變化
onMounted(() => {
  // 初始顯示
  isVisible.value = true
})

// 使用 watch 監聽路由變化
import { watch } from 'vue'
watch(() => route.path, () => {
  resetBanner()
})
</script>

<template>
  <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-full">
    <div v-if="isVisible"
      class="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-orange-500 via-pink-700 to-red-500 shadow-lg">
      <div class="max-w-3xl mx-auto px-4 py-3">
        <div class="grid grid-cols-7 items-center justify-center relative">

          <div class="col-span-1 flex justify-center">
            <!-- 圖示 -->
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <div class="col-span-5 text-center">
            <p class="text-base font-medium text-white ">
              本網頁正在建置中<br>
              資訊尚未校準，請稍後再訪
            </p>
          </div>

          <!-- 右側關閉按鈕 -->
          <div class="col-span-1 flex justify-center">
            <button @click="closeBanner"
              class="inline-flex items-center justify-center p-1.5 rounded-md text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-400">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 確保組件在 navbar 下方 */
.fixed {
  top: 64px;
  /* 根據 navbar 高度調整 */
}

/* 響應式調整 */
@media (min-width: 768px) {
  .fixed {
    top: 72px;
    /* 桌面版 navbar 高度 */
  }
}

@media (min-width: 1024px) {
  .fixed {
    top: 80px;
    /* 大螢幕 navbar 高度 */
  }
}
</style>
