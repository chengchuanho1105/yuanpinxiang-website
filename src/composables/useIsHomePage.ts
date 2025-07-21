import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrentBrand } from '@/composables/useCurrentBrand'

export function useIsHomePage() {
  const route = useRoute()
  const { homepageUrl } = useCurrentBrand()
  const isHomePage = ref(false)

  watch(
    [() => route.path, homepageUrl],
    ([newPath, newHomepageUrl]) => {
      isHomePage.value = newPath === newHomepageUrl
    },
    { immediate: true },
  )

  return {
    isHomePage,
  }
}
