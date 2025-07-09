# Banner 組件使用說明

## 概述

`Banner.vue` 是一個響應式的banner容器組件，會根據當前頁面自動調整高度：

- **首頁**: 占滿整個畫面高度 (`h-screen`)
- **其他頁面**: 占15%的畫面高度 (`h-15`)

## 功能特點

1. **自動高度調整**: 根據路由自動判斷是否為首頁
2. **品牌支援**: 支援多品牌路由結構
3. **內容插槽**: 提供靈活的內容插入方式
4. **預設背景**: 提供漸層背景，可被內容覆蓋
5. **響應式設計**: 支援各種螢幕尺寸

## 使用方法

### 基本使用

```vue
<template>
  <Banner>
    <!-- 您的banner內容 -->
    <div class="flex h-full items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold">標題</h1>
        <p class="text-xl">副標題</p>
      </div>
    </div>
  </Banner>
</template>
```

### 內容類型範例

#### 1. 輪播圖

```vue
<Banner>
  <Carousel :items="bannerItems" />
</Banner>
```

#### 2. 影片背景

```vue
<Banner>
  <video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop>
    <source src="/videos/banner.mp4" type="video/mp4">
  </video>
  <div class="relative z-10 flex h-full items-center justify-center">
    <h1 class="text-white text-6xl font-bold">標題</h1>
  </div>
</Banner>
```

#### 3. Hero區塊

```vue
<Banner>
  <div class="flex h-full items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
    <div class="text-center text-white">
      <h1 class="text-6xl font-bold mb-4">Hero標題</h1>
      <p class="text-xl mb-8">Hero描述</p>
      <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">
        立即行動
      </button>
    </div>
  </div>
</Banner>
```

## 路由判斷邏輯

組件會根據當前品牌和路由路徑判斷是否為首頁：

- **主品牌**: 路徑為 `/` 時為首頁 (由 `MAIN_BRAND` 配置決定)
- **其他品牌**: 路徑為 `/{brandKey}` 時為首頁

## 樣式自訂

### 修改預設背景

```vue
<Banner>
  <!-- 您的內容會覆蓋預設背景 -->
</Banner>
```

### 自訂高度 (如果需要)

```css
/* 在您的組件中覆蓋 */
.banner-container {
  height: 80vh; /* 自訂高度 */
}
```

## 注意事項

1. 內容應該使用 `h-full` 來占滿容器高度
2. 如果需要絕對定位的元素，請確保適當的 z-index
3. 組件已整合到 `src/layouts/[brand]/default.vue` 中
4. 支援深色模式，請確保內容顏色適當對比

---

# Breadcrumb 組件使用說明

## 概述

`Breadcrumb.vue` 是一個智能的麵包屑導航組件，提供10種不同的視覺風格：

- **首頁自動隱藏**: 在首頁時不會顯示麵包屑
- **自動路徑解析**: 根據當前路由自動生成麵包屑路徑
- **多種風格**: 提供10種不同的視覺風格供選擇
- **響應式設計**: 支援各種螢幕尺寸和深色模式

## 10種風格展示

### 1. 預設風格 (default)

- 經典的麵包屑導航，帶有陰影和圖標
- 白色背景，灰色文字，藍色懸停效果

### 2. 極簡風格 (minimal)

- 簡潔的斜線分隔，最小化設計
- 純文字，斜線分隔符

### 3. 點狀風格 (dots)

- 使用圓點作為分隔符，現代感強
- 當前頁面用藍色圓點標示

### 4. 箭頭風格 (arrows)

- 箭頭分隔符，動態感強
- 淺灰色背景，藍色懸停效果

### 5. 卡片風格 (cards)

- 每個項目都是卡片形式，立體感強
- 當前頁面用藍色背景標示

### 6. 漸層風格 (gradient)

- 漸層背景，色彩豐富
- 藍紫漸層，當前頁面用藍色文字

### 7. 外框風格 (outline)

- 邊框設計，清晰分明
- 懸停時邊框變藍色

### 8. 圓角風格 (rounded)

- 圓角設計，柔和美觀
- 圓形按鈕樣式

### 9. 底線風格 (underline)

- 底線動畫效果，互動性強
- 懸停時底線展開動畫

### 10. 現代風格 (modern)

- 現代化設計，帶有縮放效果
- 懸停時縮放動畫，陰影效果

## 使用方法

### 基本使用

```vue
<template>
  <Breadcrumb />
</template>
```

### 指定風格

```vue
<template>
  <Breadcrumb style="modern" />
</template>
```

### 在佈局中使用

```vue
<script setup>
import Breadcrumb from '@/components/layouts/Breadcrumb.vue'
</script>

<template>
  <header>
    <Navbar />
    <Banner />
    <Breadcrumb style="default" />
  </header>
</template>
```

## 自動路徑解析

組件會自動解析當前路由並生成對應的麵包屑：

- **首頁**: 路徑為 `/` 或 `/{brandKey}` 時隱藏
- **關於我們**: `/about` → 首頁 / 關於我們
- **產品介紹**: `/product` → 首頁 / 產品介紹
- **產品列表**: `/product/list` → 首頁 / 產品介紹 / 產品列表
- **產品認證**: `/product/certification` → 首頁 / 產品介紹 / 產品認證

## 自動路徑名稱解析

Breadcrumb組件會自動從路由配置中獲取顯示名稱，與Navbar使用相同的方法：

1. **從路由配置獲取**: 使用 `route.meta.title` 作為顯示文字
2. **統一處理**: 使用正則表達式 `replace(/\s*\|\s*[^|]+$/, '')` 移除品牌名稱
3. **自動匹配**: 根據路徑段自動查找對應的路由配置
4. **降級處理**: 如果找不到配置，使用預設的英文轉大寫處理
5. **品牌名稱過濾**: 自動過濾掉子品牌路徑中的品牌名稱段
6. **路徑標準化**: 自動處理URL結尾的斜線，確保路徑比較的一致性

### 路由配置範例

```typescript
{
  path: '/about',
  name: 'chuanlife-About',
  meta: {
    title: '關於我們 | ChuanLife', // ← 自動處理為 "關於我們"
    // ...
  }
}
```

### 處理邏輯

- 原始標題: `關於我們 | ChuanLife`
- 處理後: `關於我們`
- 正則表達式: `/\s*\|\s*[^|]+$/` 移除 `|` 後的所有內容

### 品牌名稱過濾

組件會自動過濾掉子品牌路徑中的品牌名稱：

- **主品牌路徑**: `/about` → 首頁 / 關於我們
- **子品牌路徑**: `/crazyclown/about` → 首頁 / 關於我們 (過濾掉 `crazyclown`)
- **嵌套路徑**: `/crazyclown/product/list` → 首頁 / 產品介紹 / 產品列表

### 路徑標準化

組件會自動處理URL結尾的斜線，確保路徑比較的一致性：

- **標準路徑**: `/crazyclown/about` ✅
- **結尾斜線**: `/crazyclown/about/` ✅ (自動標準化)
- **根路徑**: `/` ✅ (保持不變)

## 風格預覽

可以使用 `BreadcrumbDemo.vue` 組件來預覽所有風格：

```vue
<template>
  <BreadcrumbDemo />
</template>
```

## 注意事項

1. 首頁會自動隱藏麵包屑
2. 支援深色模式，自動適應主題
3. 所有風格都支援響應式設計
4. 可以通過 props 動態切換風格
5. 組件已整合到預設佈局中
