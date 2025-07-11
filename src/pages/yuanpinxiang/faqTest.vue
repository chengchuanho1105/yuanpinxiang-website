<script setup lang="ts">
defineOptions({ name: 'FaqTest' })

import { ref, onMounted } from 'vue'
import { fetchFaqFromGoogleSheets } from '@/utils/googleSheets'

const rawData = ref<string>('')
const parsedData = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const testGoogleSheets = async () => {
    try {
        loading.value = true
        error.value = null

        // 直接獲取原始 CSV 數據
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTBfQ7Y7BhxlwA-9BJ7FFLbMNLxhZh_Q8gHe5tXuwhk62Ofy6BX1lSVuyZybzQTLFvz3TeARDlEpj3_/pub?gid=0&single=true&output=csv')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const csvText = await response.text()
        rawData.value = csvText

        // 測試解析功能
        const data = await fetchFaqFromGoogleSheets()
        parsedData.value = data

    } catch (err) {
        console.error('Test failed:', err)
        error.value = err instanceof Error ? err.message : '未知錯誤'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    testGoogleSheets()
})
</script>

<template>
    <div class="max-w-4xl mx-auto py-10 px-4">
        <h1 class="text-3xl font-bold mb-8">FAQ Google Sheets 測試</h1>

        <div class="mb-6">
            <button @click="testGoogleSheets" :disabled="loading"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
                {{ loading ? '載入中...' : '重新測試' }}
            </button>
        </div>

        <!-- 錯誤訊息 -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>錯誤：</strong> {{ error }}
        </div>

        <!-- 原始 CSV 數據 -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">原始 CSV 數據</h2>
            <div class="bg-gray-100 p-4 rounded">
                <pre class="whitespace-pre-wrap text-sm">{{ rawData || '載入中...' }}</pre>
            </div>
        </div>

        <!-- 解析後的數據 -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">解析後的數據</h2>
            <div class="bg-gray-100 p-4 rounded">
                <pre class="whitespace-pre-wrap text-sm">{{ JSON.stringify(parsedData, null, 2) }}</pre>
            </div>
        </div>

        <!-- 格式化顯示 -->
        <div v-if="parsedData.length > 0">
            <h2 class="text-xl font-semibold mb-4">格式化顯示</h2>
            <div class="space-y-6">
                <div v-for="(category, index) in parsedData" :key="index" class="border rounded p-4">
                    <h3 class="text-lg font-semibold text-blue-600 mb-3">{{ category.category }}</h3>
                    <div class="space-y-3">
                        <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="pl-4">
                            <div class="font-medium text-gray-800">Q: {{ item.question }}</div>
                            <div class="text-gray-600 mt-1">A: {{ item.answer }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
