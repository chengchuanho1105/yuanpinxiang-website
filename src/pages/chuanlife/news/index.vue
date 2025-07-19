<script setup lang="ts">
defineOptions({ name: 'ChuanLife-News' })

// 假資料，可日後串接 API 或 JSON
const newsList = [
    {
        title: '網站設計新方案上線',
        date: '2024-06-01',
        summary: '全新響應式網站設計方案，歡迎洽詢！',
        link: '#'
    },
    {
        title: '貼圖代購服務升級',
        date: '2024-05-20',
        summary: '支援更多平台與客製化貼圖設計。',
        link: '#'
    },
    {
        title: '3C產品代購優惠活動',
        date: '2024-05-10',
        summary: '限時優惠，精選3C產品代購享折扣。',
        link: '#'
    }
]
</script>

<template>
    <div class="max-w-3xl mx-auto px-4 py-10">
        <h1 class="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8 text-center">
            最新消息
        </h1>
        <div v-if="newsList.length === 0" class="text-center text-gray-500 dark:text-gray-400">
            目前尚無消息。
        </div>
        <ul v-else class="space-y-6">
            <li v-for="news in newsList" :key="news.title" class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h2 class="text-xl font-bold text-blue-800 dark:text-blue-200">{{ news.title }}</h2>
                    <span class="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">{{ news.date }}</span>
                </div>
                <p class="text-gray-700 dark:text-gray-200 mb-2">{{ news.summary }}</p>
                <a v-if="news.link && news.link !== '#'" :href="news.link"
                    class="text-blue-600 hover:underline text-sm">閱讀更多</a>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
