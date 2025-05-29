import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useAuthStore } from './stores/authStore'
import { i18n } from './i18n/i18n'
import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(pinia)
app.use(router)

// Check authentication status on app start
const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')
