<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  id: { type: String, default: '' },
  mainTitle: { type: String, required: true },
  subTitle: { type: String },
  slogan: { type: String },
  variant: { type: String, default: 'classic' }
})

const sectionClass = computed(() => {
  switch (props.variant) {
    case 'classic': return 'my-10 bg-indigo-50 dark:bg-indigo-950 border border-gray-100 dark:border-indigo-900 rounded-lg shadow'
    case 'minimal': return 'my-10 border-l-4 border-indigo-400 bg-transparent rounded-none shadow-none'
    case 'gradient': return 'my-10 bg-gradient-to-r from-indigo-200 via-sky-100 to-white dark:from-indigo-900 dark:via-indigo-950 dark:to-gray-950 border-none rounded-2xl shadow-lg'
    case 'glass': return 'my-10 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/30 dark:border-gray-800/30 rounded-2xl shadow-lg'
    case 'colorbar': return 'my-10 bg-white dark:bg-gray-950 border-none rounded-2xl shadow-lg'
    case 'sky': return 'my-10 bg-sky-100 dark:bg-sky-900 border border-sky-200 dark:border-sky-800 rounded-2xl shadow'
    case 'indigo': return 'my-10 bg-indigo-100 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 rounded-2xl shadow'
    case 'emerald': return 'my-10 bg-emerald-100 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-2xl shadow'
    case 'rose': return 'my-10 bg-rose-100 dark:bg-rose-900 border border-rose-200 dark:border-rose-800 rounded-2xl shadow'
    case 'slate': return 'my-10 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow'
    case 'dark': return 'my-10 bg-gray-900 border border-gray-800 rounded-2xl shadow text-white'
    case 'light': return 'my-10 bg-white border border-gray-200 rounded-2xl shadow text-gray-900'
    case 'border': return 'my-10 border-4 border-indigo-400 bg-white dark:bg-gray-950 rounded-2xl shadow-none'
    case 'shadow': return 'my-10 bg-white dark:bg-gray-900 border-none rounded-2xl shadow-2xl'
    case 'outline': return 'my-10 bg-transparent border-2 border-dashed border-indigo-400 dark:border-indigo-700 rounded-2xl shadow-none'
    case 'card': return 'my-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg'
    case 'modern': return 'my-10 bg-gradient-to-br from-indigo-100 via-white to-sky-100 dark:from-indigo-900 dark:via-gray-950 dark:to-sky-900 border-none rounded-3xl shadow-xl'
    case 'retro': return 'my-10 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-800 rounded-xl shadow'
    case 'elegant': return 'my-10 bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 border-none rounded-2xl shadow-lg'
    case 'playful': return 'my-10 bg-gradient-to-r from-pink-200 via-yellow-100 to-green-100 dark:from-pink-900 dark:via-yellow-900 dark:to-green-900 border-none rounded-3xl shadow-lg'
    default: return 'my-10 bg-indigo-50 dark:bg-indigo-950 border border-gray-100 dark:border-indigo-900 rounded-lg shadow'
  }
})

const titleColorClass = computed(() => {
  switch (props.variant) {
    case 'classic': return 'text-indigo-900 dark:text-indigo-100'
    case 'minimal': return 'text-indigo-700 dark:text-indigo-200'
    case 'gradient': return 'text-indigo-900 dark:text-indigo-100'
    case 'glass': return 'text-gray-900 dark:text-white'
    case 'colorbar': return 'text-indigo-900 dark:text-indigo-100'
    case 'sky': return 'text-sky-900 dark:text-sky-100'
    case 'indigo': return 'text-indigo-900 dark:text-indigo-100'
    case 'emerald': return 'text-emerald-900 dark:text-emerald-100'
    case 'rose': return 'text-rose-900 dark:text-rose-100'
    case 'slate': return 'text-slate-900 dark:text-slate-100'
    case 'dark': return 'text-white'
    case 'light': return 'text-gray-900'
    case 'border': return 'text-indigo-900 dark:text-indigo-100'
    case 'shadow': return 'text-gray-900 dark:text-white'
    case 'outline': return 'text-indigo-700 dark:text-indigo-200'
    case 'card': return 'text-gray-900 dark:text-white'
    case 'modern': return 'text-indigo-900 dark:text-indigo-100'
    case 'retro': return 'text-yellow-900 dark:text-yellow-100'
    case 'elegant': return 'text-gray-900 dark:text-gray-100'
    case 'playful': return 'text-pink-900 dark:text-pink-100'
    default: return 'text-gray-900 dark:text-gray-100'
  }
})
const subTitleColorClass = computed(() => {
  switch (props.variant) {
    case 'classic': return 'text-indigo-700 dark:text-indigo-200'
    case 'minimal': return 'text-indigo-500 dark:text-indigo-200'
    case 'gradient': return 'text-sky-700 dark:text-sky-200'
    case 'glass': return 'text-gray-700 dark:text-gray-200'
    case 'colorbar': return 'text-indigo-700 dark:text-indigo-200'
    case 'sky': return 'text-sky-700 dark:text-sky-200'
    case 'indigo': return 'text-indigo-700 dark:text-indigo-200'
    case 'emerald': return 'text-emerald-700 dark:text-emerald-200'
    case 'rose': return 'text-rose-700 dark:text-rose-200'
    case 'slate': return 'text-slate-700 dark:text-slate-200'
    case 'dark': return 'text-indigo-200'
    case 'light': return 'text-indigo-700'
    case 'border': return 'text-indigo-700 dark:text-indigo-200'
    case 'shadow': return 'text-gray-700 dark:text-gray-200'
    case 'outline': return 'text-indigo-500 dark:text-indigo-200'
    case 'card': return 'text-gray-700 dark:text-gray-200'
    case 'modern': return 'text-sky-700 dark:text-sky-200'
    case 'retro': return 'text-yellow-800 dark:text-yellow-200'
    case 'elegant': return 'text-gray-700 dark:text-gray-200'
    case 'playful': return 'text-yellow-700 dark:text-yellow-200'
    default: return 'text-gray-800 dark:text-gray-200'
  }
})
const sloganColorClass = computed(() => {
  switch (props.variant) {
    case 'classic': return 'text-gray-700 dark:text-indigo-200'
    case 'minimal': return 'text-indigo-500 dark:text-indigo-200'
    case 'gradient': return 'text-indigo-700 dark:text-sky-200'
    case 'glass': return 'text-gray-600 dark:text-gray-200'
    case 'colorbar': return 'text-indigo-700 dark:text-indigo-200'
    case 'sky': return 'text-sky-700 dark:text-sky-200'
    case 'indigo': return 'text-indigo-700 dark:text-indigo-200'
    case 'emerald': return 'text-emerald-700 dark:text-emerald-200'
    case 'rose': return 'text-rose-700 dark:text-rose-200'
    case 'slate': return 'text-slate-700 dark:text-slate-200'
    case 'dark': return 'text-indigo-200'
    case 'light': return 'text-indigo-700'
    case 'border': return 'text-indigo-700 dark:text-indigo-200'
    case 'shadow': return 'text-gray-700 dark:text-gray-200'
    case 'outline': return 'text-indigo-500 dark:text-indigo-200'
    case 'card': return 'text-gray-700 dark:text-gray-200'
    case 'modern': return 'text-sky-700 dark:text-sky-200'
    case 'retro': return 'text-yellow-800 dark:text-yellow-200'
    case 'elegant': return 'text-gray-700 dark:text-gray-200'
    case 'playful': return 'text-green-700 dark:text-green-200'
    default: return 'text-gray-700 dark:text-gray-300'
  }
})

