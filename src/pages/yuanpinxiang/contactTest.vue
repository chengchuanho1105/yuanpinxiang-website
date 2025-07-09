<script setup lang="ts">
defineOptions({ name: 'ChuanLife-Contact' })

import { ref, computed, watch } from 'vue'
import ContactIcon from '@/components/ContactIcon.vue'

interface ContactForm {
  type: string
  name: string
  gender: string
  company: string
  taxId: string
  contactPerson: string
  jobTitle: string
  contactMethods: string[]
  lineId: string
  linePhone: string
  phone: string
  email: string
  subject: string
  message: string
  [key: string]: string | string[]
}

const defaultForm: ContactForm = {
  type: 'personal',
  name: '',
  gender: '',
  company: '',
  taxId: '',
  contactPerson: '',
  jobTitle: '',
  contactMethods: [],
  lineId: '',
  linePhone: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
}
const form = ref<ContactForm>({ ...defaultForm })
const submitted = ref(false)
const loading = ref(false)
const error = ref('')

const contactOptions = [
  { label: 'LINE (ID)', value: 'lineId' },
  { label: 'LINE (手機號碼)', value: 'linePhone' },
  { label: '電話', value: 'phone' },
  { label: 'Email', value: 'email' },
]

// 取消勾選聯絡方式時自動清空內容
watch(() => form.value.contactMethods, (newVal) => {
  for (const opt of contactOptions) {
    if (!newVal.includes(opt.value)) {
      form.value[opt.value] = ''
    }
  }
})

function validate() {
  if (
    (form.value.type === 'personal' && (!form.value.name || !form.value.gender)) ||
    (form.value.type === 'company' && (!form.value.company || !form.value.taxId || !form.value.contactPerson || !form.value.jobTitle)) ||
    (form.value.contactMethods as string[]).length === 0 ||
    (form.value.contactMethods as string[]).some(method => !form.value[method]) ||
    !form.value.subject ||
    !form.value.message
  ) {
    error.value = '請完整填寫所有欄位'
    return false
  }
  error.value = ''
  return true
}

function submitForm() {
  if (!validate()) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    submitted.value = true
    form.value = { ...defaultForm }
  }, 1200)
}

function clearForm() {
  form.value = { ...defaultForm }
  error.value = ''
}

const showLineId = computed(() => (form.value.contactMethods as string[]).includes('lineId'))
const showLinePhone = computed(() => (form.value.contactMethods as string[]).includes('linePhone'))
const showPhone = computed(() => (form.value.contactMethods as string[]).includes('phone'))
const showEmail = computed(() => (form.value.contactMethods as string[]).includes('email'))

const contactInfo = [
  {
    icon: 'clock',
    label: '營業時間',
    value: '週一至週五 09:00-18:00',
  },
  {
    icon: 'phone',
    label: '客服專線',
    value: '0965814092',
    link: 'tel:+886965814092',
  },
  {
    icon: 'map',
    label: '工廠位置',
    value: '台中市大里區工業路 88 號',
    link: 'https://maps.google.com/?q=台中市大里區工業路88號',
  },
  {
    icon: 'handshake',
    label: '招商合作',
    value: 'bd@chuanlife.com',
    link: 'mailto:bd@chuanlife.com',
  },
  {
    icon: 'user',
    label: '人才招募',
    value: 'hr@chuanlife.com',
    link: 'mailto:hr@chuanlife.com',
  },
]
</script>

