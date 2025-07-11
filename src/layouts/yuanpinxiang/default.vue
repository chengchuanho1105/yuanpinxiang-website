<script setup lang="ts">
defineOptions({ name: 'Layout-Chuanlife-Default' })
import { RouterView } from 'vue-router'

import Navbar from '@/components/layouts/navbar/Navbar.vue'
import Banner from '@/components/layouts/Banner.vue'
import Breadcrumb from '@/components/layouts/Breadcrumb.vue'
import Footer from '@/components/layouts/Footer.vue'
import UnderConstructionBanner from '@/components/UnderConstructionBanner.vue'
</script>

<template>
  <div class="min-h-screen bg-sky-50 dark:bg-sky-950">
    <header>
      <Navbar />
      <UnderConstructionBanner />
      <Banner>
        <img src="/src/assets/media/og-img/yuanpinxiang/og-img.png"
          class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 class="text-4xl md:text-6xl font-extrabold text-white"></h1>
          <p class="mt-4 text-lg text-white/80"></p>
        </div>
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
