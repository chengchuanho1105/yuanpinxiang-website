<script setup lang="ts">
defineOptions({ name: 'CrazyClown-Store' })

// ---------- Vue 核心工具函式 ----------
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'

// ---------- 組件引入區（版面用） ----------
import DecorSection from '@/components/DecorSection.vue';

// ---------- 工具函式 ----------
import { useHybridData } from '@/composables/useHybridData'

// ---------- 資料處理 ----------
import localProductListData from '@/data/pageData/crazyclown/store/productData.json' // 本地資料

/** ========== 商品資料處理 ========== */

interface ProductListData {
  category: string
  currency: string
  name: string
  usd?: number
  gcoin?: number
  specialPrice: number
  hotSale: boolean
}

/** 2. 取得商品資料 CSV 來源 */
const PRODUCTLISTDATA_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBdBIEkQ5g_U0tXrNAdLXwaViW_NhBPy3EwPhiiJ3oX8vinj-K69yBeVHtJmbVFXPBqY7i09Os5GTE/pub?gid=1913119360&single=true&output=csv'

/** 3. 定義 CSV 欄位轉換函式 */
const mapProductListData = (item: Record<string, string>): ProductListData => {
  return {
    category: item.category || '',
    currency: item.currency || '',
    name: item.name || '',
    usd: item.usd ? Number(item.usd) : undefined,
    gcoin: item.gcoin ? Number(item.gcoin) : undefined,
    specialPrice: Number(item.specialPrice) || 0,
    hotSale: item.hotSale === 'true',
  }
}

const {
  data: productListData,
  loading: productListDataLoading,
  load: loadProductListData
} = useHybridData<ProductListData>(
  localProductListData as unknown as ProductListData[],
  PRODUCTLISTDATA_CSV_URL,
  mapProductListData
)

const usd2twd = ref(30.9)
const FEE = 1.03
const USD2TWD_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBdBIEkQ5g_U0tXrNAdLXwaViW_NhBPy3EwPhiiJ3oX8vinj-K69yBeVHtJmbVFXPBqY7i09Os5GTE/pub?gid=1049789859&single=true&output=csv'
async function fetchUsd2Twd() {
  try {
    const res = await fetch(USD2TWD_CSV_URL)
    const text = await res.text()
    const rate = parseFloat(text)
    if (!isNaN(rate) && rate > 0) usd2twd.value = rate
  } catch {
    // 保留預設值
  }
}

onMounted(() => {
  loadProductListData()
  fetchUsd2Twd()
})

const GCOIN2TWD = computed(() => usd2twd.value / 100 * FEE) // 1 G-Coin = 1/100 USD * 匯率 * 手續費

// 以 category 為分頁
const tabs = computed(() => {
  const set = new Set<string>()
  productListData.value.forEach(item => set.add(item.category))
  return Array.from(set)
})
const activeTab = ref(tabs.value[0] || '')
const filteredList = computed(() =>
  productListData.value.filter(item => item.category === activeTab.value)
)


