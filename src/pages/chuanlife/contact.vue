<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Contact' })
import { useCurrentBrand } from '@/composables/useCurrentBrand'
const { brandInfo } = useCurrentBrand()
</script>

<template>
    <div class="max-w-2xl mx-auto px-4 py-10">
        <h1 class="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8 text-center">
            聯絡我們
        </h1>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-8 mb-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">聯絡資訊</h2>
            <ul class="space-y-2">
                <li class="flex items-center">
                    <i class="bi bi-envelope text-blue-600 dark:text-blue-400 mr-3 text-xl"></i>
                    <span class="text-gray-700 dark:text-gray-200">{{ brandInfo?.contactEmail }}</span>
                </li>
                <li class="flex items-center">
                    <i class="bi bi-line text-green-600 dark:text-green-400 mr-3 text-xl"></i>
                    <span class="text-gray-700 dark:text-gray-200">Line: {{ brandInfo?.social?.line?.id }}</span>
                </li>
            </ul>
            <div class="mt-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">服務時間</h3>
                <p class="text-gray-600 dark:text-gray-300">
                    週一至週五：09:00 - 18:00<br>
                    週六：10:00 - 16:00<br>
                    週日：休息
                </p>
            </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-xl shadow p-8">
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">線上諮詢表單</h2>
            <form @submit.prevent>
                <div class="space-y-4">
                    <input type="text" placeholder="您的姓名" required
                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white">
                    <input type="email" placeholder="您的 Email" required
                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white">
                    <select
                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                        required>
                        <option value="">選擇服務項目</option>
                        <option value="website">網站設計</option>
                        <option value="sticker">貼圖代購</option>
                        <option value="3c">3C產品代購</option>
                        <option value="other">其他服務</option>
                    </select>
                    <textarea placeholder="請描述您的需求" rows="4" required
                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"></textarea>
                    <button
                        class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        送出諮詢
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
