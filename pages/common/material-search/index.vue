<template>
	<view >
	<z-paging ref="cardSearchPaging" use-virtual-list @query="queryList" v-model="dataList" >
		<template #top>
			<SearchBar :readonly="false" @input="input"></SearchBar>
		</template>
		<template #cell="{item,index}">
			<uni-card >
				<MaterialInfo :item="item" :currentIndex="index" :needNumberSelector="false" :needAddBtn="true"
					@numberComputed="numberComputed" ></MaterialInfo>
			</uni-card>
		</template>
	</z-paging>

	</view>
</template>

<script>
	import SearchBar from '@/pages/common/searchBar/index.vue'
	import MaterialInfo from "@/pages/common/material-info/index.vue"
	import { getMaterialByName,getMaterialByNameV2,addOrUpDateShopV2 } from '@/api/system/material.js'
	export default {
		components: {
			'MaterialInfo': MaterialInfo,
			'SearchBar': SearchBar
		},
		data() {
			return {
				dataList: [],
				cacheMap: {},
				searchText: ""
			}
		},
		onShow() {
			
		},
		dataList: {
			handler(newVal) {
	
			},
			immediate: true
		},
		methods: {
			input(txt){
				console.log("input",txt)
				this.searchText = txt
				this.$refs.cardSearchPaging.reload()
			},
			queryList(pageNo, pageSize) {
				console.log("搜索物品页面 queryList",pageNo, pageSize)
				   let cacheMap = this.$store.state.data.cacheMap;
				   	let applicationTemplate = uni.getStorageSync("applicationTemplate");
					if(this.searchText == ""){
						return
					}
				   getMaterialByNameV2(this.searchText, applicationTemplate.billNumber, pageNo, pageSize).then(res => {
					   var list = res.result;
					   this.$refs.cardSearchPaging.complete(list)
				   }).catch(res => {
					this.$refs.cardSearchPaging.complete(false);
				})
				
			},
			itemClick(item) {
				console.log('点击了', item.name);
			},
			numberComputed(val, index, item) {
				item.nums = val
				uni.$emit('selectUpdateMaterial', val, index, item)
			}
		}
	}
</script>

<style>

</style>