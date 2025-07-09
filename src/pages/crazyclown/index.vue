<script setup lang="ts">
defineOptions({ name: 'CrazyClown-Home' })
import SitemapUrlTest from '@/components/SitemapUrlTest.vue'
</script>

<template>
  <div>
    <!-- Banner內容示例 -->
    <div class="flex h-full items-center justify-center">
      <div class="text-center">
        <h1 class="mb-4 text-6xl font-bold text-zinc-900 dark:text-zinc-100">
          歡迎來到 CrazyClown
        </h1>
        <p class="text-xl text-zinc-700 dark:text-zinc-300">
          體驗瘋狂的娛樂世界
        </p>
      </div>
    </div>

    <!-- 頁面其他內容 -->
    <div class="container mx-auto px-4 py-8">
      <h2 class="my-4 text-4xl font-bold text-zinc-900 dark:text-zinc-100">CrazyClown-Home</h2>
      <hr class="my-4" />
      <SitemapUrlTest />
    </div>
  </div>
</template>

<style scoped></style>
