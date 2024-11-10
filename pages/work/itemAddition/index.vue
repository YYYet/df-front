<template>
	<view class="m-cart">
		<view class="search" @click="gotoSearchPage">
			<SearchBar :readonly="true"></SearchBar>
		</view>
		<view class="fcb pl-32 pr-36 shop header-shop" id="topInfo">
			<view class="flex items-center">
				<view class="pl-15 flex items-center"><text class="text-32">大方传统菜</text><text
						class="text-24 text-second"></text></view>
			</view>
			<view class="desk text-30 w-100 fcc" @click="clearShop">
				[清空]
				<view class="mark"></view>
			</view>
		</view>
		<CartShop ref="CartShop" class="card-shop-wrap" @resetColumnsValue="resetColumnsValue"
			@numberComputed="numberComputed" :tabVisibleHeight="tabVisibleHeight"/>
		<CartPay :goodsNum="goodsNum" :goodsTotalPrice="goodsTotalPrice" id="bottomInfo" @clickCart="clickCart"
			@submit="submit" />
	</view>
</template>

<script>
	import CartShop from '@/pages/common/cartshop/index.vue'
	import CartPay from '@/pages/common/carpay/index.vue'
	import SearchBar from '@/pages/common/searchBar/index.vue'
	import {
		getMaterialTabs,
		clearShopV2,
		getMaterialAddedV2
	} from '@/api/system/material.js'
	import {
		saveApplyGood
	} from '@/api/system/bill.js'

	import {calculateLayoutHeight, showConfirm} from "@/utils/common.js"
	
	export default {
		components: {
			// 注册组件
			'CartShop': CartShop,
			'CartPay': CartPay,
			'SearchBar': SearchBar
		},
		data() {
			return {
				columns: [],
				cacheMap: {},
				tabVisibleHeight: 0,
				goodsTotalPrice: 0,
				goodsNum: 0
			}
		},
		onLoad() {
			console.log("onLoad")
		},
	
		onBackPress(e) {
			if (e.from === 'backbutton') {
				console.log("加购物品页面返回")
				return false;
			}
		},
		onUnload() {
			uni.$off('notic2BottomRefresh');
		},
		created() {
			console.log("itemAddition created")
			console.log("itemAddition 注册notic2tabBadgeRefresh")
			uni.$on('notic2BottomRefresh', (arr, isSumTabBadge) => {
				console.log("触发购物车界面底部总数刷新", arr, "数据是否来自计算角标",isSumTabBadge, this.columns);
				if(isSumTabBadge){
					this.goodsNum = arr.reduce((accumulator, currentValue) => {
					  return accumulator + currentValue;
					}, 0);	
				}else{
					this.goodsNum = arr.reduce((accumulator, currentValue) => {
					  return accumulator + currentValue.nums;
					}, 0);	
				}
			});
			
			
		},
	
		
		mounted() {

		},
		onReady() {

	
		},
		onShow(){
			this.$nextTick(()=>{
				let d = this.calculateLayoutHeight("topInfo","bottomInfo");
				this.tabVisibleHeight = d;
				console.log("onShow tabVisibleHeight", d)
				
				console.log("onShow refeshTabBadgeByNet", this.$store.state.data.fromPage)
				this.refeshTabBadgeAndBottomNumsByNet()
			})
		},
		methods: {
			calculateLayoutHeight,
			refeshTabBadgeAndBottomNumsByNet() {
				getMaterialAddedV2(1, 99999).then(res => {
					let list = res.result;
						console.log("界面刷新获取的物料信息", list);
					if (list != null || list.length != 0) {
						console.log("界面刷新通过接口刷新tab角标");
						uni.$emit("notic2tabBadgeRefresh", list)
						uni.$emit("notic2tabOpen", list)
					}
				});
			},
			clearShop() {
				this.$modal.msg("清空购物车")
				clearShopV2().then(res => {
					uni.$emit("clearShopCart")
				})
			},
			submit() {
				// this.$modal.msg("模拟提交");
					showConfirm('是否确认提交?').then(res => {
							if (res.confirm) {
									let list = [];
									// 显示加载框
									uni.showLoading({
									  title: '正在提交'
									});
									getMaterialAddedV2(1, 99999).then(res => {
										list = res.result;
											console.log("获取最新选购的物品");
											uni.setStorageSync("materialDataAdded", list);
											
											let applicationTemplate = uni.getStorageSync("applicationTemplate")
											let applyListData = uni.getStorageSync("applyListData")
											const data = {
												note: applyListData.remark,
												reviceOrgNumber: applicationTemplate.orgNumber,
												applyOrgNumber: applicationTemplate.orgNumber,
												applyDate: new Date(),
												arrivalDate: applicationTemplate.arrivalDate,
												entry: list
											};
											
												console.log("saveData", applicationTemplate, data)
												saveApplyGood(data).then(res=>{
													console.log("saveApplyGood", res)
													clearShopV2().then(res => {
														// uni.$emit("clearShopCart")
														this.$modal.msg("提交成功");
														
														uni.hideLoading();
														this.$tab.navigateBackPage(2)
														uni.$emit('selectTab', 1);	
												
														
													}).catch(error=>{
															uni.hideLoading();
													})
											
												}).catch(error =>{
													//    let { message } = error
													// this.$modal.msg("提交失败");
													// 		console.log("saveApplyGood error", error, message)
													// this.$modal.confirm(message)
													uni.hideLoading();
												})
										}).catch(res=>{
											this.$modal.msg("提交失败"+res);
											uni.hideLoading();
										});
						}
					})

			},
			getLastPage() {
				let pages = getCurrentPages(); // 获取当前页面栈的实例
				if (pages.length > 1) { // 若页面栈长度大于1则表示不止一个页面被打开了
					let previousPage = pages[pages.length - 2]; // 上一个页面为页面栈列表中倒数第二个元素
					console.log('上一个页面路由地址', previousPage.route); // 打印上一个页面的路由地址
					return previousPage.route;
				} else {
					console.log('只有一个页面', pages.route);
					return pages.route;
				}
			},
			gotoSearchPage(txt) {
				console.log("gotoSearchPage")
				this.$tab.navigateTo('/pages/common/cartshop/cartshop-search/index')
			},
			clearCache() {
				this.columns = [];
				this.cacheMap = {};
				this.$store.dispatch('ClearCacheMapByTabIndex', this.currentIndex)
			},
			addGoodsTotalPrice(price) {
				this.goodsTotalPrice += price
			},
			addGoodsNum(nums) {
				this.goodsNum = nums
			},
			clickCart() {
				console.log("底部结算购物车图标点击")
				this.$tab.navigateTo('/pages/work/purchasedItemsViewer/index')
				// this.$refs.MaterialPopListPop.open()
			},
			resetColumnsValue(columns) {
				this.columns = columns;
			},
			// getData() {

			// 	getMaterialTabs(0).then(res => {
			// 		console.log("queryTabsList", res)
			// 		this.columns = res.result
			// 		// this.$store.commit("SET_TAB_LIST", this.columns)
			// 		// this.$store.dispatch('SetTabList',this.columns)
			// 		uni.setStorageSync('columns', this.columns);
			// 		uni.setStorageSync('defaultTabName', this.columns[0].name);
			// 		console.log("this.columns", this.columns)
			// 	}).catch(res => {
			// 		console.log("queryTabsList", res)
			// 	})
			// },
			numberComputed(val, index, item) {
				console.log("购物车最外层shopCart中的numberComputed被触发", item)

				// this.cacheMap[item.id] = item;
				// this.goodsTotalPrice = 0;
				// for (let [key, value] of Object.entries(this.cacheMap)) {
				// 	if (value.nums == 0) {
				// 		delete this.cacheMap[key];
				// 	} else {
				// 		this.goodsTotalPrice += (value.price * value.nums)
				// 	}
				// }

				// this.goodsNum = Object.values(this.cacheMap).reduce((accumulator, currentValue) => {
				//   return accumulator + currentValue.nums;
				// }, 0);

				// let keys = Object.keys(this.cacheMap);
				// this.goodsNum = keys.length;

				//存储选中的物料，供后续查看
				// let cacheObjList = Object.values(this.cacheMap);
				// this.$store.dispatch('SetMaterialList', JSON.stringify(cacheObjList))
				this.$store.dispatch('AddCacheMap', item)

				console.log("shopCart的缓存集合", this.cacheMap)
			},


		}
	}
