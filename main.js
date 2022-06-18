import App from './App'
import uView from "uview-ui"

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView)

import api from "@/utils/api.js"
Vue.prototype.$api = api

/* import des from "@/utils/des.js"
Vue.prototype.$des = des */

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif