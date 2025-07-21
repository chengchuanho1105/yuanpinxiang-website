<script setup lang="ts">
defineOptions({ name: 'YuanPinXiang-Product' })
</script>

<template>
  <div class="max-w-5xl mx-auto min-h-[50svh] p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
      <router-link to="/product/list"
        class="group block bg-sky-50 dark:bg-sky-950 border border-sky-100 dark:border-sky-900 rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-2 hover:shadow-2xl focus:ring-2 focus:ring-sky-400 outline-none">
        <div class="flex items-center gap-4 mb-4">
          <i
            class="bi bi-bag-check-fill text-4xl text-sky-500 dark:text-sky-300 group-hover:scale-110 transition-transform"></i>
          <span class="text-2xl font-bold text-sky-800 dark:text-sky-100">產品總覽</span>
        </div>
        <p class="text-gray-700 dark:text-gray-300">瀏覽所有產品，快速找到你需要的豆皮商品與詳細資訊。</p>
      </router-link>
      <router-link to="/product/certification"
        class="group block bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-2xl shadow-lg p-8 transition-transform hover:-translate-y-2 hover:shadow-2xl focus:ring-2 focus:ring-indigo-400 outline-none">
        <div class="flex items-center gap-4 mb-4">
          <i
            class="bi bi-patch-check-fill text-4xl text-indigo-500 dark:text-indigo-300 group-hover:scale-110 transition-transform"></i>
          <span class="text-2xl font-bold text-indigo-800 dark:text-indigo-100">產品認證</span>
        </div>
        <p class="text-gray-700 dark:text-gray-300">查看我們的產品檢驗報告與品質認證，安心選購每一項商品。</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
