<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Services' })
</script>

<template>
    <div class="max-w-5xl mx-auto px-4 py-10">
        <h1 class="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8 text-center">
            專業服務總覽
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
                <i class="bi bi-code-slash text-4xl text-blue-600 dark:text-blue-400 mb-4"></i>
                <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">網站設計</h2>
                <p class="text-gray-600 dark:text-gray-300 text-center mb-4">
                    響應式設計、企業形象、電商平台、網站維護，專業團隊為您打造完美網路形象。
                </p>
                <a href="/chuanlife/contact"
                    class="mt-auto inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">洽詢網站設計</a>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
                <i class="bi bi-emoji-smile text-4xl text-green-600 dark:text-green-400 mb-4"></i>
                <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">貼圖代購</h2>
                <p class="text-gray-600 dark:text-gray-300 text-center mb-4">
                    Line、Telegram 各式貼圖代購，支援客製化設計與貼圖推薦，讓您的通訊更有趣。
                </p>
                <a href="/chuanlife/contact"
                    class="mt-auto inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">洽詢貼圖代購</a>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
                <i class="bi bi-phone text-4xl text-yellow-600 dark:text-yellow-400 mb-4"></i>
                <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">3C產品代購</h2>
                <p class="text-gray-600 dark:text-gray-300 text-center mb-4">
                    手機、平板、電腦配件、智慧家電等 3C 產品專業代購，提供產品諮詢與售後服務。
                </p>
                <a href="/chuanlife/contact"
                    class="mt-auto inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">洽詢3C代購</a>
            </div>
        </div>
        <div class="text-center">
            <a href="/chuanlife/contact"
                class="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors">
                立即聯絡我們，獲得專屬服務建議
            </a>
        </div>
    </div>
</template>

<style scoped></style>
