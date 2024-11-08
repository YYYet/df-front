import Vue from 'vue'
const data = {
  state: {
	materialList: [],
	cacheMap:{},
	columnIdIndexCache:{},
	tableList:[],
	fromPage: ""
  },

  mutations: {
	  SET_FROM_PAGE: (state, fromPage) => {
	    state.fromPage = fromPage
	  },
	SET_MATERIAL_LIST: (state, materialList) => {
	  state.materialList = materialList
	},
	SET_CACHE_MAP: (state, cacheMap) => {
	  state.cacheMap = cacheMap
	},
	SET_COLUMN_ID_INDEX_CACHE_MAP: (state, columnIdIndexCache) => {
	  state.columnIdIndexCache = columnIdIndexCache
	},
	ADD_CACHE_MAP: (state, item) => {
		 Vue.set(state.cacheMap, item.id, item);
	},
	DEL_CACHE_MAP: (state, key) => {
		delete state.cacheMap[key]
	},
	CLEAR_CACHE_MAP: (state, key) => {
		state.cacheMap = {}
	},
	CLEAR_CACHE_MAP_BY_TAB_INDEX: (state, key) => {
		state.cacheMap = {}
	},
	SET_TABLE_LIST: (state, tableList) => {
	  state.tableList = tableList
	}
  },

  actions: {
	  SetFromPage({ commit }, fromPage) {
	  	  commit('SET_FROM_PAGE', fromPage)
	  },
	  SetColumnIdIndexCacheMap({ commit }, columnIdIndexCache) {
	  	  commit('SET_COLUMN_ID_INDEX_CACHE_MAP', columnIdIndexCache)
	  },
	SetMaterialList({ commit }, materialList) {
		  commit('SET_MATERIAL_LIST', materialList)
	},
	SetCacheMap({ commit }, cacheMap) {
		  commit('SET_CACHE_MAP', cacheMap)
	},
	AddCacheMap({ commit }, item) {
		  commit('ADD_CACHE_MAP', item)
	},
	ClearCacheMap({ commit }) {
		  commit('CLEAR_CACHE_MAP')
	},
	ClearCacheMapByTabIndex({ commit }, tabIndex) {
		  commit('CLEAR_CACHE_MAP_BY_TAB_INDEX', tabIndex)
	},
	DelCacheMap({ commit }, key) {
		  commit('DEL_CACHE_MAP', key)
	},
	SetTableList({ commit }, tableList) {
		  commit('SET_TABLE_LIST', tableList)
	}
  
  
  }


}

export default data