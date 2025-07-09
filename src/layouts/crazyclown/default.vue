<script setup lang="ts">
defineOptions({ name: 'Layout-CrazyClown-Default' })
import { RouterView } from 'vue-router'

import Navbar from '@/components/layouts/navbar/Navbar.vue'
import Banner from '@/components/layouts/Banner.vue'
import Breadcrumb from '@/components/layouts/Breadcrumb.vue'
import Footer from '@/components/layouts/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-stone-50 dark:bg-stone-950">
    <header>
      <Navbar />
      <Banner></Banner>
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
