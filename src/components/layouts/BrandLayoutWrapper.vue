<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { useCurrentBrand } from '@/composables/useCurrentBrand'

const route = useRoute()
const { brandKey } = useCurrentBrand()

const layout = computed(() => route.meta?.layout || 'default')

// 只有 meta.brand 存在時才渲染 layout
const ready = computed(() => !!route.meta?.brand)

// 動態組合 layout 路徑，失敗時 fallback public layout
const layoutComponent = computed(() =>
  defineAsyncComponent({
    loader: async () => {
      try {
        return await import(`@/layouts/${brandKey.value}/${layout.value}.vue`)
      } catch {
        return await import(`@/layouts/public/${layout.value}.vue`)
      }
    },
  })
)

// 動態 loading 文字
const loadingText = ref('載入中...')
</script>

<template>
  <component v-if="ready" :is="layoutComponent">
    <RouterView />
  </component>
  <template v-else>
    <div
      class="brand-loading-wrapper flex flex-col min-h-screen items-center justify-center bg-blue-200 dark:bg-blue-800">
      <div class="brand-loading-icon mb-7">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="#ff6f00" stroke-width="6" opacity="0.2" />
          <path d="M32 4a28 28 0 1 1-19.8 47.8" stroke="#ff6f00" stroke-width="6" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="1s"
              repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      <div class="brand-loading-text flex gap-2 text-2xl font-bold text-orange-600 dark:text-orange-400">
        <span v-for="(char, i) in loadingText" :key="i" :style="{ animationDelay: (i * 0.1) + 's' }">
          {{ char }}
        </span>
      </div>
    </div>
  </template>
</template>

<style scoped>
.brand-loading-wrapper {
  animation: fadeInBg 1s;
}

@keyframes fadeInBg {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.brand-loading-icon {
  animation: popIn 0.6s cubic-bezier(.68, -0.55, .27, 1.55);
}

@keyframes popIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  80% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}

.brand-loading-text span {
  display: inline-block;
  opacity: 0.7;
  transform: translateY(0);
  animation: bounce 1.2s infinite;
}

.brand-loading-text span:nth-child(odd) {
  color: #ff9800;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }

  30% {
    transform: translateY(-12px);
    opacity: 1;
  }

  60% {
    transform: translateY(0);
    opacity: 0.7;
  }
}
</style>
