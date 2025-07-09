<template>
  <svg v-if="name === 'clock'" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-bind="$attrs">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <svg v-else-if="name === 'phone'" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-bind="$attrs">
    <path
      d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 14a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2zm14-14a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5a2 2 0 012-2h2zm0 14a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2z"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <svg v-else-if="name === 'map'" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-bind="$attrs">
    <path
      d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.894L9 2m0 0l6 2.724M9 2v18m6-15.276l5.447 2.724A2 2 0 0121 8.618v9.764a2 2 0 01-1.553 1.894L15 22m0 0V4.724"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <svg v-else-if="name === 'handshake'" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-bind="$attrs">
    <path d="M12 15l-3.5-3.5a2.121 2.121 0 010-3l3.5-3.5a2.121 2.121 0 013 0l3.5 3.5a2.121 2.121 0 010 3L15 15"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <svg v-else-if="name === 'user'" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-bind="$attrs">
    <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" />
    <path d="M6 20v-2a4 4 0 018 0v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
  <svg v-else fill="none" viewBox="0 0 24 24" stroke="currentColor" v-bind="$attrs">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2" />
    <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>