</script>

<style scoped lang="scss">
	.text-30 {
		fonts-size: 30rpx;
	}

	.ml-25 {
		margin-left: 25rpx;
	}

	.h-80 {
		height: 80rpx;
	}

	.h-110 {
		height: 110rpx;
	}

	.text-24 {
		font-size: 24rpx;
	}

	.bg-white {
		background: white;
	}

	.fcb {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flex {
		display: flex;
	}

	.items-center {
		align-items: center;
	}

	.px-32 {
		padding-left: 32rpx;
		padding-right: 32rpx;
	}

	.pl-32 {
		padding-left: 32rpx;
	}

	.text-white {
		color: white;
	}

	.pr-36 {
		padding-right: 36rpx;
	}

	.bg-white {
		background: white;
	}

	.fcc {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bg-white {
		background: white;
	}

	.search {
		background: white;
		flex-shrink: 0;
		height: 100rpx;
	}

	.shop {
		flex-shrink: 0;
		height: 100rpx;
		background: white;
	}

	.card-shop-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.m-cart {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}

	.desk {
		position: relative;

		.mark {
			position: absolute;
			width: 98rpx;
			height: 20rpx;
			background: #EEC5C1;
			opacity: 0.6;
			bottom: 0;

		}
	}

	.header-shop {
		background: #F5F5F5;
	}
</style>