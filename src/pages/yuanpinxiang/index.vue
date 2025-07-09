<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Home' })
import FeatureImageSection from '@/components/FeatureImageSection.vue'
import { homeData } from '@/pageData/home'
</script>

<template>
  <div class="min-h-screen">
    <FeatureImageSection v-for="item in homeData" :key="item.title" :title="item.title" :description="item.desc"
      :button-text="item.buttonText" :button-link="item.buttonLink" :align="item.align" :bg-image="item.bgImage"
      :aos="item.aos" :scroll-down="item.scrollDown" />
  </div>
</template>

<style scoped></style>
