<template>
	<view >
		<!-- 		<uni-card style="height: auto;" v-for="(item,index) in dataList" :key="index" @click="itemClick(item)"
			v-show="item.nums != 0">
			<MaterialInfo class="box" :item="item" :currentIndex="index" :needNumberSelector="true"
				@numberComputed="numberComputed" v-if="item.nums != 0" />
		</uni-card> -->
		<z-paging ref="cardPaging" use-inner-list @query="queryList" v-model="dataList"  >
			<template #cell="{item,index}" >
				<uni-card v-show="item.nums != 0" >
					<MaterialInfo :item="item" :currentIndex="index" :needNumberSelector="true"
						@numberComputed="numberComputed"></MaterialInfo>
				</uni-card>
			</template>
		</z-paging>
	</view>
</template>

<script>
	import MaterialInfo from "@/pages/common/deliveryRequisition/material-info/index.vue"
	import {
		getMaterialAddedV2, addOrUpDateShopV2
	} from '@/api/system/material.js'
	export default {
		components: {
			'MaterialInfo': MaterialInfo
		},
		data() {
			return {
				dataList: [],
				cacheMap: {}
			}
		},
		created() {
			// console.log("MaterialPopListPop created",this.$store.state.data.materialList)
			// this.dataList = JSON.parse(this.$store.state.data.materialList);
			// this.queryList()
		},
		mounted() {
			console.log("加购物品查看页面 mounted")
			// this.dataList = Object.values(this.$store.state.data.cacheMap);
			console.log("加购物品查看页面  mounted", this.$store.state.data.cacheMap)
		},
		onShow() {
			this.$store.dispatch("SetFromPage", "purchasedItemsViewer")
		},
		methods: {
			queryList(pageNo, pageSize) {
				console.log("加购物品查看页面 queryList")

				// this.$refs.cardPaging.setLocalPaging(Object.values(this.$store.state.data.cacheMap));
				// let arr = Object.values(this.$store.state.data.cacheMap);
				// let result = [];
				// for (var i = 0; i < arr.length; i++) {
				// 	let item = arr[i]
				// 	if (item.nums != 0) {
				// 		result.push(item);
				// 	}
				// }
				let tempNo = uni.getStorageSync("applicationTemplate").billNumber;
				getMaterialAddedV2(tempNo, pageNo, pageSize).then(res=>{
						this.$refs.cardPaging.complete(res.result)
				})		
						
	
			},
			itemClick(item) {
				console.log('点击了', item.name);
			},
			numberComputed(val, index, item) {

				item.nums = val

				// this.cacheMap[item.id] = item

				// this.$emit('numberComputed', val, index, item)
				// 将已选购的物品加入缓存,在购物车列表的show周期内进行处理
				// this.$store.dispatch('AddCacheMap', item)
				console.log("加购页面列表", val, index, item)
				let tempNo = uni.getStorageSync("applicationTemplate").billNumber;
				addOrUpDateShopV2(tempNo, item).then(res=>{
					console.log("添加物品到购物车",res)
					uni.$emit('notic2refresh', item)
				})


				// if(val == 0){
				// 	this.$delete(this.dataList, index)
				// }
// this.$refs.cardPaging.reload();
				//   this.$nextTick(() => {
				// // 刷新列表数据(如果不希望列表pageNo被重置可以用refresh代替reload方法)
				// console.log("reload")
				// this.$refs.cardPaging && this.$refs.cardPaging.reload();
				// })

				// this.$emit('numberComputedByOtherPage', val, index, item)		
			}

		}
	}
</script>

<style>
	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}

	.fade-enter,
	.fade-leave-to

	/* .fade-leave-active in <2.1.8 */
		{
		opacity: 0;
	}

	.box {
		opacity: 1;
		transition: opacity 0.5s;
	}
</style>