const titleBarClass = computed(() => {
  switch (props.variant) {
    case 'minimal': return 'flex items-end mb-2'
    case 'colorbar': return 'flex items-end mb-2 bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-600 px-4 py-2 rounded-t-2xl'
    case 'sky': return 'flex items-end mb-2 bg-sky-200 dark:bg-sky-800 px-4 py-2 rounded-t-2xl'
    case 'indigo': return 'flex items-end mb-2 bg-indigo-300 dark:bg-indigo-800 px-4 py-2 rounded-t-2xl'
    case 'emerald': return 'flex items-end mb-2 bg-emerald-200 dark:bg-emerald-800 px-4 py-2 rounded-t-2xl'
    case 'rose': return 'flex items-end mb-2 bg-rose-200 dark:bg-rose-800 px-4 py-2 rounded-t-2xl'
    case 'slate': return 'flex items-end mb-2 bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-t-2xl'
    case 'dark': return 'flex items-end mb-2 bg-gray-800 px-4 py-2 rounded-t-2xl text-white'
    case 'light': return 'flex items-end mb-2 bg-gray-100 px-4 py-2 rounded-t-2xl text-gray-900'
    case 'border': return 'flex items-end mb-2 border-b-2 border-indigo-400 px-4'
    case 'shadow': return 'flex items-end mb-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-t-2xl'
    case 'outline': return 'flex items-end mb-2 border-b-2 border-dashed border-indigo-400 dark:border-indigo-700 px-4'
    case 'card': return 'flex items-end mb-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-t-xl'
    case 'modern': return 'flex items-end mb-2 bg-gradient-to-r from-indigo-200 via-sky-100 to-white dark:from-indigo-900 dark:via-indigo-950 dark:to-gray-950 px-4 py-2 rounded-t-3xl'
    case 'retro': return 'flex items-end mb-2 bg-yellow-200 dark:bg-yellow-800 px-4 py-2 rounded-t-xl'
    case 'elegant': return 'flex items-end mb-2 bg-gradient-to-r from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 px-4 py-2 rounded-t-2xl'
    case 'playful': return 'flex items-end mb-2 bg-gradient-to-r from-pink-300 via-yellow-200 to-green-200 dark:from-pink-800 dark:via-yellow-800 dark:to-green-800 px-4 py-2 rounded-t-3xl'
    default: return 'ml-2 flex flex-wrap items-end'
  }
})
</script>

<template>
  <section :id="id" :class="sectionClass">
    <div class="pt-5 pr-5 pl-5">
      <div :class="titleBarClass">
        <h2 class="text-3xl font-bold" :class="titleColorClass">
          {{ mainTitle }}
        </h2>
        <h3 class="text-2xl font-bold ml-5 hidden md:block" :class="subTitleColorClass">
          {{ subTitle }}
        </h3>
        <span class="ml-auto px-3 text-lg font-bold text-end hidden md:block" :class="sloganColorClass">
          {{ slogan }}
        </span>
      </div>
      <div v-if="variant !== 'minimal'" class="h-1 mt-1 mb-3 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden">
        <div class="w-50 h-full bg-indigo-500 dark:bg-indigo-400 text-lg"></div>
      </div>
      <div v-else class="h-1 mb-3 bg-indigo-400 w-16 rounded"></div>
    </div>
    <slot />
  </section>
</template>

<style scoped></style>
