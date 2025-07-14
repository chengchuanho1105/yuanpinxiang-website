<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// 引入 Swiper 樣式
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface CarouselItem {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  bgImage?: string
  videoUrl?: string
  videoType?: 'mp4' | 'webm' | unknown
}

const props = withDefaults(defineProps<{
  items: CarouselItem[]
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  showArrows?: boolean
}>(), {
  autoPlay: true,
  interval: 5000,
  showIndicators: true,
  showArrows: true
})

const progressCircle = ref<HTMLElement | null>(null)
const progressContent = ref<HTMLElement | null>(null)

// 自動播放時間剩餘事件
const onAutoplayTimeLeft = (_s: unknown, time: number, progress: number) => {
  if (progressCircle.value) {
    progressCircle.value.style.setProperty('--progress', String(1 - progress))
  }
  if (progressContent.value) {
    progressContent.value.textContent = `${Math.ceil(time / 1000)}s`
  }
}

// Swiper 模組
const modules = [Autoplay, Pagination, Navigation]

// Swiper 配置
const swiperOptions = computed(() => ({
  spaceBetween: 0,
  centeredSlides: false,
  autoplay: props.autoPlay ? {
    delay: props.interval,
    disableOnInteraction: false,
    pauseOnMouseEnter: false
  } : false,
  pagination: props.showIndicators && props.items.length > 1 ? {
    clickable: true
  } : false,
  navigation: props.showArrows && props.items.length > 1,
  loop: props.items.length > 1,
  speed: 500,
  allowTouchMove: false
}))
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <Swiper v-bind="swiperOptions" :modules="modules" @autoplayTimeLeft="onAutoplayTimeLeft" class="w-full h-full">
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <div class="relative w-full h-full">
          <!-- 背景影片 -->
          <video v-if="item.videoUrl" class="absolute inset-0 w-full h-full object-cover" :src="item.videoUrl"
            :type="item.videoType ? `video/${item.videoType}` : 'video/mp4'" autoplay muted loop playsinline
            preload="auto">
          </video>

          <!-- 背景圖片 -->
          <div v-else-if="item.bgImage" class="absolute inset-0 bg-cover bg-center object-cover"
            :style="`background-image: url('${item.bgImage}');`">
          </div>

          <!-- 黑色遮罩 -->
          <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

          <!-- 內容區域 -->
          <div class="absolute inset-0 flex items-center justify-center z-10">
            <div class="text-center text-white px-8 max-w-4xl mx-auto">
              <h2 v-if="item.title" class="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">{{ item.title }}
              </h2>
              <p v-if="item.description" class="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto"
                v-html="item.description"></p>
              <a v-if="item.buttonText" :href="item.buttonLink || '#'"
                class="inline-block px-8 py-4 rounded-full bg-sky-600 text-white font-bold text-lg shadow-lg hover:bg-sky-700 hover:scale-105 transition-all duration-200">
                {{ item.buttonText }}
              </a>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <!-- 自動播放進度圓圈 -->
      <template #container-end>
        <div v-if="autoPlay && items.length > 1" class="autoplay-progress">
          <svg viewBox="0 0 48 48" ref="progressCircle">
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref="progressContent"></span>
        </div>
      </template>
    </Swiper>
  </div>
</template>

<style scoped>
/* 確保輪播圖在移動設備上正常顯示 */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2rem;
  }

  .text-6xl {
    font-size: 3rem;
  }
}

/* 自動播放進度圓圈樣式 */
.autoplay-progress {
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

.autoplay-progress svg {
  --progress: 0;
  transform: rotate(-90deg);
}

.autoplay-progress svg circle {
  stroke: white;
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 126;
  stroke-dashoffset: calc(126 - (126 * var(--progress)));
  transition: stroke-dashoffset 0.1s ease;
}

.autoplay-progress span {
  position: absolute;
  font-size: 12px;
  font-weight: bold;
}

/* 自定義 Swiper 導航按鈕樣式 */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 48px !important;
  height: 48px !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-radius: 50% !important;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  color: white !important;
}

:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
  background-color: rgba(255, 255, 255, 0.3) !important;
}

:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: 18px !important;
  font-weight: bold !important;
}

/* 自定義分頁器樣式 */
:deep(.swiper-pagination-bullet) {
  width: 12px !important;
  height: 12px !important;
  background-color: rgba(255, 255, 255, 0.5) !important;
  opacity: 1 !important;
  transition: all 0.2s ease;
  margin: 0 4px !important;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: white !important;
  transform: scale(1.2) !important;
}

:deep(.swiper-pagination-bullet:hover) {
  background-color: rgba(255, 255, 255, 0.75) !important;
}
</style>
