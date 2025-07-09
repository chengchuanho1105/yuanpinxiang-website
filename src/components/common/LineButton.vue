<script setup lang="ts">
defineOptions({ name: 'LineButton' })
import { computed } from 'vue'
import { useCurrentBrand } from '@/composables/useCurrentBrand'

const { brandKey, brandSocial, brandName } = useCurrentBrand()

// Line 連結配置 - 優先使用品牌配置中的 Line 連結
const lineLinks: Record<string, string> = {
  chuanlife: 'https://line.me/R/ti/p/@chuanlife',
  crazyclown: 'https://line.me/R/ti/p/@crazyclown'
}

// 獲取 Line 連結，優先使用品牌配置中的連結
const lineUrl = computed(() => {
  // 優先使用品牌配置中的 Line 連結
  if (brandSocial.value?.line?.url) {
    return brandSocial.value.line.url
  }
  // fallback 到預設連結
  return lineLinks[String(brandKey.value)] || lineLinks.chuanlife
})
</script>

<template>
  <a :href="lineUrl" target="_blank"
    class="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
    :title="`加入 ${brandName} Line`">
    <i class="bi bi-chat-dots text-lg group-hover:scale-110 transition-transform duration-200"></i>
  </a>
</template>

<style scoped></style>
