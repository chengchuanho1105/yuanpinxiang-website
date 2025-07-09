<script setup lang="ts">
defineOptions({ name: 'AppMobileMenu' })
import { ref } from 'vue'
import { useNavbarLinks } from '@/composables/useNavbarLinks'
import LinksItem from './LinksItem.vue'
import Actions from './Actions.vue'

const { navbarLinks } = useNavbarLinks()

// 控制選單開關
const isOpen = ref(false)

const openMenu = () => {
  isOpen.value = true
  // 防止背景滾動
  document.body.style.overflow = 'hidden'
}

const closeMenu = () => {
  isOpen.value = false
  // 恢復背景滾動
  document.body.style.overflow = 'auto'
}

// 暴露方法給父組件
defineExpose({
  openMenu,
  closeMenu
})
</script>

<template>
  <!-- 漢堡選單按鈕 -->
  <button @click="openMenu"
    class="lg:hidden w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
    title="開啟選單">
    <i class="bi bi-list text-xl text-gray-900 dark:text-gray-100"></i>
  </button>

  <!-- 全螢幕遮罩 -->
  <transition enter-active-class="transition-opacity ease-out duration-300" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition-opacity ease-in duration-200"
    leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" @click="closeMenu"></div>
  </transition>

  <!-- 側邊選單 -->
  <transition enter-active-class="transition-transform ease-out duration-300" enter-from-class="translate-x-full"
    enter-to-class="translate-x-0" leave-active-class="transition-transform ease-in duration-200"
    leave-from-class="translate-x-0" leave-to-class="translate-x-full">
    <div v-if="isOpen" class="fixed top-0 left-0 z-50 w-full h-screen bg-white dark:bg-gray-900 lg:hidden flex flex-col"
      @click.stop>
      <!-- 選單標題和關閉按鈕 -->
      <div
        class="flex items-center justify-between h-16 px-9 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">選單</h2>
        <button @click="closeMenu"
          class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
          title="關閉選單">
          <i class="bi bi-x text-xl text-gray-900 dark:text-gray-100"></i>
        </button>
      </div>

      <!-- 導航連結和用戶操作 -->
      <div class="flex-1 px-4 sm:px-6 lg:px-8 py-4 overflow-y-auto">
        <ul class="space-y-4">
          <li v-for="link in navbarLinks" :key="link.name">
            <LinksItem :link="link" :mobile="true" @click="closeMenu" />
          </li>
        </ul>

        <!-- 分隔線 -->
        <div class="my-6 border-t border-gray-200 dark:border-gray-700"></div>

        <!-- 用戶操作區域 -->
        <div class="space-y-4">
          <Actions :mobile="true" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped></style>
