<script setup lang="ts">
defineOptions({ name: 'AppNavbarLinkItem' })
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { RouterLink } from 'vue-router'
import type { NavbarLink } from '@/composables/useNavbarLinks'

interface Props {
  link: NavbarLink
  mobile?: boolean
}

const props = defineProps<Props>()

// 定義事件
const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}

// 根據是否為手機版返回不同的樣式
const getLinkClasses = () => {
  if (props.mobile) {
    return "block w-full text-left px-4 py-3 text-base text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 rounded-lg cursor-pointer"
  }
  return "relative space-x-1 group text-base text-gray-800 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200"
}

const getActiveClasses = () => {
  if (props.mobile) {
    return { 'bg-gray-100 dark:bg-gray-800': props.link.isActive }
  }
  return { 'text-blue-800 dark:text-blue-200': props.link.isActive }
}

// 手機版下拉選單樣式
const getMobileMenuClasses = () => {
  if (props.mobile) {
    return "relative w-full"
  }
  return "relative inline-block text-left"
}

const getMobileMenuItemsClasses = () => {
  if (props.mobile) {
    return "relative mt-2 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg focus:outline-none z-50"
  }
  return "absolute mt-2 origin-top-right w-56 bg-white/95 dark:bg-black/95 backdrop-blur-lg rounded-md shadow-lg focus:outline-none z-50"
}
</script>

<template>
  <li>
    <!-- 如果有子連結，顯示下拉選單 -->
    <Menu v-if="link.children && link.children.length > 0" v-slot="{ open }" as="div" :class="getMobileMenuClasses()">
      <MenuButton :class="[getLinkClasses(), getActiveClasses()]" class="cursor-pointer">
        <span class="font-medium">
          {{ link.title.replace(/\s*\|\s*[^|]+$/, '') }}
        </span>
        <svg v-if="!mobile" class="w-4 h-4 transform transition-transform duration-200 inline-block"
          :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <span v-if="!mobile"
          class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-180 group-hover:w-full">
        </span>
      </MenuButton>

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems :class="getMobileMenuItemsClasses()">
          <div class="py-1">
            <MenuItem v-for="child in link.children" :key="child.name" v-slot="{ active, close }">
            <button
              class="w-full text-left px-4 py-3 text-sm text-gray-900 dark:text-gray-100 cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              :class="[
                active ? 'bg-gray-100 dark:bg-gray-800' : '',
                child.isActive ? 'bg-gray-50 dark:bg-gray-900 font-medium' : ''
              ]" @click="() => { close(); $router.push(child.path); handleClick() }">
              <span>{{ child.title.replace(/\s*\|\s*[^|]+$/, '') }}</span>
            </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>

    <!-- 如果沒有子連結，顯示一般連結 -->
    <RouterLink v-else :to="link.path" :class="[getLinkClasses(), getActiveClasses()]" @click="handleClick">
      <span class="font-medium">
        {{ link.title.replace(/\s*\|\s*[^|]+$/, '') }}
      </span>
      <span v-if="!mobile"
        class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-180 group-hover:w-full">
      </span>
    </RouterLink>
  </li>
</template>

<style scoped>
/* 自訂滾動條樣式 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
