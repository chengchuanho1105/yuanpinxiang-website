<script setup lang="ts">
defineProps<{
  mainTitle: string
  enTitle: string
}>()
</script>

<template>
  <section class="my-8 p-4 md:p-6 lg:p-8 rounded-xl shadow relative
      bg-gradient-to-br from-indigo-100 via-white/70 to-sky-100
      dark:bg-gradient-to-br dark:from-indigo-800 dark:via-indigo-900/80 dark:to-sky-800">
    <!-- 中文大標 -->
    <h2 class="text-2xl font-bold relative z-10 text-indigo-900 dark:text-indigo-100" data-aos="fade-up-left"
      v-html="mainTitle">
    </h2>
    <!-- 英文大標疊底裝飾 -->
    <div class="absolute right-5 top-0 z-0 pointer-events-none select-none" data-aos="fade-up-right">
      <span
        class="block text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-extrabold text-indigo-200/30 dark:text-indigo-400/20"
        style="transform: rotate(3deg) scaleX(1.1); letter-spacing: 0.1em; -webkit-text-stroke: 2px #6366f1; filter: blur(2.5px); ">
        {{ enTitle }}
      </span>
    </div>
    <!-- 分隔線 -->
    <div class="w-full z-10 mt-2 mb-6 bg-black/20 dark:bg-white/20 rounded-full" data-aos="fade-up">
      <div class="w-1/2 border-2 border-indigo-400 rounded-full" />
    </div>
    <!-- 內容 -->
    <div class="relative z-10 text-gray-700 dark:text-gray-200" data-aos="fade-up">
      <slot />
    </div>

  </section>
</template>
