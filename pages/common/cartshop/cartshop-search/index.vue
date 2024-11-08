<template>
	<view >
	
	
	<z-paging ref="cardSearchPaging" use-virtual-list @query="queryList" v-model="dataList" >
		<template #top>
			<SearchBar :readonly="false" @input="input"></SearchBar>
		</template>
		<template #cell="{item,index}">
			<uni-card >
				<MaterialInfo :item="item" :currentIndex="index" :needNumberSelector="true"
					@numberComputed="numberComputed"></MaterialInfo>
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
			this.$store.dispatch("SetFromPage", "cartshopSearch")
		},
		dataList: {
			handler(newVal) {
				// console.log("dataList change", newVal)
				// console.log('watch开始处理左侧tab角标:', newVal);
				uni.$emit('watchDataList', newVal)
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
					   // for (var i = 0; i < list.length; i++) {
					   // 	   let item = list[i];
						  //  if(cacheMap[item.id] != undefined || cacheMap[item.id] != null){
							 //   item.nums = cacheMap[item.id].nums
						  //  }
					   // }
					   this.$refs.cardSearchPaging.complete(list)
				   }).catch(res => {
					// 如果请求失败写this.$refs.paging.complete(false);
					// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					this.$refs.cardSearchPaging.complete(false);
				})
				
				
				// let arr = Object.values(this.$store.state.data.cacheMap);
				// let result = [];
				// for (var i = 0; i < arr.length; i++) {
				// 	let item = arr[i]
				// 	if (item.nums != 0) {
				// 		result.push(item);
				// 	}
				// }
				// this.$refs.cardPaging.complete(result)
				// return result;
			},
			itemClick(item) {
				console.log('点击了', item.name);
			},
			numberComputed(val, index, item) {
				item.nums = val
				// 传递给cartshop-swiper-item页面,对购物车数据进行修正
				// this.$set(this.dataList, index, item);
				// uni.$emit("resetNumberSelectorBySearchPage", item)
				addOrUpDateShopV2(item).then(res=>{
					console.log("添加物品到购物车",res)
				})
				uni.$emit('notic2refresh', item)
			
				console.log("搜索物品页面列表", val, index, item)	
			}
		}
	}
</script>

<style>

</style>