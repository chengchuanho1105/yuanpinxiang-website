<script setup lang="ts">
defineOptions({ name: 'CrazyClown-About' })

// ---------- 組件引入區（版面用） ----------
import DecorSection from '@/components/DecorSection.vue';
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <DecorSection mainTitle="CrazyClown 戰隊簡介" enTitle="About CrazyClown">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-indigo-700 dark:text-indigo-200 mb-2 flex items-center gap-2">
          <i class="bi bi-stars"></i> 品牌故事
        </h2>
        <p class="text-lg text-zinc-700 dark:text-zinc-200 mb-2">
          CrazyClown 戰隊創立於 2023 年，由一群熱愛 PUBG 的玩家共同發起。最初只是幾位好友的娛樂小隊，隨著成員增加，逐漸發展成為一個重視團隊合作、歡樂氣氛與正向互動的社群。
        </p>
        <p class="text-base text-zinc-600 dark:text-zinc-400 mb-2">
          <span class="font-bold text-indigo-600 dark:text-indigo-300">創立契機：</span>「希望每個玩家都能在這裡找到夥伴、找到歸屬感！」
        </p>
        <p class="italic text-indigo-700 dark:text-indigo-200 mb-2">「遊戲是生活的調味料，團隊是最強的武器！」</p>
        <hr class="my-4 border-zinc-200 dark:border-zinc-700">
      </div>
      <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-indigo-50 dark:bg-indigo-900 rounded-xl p-6 border-l-4 border-indigo-400">
          <h3 class="text-lg font-bold text-indigo-700 dark:text-indigo-200 mb-2 flex items-center gap-2">
            <i class="bi bi-lightbulb"></i> 戰隊理念
          </h3>
          <ul class="list-disc pl-6 text-indigo-800 dark:text-indigo-100 space-y-1">
            <li>重視團隊合作與互助精神</li>
            <li>營造歡樂、正向的遊戲氛圍</li>
            <li>鼓勵新手、歡迎各路高手</li>
            <li>不定期舉辦隊內活動與比賽</li>
            <li>尊重每一位成員，拒絕任何歧視與霸凌</li>
            <li>推廣健康遊戲、理性競技</li>
          </ul>
        </div>
        <div class="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 border-l-4 border-zinc-400">
          <h3 class="text-lg font-bold text-zinc-700 dark:text-zinc-100 mb-2 flex items-center gap-2">
            <i class="bi bi-stars"></i> 特色亮點
          </h3>
          <ul class="space-y-2">
            <li><i class="bi bi-emoji-smile text-indigo-500 mr-2"></i> 歡樂氣氛、零距離互動</li>
            <li><i class="bi bi-controller text-indigo-500 mr-2"></i> 多元遊戲模式與戰術分享</li>
            <li><i class="bi bi-award text-indigo-500 mr-2"></i> 定期舉辦比賽、獎勵豐富</li>
            <li><i class="bi bi-person-plus text-indigo-500 mr-2"></i> 新手友善、高手共融</li>
            <li><i class="bi bi-mic text-indigo-500 mr-2"></i> 語音活躍、歡迎聊天</li>
            <li><i class="bi bi-gift text-indigo-500 mr-2"></i> 節慶活動、專屬福利</li>
          </ul>
        </div>
      </div>
      <div class="mb-8 bg-yellow-50 dark:bg-yellow-900 rounded-xl p-6 border-l-4 border-yellow-400">
        <h3 class="text-lg font-bold text-yellow-700 dark:text-yellow-200 mb-2 flex items-center gap-2">
          <i class="bi bi-person-heart"></i> 歡迎新血加入！
        </h3>
        <p class="text-yellow-800 dark:text-yellow-100 mb-2">無論你是剛入坑的新手，還是追求競技的高手，只要你熱愛 PUBG、樂於互動，CrazyClown 都歡迎你的加入！
        </p>
        <ul class="list-decimal pl-6 text-yellow-900 dark:text-yellow-100 mb-2">
          <li>加入 Discord 伺服器，填寫自我介紹</li>
          <li>閱讀社群守則，尊重每一位成員</li>
          <li>參與語音/文字互動，認識新朋友</li>
          <li>如有問題可隨時私訊管理員</li>
        </ul>
        <div class="text-yellow-700 dark:text-yellow-200 text-sm mb-2">※ 請勿洗頻、謾罵、違規將被移除社群</div>
        <div class="flex flex-wrap gap-4 mt-2">
          <a href="https://discord.gg/3TEHPZhYUK" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow hover:bg-indigo-700 transition">
            <i class="bi bi-discord mr-2"></i> 加入 Discord
          </a>
          <a href="mailto:ccpubgteam@gmail.com"
            class="inline-flex items-center px-4 py-2 bg-zinc-700 text-white rounded-lg font-bold shadow hover:bg-zinc-800 transition">
            <i class="bi bi-envelope mr-2"></i> 聯絡 Email
          </a>
        </div>
      </div>
    </DecorSection>
  </div>
</template>

<style scoped></style>
