<script setup lang="ts">
defineOptions({ name: 'AppNavbar' })
import { ref } from 'vue'
import Brand from './Brand.vue'
import Links from './Links.vue'
import Actions from './Actions.vue'
import MobileMenu from './MobileMenu.vue'

const mobileMenuRef = ref<InstanceType<typeof MobileMenu>>()
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full h-16 bg-white/50 dark:bg-black/50 backdrop-blur-lg transition-all duration-500 shadow-lg">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <Brand />

        <!-- 桌面版導航連結 -->
        <Links />

        <!-- 桌面版用戶操作 -->
        <div class="hidden lg:block">
          <Actions />
        </div>

        <!-- 手機版選單 -->
        <MobileMenu ref="mobileMenuRef" />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
