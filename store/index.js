import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import tab from '@/store/modules/tab'
import data from '@/store/modules/data'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,tab,data
  },
  getters
})

export default store
