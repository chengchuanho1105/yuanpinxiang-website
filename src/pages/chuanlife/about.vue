<script setup lang="ts">
defineOptions({ name: 'ChuanLife-About' })

// ---------- 組件引入區（版面用） ----------
import DecorSection from '@/components/DecorSection.vue';
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <DecorSection mainTitle="銓生活服務工作室簡介" enTitle="About Chuan Life">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-2 flex items-center gap-2">
          <i class="bi bi-stars"></i> 品牌故事
        </h2>
        <p class="text-lg text-zinc-700 dark:text-zinc-200 mb-2">
          銓生活服務工作室成立於 2023 年，由一群熱愛技術、追求品質的專業人士共同創立。我們致力於提供優質的網站設計、貼圖代購、3C產品代購和服務，為您的生活提供便利與無限可能。
        </p>
        <p class="text-base text-zinc-600 dark:text-zinc-400 mb-2">
          <span class="font-bold text-blue-600 dark:text-blue-300">創立理念：</span>「以專業技術為基礎，以客戶需求為導向，為您提供最優質的服務體驗！」
        </p>
        <p class="italic text-blue-700 dark:text-blue-200 mb-2">「專業服務，品質保證，為您的生活增添便利！」</p>
        <hr class="my-4 border-zinc-200 dark:border-zinc-700">
      </div>
      <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 border-l-4 border-blue-400">
          <h3 class="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2 flex items-center gap-2">
            <i class="bi bi-lightbulb"></i> 工作室理念
          </h3>
          <ul class="list-disc pl-6 text-blue-800 dark:text-blue-100 space-y-1">
            <li>專業的技術服務與品質保證</li>
            <li>客戶需求導向的服務設計</li>
            <li>快速回應與準時交付</li>
            <li>持續的技術創新與服務優化</li>
            <li>尊重每位客戶的獨特需求</li>
            <li>安全可靠的交易環境</li>
          </ul>
        </div>
        <div class="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 border-l-4 border-zinc-400">
          <h3 class="text-lg font-bold text-zinc-700 dark:text-zinc-100 mb-2 flex items-center gap-2">
            <i class="bi bi-stars"></i> 服務特色
          </h3>
          <ul class="space-y-2">
            <li><i class="bi bi-code-slash text-blue-500 mr-2"></i> 專業網站設計與開發</li>
            <li><i class="bi bi-emoji-smile text-blue-500 mr-2"></i> 貼圖代購與客製化設計</li>
            <li><i class="bi bi-phone text-blue-500 mr-2"></i> 3C產品代購與諮詢</li>
            <li><i class="bi bi-clock text-blue-500 mr-2"></i> 快速服務與準時交付</li>
            <li><i class="bi bi-shield-check text-blue-500 mr-2"></i> 安全交易與隱私保護</li>
            <li><i class="bi bi-heart text-blue-500 mr-2"></i> 貼心服務與持續關懷</li>
          </ul>
        </div>
      </div>
      <div class="mb-8 bg-green-50 dark:bg-green-900 rounded-xl p-6 border-l-4 border-green-400">
        <h3 class="text-lg font-bold text-green-700 dark:text-green-200 mb-2 flex items-center gap-2">
          <i class="bi bi-person-heart"></i> 我們的承諾
        </h3>
        <p class="text-green-800 dark:text-green-100 mb-2">
          無論您是想要建立專業網站、購買可愛貼圖，還是需要3C產品代購服務，銓生活服務工作室都將以最專業的技術、最貼心的服務，為您提供最優質的解決方案。
        </p>
        <ul class="list-decimal pl-6 text-green-900 dark:text-green-100 mb-2">
          <li>免費初步諮詢，了解您的需求</li>
          <li>量身打造專屬的服務方案</li>
          <li>持續追蹤進度，適時調整策略</li>
          <li>提供完整的售後服務與支援</li>
        </ul>
        <div class="text-green-700 dark:text-green-200 text-sm mb-2">※ 我們重視每位客戶的隱私，所有交易內容都將嚴格保密</div>
        <div class="flex flex-wrap gap-4 mt-2">
          <a href="mailto:contact@chuan.life"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 transition">
            <i class="bi bi-envelope mr-2"></i> 聯絡 Email
          </a>
          <a href="https://line.me/R/ti/p/0chuan" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-bold shadow hover:bg-green-700 transition">
            <i class="bi bi-line mr-2"></i> 加入 Line
          </a>
        </div>
      </div>

      <!-- 服務項目詳細介紹 -->
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
          <i class="bi bi-gear"></i> 服務項目詳介
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
            <div class="text-center mb-4">
              <i class="bi bi-code-slash text-3xl text-blue-600 dark:text-blue-400"></i>
            </div>
            <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">網站設計</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
              專業的網站設計與開發服務，從概念發想到上線維護，為您打造完美的網路形象。
            </p>
            <ul class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <li>• 響應式網站設計</li>
              <li>• 企業形象網站</li>
              <li>• 電子商務網站</li>
              <li>• 網站維護與更新</li>
              <li>• SEO 優化服務</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
            <div class="text-center mb-4">
              <i class="bi bi-emoji-smile text-3xl text-green-600 dark:text-green-400"></i>
            </div>
            <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">貼圖代購</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
              專業的貼圖代購服務，讓您輕鬆擁有各種可愛、實用的貼圖，豐富您的通訊體驗。
            </p>
            <ul class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <li>• Line 貼圖代購</li>
              <li>• Telegram 貼圖</li>
              <li>• 客製化貼圖設計</li>
              <li>• 貼圖推薦服務</li>
              <li>• 貼圖使用教學</li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
            <div class="text-center mb-4">
              <i class="bi bi-phone text-3xl text-yellow-600 dark:text-yellow-400"></i>
            </div>
            <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">3C產品代購</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
              專業的3C產品代購服務，為您精選優質產品，提供完整的購買諮詢與售後服務。
            </p>
            <ul class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <li>• 手機平板代購</li>
              <li>• 電腦配件代購</li>
              <li>• 智慧家電代購</li>
              <li>• 產品諮詢服務</li>
              <li>• 售後服務支援</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 技術優勢 -->
      <div class="mb-8 bg-blue-50 dark:bg-blue-900 rounded-xl p-6">
        <h3 class="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <i class="bi bi-award"></i> 技術優勢
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">網站設計技術</h4>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Vue.js / React 前端開發</li>
              <li>• Node.js / PHP 後端開發</li>
              <li>• 響應式設計與 UI/UX</li>
              <li>• 雲端部署與維護</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">服務品質保證</h4>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• 快速回應客戶需求</li>
              <li>• 準時交付專案成果</li>
              <li>• 持續技術支援服務</li>
              <li>• 安全可靠的交易環境</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 聯絡資訊 -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <i class="bi bi-info-circle"></i> 聯絡資訊
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">工作室資訊</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">銓生活服務工作室</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">Email: contact@chuan.life</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">Line: 0chuan</p>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">服務時間</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">週一至週五：09:00 - 18:00</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">週六：10:00 - 16:00</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">週日：休息</p>
          </div>
        </div>
      </div>
    </DecorSection>
  </div>
</template>

<style scoped></style>
