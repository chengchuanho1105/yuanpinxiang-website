<script setup lang="ts">
defineOptions({ name: 'CrazyClown-Gcoin' })

// ---------- Vue 核心工具函式 ----------
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

// ---------- 組件引入區（版面用） ----------
import DecorSection from '@/components/DecorSection.vue';

// ---------- 工具函式 ----------
import { useHybridData } from '@/composables/useHybridData'

// ---------- 資料處理 ----------
import localGcoinListData from '@/data/pageData/crazyclown/gcoin/gcoinListData.json' // 本地資料

/** ========== Gcoin List Data 資料處理 ========== */

/** 1. Gcoin List Data 的資料格式 */
interface GcoinListData {
  amount: string
  usd: string
  price: number
}

/** 2. 取得 Gcoin List Data CSV 來源 */
const GCOINLISTDATA_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBdBIEkQ5g_U0tXrNAdLXwaViW_NhBPy3EwPhiiJ3oX8vinj-K69yBeVHtJmbVFXPBqY7i09Os5GTE/pub?gid=0&single=true&output=csv'

/** 3. 定義 CSV 欄位轉換函式 */
const mapGcoinListData = (item: Record<string, string>): GcoinListData => {
  return {
    amount: item.amount || '',
    usd: item.usd || '',
    price: Number(item.price) || 0,
  }
}

const {
  data: gcoinListData,
  loading: gcoinListDataLoading,
  load: loadGcoinListData
} = useHybridData<GcoinListData>(
  localGcoinListData as unknown as GcoinListData[],
  GCOINLISTDATA_CSV_URL,
  mapGcoinListData
)

onMounted(() => {
  loadGcoinListData()
})

const USD2TWD = 29.35 * 1.03


