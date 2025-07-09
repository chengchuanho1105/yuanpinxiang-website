<script setup lang="ts">
defineOptions({ name: 'ChuanLife-About' })
import DecorSection from '@/components/DecorSection.vue'
import { founderData, timelineData } from '@/pageData/about'
</script>

<template>
  <div class="max-w-7xl mx-auto p-8">
    <!-- 區塊1：創辦人介紹（AOS動畫版，最佳化疊底大字顏色與主標題可讀性） -->
    <DecorSection main-title="創辦人介紹" en-title="FOUNDER">
      <div class="relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <img src="https://picsum.photos/400/400?random=10" alt="創辦人"
          class="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg mb-6 md:mb-0 z-10" data-aos="zoom-in" />
        <div class="flex-1 z-10" data-aos="fade-up">
          <h3 class="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-2"
            style="text-shadow:0 1px 6px #fff6;">{{ founderData[0].title }} {{ founderData[0].name }}</h3>
          <p class="text-lg text-gray-700 dark:text-gray-200 leading-relaxed" style="text-shadow:0 1px 6px #fff4;">
            {{ founderData[0].desc }}
          </p>
        </div>
      </div>
    </DecorSection>

    <!-- 區塊2：歷史大事記（第14版時間線設計） -->
    <DecorSection main-title="歷史大事記" en-title="HISTORY">
      <div class="py-8">
        <div class="relative overflow-hidden">
          <div v-for="(item, i) in timelineData" :key="i"
            class="flex relative py-10 sm:items-center lg:w-[80%] w-[90%] mx-auto" data-aos="fade-up"
            :data-aos-delay="i * 200">
            <!-- 時間線 -->
            <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div class="h-full w-1 bg-gray-300 dark:bg-gray-300 pointer-events-none"></div>
            </div>
            <!-- 時間次序圓點 -->
            <div
              class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-600 dark:bg-indigo-400 relative z-10">
              <span class="text-sm text-white">{{ i + 1 }}</span>
            </div>
            <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <!-- Icon -->
              <div
                class="flex-shrink-0 w-24 h-24 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-100 rounded-full inline-flex items-center justify-center">
                <i :class="['bi', item.icon, 'text-5xl']"></i>
              </div>
              <!-- Description -->
              <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ item.title }}</h2>
                <span class="text-xl font-bold text-gray-800 dark:text-gray-300">{{ item.year }}</span>
                <p class="text-lg font-medium mt-3 text-gray-700 dark:text-gray-400">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DecorSection>

    <!-- 區塊3：職人堅持（田字四格） -->
    <DecorSection main-title="職人堅持" en-title="COMMITMENT">
      <div class="py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col items-center text-center bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6">
            <img src="https://picsum.photos/300/300?random=11" class="w-28 h-28 rounded-full object-cover mb-4" />
            <h3 class="text-xl font-bold text-sky-800 dark:text-sky-200 mb-2">嚴選黃豆</h3>
            <p class="text-gray-700 dark:text-gray-300">使用單一品種非基因改造黃豆，味道更純正，成本也比混合豆高出5～6%。</p>
          </div>
          <div class="flex flex-col items-center text-center bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6">
            <img src="https://picsum.photos/300/300?random=12" class="w-28 h-28 rounded-full object-cover mb-4" />
            <h3 class="text-xl font-bold text-sky-800 dark:text-sky-200 mb-2">傳統三溫暖工法</h3>
            <p class="text-gray-700 dark:text-gray-300">全程遵循「浸泡 → 煮滾 → 過濾」的黃豆三溫暖製程。</p>
          </div>
          <div class="flex flex-col items-center text-center bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6">
            <img src="https://picsum.photos/300/300?random=13" class="w-28 h-28 rounded-full object-cover mb-4" />
            <h3 class="text-xl font-bold text-sky-800 dark:text-sky-200 mb-2">手工製作</h3>
            <p class="text-gray-700 dark:text-gray-300">每張豆皮皆由人工細心撈取，無任何化學添加。</p>
          </div>
          <div class="flex flex-col items-center text-center bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6">
            <img src="https://picsum.photos/300/300?random=14" class="w-28 h-28 rounded-full object-cover mb-4" />
            <h3 class="text-xl font-bold text-sky-800 dark:text-sky-200 mb-2">匠心堅持</h3>
            <p class="text-gray-700 dark:text-gray-300">每片豆皮都是源自耐心與堅持的結晶。</p>
          </div>
        </div>
      </div>
    </DecorSection>

    <!-- 區塊4：社會責任 -->
    <DecorSection main-title="社會責任" en-title="CSR">
      <div class="py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center text-center p-6">
            <span class="text-5xl mb-2">🌱</span>
            <h3 class="text-xl font-bold text-sky-800 dark:text-sky-200 mb-2">來自土地，回饋土地</h3>
            <p class="text-gray-700 dark:text-gray-300">支持台灣在地農業，採用100%本土黃豆，與土地共生共榮。</p>
          </div>
          <div class="flex flex-col items-center text-center p-6">
            <span class="text-5xl mb-2">🌏</span>
            <h3 class="text-xl font-bold text-sky-800 dark:text-sky-200 mb-2">環境友善製程</h3>
            <p class="text-gray-700 dark:text-gray-300">積極響應環保政策，減少生產過程中的碳排與污染。</p>
          </div>
          <div class="flex flex-col items-center text-center p-6">
            <span class="text-5xl mb-2">🤝</span>
            <h3 class="text-xl font-bold text-sky-800 dark:text-sky-200 mb-2">回饋社會</h3>
            <p class="text-gray-700 dark:text-gray-300">致力於公益與在地社區合作，共創美好未來。</p>
          </div>
        </div>
      </div>
    </DecorSection>
  </div>
</template>

<style scoped>
.stroke-light {
  -webkit-text-stroke: 2px #a5b4fc;
  text-stroke: 2px #a5b4fc;
}

.dark .stroke-dark {
  -webkit-text-stroke: 2px #6366f1;
  text-stroke: 2px #6366f1;
}
</style>
