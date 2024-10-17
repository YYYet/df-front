import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission

import request2 from '@/utils/request2.js'


Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$request2 = request2
App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
