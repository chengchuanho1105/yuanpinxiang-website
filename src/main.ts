import '@/assets/css/public/main.css'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({ duration: 500, once: false, offset: 50 })

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'

import App from './App.vue'
import router from './router'
import { setupPageTitle } from './routes/hook/setTitle'
import { setupPageDescription } from './routes/hook/setDescription'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)

setupPageTitle(router)
setupPageDescription(router)

app.use(head)
app.mount('#app')
