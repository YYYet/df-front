
const tab = {
  state: {
    defaultTabName : ""
  },

  mutations: {
    SET_DEFAULT_TAB_NAME: (state, name) => {
      state.defaultTabName = name
    }
  },

  actions: {
    SetDefaultTabName({ commit }, defaultName) {
		  commit('SET_DEFAULT_TAB_NAME', defaultName)
	}
  
  
  }


}

export default tab