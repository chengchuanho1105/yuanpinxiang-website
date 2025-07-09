<script setup lang="ts">
defineOptions({ name: 'Layout-Public-Customer' })
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-stone-50 dark:bg-stone-950">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
