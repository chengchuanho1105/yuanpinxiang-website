<script setup lang="ts">
defineOptions({ name: 'Layout-CrazyClown-Customer' })
import { RouterView } from 'vue-router'
/*
import Navbar from '@/components/layouts/navbar/Navbar.vue'
import Banner from '@/components/layouts/Banner.vue'
import Breadcrumb from '@/components/layouts/Breadcrumb.vue'
import Footer from '@/components/layouts/Footer.vue'
*/
</script>

<template>
  <div class="min-h-screen bg-stone-50 dark:bg-stone-950">
    <header>
      <Navbar />
      <!--
      <Banner />
      <Breadcrumb />
      -->
      <h1 class="text-4xl font-bold text-zinc-900 dark:text-zinc-100">Layout-CrazyClown-Customer</h1>
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