<template>
  <section class="max-w-5xl mx-auto py-10 px-4">
    <div class="flex flex-col md:flex-row gap-8 mb-10">
      <!-- 聯絡資訊卡片 -->
      <div class="flex-1 space-y-5">
        <div v-for="info in contactInfo" :key="info.label"
          class="flex items-center bg-white/90 dark:bg-indigo-950/90 rounded-xl shadow border border-gray-100 dark:border-indigo-900 px-5 py-4 gap-4">
          <span
            class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
            <ContactIcon :name="info.icon" class="w-6 h-6" />
          </span>
          <div>
            <div class="text-gray-700 dark:text-gray-200 font-semibold">{{ info.label }}</div>
            <div class="text-gray-500 dark:text-gray-400">
              <template v-if="info.link">
                <a :href="info.link" class="hover:underline hover:text-indigo-600 dark:hover:text-indigo-300"
                  target="_blank">{{ info.value }}</a>
              </template>
              <template v-else>{{ info.value }}</template>
            </div>
          </div>
        </div>
      </div>
      <!-- 留言表單卡片 -->
      <div class="flex-1">
        <div
          class="bg-white/90 dark:bg-indigo-950/90 rounded-xl shadow border border-gray-100 dark:border-indigo-900 p-7">
          <h2 class="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4 flex items-center gap-2">
            <ContactIcon name="mail" class="w-5 h-5" /> 留言表單
          </h2>
          <form @submit.prevent="submitForm" v-if="!submitted">
            <div class="mb-4">
              <label class="block text-gray-600 dark:text-gray-200 mb-1" for="subject">主旨</label>
              <input v-model="form.subject" id="subject" type="text" required
                class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="請輸入主旨" />
            </div>
            <div class="mb-4 flex gap-2">
              <button type="button"
                class="px-4 py-1 rounded-l-full rounded-r bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-300 dark:border-indigo-700 focus:outline-none"
                :class="form.type === 'personal' ? 'ring-2 ring-indigo-400' : ''"
                @click="form.type = 'personal'">個人</button>
              <button type="button"
                class="px-4 py-1 rounded-r-full rounded-l bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-300 dark:border-indigo-700 focus:outline-none"
                :class="form.type === 'company' ? 'ring-2 ring-indigo-400' : ''"
                @click="form.type = 'company'">公司</button>
            </div>
            <div v-if="form.type === 'personal'">
              <div class="mb-4">
                <label class="block text-gray-600 dark:text-gray-200 mb-1" for="name">姓名</label>
                <input v-model="form.name" id="name" type="text" required
                  class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                  placeholder="請輸入姓名" />
              </div>
              <div class="mb-4 flex gap-2">
                <button type="button"
                  class="px-4 py-1 rounded-l-full rounded-r bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-700 focus:outline-none"
                  :class="form.gender === '先生' ? 'ring-2 ring-indigo-400' : ''" @click="form.gender = '先生'">先生</button>
                <button type="button"
                  class="px-4 py-1 rounded-r-full rounded-l bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-700 focus:outline-none"
                  :class="form.gender === '女士' ? 'ring-2 ring-indigo-400' : ''" @click="form.gender = '女士'">女士</button>
              </div>
            </div>
            <div v-if="form.type === 'company'">
              <div class="mb-4">
                <label class="block text-gray-600 dark:text-gray-200 mb-1" for="company">公司名稱</label>
                <input v-model="form.company" id="company" type="text" required
                  class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                  placeholder="請輸入公司名稱" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-600 dark:text-gray-200 mb-1" for="taxId">統一編號</label>
                <input v-model="form.taxId" id="taxId" type="text" required
                  class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                  placeholder="請輸入統一編號" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-600 dark:text-gray-200 mb-1" for="contactPerson">聯絡人</label>
                <input v-model="form.contactPerson" id="contactPerson" type="text" required
                  class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                  placeholder="請輸入聯絡人姓名" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-600 dark:text-gray-200 mb-1" for="jobTitle">職稱</label>
                <input v-model="form.jobTitle" id="jobTitle" type="text" required
                  class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                  placeholder="請輸入職稱" />
              </div>
            </div>
            <div class="mb-4">
              <div class="block text-gray-600 dark:text-gray-200 mb-1">聯絡方式（可複選）</div>
              <div class="flex flex-wrap gap-3">
                <label v-for="opt in contactOptions" :key="opt.value" class="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" v-model="form.contactMethods" :value="opt.value"
                    class="accent-indigo-600 dark:accent-indigo-400" />
                  <span class="text-gray-700 dark:text-gray-200 text-sm">{{ opt.label }}</span>
                </label>
              </div>
            </div>
            <div class="mb-4" v-if="showLineId">
              <input v-model="form.lineId" type="text"
                class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="請輸入 LINE ID" />
            </div>
            <div class="mb-4" v-if="showLinePhone">
              <input v-model="form.linePhone" type="text"
                class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="請輸入 LINE 綁定手機號碼" />
            </div>
            <div class="mb-4" v-if="showPhone">
              <input v-model="form.phone" type="text"
                class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="請輸入電話號碼" />
            </div>
            <div class="mb-4" v-if="showEmail">
              <input v-model="form.email" type="email"
                class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="請輸入 Email" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-600 dark:text-gray-200 mb-1" for="message">留言內容</label>
              <textarea v-model="form.message" id="message" rows="4" required
                class="w-full rounded border border-gray-300 dark:border-indigo-800 px-3 py-2 bg-white dark:bg-indigo-950 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="請輸入留言內容"></textarea>
            </div>
            <div v-if="error" class="text-red-500 text-sm mb-2">{{ error }}</div>
            <div class="flex gap-2">
              <button type="submit"
                class="flex-1 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">送出留言</button>
              <button type="button" @click="clearForm"
                class="flex-1 py-2 rounded bg-gray-200 dark:bg-indigo-900 text-gray-700 dark:text-gray-200 font-semibold transition border border-gray-300 dark:border-indigo-700">清除</button>
            </div>
          </form>
          <div v-else class="text-green-600 dark:text-green-400 text-center py-8">
            感謝您的留言，我們已收到您的訊息！
          </div>
        </div>
      </div>
    </div>
    <!-- 地圖卡片 -->
    <div class="mt-10">
      <div
        class="bg-white/90 dark:bg-indigo-950/90 rounded-xl shadow border border-gray-100 dark:border-indigo-900 p-4">
        <h3 class="text-base font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-2">
          <ContactIcon name="map" class="w-5 h-5" /> 工廠位置
        </h3>
        <iframe class="w-full h-64 rounded-xl border-0 shadow"
          src="https://www.google.com/maps?q=台中市大里區工業路88號&output=embed" allowfullscreen loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="mt-2 text-gray-600 dark:text-gray-300 text-sm">台中市大里區工業路 88 號</div>
      </div>
    </div>
  </section>
</template>
