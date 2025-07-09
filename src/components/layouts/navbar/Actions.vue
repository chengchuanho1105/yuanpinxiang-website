<script setup lang="ts">
defineOptions({ name: 'AppNavbarActions' })
import { ref } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

interface Props {
  mobile?: boolean
}

const props = defineProps<Props>()

// 用戶狀態管理
const isLoggedIn = ref(false) // 這裡應該從 store 或 API 獲取
const currentUser = ref({
  name: '使用者',
  email: 'user@example.com',
  avatar: null
})

// 語言管理
const currentLanguage = ref('zh-TW')
const languages = [
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' }
]

// 選單狀態管理
const isLanguageMenuOpen = ref(false)

// 模擬登入/登出功能
const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value
  console.log(isLoggedIn.value ? '已登入' : '已登出')
}

const switchLanguage = (langCode: string, close?: () => void) => {
  currentLanguage.value = langCode
  // 關閉語言選單
  isLanguageMenuOpen.value = false

  // 這裡應該調用 i18n 的語言切換方法
  if (close) close()
}

// 用戶操作
const handleLogin = () => {
  toggleLogin()
}

const handleLogout = () => {
  toggleLogin()
  // 清除用戶資料和 token
}

const handleProfile = () => {
  console.log('個人資料')
  // 導向個人資料頁面
}

const handleSettings = () => {
  console.log('帳戶設定')
  // 導向設定頁面
}

// 系統功能
const handleHelpSupport = () => {
  console.log('幫助/支援')
  // 開啟幫助/支援頁面或模態框
}

const handleReport = () => {
  console.log('回報問題')
  // 開啟問題回報表單
}

const handlePreferences = () => {
  console.log('設定偏好')
  // 開啟偏好設定頁面
}

// 統一的選單樣式
const getMenuItemsClasses = () => {
  if (props.mobile) {
    return "absolute left-0 right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50"
  }
  return "absolute right-0 mt-2 w-64 origin-top-right bg-white dark:bg-gray-900 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50"
}

