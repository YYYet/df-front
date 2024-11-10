import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission

import request2 from '@/utils/request2.js'
// import * as dd from 'dingtalk-jsapi';

// Vue.prototype.$dd = dd;

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.filter('formatDate', function(value) {
  if (value) {
    const date = new Date(value);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
});

Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$request2 = request2
App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
