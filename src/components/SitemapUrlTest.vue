<script setup lang="ts">
defineOptions({ name: 'SitemapUrlTest' })
</script>

<template>
  <div class="px-4 text-stone-900 dark:text-stone-100">
    <h1 class="my-8 text-4xl font-bold">Sitemap Url</h1>
    <ul class="grid grid-cols-1 gap-3 list-disc list-inside">
      <li><a href="/">ChuanLife-Home</a></li>
      <li><a href="/about">ChuanLife-About</a></li>
      <li><a href="/product">ChuanLife-Product</a></li>
      <li><a href="/product/certification">ChuanLife-Product-Certification</a></li>
      <li><a href="/product/list">ChuanLife-Product-List</a></li>
      <li><a href="/product/list/detail">ChuanLife-Product-List-Detail</a></li>
      <hr class="my-4" />
      <li><a href="/crazyclown">CrazyClown-Home</a></li>
      <li><a href="/crazyclown/about">CrazyClown-About</a></li>
      <li><a href="/crazyclown/join">CrazyClown-Join</a></li>
    </ul>
  </div>
  <div class="min-h-screen"></div>
</template>

<style scoped></style>