// 統一的語言子選單樣式
const getLanguageSubmenuClasses = () => {
  if (props.mobile) {
    return "relative mt-1 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50"
  }
  return "absolute right-full top-0 mr-1 w-48 origin-top-right bg-white dark:bg-gray-900 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50"
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <!-- 未登入狀態：登入按鈕 + 統一選單 -->
    <template v-if="!isLoggedIn">
      <!-- 登入按鈕 -->
      <button @click="handleLogin"
        class="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors duration-200 shadow-sm"
        title="登入">
        <i class="bi bi-person-fill text-lg"></i>
      </button>

      <!-- 統一選單 -->
      <Menu as="div" :class="props.mobile ? 'relative' : 'relative inline-block text-left'">
        <MenuButton
          class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-200"
          title="設定">
          <i class="bi bi-gear-fill text-lg"></i>
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95" @after-leave="isLanguageMenuOpen = false">
          <MenuItems :class="getMenuItemsClasses()">
            <!-- 系統功能區域 -->
            <div class="py-1">
              <!-- 語言設定子選單 -->
              <div class="relative">
                <button @click="isLanguageMenuOpen = !isLanguageMenuOpen"
                  class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <i class="bi bi-translate text-lg"></i>
                      <span>語言設定</span>
                    </div>
                    <i class="bi bi-chevron-right"></i>
                  </div>
                </button>

                <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <div v-if="isLanguageMenuOpen" :class="getLanguageSubmenuClasses()">
                    <div class="py-1">
                      <MenuItem v-for="lang in languages" :key="lang.code" v-slot="{ close }">
                      <button @click="switchLanguage(lang.code, close)"
                        class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        :class="[
                          currentLanguage === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                        ]">
                        <div class="flex items-center space-x-3">
                          <span class="text-lg">{{ lang.flag }}</span>
                          <span>{{ lang.name }}</span>
                          <i v-if="currentLanguage === lang.code" class="bi bi-check ml-auto"></i>
                        </div>
                      </button>
                      </MenuItem>
                    </div>
                  </div>
                </transition>
              </div>

              <MenuItem v-slot="{ }">
              <button @click="handlePreferences"
                class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                <div class="flex items-center space-x-3">
                  <i class="bi bi-sliders text-lg"></i>
                  <span>設定偏好</span>
                </div>
              </button>
              </MenuItem>

              <MenuItem v-slot="{ }">
              <button @click="handleHelpSupport"
                class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                <div class="flex items-center space-x-3">
                  <i class="bi bi-question-circle text-lg"></i>
                  <span>幫助/支援</span>
                </div>
              </button>
              </MenuItem>

              <MenuItem v-slot="{ }">
              <button @click="handleReport"
                class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                <div class="flex items-center space-x-3">
                  <i class="bi bi-exclamation-triangle text-lg"></i>
                  <span>回報問題</span>
                </div>
              </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </template>

    <!-- 已登入狀態：統一選單 -->
    <Menu v-else as="div" :class="props.mobile ? 'relative' : 'relative inline-block text-left'">
      <MenuButton
        class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-200">
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
          {{ currentUser.avatar ? '' : currentUser.name.charAt(0) }}
        </div>
      </MenuButton>

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95"
        @after-leave="isLanguageMenuOpen = false">
        <MenuItems :class="getMenuItemsClasses()">
          <!-- 用戶資訊區域 -->
          <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ currentUser.name }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentUser.email }}</p>
          </div>

          <!-- 用戶功能區域 -->
          <div class="py-1">
            <MenuItem v-slot="{ }">
            <button @click="handleProfile"
              class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div class="flex items-center space-x-3">
                <i class="bi bi-person text-lg"></i>
                <span>個人資料</span>
              </div>
            </button>
            </MenuItem>

            <MenuItem v-slot="{ }">
            <button @click="handleSettings"
              class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div class="flex items-center space-x-3">
                <i class="bi bi-gear text-lg"></i>
                <span>帳戶設定</span>
              </div>
            </button>
            </MenuItem>
          </div>

          <!-- 系統功能區域 -->
          <div class="py-1 border-t border-gray-200 dark:border-gray-700">
            <!-- 語言設定子選單 -->
            <div class="relative">
              <button @click="isLanguageMenuOpen = !isLanguageMenuOpen"
                class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <i class="bi bi-translate text-lg"></i>
                    <span>語言設定</span>
                  </div>
                  <i class="bi bi-chevron-right"></i>
                </div>
              </button>

              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <div v-if="isLanguageMenuOpen" :class="getLanguageSubmenuClasses()">
                  <div class="py-1">
                    <MenuItem v-for="lang in languages" :key="lang.code" v-slot="{ close }">
                    <button @click="switchLanguage(lang.code, close)"
                      class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      :class="[
                        currentLanguage === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                      ]">
                      <div class="flex items-center space-x-3">
                        <span class="text-lg">{{ lang.flag }}</span>
                        <span>{{ lang.name }}</span>
                        <i v-if="currentLanguage === lang.code" class="bi bi-check ml-auto"></i>
                      </div>
                    </button>
                    </MenuItem>
                  </div>
                </div>
              </transition>
            </div>

            <MenuItem v-slot="{ }">
            <button @click="handlePreferences"
              class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div class="flex items-center space-x-3">
                <i class="bi bi-sliders text-lg"></i>
                <span>設定偏好</span>
              </div>
            </button>
            </MenuItem>

            <MenuItem v-slot="{ }">
            <button @click="handleHelpSupport"
              class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div class="flex items-center space-x-3">
                <i class="bi bi-question-circle text-lg"></i>
                <span>幫助/支援</span>
              </div>
            </button>
            </MenuItem>

            <MenuItem v-slot="{ }">
            <button @click="handleReport"
              class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div class="flex items-center space-x-3">
                <i class="bi bi-exclamation-triangle text-lg"></i>
                <span>回報問題</span>
              </div>
            </button>
            </MenuItem>
          </div>

          <!-- 登出區域 -->
          <div class="py-1 border-t border-gray-200 dark:border-gray-700">
            <MenuItem v-slot="{ }">
            <button @click="handleLogout"
              class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div class="flex items-center space-x-3">
                <i class="bi bi-box-arrow-right text-lg"></i>
                <span>登出</span>
              </div>
            </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<style scoped></style>
