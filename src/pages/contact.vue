<script setup lang="ts">
defineOptions({ name: 'YuanPinXiang-Contact' })
import DecorSection from '@/components/DecorSection.vue'
</script>

<template>
  <div class="max-w-5xl mx-auto px-4">

    <DecorSection main-title="聯絡資料" en-title="CONTACT">
      <div class="grid grid-cols-2 gap-6">
        <!-- 營業時間 -->
        <div class="p-4 bg-white/30 dark:bg-white/10 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">營業時間</h3>
          <hr class="my-1 border-gray-700 dark:border-gray-300">
          <p class="text-lg text-gray-700 dark:text-gray-300">一~六 09:00~18:00</p>
          <p class="text-lg text-gray-700 dark:text-gray-300">日 視情況而定</p>
        </div>
        <!-- 客服專線 -->
        <div class="p-4 bg-white/30 dark:bg-white/10 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">客服專線</h3>
          <hr class="my-1 border-gray-700 dark:border-gray-300">
          <p class="text-lg text-gray-700 dark:text-gray-300">手機號碼：0912-345-678</p>
          <p class="text-lg text-gray-700 dark:text-gray-300">LINE 官方帳號: @1234567890</p>
        </div>
        <!-- 工廠位置 -->
        <div class="col-span-2 p-4 bg-white/30 dark:bg-white/10 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">工廠位置</h3>
          <hr class="my-1 border-gray-700 dark:border-gray-300">
          <p class="text-lg text-gray-700 dark:text-gray-300"><a href="">雲林縣西螺鎮新宅1之九號</a></p>
          <!-- 地圖 -->
          <div class="w-full h-120">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.1888041435728!2d120.50011059757573!3d23.782271280386805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346eb50050641069%3A0x1f5fa789756e36c4!2z5rqQ5ZOB6aaZ6LGG55qu5bel5bug!5e0!3m2!1szh-TW!2stw!4v1748075249215!5m2!1szh-TW!2stw"
              class="w-full h-full rounded-b-lg" loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    </DecorSection>

    <DecorSection main-title="留言表單" en-title="FORM">
      <div class="w-full h-[1500px] bg-white/30 dark:bg-white/10 rounded-lg shadow-lg">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdzO3R0QbY5wF66uCNbF6kW3XdBHv5Mzxb9RkfBEG7iz6Ph1w/viewform?embedded=true"
          frameborder="0" marginheight="0" marginwidth="0" class="w-full h-full">
          載入中…
        </iframe>
      </div>
    </DecorSection>

    <!-- 留言表單
    <DecorSection main-title="留言表單" en-title="FORM">
      <form class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-white/30 dark:bg-white/10 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">姓名</h3>
          <input type="text" class="w-full" />
        </div>
        <div class="p-4 bg-white/30 dark:bg-white/10 rounded-lg shadow-lg">
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">姓名</h3>
          <input type="text" class="w-full" />
        </div>
        <hr class="col-span-2 border-gray-700 dark:border-gray-300">
        <div class="col-span-2">
          <button type="button"
            class="w-1/2 py-2 bg-pink-200 dark:bg-pink-800 hover:bg-pink-300 dark:hover:bg-pink-700 rounded-l-full transition duration-300">
            <span class="text-lg font-bold text-gray-700 dark:text-gray-300">
              清除
            </span>
          </button>
          <button type="submit"
            class="w-1/2 py-2 bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 rounded-r-full transition duration-300">
            <span class="text-lg font-bold text-gray-700 dark:text-gray-300">
              送出
            </span>
          </button>
        </div>
      </form>
    </DecorSection>
    -->

  </div>
</template>