interface ProductItem { name: string; price: string; usd: string; currency?: string; gcoin?: string; }
const tooltip = ref<{ visible: boolean; x: number; y: number; item: ProductItem | null; arrowLeft?: number }>({ visible: false, x: 0, y: 0, item: null })
function showTooltip(e: MouseEvent | TouchEvent, item: ProductItem) {
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
      const top = trRect.top + trRect.height / 2 + 20
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
      tooltip.value.arrowLeft = tooltipWidth / 2 - 10
    }
  })
}
function hideTooltip() {
  tooltip.value.visible = false
}
function toggleTooltip(e: MouseEvent | TouchEvent, item: ProductItem) {
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
    <DecorSection :mainTitle="`<i class='bi bi-currency-exchange'></i> 特惠商品`" enTitle="Promotion List">
      <div v-if="productListDataLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300">載入中...</span>
      </div>
      <div v-else-if="productListData.length === 0" class="bg-red-50 ...">
        <p class="text-sm text-red-700 dark:text-red-300">無法載入售價</p>
      </div>
      <div v-else
        class="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 mb-8 border border-zinc-200 dark:border-zinc-700">
        <h2 class="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 flex items-center gap-2">

        </h2>
        <!-- 分頁頁籤 -->
        <div class="flex gap-2 mb-4">
          <button v-for="tab in tabs" :key="tab"
            :class="['px-4 py-2 rounded-t-lg font-bold', activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200']"
            @click="activeTab = tab">
            {{ tab }}
          </button>
        </div>
        <div class="max-w-xl mx-auto my-4 overflow-x-auto border border-zinc-200 dark:border-zinc-700 rounded-xl p-2">
          <table class="gcoin-table w-full min-w-[320px] text-base border-separate border-spacing-y-2">
            <thead>
              <tr class="text-base text-zinc-600 dark:text-zinc-300 ">
                <th class="py-2 px-2 text-center">商品名稱</th>
                <th class="py-2 px-2 text-end">優惠價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredList" :key="item.name" :class="[
                'transition',
                item.hotSale
                  ? 'bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 font-bold ring-2 ring-yellow-400/20'
                  : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-900'
              ]"
                @mouseenter="showTooltip($event, { name: item.name, price: String(item.specialPrice), usd: String(item.usd ?? ''), gcoin: String(item.gcoin ?? ''), currency: item.currency })"
                @mousemove="showTooltip($event, { name: item.name, price: String(item.specialPrice), usd: String(item.usd ?? ''), gcoin: String(item.gcoin ?? ''), currency: item.currency })"
                @mouseleave="hideTooltip"
                @click="toggleTooltip($event, { name: item.name, price: String(item.specialPrice), usd: String(item.usd ?? ''), gcoin: String(item.gcoin ?? ''), currency: item.currency })">
                <td class="py-2 px-2 font-semibold whitespace-nowrap text-center">
                  {{ item.name }}
                </td>
                <td
                  class="flex flex-row items-center justify-end py-2 px-2 text-indigo-700 dark:text-indigo-300 font-bold whitespace-nowrap text-end">
                  TWD {{ Number(item.specialPrice).toLocaleString() }}
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
          請透過 <a href="https://discord.gg/3TEHPZhYUK" target="_blank" rel="noopener noreferrer" class="font-bold">
            <i class="bi bi-discord mr-2"></i>Discord<i class="bi bi-box-arrow-up-right ml-1"></i></a> 聯絡購買。
        </div>
      </div>
      <div class="bg-yellow-50 dark:bg-yellow-900 rounded-xl border-l-4 border-yellow-400 p-5 mb-6">
        <h3 class="text-lg font-bold text-yellow-700 dark:text-yellow-200 mb-2 flex items-center gap-2">
          <i class="bi bi-info-circle"></i> 注意事項
        </h3>
        <ul class="list-disc pl-6 text-yellow-800 dark:text-yellow-100 space-y-1">
          <li>購買前請先於 Discord 聯絡確認庫存與即時價格。</li>
          <li>付款方式以新台幣（TWD）為主，支援多種轉帳方式。</li>
          <li>購買前請提供正確的 PUBG ID 以利紀錄。</li>
          <li>商品會以 <span class='font-bold text-indigo-700 dark:text-indigo-200'>CDK（序號）</span> 方式發放，請於遊戲內自行兌換。</li>
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
          <li>CDK 一經發送即視為交易完成，概不退/換貨。</li>
          <li>CDK 請妥善保管並盡快兌換。</li>
          <li>嚴禁洗錢、詐騙等非法用途，違者將永久拒絕服務。</li>
          <li>如有任何疑慮，請隨時向客服洽詢。</li>
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
      <div class="font-semibold mb-1 text-center">
        {{ tooltip.item?.name }}
      </div>
      <hr class="my-2 border-zinc-200 dark:border-zinc-700">
      <div v-if="tooltip.item?.currency === 'usd'" class="flex font-semibold text-base">
        原價 USD <span class="ml-auto">{{ Number(tooltip.item?.usd).toLocaleString() }}</span>
      </div>
      <div v-else-if="tooltip.item?.currency === 'gcoin'" class="flex font-semibold text-base">
        原價 G-Coin <span class="ml-auto">{{ Number(tooltip.item?.gcoin).toLocaleString() }}</span>
      </div>
      <div class="flex font-semibold text-base">
        原價 TWD <span class="ml-auto">
          <template v-if="tooltip.item?.currency === 'usd'">
            {{ Math.round(parseFloat(tooltip.item?.usd || '0') * usd2twd * FEE).toLocaleString() }}
          </template>
          <template v-else-if="tooltip.item?.currency === 'gcoin'">
            {{ Math.round(parseFloat(tooltip.item?.gcoin || '0') * GCOIN2TWD).toLocaleString() }}
          </template>
        </span>
      </div>
      <hr class="my-2 border-zinc-200 dark:border-zinc-700">
      <div class="flex font-semibold text-base text-green-600 dark:text-green-400 mt-1">
        －優惠額 TWD<span class="ml-auto">
          <template v-if="tooltip.item?.currency === 'usd'">
            {{ Math.round(Number(tooltip.item?.price) - parseFloat(tooltip.item?.usd || '0') * usd2twd *
              FEE).toLocaleString() }}
          </template>
          <template v-else-if="tooltip.item?.currency === 'gcoin'">
            {{ Math.round(Number(tooltip.item?.price) - parseFloat(tooltip.item?.gcoin || '0') *
              GCOIN2TWD).toLocaleString() }}
          </template>
        </span>
      </div>
      <div class="flex font-semibold text-base text-indigo-700 dark:text-indigo-300 mt-1">
        ＝優惠價 TWD <span class="ml-auto">{{ Number(tooltip.item?.price).toLocaleString() }}</span>
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
