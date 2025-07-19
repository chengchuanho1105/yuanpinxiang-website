<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Home' })

// ---------- 組件引入區（版面用） ----------
import DecorSection from '@/components/DecorSection.vue'

// ---------- 工具函式 ----------
import { useCurrentBrand } from '@/composables/useCurrentBrand'

const { brandInfo } = useCurrentBrand()
</script>

<template>
  <div class="min-h-screen">


    <!-- About Section -->
    <section id="about" class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DecorSection mainTitle="關於銓生活" enTitle="About Chuan Life">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                專業服務，品質保證
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
                銓生活服務工作室致力於提供優質的網站設計、貼圖代購、3C產品代購和服務，為您的生活提供便利與無限可能。我們以專業的技術、貼心的服務，讓您的需求得到最完美的解決方案。
              </p>
              <div class="space-y-4">
                <div class="flex items-center">
                  <i class="bi bi-check-circle-fill text-green-500 mr-3 text-xl"></i>
                  <span class="text-gray-700 dark:text-gray-200">專業網站設計與開發</span>
                </div>
                <div class="flex items-center">
                  <i class="bi bi-check-circle-fill text-green-500 mr-3 text-xl"></i>
                  <span class="text-gray-700 dark:text-gray-200">貼圖代購服務</span>
                </div>
                <div class="flex items-center">
                  <i class="bi bi-check-circle-fill text-green-500 mr-3 text-xl"></i>
                  <span class="text-gray-700 dark:text-gray-200">3C產品代購與諮詢</span>
                </div>
              </div>
            </div>
            <div
              class="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-800 rounded-2xl p-8">
              <div class="text-center">
                <i class="bi bi-lightning-fill text-6xl text-blue-600 dark:text-blue-400 mb-4"></i>
                <h3 class="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">我們的承諾</h3>
                <p class="text-blue-700 dark:text-blue-200">
                  以專業技術為基礎，以客戶需求為導向，為您提供最優質的服務體驗。
                </p>
              </div>
            </div>
          </div>
        </DecorSection>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            我們的服務
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            專業技術，貼心服務，為您的生活增添便利
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="text-center mb-6">
              <i class="bi bi-code-slash text-4xl text-blue-600 dark:text-blue-400"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              網站設計
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              專業的網站設計與開發服務，從概念發想到上線維護，為您打造完美的網路形象。
            </p>
            <div class="mt-6 text-center">
              <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 響應式網站設計</li>
                <li>• 企業形象網站</li>
                <li>• 電子商務網站</li>
                <li>• 網站維護與更新</li>
              </ul>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="text-center mb-6">
              <i class="bi bi-emoji-smile text-4xl text-green-600 dark:text-green-400"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              貼圖代購
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              專業的貼圖代購服務，讓您輕鬆擁有各種可愛、實用的貼圖，豐富您的通訊體驗。
            </p>
            <div class="mt-6 text-center">
              <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Line 貼圖代購</li>
                <li>• Telegram 貼圖</li>
                <li>• 客製化貼圖設計</li>
                <li>• 貼圖推薦服務</li>
              </ul>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="text-center mb-6">
              <i class="bi bi-phone text-4xl text-yellow-600 dark:text-yellow-400"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              3C產品代購
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              專業的3C產品代購服務，為您精選優質產品，提供完整的購買諮詢與售後服務。
            </p>
            <div class="mt-6 text-center">
              <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 手機平板代購</li>
                <li>• 電腦配件代購</li>
                <li>• 智慧家電代購</li>
                <li>• 產品諮詢服務</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            為什麼選擇我們
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            專業、可靠、貼心的服務體驗
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="bi bi-award text-2xl text-blue-600 dark:text-blue-400"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">專業品質</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">多年經驗，專業技術，品質保證</p>
          </div>

          <div class="text-center">
            <div
              class="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="bi bi-clock text-2xl text-green-600 dark:text-green-400"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">快速服務</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">快速回應，準時交付，效率至上</p>
          </div>

          <div class="text-center">
            <div
              class="bg-yellow-100 dark:bg-yellow-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="bi bi-heart text-2xl text-yellow-600 dark:text-yellow-400"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">貼心關懷</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">客戶至上，貼心服務，持續關懷</p>
          </div>

          <div class="text-center">
            <div
              class="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="bi bi-shield-check text-2xl text-purple-600 dark:text-purple-400"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">安全可靠</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">安全交易，隱私保護，值得信賴</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            聯絡我們
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            讓我們為您提供最優質的服務
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              聯絡資訊
            </h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <i class="bi bi-envelope text-blue-600 dark:text-blue-400 mr-3 text-xl"></i>
                <span class="text-gray-700 dark:text-gray-200">{{ brandInfo?.contactEmail }}</span>
              </div>
              <div class="flex items-center">
                <i class="bi bi-line text-green-600 dark:text-green-400 mr-3 text-xl"></i>
                <span class="text-gray-700 dark:text-gray-200">Line: {{ brandInfo?.social?.line?.id }}</span>
              </div>
            </div>

            <div class="mt-8">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">服務時間</h4>
              <p class="text-gray-600 dark:text-gray-300">
                週一至週五：09:00 - 18:00<br>
                週六：10:00 - 16:00<br>
                週日：休息
              </p>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              立即諮詢
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              填寫以下表單，我們會盡快與您聯絡，為您提供專業的服務諮詢。
            </p>
            <div class="space-y-4">
              <input type="text" placeholder="您的姓名"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white">
              <input type="email" placeholder="您的 Email"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white">
              <select
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white">
                <option value="">選擇服務項目</option>
                <option value="website">網站設計</option>
                <option value="sticker">貼圖代購</option>
                <option value="3c">3C產品代購</option>
                <option value="other">其他服務</option>
              </select>
              <textarea placeholder="請描述您的需求" rows="4"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"></textarea>
              <button
                class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                送出諮詢
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
