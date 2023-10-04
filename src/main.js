import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createHead} from '@unhead/vue'


import './assets/main.css'
import './index.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import vue3GoogleLogin from 'vue3-google-login'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(pinia)
app.use(head)

app.use(vue3GoogleLogin,{
	clientId: "957446712432-677tds748bondn1s8scd7bmg89n4mm53.apps.googleusercontent.com"
})

app.mount('#app')
