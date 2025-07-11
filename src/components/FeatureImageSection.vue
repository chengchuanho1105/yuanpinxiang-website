<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  description: string
  buttonText: string
  buttonLink?: string
  // 空值預設為 left
  align?: 'left' | 'right' | undefined
  bgImage?: string
  aos?: string
  scrollDown?: boolean
}>(), {
  scrollDown: true
})

const alignClass = computed(() => props.align === 'right' ? 'right-0 items-end text-right' : 'left-0 items-start text-left')
const bgUrl = computed(() => props.bgImage || 'https://picsum.photos/1920/1080?random=1')
const roundedClass = computed(() => props.align === 'right' ? 'rounded-none md:rounded-l-full' : 'rounded-none md:rounded-r-full')
const aosType = computed(() => props.aos || (props.align === 'right' ? 'fade-left' : 'fade-right'))
const htmlDescription = computed(() => props.description)

const sectionRef = ref<HTMLElement | null>(null)
const isScrolling = ref(false)
const scrollTimeout = ref<number | null>(null)

const scrollToNextSection = () => {
  // 防止重複點擊
  if (isScrolling.value) return

  if (!sectionRef.value) return

  isScrolling.value = true

  // 清除之前的 timeout
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }

  const allSections = Array.from(document.querySelectorAll('section'))
  const idx = allSections.findIndex(s => s === sectionRef.value)

  if (idx !== -1 && allSections[idx + 1]) {
    allSections[idx + 1].scrollIntoView({ behavior: 'smooth' })

    // 延遲重置狀態，避免快速重複點擊
    scrollTimeout.value = window.setTimeout(() => {
      isScrolling.value = false
    }, 1000) // 1秒防抖
  } else {
    isScrolling.value = false
  }
}

// 組件卸載時清理 timeout
const cleanup = () => {
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }
}

// 在組件卸載時清理
import { onUnmounted } from 'vue'
onUnmounted(cleanup)
</script>

<template>
  <section ref="sectionRef" class="relative w-full h-screen mb-20 flex items-center overflow-hidden"
    :style="`background-image: url('${bgUrl}'); background-size: cover; background-position: center;background-attachment: fixed;`">
    <!-- 黑色遮罩 -->
    <div class="absolute inset-0 bg-black/40 dark:bg-black/60 -z-10"></div>
    <!-- 文字區塊 -->
    <div :class="[
      'absolute top-1/2 transform -translate-y-1/2 p-8 md:p-12 bg-white/80 dark:bg-gray-900/80 shadow-xl backdrop-blur-md',
      'w-full md:w-3/5',
      alignClass,
      roundedClass
    ]" :data-aos="aosType" data-aos-duration="800">
      <h2 class="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white drop-shadow">{{ props.title }}
      </h2>
      <p class="mb-6 text-lg text-gray-700 dark:text-gray-200 leading-relaxed" v-html="htmlDescription"></p>
      <a v-if="props.buttonText" :href="props.buttonLink || '#'"
        class="inline-block px-8 py-3 rounded-full bg-sky-600 text-white font-bold text-lg shadow hover:bg-sky-700 hover:scale-105 transition-all duration-200">
        {{ props.buttonText }}
      </a>
      <slot />
    </div>
    <!-- 向下瀏覽提示 -->
    <div v-if="props.scrollDown"
      class="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center z-20 select-none"
      :class="{ 'cursor-pointer': !isScrolling, 'cursor-not-allowed opacity-50': isScrolling }"
      @click="scrollToNextSection" @mousedown.prevent data-aos="fade-up">
      <span class="animate-bounce text-3xl text-sky-400 dark:text-sky-200">↓</span>
      <span class="mt-1 text-xs text-sky-500 dark:text-sky-200 tracking-wide">
        {{ isScrolling ? '滾動中...' : '向下瀏覽' }}
      </span>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 768px) {
  .max-w-xl {
    max-width: 95vw;
    padding: 1.5rem;
  }
}
</style>