interface GcoinItem { amount: string; price: string; usd: string; }
const tooltip = ref<{ visible: boolean; x: number; y: number; item: GcoinItem | null; arrowLeft?: number }>({ visible: false, x: 0, y: 0, item: null })
function showTooltip(e: MouseEvent | TouchEvent, item: GcoinItem) {
  tooltip.value.visible = true
  tooltip.value.item = item
  nextTick(() => {
    let tr: HTMLElement | null = null
    if ('currentTarget' in e && e.currentTarget) {
      tr = e.currentTarget as HTMLElement
    } else if ('target' in e && (e.target as HTMLElement).closest) {
      tr = (e.target as HTMLElement).closest('tr')
    }
    if (tr) {
      const trRect = tr.getBoundingClientRect()
      const tooltipWidth = 220
      // 泡泡垂直位置固定在該列下半部
      const top = trRect.top + trRect.height / 2 + 8
      // 泡泡水平位置跟隨游標，但不超出該列左右
      let left = 0
      if ('clientX' in e) {
        left = e.clientX - tooltipWidth / 2
        if (left < trRect.left + 8) left = trRect.left + 8
        if (left + tooltipWidth > trRect.right - 8) left = trRect.right - tooltipWidth - 8
      } else {
        left = trRect.left + (trRect.width - tooltipWidth) / 2
      }
      tooltip.value.x = left
      tooltip.value.y = top
      // 箭頭始終置中於泡泡下方
      tooltip.value.arrowLeft = tooltipWidth / 2 - 10
    }
  })
}
function hideTooltip() {
  tooltip.value.visible = false
}
function toggleTooltip(e: MouseEvent | TouchEvent, item: GcoinItem) {
  if (tooltip.value.visible && tooltip.value.item === item) {
    hideTooltip()
  } else {
    showTooltip(e, item)
  }
}
function handleTouchOutside(e: Event) {
  const popup = document.querySelector('.gcoin-tooltip-popup')
  if (popup && !popup.contains(e.target as Node)) {
    hideTooltip()
  }
}
onMounted(() => {
  document.addEventListener('touchstart', handleTouchOutside)
  document.addEventListener('mousedown', handleTouchOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('touchstart', handleTouchOutside)
  document.removeEventListener('mousedown', handleTouchOutside)
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <DecorSection mainTitle="G-Coin 購買" enTitle="G-Coin Purchase">
      <div v-if="gcoinListDataLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300">載入中...</span>
      </div>
      <div v-else-if="gcoinListData.length === 0" class="bg-red-50 ...">
        <p class="text-sm text-red-700 dark:text-red-300">無法載入售價</p>
      </div>
      <div v-else
        class="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 mb-8 border border-zinc-200 dark:border-zinc-700">
        <h2 class="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 flex items-center gap-2">
          <i class="bi bi-currency-exchange"></i> 面額與售價
        </h2>
        <div class="mt-4 text-orange-600 dark:text-orange-400 text-sm font-medium flex items-center gap-2">
          <i class="bi bi-exclamation-triangle-fill"></i>
          售價會隨匯率波動，實際售價以客服報價為準。
        </div>
        <hr class="my-4 border-zinc-200 dark:border-zinc-700">
        <div class="max-w-xl mx-auto my-4 overflow-x-auto border border-zinc-200 dark:border-zinc-700 rounded-xl p-2">
          <table class="gcoin-table w-full min-w-[320px] text-base border-separate border-spacing-y-2">
            <thead>
              <tr class="text-base text-end text-zinc-600 dark:text-zinc-300 ">
                <th class="py-2 px-2">G-Coin</th>
                <th class="py-2 px-2">現售價</th>
              </tr>
            </thead>
            <tbody>
              <!-- 五單優惠列 -->
              <tr class="bg-zinc-50 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
                @mouseenter="showTooltip($event, { ...gcoinListData[0], price: String((gcoinListData[0].price - 30) * 5), usd: (parseFloat(gcoinListData[0].usd) * 5).toFixed(2) })"
                @mousemove="showTooltip($event, { ...gcoinListData[0], price: String((gcoinListData[0].price - 30) * 5), usd: (parseFloat(gcoinListData[0].usd) * 5).toFixed(2) })"
                @mouseleave="hideTooltip"
                @click="toggleTooltip($event, { ...gcoinListData[0], price: String((gcoinListData[0].price - 30) * 5), usd: (parseFloat(gcoinListData[0].usd) * 5).toFixed(2) })">
                <td class="py-2 px-2 font-semibold whitespace-nowrap text-end">
                  11,200*5單
                </td>
                <td
                  class="flex flex-row items-center justify-end py-2 px-2 text-indigo-700 dark:text-indigo-300 font-bold whitespace-nowrap text-end">
                  TWD {{ (gcoinListData[0].price - 30) * 5 }}<br>
                  <button class="ml-2" tabindex="-1" style="pointer-events:none;opacity:0.5;">
                    <i class="bi bi-exclamation-circle-fill "></i>
                  </button>
                </td>
              </tr>
              <tr v-for="item in gcoinListData" :key="item.amount"
                class="bg-zinc-50 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
                @mouseenter="showTooltip($event, { ...item, price: String(item.price) })"
                @mousemove="showTooltip($event, { ...item, price: String(item.price) })" @mouseleave="hideTooltip"
                @click="toggleTooltip($event, { ...item, price: String(item.price) })">
                <td class="py-2 px-2 font-semibold whitespace-nowrap text-end">
                  {{ item.amount }}
                </td>
                <td
                  class="flex flex-row items-center justify-end py-2 px-2 text-indigo-700 dark:text-indigo-300 font-bold whitespace-nowrap text-end">
                  TWD {{ Number(item.price) }}
                  <button class="ml-2" tabindex="-1" style="pointer-events:none;opacity:0.5;">
                    <i class="bi bi-exclamation-circle-fill "></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr class="my-4 border-zinc-200 dark:border-zinc-700">
        <div class="mt-2 text-blue-700 dark:text-blue-300 text-base font-medium flex items-center gap-2">
          <i class="bi bi-discord"></i>
          請透過 <span class="font-bold">Discord</span> 聯絡購買。
        </div>
      </div>
      <div class="bg-yellow-50 dark:bg-yellow-900 rounded-xl border-l-4 border-yellow-400 p-5 mb-6">
        <h3 class="text-lg font-bold text-yellow-700 dark:text-yellow-200 mb-2 flex items-center gap-2">
          <i class="bi bi-info-circle"></i> 注意事項
        </h3>
        <ul class="list-disc pl-6 text-yellow-800 dark:text-yellow-100 space-y-1">
          <li>本服務僅限 CrazyClown 戰隊成員及熟識玩家。</li>
          <li>購買前請先於 Discord 聯絡確認庫存與即時價格。</li>
          <li>付款方式以台灣新台幣（TWD）為主，支援多種轉帳方式。</li>
          <li>購買前請提供正確的 PUBG ID 以利紀錄。</li>
          <li>G-Coin 會以 <span class='font-bold text-indigo-700 dark:text-indigo-200'>CDK（序號）</span> 方式發放，請於遊戲內自行兌換。</li>
          <li>交易完成後，CDK 會於 24 小時內發送至指定聯絡方式。</li>
          <li>如遇官方維護或特殊狀況，發送時間可能延遲，請耐心等候。</li>
        </ul>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900 rounded-xl border-l-4 border-blue-400 p-5">
        <h3 class="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2 flex items-center gap-2">
          <i class="bi bi-shield-check"></i> 交易規則
        </h3>
        <ul class="list-decimal pl-6 text-blue-800 dark:text-blue-100 space-y-1">
          <li>請勿提供錯誤的聯絡資訊或遊戲帳號，否則損失需自行承擔。</li>
          <li>付款後請主動提供轉帳證明截圖。</li>
          <li>CDK 一經發送即視為交易完成，請妥善保管並盡快兌換。</li>
          <li>嚴禁洗錢、詐騙等非法用途，違者將永久拒絕服務。</li>
          <li>如有任何疑慮，請隨時於 Discord 詢問管理員。</li>
          <li>本服務保留隨時調整價格與規則之權利。</li>
        </ul>
      </div>
    </DecorSection>
  </div>
  <!-- tooltip 元素 -->
  <div v-if="tooltip.visible && tooltip.item"
    :style="{ position: 'fixed', top: tooltip.y + 'px', left: tooltip.x + 'px', zIndex: 1000, width: '220px' }"
    class="gcoin-tooltip-popup">
    <div class="gcoin-tooltip-arrow" :style="{ left: tooltip.arrowLeft + 'px' }"></div>
    <div class="gcoin-tooltip-content">
      <div class="font-semibold mb-1">
        {{ tooltip.item?.amount }} G-Coin 原價
      </div>
      <div class="flex font-mono text-base">
        USD <span class="ml-auto">{{ tooltip.item?.usd }}</span>
      </div>
      <div class="flex font-mono text-base">
        TWD <span class="ml-auto">{{ (parseFloat(tooltip.item?.usd || '0') *
          USD2TWD).toLocaleString(undefined,
            { maximumFractionDigits: 0 }) }}</span>
      </div>
      <hr class="my-2 border-zinc-200 dark:border-zinc-700">
      <div class="flex font-semibold text-green-600 mt-1">
        TWD 現省<span class="ml-auto">{{ (parseFloat(tooltip.item?.usd || '0') * USD2TWD -
          Number(tooltip.item?.price)).toLocaleString(undefined, { maximumFractionDigits: 0 }) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gcoin-tooltip-popup {
  background: #fff;
  color: #222;
  border-radius: 10px;
  padding: 14px 20px 10px 20px;
  font-size: 1.05em;
  white-space: nowrap;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  pointer-events: none;
  animation: fadeIn 0.18s;
  min-width: 140px;
  position: fixed;
}

.gcoin-tooltip-arrow {
  position: absolute;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.08));
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
