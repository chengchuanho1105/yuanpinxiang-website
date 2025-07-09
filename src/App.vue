<script setup lang="ts">
import BrandLayoutWrapper from '@/components/layouts/BrandLayoutWrapper.vue'
import ScrollToTop from '@/components/common/ScrollToTop.vue'
import LineButton from '@/components/common/LineButton.vue'
</script>

<template>
  <BrandLayoutWrapper />

  <!-- 浮動按鈕區域 -->
  <div class="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
    <ScrollToTop />
    <LineButton />
  </div>
</template>

<style scoped></style>
