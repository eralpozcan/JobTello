import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import App from './App.vue'
import router from './router'
import { createHead } from '@unhead/vue/client'
const app = createApp(App)

app.use(createPinia())
app.use(createHead())
app.use(router)

app.mount('#app')
