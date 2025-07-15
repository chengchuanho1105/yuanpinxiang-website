<script setup lang="ts">
defineOptions({ name: 'YuanPinXiang-Product-Certification' })

// 假資料，可換成 API 或 json
const certifications = [
  {
    name: '有機認證',
    image: '/src/assets/cert/organic.png',
    desc: '本產品通過有機農產品驗證，符合國家有機標準。',
    certImage: '/src/assets/cert/organic-cert.jpg'
  },
  {
    name: 'HACCP食品安全',
    image: '/src/assets/cert/haccp.png',
    desc: '全廠通過HACCP食品安全管理系統驗證，嚴格控管每一道流程。',
    certImage: '/src/assets/cert/haccp-cert.jpg'
  },
  {
    name: 'ISO 22000',
    image: '/src/assets/cert/iso22000.png',
    desc: '符合國際ISO 22000食品安全管理標準，品質有保障。',
    certImage: '/src/assets/cert/iso22000-cert.jpg'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4 text-indigo-800 dark:text-indigo-100">產品認證</h1>
    <p class="mb-8 text-gray-700 dark:text-gray-300">
      源品香堅持最高品質標準，所有產品皆通過多項國內外認證，讓您吃得安心、買得放心。
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div v-for="cert in certifications" :key="cert.name"
        class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
        <img :src="cert.image" :alt="cert.name" class="w-20 h-20 object-contain mb-4" />
        <h2 class="text-lg font-bold mb-2 text-indigo-700 dark:text-indigo-200">{{ cert.name }}</h2>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">{{ cert.desc }}</p>
        <a :href="cert.certImage" target="_blank"
          class="text-indigo-600 dark:text-indigo-300 underline text-sm">檢視證書</a>
      </div>
    </div>
    <div class="text-center text-gray-500 dark:text-gray-400 text-sm">
      如需更多認證資料，歡迎<a href="/yuanpinxiang/contact" class="text-indigo-600 dark:text-indigo-300 underline">聯絡我們</a>。
    </div>
  </div>
</template>

<style scoped>
/* 可依需求自訂細節 */
</style>
