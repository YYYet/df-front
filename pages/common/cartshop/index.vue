<template>
	<view>
		<z-paging-swiper :fixed="false">
			<view slot="left">
				<view class="side-a">
					<scroll-view :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true"
						style="height: 900rpx;">
						<view class="item text-ellipsis__2 side-item" v-for="(item,index) in columns" :key="index"
							@click="handleSideAction(item,index)" :class="[index===sideCurrentIndex&&'type_active']">
							<uni-badge class="uni-badge-left-margin" :text="tabBadgeCache[index]" absolute="rightTop"
								:offset="[-3, -3]" size="small">
								<view class="box"><text class="text-ellipsis__2">{{item.name}}</text></view>
							</uni-badge>
							<!-- <view class="badge" v-if="item.goodNum">{{ item.goodNum }}</view> -->
						</view>
					</scroll-view>
				</view>
			</view>

			<swiper class="side-b" :current="sideCurrentIndex" @transition="swiperTransition"
				@animationfinish="swiperAnimationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in columns" :key="index">
					<cartshop-swiper-item ref="listItem" :tabIndex="index" :currentTab="columns[index]"
						:currentIndex="sideCurrentIndex" @numberComputed="numberComputed"
						:needNumberSelector="true"></cartshop-swiper-item>
				</swiper-item>
			</swiper>
		</z-paging-swiper>

	</view>
</template>

<script>
	import cartshopSwiperItem from '@/pages/common/cartshop/cartshop-swiper-item/index.vue'

	import {
		getMaterialTabs,
		getMaterialAddedV2
	} from '@/api/system/material.js'

	export default {
		components: {
			'cartshop-swiper-item': cartshopSwiperItem
		},
		props: {
			data: {
				type: Array,
				default: () => []
			},
			// columns: {
			// 	type: Array,
			// 	default: () => []
			// },
			defaultTab: {
				type: String
			},
			// 点击侧边栏 右边是否需要动画
			scrollWithAnimation: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				columns: [],
				tabList: ['测试1', '测试2', '测试3', '测试4'],
				current: 0,
				test: 0,
				tabIndex: 0,
				topHeight: 0,
				tabName: "",
				intoView: 'v_0',
				sideCurrentIndex: 0,
				sideCurrentId: 0,
				scrollTop: 0,
				contentHeightArr: [],
				handleSideClick: true,
				tabBadgeCache: [],
				numsCacheList: [],
				columnIdIndexCache: {}
			}
		},
		onLoad() {

		},
		beforeDestroy() {
			// 移除事件监听
			uni.$off('watchDataList');
			uni.$off('notic2refresh');
			uni.$off('notic2tabBadgeRefresh');
		},

		onShow() {

		},
		watch: {
			tabBadgeCache: {
				handler(newVal) {
					console.log("角标缓存变动", newVal);
					uni.$emit('notic2BottomRefresh', newVal, true);
				},
				deep: true
			},
		},
		created() {

			console.log("cartshopcreated 注册watchDataList")
			uni.$on('watchDataList', (arr) => {
				console.log("触发watchDataList", arr, this.numsCacheList);
				this.refeshTabBadge(arr);
			});
			console.log("cartshopcreated 注册notic2refresh")
			uni.$on('notic2refresh', (item) => {
				console.log("触发购物车数据列表刷新", item, "当前tab", this.columns);
				let currentTabIndex = this.getTabIndexFromColumnIdIndexCache(item.groupId);
				item.currentTabIndex = currentTabIndex;
				console.log("当前物料所属tab下标", currentTabIndex)
				this.$refs.listItem[currentTabIndex].numberComputedOtherBySearchPage(item)
			});

			console.log("cartshopcreated 注册notic2tabBadgeRefresh")
			uni.$on('notic2tabBadgeRefresh', (item) => {
				console.log("触发购物车tab角标刷新", item, this.columns);
				this.refeshTabBadge(item);
			});

			console.log("cartshopcreated 注册clearShopCart")
			uni.$on('clearShopCart', (item) => {
				console.log("触发购物车清空", item);
				this.clearCartShop();
			});

			this.sideCurrentIndex = 0;
			uni.setStorageSync('sideCurrentIndex', 0);
			console.log("columns", uni.getStorageSync('columns'))
			this.columns = uni.getStorageSync('columns');
			console.log("localColumns", this.columns)
			for (var i = 0; i < this.columns.length; i++) {
				// this.tabClickCache.push(false);
				this.numsCacheList.push({})
				this.tabBadgeCache.push(0)
			}

		},
		onReady() {

		},
		mounted() {
			this.getContentHeight()
			console.log("mounted columns", this.columns)
			this.sideCurrentIndex = uni.getStorageSync('sideCurrentIndex');
			this.sideCurrentId = uni.getStorageSync('sideCurrentId');
			console.log("sideCurrentIndex", this.sideCurrentIndex, "sideCurrentId", this.sideCurrentId);
		},

		beforeMount() {
			console.log("beforeMount")
		},

		methods: {
			clearCartShop(){
				for (var i = 0; i < this.columns.length; i++) {
					// this.$set(this.tabBadgeCache, i, 0);
					console.log("this.$refs.listItem[i]", this.$refs.listItem[i])
					this.$refs.listItem[i].reload();
				}
			},
			refeshTabBadge(arr) {
				console.log("arr", arr)
				if (arr == null || arr.length == 0) {
					for (var i = 0; i < this.columns.length; i++) {
						this.$set(this.tabBadgeCache, i, 0);
					}
				}else{
					for (var i = 0; i < arr.length; i++) {
						let item = arr[i]
						let currentTabIndex = this.getTabIndexFromColumnIdIndexCache(item.groupId);
						// console.log("currentTabIndex", currentTabIndex)
						item.currentTabIndex = currentTabIndex;
						this.numsCacheList[item.currentTabIndex][item.id] = item.nums
						let goodsNum = 0;
						for (let v of Object.values(this.numsCacheList[item.currentTabIndex])) {
							goodsNum += v
						}
						// console.log("当前tab角标数值", goodsNum)
						this.$set(this.tabBadgeCache, item.currentTabIndex, goodsNum);
					}
				}
			},
			getTabIndexFromColumnIdIndexCache(groupId) {
				let cl = uni.getStorageSync("columnIdIndexCache");
				return cl[groupId]
			},
			getTabIndexFromColumns(tabId) {
				let index = -1;
				for (var i = 0; i < this.columns.length; i++) {
					if (this.columns[i].id == tabId) {
						index = i;
					}
				}
				return index;
			},
			resetColumnsValue(columns) {
				console.log("重置columns")
				this.$emit('resetColumnsValue', columns);
			},

			// swiper滑动中
			swiperTransition(e) {
				// this.$refs.tabs.setDx(e.detail.dx);
			},
			// swiper滑动结束
			swiperAnimationfinish(e) {
				if (e.detail.source == "touch") {
					// this.current = e.detail.current;	
					console.log("右侧列表页码", e)
				}
				if (e.detail.source == "") {
					// this.sideCurrentIndex = this.current;
					console.log("左侧tab下标", e)
				}
			},
			// 如果要通知当前展示的z-paging刷新，请调用此方法
			reloadCurrentList() {
				this.$refs.listItem[this.sideCurrentIndex].reload();
			},

			virtualTopHeightChange(topHeight) {
				this.topHeight = topHeight;
			},
			numberComputed(val, index, item) {
				this.$emit('numberComputed', val, index, item)
			},
			getContentHeight() {
				this.getHeight('.item_b').then(res => {
					res.forEach((item, index) => {
						let top = index > 0 ? this.contentHeightArr[index - 1] : 0;
						top += item.height;
						this.contentHeightArr.push(top)
					})
				})
			},
			async getHeight(element) {
				return new Promise((resolve) => {
					let view = uni.createSelectorQuery().in(this).selectAll(element);
					view.boundingClientRect(data => {
						if (!data) {
							setTimeout(() => {
								this.getHeight()
							}, 10)
							return
						}
						resolve(data)
					}).exec();
				})
			},

			handleSideAction(item, index) {
				console.log("点击左侧tab==>", item, index)

				this.handleSideClick = true
				this.sideCurrentIndex = index
				this.tabName = item.name
				uni.setStorageSync('defaultTabName', item.name);
				uni.setStorageSync('sideCurrentIndex', this.sideCurrentIndex);
				this.scrollHeight()
			},
			async getWrapSideHeight() {
				return new Promise(resolve => {
					let view = uni.createSelectorQuery().in(this).select(".side-a");
					view.boundingClientRect(data => {
						resolve(data)
					}).exec();
				})
			},
			async scrollTopTo(OffsetHeight, itemTab) {
				let tabNav = await this.getWrapSideHeight()
				this.scrollTop = OffsetHeight - (tabNav.height - itemTab.height) / 2
			},
			async scrollHeight() {
				let tabs = await this.getHeight(".side-item")
				let itemTab = tabs[this.sideCurrentIndex]
				if (!itemTab) return

				let currentBeforeArr = tabs
					.slice(0, this.sideCurrentIndex)

				let OffsetHeight = currentBeforeArr
					.reduce((total, curr) => {
						return total + curr.height
					}, 0);
				this.scrollTopTo(OffsetHeight, itemTab)

			},
		}
	}
