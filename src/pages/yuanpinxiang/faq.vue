<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Faq' })

import { ref } from 'vue'

import { faqList } from '@/pageData/faq'

// 每個分類各自記錄展開的 index
const openIndexes = ref<Record<string, number | null>>({})
faqList.forEach(list => {
  openIndexes.value[list.category] = null
})

function toggle(category: string, idx: number) {
  openIndexes.value[category] = openIndexes.value[category] === idx ? null : idx
}
</script>

<template>
  <section class="max-w-2xl mx-auto py-10 px-4">
    <div class="flex items-end justify-between mb-10">
      <h1 class="text-3xl md:text-4xl font-bold tracking-wide text-gray-800 dark:text-white">常見問題</h1>
      <span class="text-base md:text-lg text-gray-400 font-semibold tracking-widest uppercase ml-4">FAQ</span>
    </div>
    <div class="space-y-10">
      <div v-for="list in faqList" :key="list.category">
        <h2
          class="text-xl md:text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4 border-l-4 border-indigo-400 pl-3">
          {{ list.category }}</h2>
        <div class="flex flex-col gap-3">
          <div v-for="(item, idx) in list.items" :key="item.question"
            class="bg-white/90 dark:bg-indigo-950/90 rounded-xl shadow border border-gray-100 dark:border-indigo-900 overflow-hidden transition-colors">
            <button
              class="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-gray-800 dark:text-gray-100 focus:outline-none hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors"
              :aria-expanded="openIndexes[list.category] === idx" @click="toggle(list.category, idx)">
              <span>{{ item.question }}</span>
              <svg class="ml-3 transition-transform duration-300"
                :class="{ 'rotate-180': openIndexes[list.category] === idx }" width="20" height="20"
                viewBox="0 0 20 20">
                <polyline points="6 8 10 12 14 8" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div class="px-5 overflow-hidden transition-all duration-300"
              :class="openIndexes[list.category] === idx ? 'max-h-40 py-2' : 'max-h-0 py-0'">
              <div class="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
