<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'LayoutFooter' })
import { useCurrentBrand } from '@/composables/useCurrentBrand'
import { useNavbarLinks } from '@/composables/useNavbarLinks'

const { brandDisplayName, brandWebsiteUrl, brandContactEmail, brandContactPhone, brandContactAddress, brandSocial, brandLogo } = useCurrentBrand()
const { navbarLinks } = useNavbarLinks()
const year = new Date().getFullYear()

const logoUrl = computed(() => {
  try {
    if (typeof brandLogo === 'string') return brandLogo
    if (brandLogo && typeof brandLogo === 'object' && 'value' in brandLogo && typeof brandLogo.value === 'string') return brandLogo.value
    if (brandLogo && typeof brandLogo === 'object' && 'value' in brandLogo) return String(brandLogo.value)
  } catch { }
  return ''
})
</script>

<template>
  <footer
    class="w-full min-h-[25svh] bg-gradient-to-b from-white/90 via-sky-50/80 to-sky-100/80 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-12 pb-0 shadow-inner rounded-t-2xl">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 pb-8">
      <!-- 品牌資訊 -->
      <div class="flex flex-col items-start gap-3">
        <div class="flex items-center gap-3 mb-2">
          <img v-if="logoUrl && typeof logoUrl === 'string'" :src="logoUrl" :alt="brandDisplayName as string"
            class="w-12 h-12 rounded-xl shadow-md object-contain bg-white dark:bg-gray-900" />
          <a v-if="brandWebsiteUrl" :href="brandWebsiteUrl as string"
            class="text-2xl font-extrabold tracking-wide text-sky-700 dark:text-sky-200 hover:underline" target="_blank"
            rel="noopener">
            {{ brandDisplayName }}
          </a>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <div v-if="brandContactEmail"><i class="bi bi-envelope-fill mr-1"></i>Email：<a
              :href="`mailto:${brandContactEmail}`" class="hover:underline text-blue-700 dark:text-blue-300">{{
                brandContactEmail }}</a></div>
          <div v-if="brandContactPhone"><i class="bi bi-telephone-fill mr-1"></i>電話：<a
              :href="`tel:${brandContactPhone}`" class="hover:underline text-blue-700 dark:text-blue-300">{{
                brandContactPhone }}</a></div>
          <div v-if="brandContactAddress"><i class="bi bi-geo-alt-fill mr-1"></i>地址：{{ brandContactAddress }}
          </div>
        </div>
      </div>

      <!-- 網頁地圖 -->
      <div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <i class="bi bi-link-45deg text-sky-500 dark:text-sky-300"></i> 網頁地圖
        </h3>
        <ul
          class="divide-y divide-gray-200 dark:divide-gray-800 rounded-xl overflow-hidden bg-white/70 dark:bg-gray-900/70 shadow-md">
          <li v-for="link in navbarLinks" :key="link.name">
            <a :href="link.path"
              class="block px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-sky-800 hover:pl-7 transition-all duration-200 font-medium">
              {{ link.title.replace(/\s*\|\s*[^|]+$/, '') }}
            </a>
          </li>
        </ul>
      </div>

      <!-- 社群資訊 -->
      <div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <i class="bi bi-share-fill text-sky-500 dark:text-sky-300"></i> 社群資訊
        </h3>
        <div class="flex flex-wrap gap-3 mt-2">
          <template v-if="brandSocial">
            <div v-if="brandSocial.facebook && brandSocial.facebook.url">
              <a :href="brandSocial.facebook.url" target="_blank" rel="noopener"
                class="footer-social-icon bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-400">
                <i class="bi bi-facebook"></i>
              </a>
            </div>
            <div v-if="brandSocial.instagram && brandSocial.instagram.url">
              <a :href="brandSocial.instagram.url" target="_blank" rel="noopener"
                class="footer-social-icon bg-gradient-to-br from-pink-400 to-yellow-400 hover:from-yellow-400 hover:to-pink-400">
                <i class="bi bi-instagram"></i>
              </a>
            </div>
            <div v-if="brandSocial.line && brandSocial.line.url">
              <a :href="brandSocial.line.url" target="_blank" rel="noopener"
                class="footer-social-icon bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-400">
                <i class="bi bi-line"></i>
              </a>
            </div>
            <div v-if="brandSocial.youtube && brandSocial.youtube.url">
              <a :href="brandSocial.youtube.url" target="_blank" rel="noopener"
                class="footer-social-icon bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-400">
                <i class="bi bi-youtube"></i>
              </a>
            </div>
            <div v-if="brandSocial.x && brandSocial.x.url">
              <a :href="brandSocial.x.url" target="_blank" rel="noopener"
                class="footer-social-icon bg-gradient-to-br from-gray-700 to-black hover:from-black hover:to-gray-700">
                <i class="bi bi-twitter-x"></i>
              </a>
            </div>
            <div v-if="brandSocial.discord && brandSocial.discord.url">
              <a :href="brandSocial.discord.url" target="_blank" rel="noopener"
                class="footer-social-icon bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-700 hover:to-indigo-500">
                <i class="bi bi-discord"></i>
              </a>
            </div>
          </template>
          <span v-if="!brandSocial" class="text-gray-400">暫無社群資訊</span>
        </div>
      </div>
    </div>
    <div
      class="w-full bg-gradient-to-t from-gray-100/80 dark:from-gray-900/80 to-transparent py-4 mt-2 rounded-b-2xl shadow-inner">
      <div class="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500 dark:text-gray-500 tracking-wide">
        &copy; {{ year }} {{ brandDisplayName }} 版權所有。
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  color: #fff;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  background: linear-gradient(135deg, #e0e7ef 0%, #a5b4fc 100%);
}

.footer-social-icon:hover {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);
  transform: translateY(-2px) scale(1.08);
}
</style>
