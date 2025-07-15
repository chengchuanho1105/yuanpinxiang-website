<script setup lang="ts">
defineOptions({ name: 'YuanPinXiang-Product-List-[id]' })
import { allProducts } from '@/pageData/product'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'

const route = useRoute()
const product = allProducts.find((product) => String(product.id) === String(route.params.id))

const thumbsSwiper: SwiperClass | null = null
const showFullscreen = ref(false)
const fullscreenImg = ref('')
const tabImg = ref(0)

type ProductDetail = { name?: string; des?: string;[key: string]: string | undefined }
const detail = computed(() => (product?.detail || {}) as ProductDetail)
const images = computed(() => {
  if (!detail.value) return []
  return Array.from({ length: 10 }, (_, i) => detail.value[`img${i + 1}`] as string).filter(Boolean)
})

function openFullscreen(img: string) {
  fullscreenImg.value = img
  showFullscreen.value = true
  tabImg.value = images.value.findIndex(i => i === img)
}
function closeFullscreen() {
  showFullscreen.value = false
}

// 移除 prevFullscreenImg/nextFullscreenImg/handleKeydown 相關
</script>

<template>
  <div v-if="product" class="max-w-6xl mx-auto px-4 py-10 space-y-16">
    <!-- 全螢幕大圖 Swiper -->
    <div v-if="showFullscreen"
      class="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center select-none"
      style="inset:0;z-index:9999;position:fixed;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;"
      @click.self="closeFullscreen">
      <button class="absolute top-6 right-8 text-white text-3xl z-[10001]" @click="closeFullscreen">&times;</button>
      <Swiper :modules="[Navigation, Thumbs]" :initial-slide="tabImg" navigation pagination keyboard
        class="w-screen h-screen flex items-center justify-center" style="max-width:100vw;max-height:100vh;"
        @slideChange="(swiper) => { tabImg = swiper.activeIndex; fullscreenImg = images[tabImg] }">
        <SwiperSlide v-for="(img, i) in images" :key="i">
          <div class="w-full h-full flex items-center justify-center">
            <img :src="img" class="max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg object-contain" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <section class="bg-white dark:bg-indigo-950 rounded-2xl shadow-lg p-6">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2">
          <!-- 大圖 Swiper -->
          <Swiper :modules="[Navigation, Thumbs]" :thumbs="{ swiper: thumbsSwiper }" navigation
            class="mb-4 cursor-zoom-in" :slides-per-view="1" :space-between="10" :initial-slide="tabImg"
            @slideChange="(swiper) => tabImg = swiper.activeIndex" @click="openFullscreen(images[tabImg] || images[0])">
            <SwiperSlide v-for="(img, i) in images" :key="i">
              <img :src="img" :alt="detail?.name || ''" class="w-full h-80 object-cover rounded-xl shadow" />
            </SwiperSlide>
          </Swiper>
          <!-- 小圖列 Swiper -->
          <Swiper :modules="[Navigation, Thumbs]" :watch-slides-progress="true"
            :slides-per-view="Math.min(images.length, 6)" :space-between="8" navigation class="thumbs-swiper"
            style="height: 80px;" @swiper="(swiper) => { thumbsSwiper = swiper as any }">
            <SwiperSlide v-for="(img, i) in images" :key="i" style="width: 72px;">
              <img :src="img" :alt="'副圖' + (i + 1)" class="w-16 h-16 object-cover rounded border cursor-pointer"
                @click="tabImg = i" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="flex gap-2 mb-2">
              <span
                class="text-sm px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full">{{
                  product.category }}</span>
              <span v-if="product.hot"
                class="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">熱銷</span>
              <span v-if="product.new"
                class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">新品</span>
            </div>
            <h2 class="text-2xl font-bold text-indigo-800 dark:text-indigo-100 mb-2">{{ detail?.name }}</h2>
            <!-- 商品資訊表格 -->
            <table>
              <tr class="text-lg text-gray-700 dark:text-gray-300">
                <td class="w-[5rem] px-1 text-right align-top">
                  <span class="font-bold">
                    商品介紹
                  </span>
                </td>
                <td class="px-1 text-left align-top">
                  <span class="">
                    {{ detail?.desc }}
                  </span>
                </td>
              </tr>
              <tr class="text-lg text-gray-700 dark:text-gray-300">
                <td class="w-[5rem] px-1 text-right align-top">
                  <span class="font-bold">
                    保存方式
                  </span>
                </td>
                <td class="px-1 text-left align-top">
                  <span class="">
                    {{ detail?.storage }}
                  </span>
                </td>
              </tr>
              <tr class="text-lg text-gray-700 dark:text-gray-300">
                <td class="w-[5rem] px-1 text-right align-top">
                  <span class="font-bold">
                    保存期限
                  </span>
                </td>
                <td class="px-1 text-left align-top">
                  <span class="">
                    {{ detail?.expDate }}
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <div class="mt-auto flex flex-row gap-4 justify-end items-center">
            <span class="px-4 py-2 text-xl font-bold text-indigo-600 dark:text-indigo-300">
              {{ product.price }}
            </span>
            <!--
            <button
              class="w-[8rem] py-2 rounded-full bg-indigo-600 text-white font-bold text-lg shadow hover:bg-indigo-700 transition">
              加入購物車
            </button>
            <button
              class="w-[8rem] py-2 rounded-full bg-orange-500 text-white font-bold text-lg shadow hover:bg-orange-600 transition">
              立即購買
            </button>
            -->
            <a href="/contact"
              class="px-4 py-2 text-xl font-bold text-indigo-600 dark:text-indigo-300 border border-indigo-600 dark:border-indigo-300  rounded-full text-center hover:bg-indigo-600 hover:text-white transition">
              購買請洽客服
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  height: 6px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #c7d2fe;
  border-radius: 3px;
}

.thumbs-swiper {
  user-select: none;
  cursor: grab;
}

.select-none {
  user-select: none;
}
</style>
