
const tab = {
  state: {
    defaultTabName : "",
	tabList: []
  },

  mutations: {
    SET_DEFAULT_TAB_NAME: (state, name) => {
      state.defaultTabName = name
    },
	SET_TAB_LIST: (state, tabList) => {
	  state.tabList = tabList
	}
  },

  actions: {
    SetDefaultTabName({ commit }, defaultName) {
		  commit('SET_DEFAULT_TAB_NAME', defaultName)
	},
	SetTabList({ commit }, tabList) {
		  commit('SET_TAB_LIST', tabList)
	}
  
  
  }


}

export default tab