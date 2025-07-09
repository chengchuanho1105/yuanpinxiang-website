<script setup lang="ts">
defineOptions({ name: 'Layout-Chuanlife-Customer' })
import { RouterView } from 'vue-router'

import Navbar from '@/components/layouts/navbar/Navbar.vue'
/*
import Banner from '@/components/layouts/Banner.vue'
import Breadcrumb from '@/components/layouts/Breadcrumb.vue'
import Footer from '@/components/layouts/Footer.vue'
*/
</script>

<template>
  <div class="min-h-screen bg-sky-50 dark:bg-sky-950">
    <header>
      <Navbar />
      <!--
      <Banner />
      <Breadcrumb />
      -->
      <h1 class="text-4xl font-bold text-sky-900 dark:text-sky-100">Layout-Chuanlife-Customer</h1>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <!--
      <Footer />
      -->
    </footer>
  </div>
</template>

<style scoped></style>
