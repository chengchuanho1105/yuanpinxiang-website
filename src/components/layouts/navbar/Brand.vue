<script setup lang="ts">
defineOptions({ name: 'AppNavbarBrand' })
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useDark } from '@vueuse/core'
import { useCurrentBrand } from '@/composables/useCurrentBrand'

const { brandKey, brandInfo, homepageUrl } = useCurrentBrand()
const isDark = useDark()

// 根據主題自動選擇 logo
const brandLogo = computed(() => {
  if (isDark.value && brandInfo.value?.logoDark) {
    return brandInfo.value.logoDark
  }
  return brandInfo.value?.logo
})

const brandLogoAlt = computed(() => brandInfo.value?.displayName || String(brandKey.value))
</script>

<template>
  <div class="flex flex-shrink-0 items-center">
    <RouterLink :to="homepageUrl" class="flex items-center gap-2 hover:opacity-90 transition-opacity duration-300">
      <img v-if="brandLogo" :src="brandLogo" :alt="brandLogoAlt" class="w-10 h-10 rounded-lg object-contain" />
      <span class="text-lg font-bold text-zinc-900 dark:text-zinc-100">
        {{ brandLogoAlt }}
      </span>
    </RouterLink>
  </div>
</template>

<style scoped></style>
