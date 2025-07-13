<script setup lang="ts">
defineOptions({ name: 'Layout-Chuanlife-Default' })
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import Navbar from '@/components/layouts/navbar/Navbar.vue'
import UnderConstructionBanner from '@/components/UnderConstructionBanner.vue'
import Banner from '@/components/layouts/Banner.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import Breadcrumb from '@/components/layouts/Breadcrumb.vue'
import Footer from '@/components/layouts/Footer.vue'

const route = useRoute()
const isHomePage = computed(() => {
  return route.path === '/'
})
</script>

<template>
  <div class="min-h-screen bg-sky-50 dark:bg-sky-950">
    <header>
      <Navbar />
      <UnderConstructionBanner />
      <Banner>
        <template v-if="isHomePage">
          <ImageCarousel :items="[
            {
              bgImage: '/src/assets/media/og-img/yuanpinxiang/og-img.png'
            },
            {
              bgImage: 'https://picsum.photos/400/400?random=1'
            },
            {
              videoUrl: '/src/assets/media/videos/yuanpinxiang/homepagebanner-04.mp4',
              videoType: 'mp4'
            }
          ]" :auto-play="true" :interval="5000" :show-indicators="true" :show-arrows="true" />
        </template>
        <template v-else>
          <div class="relative w-full h-full bg-black">
            <img src="/src/assets/media/og-img/yuanpinxiang/og-img.png"
              class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="relative z-10 flex flex-col items-center justify-center h-full">
              <h1 class="text-4xl md:text-6xl font-extrabold text-white"></h1>
              <p class="mt-4 text-lg text-white/80"></p>
            </div>
          </div>
        </template>
      </Banner>
      <Breadcrumb :style="'default'" />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped></style>
