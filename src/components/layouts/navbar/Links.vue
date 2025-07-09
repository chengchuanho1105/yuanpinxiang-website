<script setup lang="ts">
defineOptions({ name: 'AppNavbarLinks' })
import { useNavbarLinks } from '@/composables/useNavbarLinks'
import LinksItem from './LinksItem.vue'

const { navbarLinks } = useNavbarLinks()
</script>

<template>
  <div class="hidden lg:flex">
    <ul class="flex items-center space-x-4">
      <LinksItem v-for="link in navbarLinks" :key="link.name" :link="link" />
    </ul>
  </div>
</template>

<style scoped></style>
