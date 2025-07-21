<script setup lang="ts">
defineOptions({ name: 'YuanPinXiang-Product-List' })
import { ref, computed } from 'vue'
import DecorSection from '@/components/DecorSection.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { allProducts, categories } from '@/pageData/product'
import { useRouter } from 'vue-router'
import { useCurrentBrand } from '@/composables/useCurrentBrand'

// 分類狀態
const activeCat = ref(categories[0].key)
const filteredProducts = computed(() => allProducts.filter(p => p.category === activeCat.value))

// 熱銷、新品 computed
const hotProducts = computed(() => allProducts.filter(p => p.hot))
const newProducts = computed(() => allProducts.filter(p => p.new))

const router = useRouter()
const { brandKey, isMainBrand } = useCurrentBrand()

function getProductDetailPath(id: string | number) {
  return isMainBrand.value
    ? `/product/list/${id}`
    : `/${brandKey.value}/product/list/${id}`
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 space-y-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- 熱銷產品輪播 Swiper -->
      <DecorSection main-title="熱銷產品" en-title="HOT">
        <Swiper :modules="[Pagination, Navigation, Autoplay]" :slides-per-view="1" :space-between="24" navigation
          :pagination="{ clickable: true }" loop :autoplay="{ delay: 5000, disableOnInteraction: false }"
          class="w-full max-w-lg mx-auto">
          <SwiperSlide v-for="item in hotProducts" :key="item.id">
            <div class="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              @click="router.push(getProductDetailPath(item.id))">
              <img :src="item.image" :alt="item.shortName" class="w-full h-48 object-cover rounded-t-xl" />
              <div class="p-2">
                <h2 class="text-xl font-semibold">{{ item.shortName }}</h2>
                <p class="text-gray-700 mb-3">{{ item.shortDesc }}</p>
                <p class="text-indigo-600 font-bold text-end">{{ item.price }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </DecorSection>

      <!-- 新品上市輪播 Swiper -->
      <DecorSection main-title="新品上市" en-title="NEW">
        <Swiper :modules="[Pagination, Navigation, Autoplay]" :slides-per-view="1" :space-between="24" navigation
          :pagination="{ clickable: true }" loop :autoplay="{ delay: 5000, disableOnInteraction: false }"
          class="w-full max-w-lg mx-auto">
          <SwiperSlide v-for="item in newProducts" :key="item.id">
            <div class="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              @click="router.push(getProductDetailPath(item.id))">
              <img :src="item.image" :alt="item.shortName" class="w-full h-48 object-cover rounded-t-xl" />
              <div class="p-2">
                <h2 class="text-xl font-semibold">{{ item.shortName }}</h2>
                <p class="text-gray-700 mb-3">{{ item.shortDesc }}</p>
                <p class="text-indigo-600 font-bold text-end">{{ item.price }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </DecorSection>
    </div>

    <!-- 依分類產品列表 -->
    <DecorSection main-title="產品列表" en-title="PRODUCTS">
      <div class="flex gap-2 mb-6 justify-center">
        <button v-for="cat in categories" :key="cat.key" @click="activeCat = cat.key"
          class="px-4 py-2 rounded-full font-semibold transition border-2"
          :class="activeCat === cat.key
            ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-400 dark:border-indigo-400 dark:text-indigo-950'
            : 'bg-white dark:bg-indigo-950 text-indigo-700 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900'">
          {{ cat.name }}
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="p in filteredProducts" :key="p.id"
          class="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          @click="router.push(getProductDetailPath(p.id))">
          <img :src="p.image" :alt="p.shortName" class="w-full h-48 object-cover rounded-t-xl" />
          <div class="p-2">
            <h2 class="text-xl font-semibold">{{ p.shortName }}</h2>
            <p class="text-gray-700 mb-3">{{ p.shortDesc }}</p>
            <p class="text-indigo-600 font-bold text-end">{{ p.price }}</p>
          </div>
        </div>
      </div>
    </DecorSection>
    <router-view />
  </div>
</template>

<style scoped>
/* Swiper 導航按鈕加上 border 與圓角 */
.swiper-button-next,
.swiper-button-prev {
  border: 2px solid #6366f1;
  /* indigo-500 */
  border-radius: 9999px;
  background: white;
  color: #6366f1;
  width: 2.5rem;
  height: 2.5rem;
  box-shadow: 0 2px 8px 0 rgb(99 102 241 / 0.08);
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  border-color: #4338ca;
  /* indigo-700 */
  background: #eef2ff;
  color: #4338ca;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 1.25rem;
  font-weight: bold;
}

/* Swiper 指示點可點擊與主色 */
.swiper-pagination-bullet {
  background: #c7d2fe;
  /* indigo-200 */
  opacity: 1;
  border: 2px solid transparent;
  transition: border-color 0.2s, background 0.2s;
}

.swiper-pagination-bullet-active {
  background: #6366f1;
  /* indigo-500 */
  border-color: #6366f1;
}
</style>
