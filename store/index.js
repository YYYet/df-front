import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import tab from '@/store/modules/tab.js'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,tab
  },
  getters
})

export default store
