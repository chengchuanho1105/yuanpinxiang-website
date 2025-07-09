<script setup lang="ts">
defineOptions({ name: 'ScrollToTop' })
import { ref, onMounted, onUnmounted } from 'vue'

// 滾動到頂部
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// 檢查是否顯示 Top 按鈕
const showTopButton = ref(false)

// 監聽滾動事件
onMounted(() => {
    const handleScroll = () => {
        showTopButton.value = window.scrollY > 0
    }

    window.addEventListener('scroll', handleScroll)

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })
})
</script>

<template>
    <transition enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-4 scale-95"
        enter-to-class="opacity-100 transform translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0 scale-100"
        leave-to-class="opacity-0 transform translate-y-4 scale-95">
        <button v-if="showTopButton" @click="scrollToTop"
            class="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            title="回到頂部">
            <i class="bi bi-arrow-up text-lg group-hover:scale-110 transition-transform duration-200"></i>
        </button>
    </transition>
</template>

<style scoped></style>
