import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/assets/styles/app.css'

const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      'Content-type': 'application/json'
    }
});
export default Axios


createApp(App).use(store, router, Axios, VueAxios).mount('#app')