</script>


<style lang="scss" scoped>
	.swiper {
		width: 50%;
		height: 100%;
	}


	.cart-shop {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.side-scroll {
		position: relative;
	}



	.badge {
		right: -2rpx;
		top: -2rpx;
		background-color: #9E2A22;
		position: absolute;
		display: flex;
		overflow: hidden;
		box-sizing: border-box;
		justify-content: center;
		flex-direction: row;
		height: 20px;
		min-width: 20px;
		padding: 0 4px;
		line-height: 18px;
		color: #fff;
		border-radius: 100px;
		border: 1px solid #fff;
		text-align: center;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		-webkit-font-feature-settings: "tnum";
		font-feature-settings: "tnum";
		font-size: 12px;
		z-index: 9;
		cursor: pointer;
	}

	.side-item {
		position: relative;
	}

	.side-a {
		width: 160rpx;
		box-sizing: border-box;
		height: 100%;
		overflow: auto;

		.item {
			text-align: center;
			padding: 20rpx 20rpx;
			display: flex;
			font-size: 24rpx;
			justify-content: center;
			align-items: center;
			color: #666666;
		}

		.type_active {
			background: white;
			font-weight: 600;
			color: #000000;
		}
	}

	.side-b {
		flex: 1;
		height: 100%;
		background: white;
		padding-bottom: 20rpx;
		box-sizing: border-box;

	}

	.text-ellipsis__2 {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>