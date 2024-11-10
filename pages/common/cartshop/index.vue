<template>
	<view>
		<z-paging-swiper :fixed="false">
			<!-- 		<view slot="top">
				<z-tabs :tabs-style="{'background-color':'#f1f1f1'}" :active-color="'#000000'" :list="columns"
					:current="parentTabIndex" @change="parentTabChange" :scroll-count="0" />
			</view> -->
			<view slot="left">
				<!-- <view class="side-a"> -->
				<view>

					<scroll-view :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true"
						:style="{'height': tabVisibleHeight+ 'px'}">
						<!-- accordion -->
						<!-- :show-arrow="item.children != undefined"  -->
						<uni-collapse ref="collapse" class="custom-collapse-bg" v-model="activeNames"
							@change="handleCollapseChange">
							<uni-collapse-item :title="item.name" v-for="(item,index) in treeColumns" :key="index"
								:open="index == 0" title-border="show" :border="false">
								<uni-list v-show="item.children">
									<uni-list-item clickable :class="currentSelectItem.id == treeColumns[index].id?'text-ellipsis__2-active':'text-ellipsis__2'" :clickable="true" @click="activeItem(item)"
										>
										<template v-slot:footer>
											<uni-badge class="uni-badge-left-margin"
												:text="tabBadgeCache[findArrIndexById(treeColumns[index])]"
												absolute="rightTop" :offset="[-3, -3]" size="small">
												<text :class="currentSelectItem.id == treeColumns[index].id?'text-ellipsis__2-active':'text-ellipsis__2'" >{{treeColumns[index].name}}</text>
											</uni-badge>
										</template>
									</uni-list-item>


									<uni-list-item clickable v-for="(subItem,subIndex) in item.children" :key="subIndex"
										:class="currentSelectItem.id == subItem.id?'text-ellipsis__2-active':'text-ellipsis__2'" @click="activeItem(subItem)" :clickable="true">
										<template v-slot:footer>
											<uni-badge class="uni-badge-left-margin"
												:text="tabBadgeCache[findArrIndexById(subItem)]" absolute="rightTop"
												:offset="[-3, -3]" size="small">
												<text :class="currentSelectItem.id == subItem.id?'text-ellipsis__2-active':'text-ellipsis__2'">{{subItem.name}}</text>
											</uni-badge>
										</template>
									</uni-list-item>
								</uni-list>
								<uni-list v-show="!item.children">
									<view>
										<uni-list-item clickable :class="currentSelectItem.id == treeColumns[index].id?'text-ellipsis__2-active':'text-ellipsis__2'" @click="activeItem(item)" :clickable="true">
											<template v-slot:footer>
												<uni-badge class="uni-badge-left-margin"
													:text="tabBadgeCache[findArrIndexById(treeColumns[index])]"
													absolute="rightTop" :offset="[-3, -3]" size="small">
													<text :class="currentSelectItem.id == treeColumns[index].id?'text-ellipsis__2-active':'text-ellipsis__2'">{{treeColumns[index].name}}</text>
												</uni-badge>
											</template>
										</uni-list-item>
									</view>
								</uni-list>
							</uni-collapse-item>
						</uni-collapse>

						<!-- 			<view class="item text-ellipsis__2 side-item" v-for="(item,index) in columns" :key="index"
							@click="handleSideAction(item,index)" :class="[index===sideCurrentIndex&&'type_active']">
							<uni-badge class="uni-badge-left-margin" :text="tabBadgeCache[index]" absolute="rightTop"
								:offset="[-3, -3]" size="small">
								<view class="box">
									<text class="text-ellipsis__2">{{item.name}}</text>
								</view>
							</uni-badge>
						</view> -->

					</scroll-view>
				</view>
			</view>

			<swiper class="side-b" :current="sideCurrentIndex" @transition="swiperTransition"
				@animationfinish="swiperAnimationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in columns" :key="index">
					<cartshop-swiper-item ref="listItem" :tabIndex="index" :currentTab="item"
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
		getMaterialTabsByGroupId,
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
			tabVisibleHeight: {
				type: Number,
				default: 900
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
				treeColumns: [],
				childrenColumns: [],
				currentSelectItem: {},
				tabList: ['测试1', '测试2', '测试3', '测试4'],
				parentTabList: ['测试1', '测试2', '测试3', '测试4'],
				current: 0,
				activeNames: "",
				parentTabIndex: 0,
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
			uni.$off('notic2tabOpen');
			uni.$off('clearShopCart');
		},
		onUnload() {
			uni.$off('watchDataList');
			uni.$off('notic2refresh');
			uni.$off('notic2tabBadgeRefresh');
			uni.$off('notic2tabOpen');
			uni.$off('clearShopCart');
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
			parentTabIndex: {
				handler(newVal) {
					console.log("父tab变化", newVal);
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

			console.log("cartshopcreated 注册notic2tabOpen")
			uni.$on('notic2tabOpen', (item) => {
				console.log("触发购物车tab打开", item, this.columns);
				this.noticTabOpen(item);
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
			if(this.columns != undefined || this.columns.length != 0){
				this.currentSelectItem = this.columns[0];
			}
			

			this.treeColumns = uni.getStorageSync('treeColumns');
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
			needOpenTab(item){
				// let needOpenList = this.columns.filter(cloum => cloum.id == item.id);
				// let needOpenObj = needOpenList.reduce((acc, cloum) => {
				//   acc[cloum.id] = cloum.value; // 以item.id为键，item.value为值
				//   return acc;
				// }, {});;
				//  console.log("needOpenTab", this.needOpenObj, needOpenList)
				 var cIndex = 0;
				 for (var i = 0; i < this.columns.length; i++) {
					if(this.columns[i].id == item.id){
						cIndex = i;
						break;
					}
				 }
				 console.log("tttt", cIndex, this.columns)
				 console.log("this.tabBadgeCache[cIndex]", this.tabBadgeCache[cIndex], this.tabBadgeCache[cIndex]  != 0, this.tabBadgeCache)
				 if(this.tabBadgeCache[cIndex]  != 0){
					 return true;
				 }
				 return false;
			},
			noticTabOpen(list){
			
				console.log("需要默认打开的tab", list, this.tabBadgeCache, this.columns)
		
			},
			handleCollapseChange(arr) {
				console.log("handleCollapseChange", arr)
			},
			findArrIndexById(item) {
				for (var i = 0; i < this.columns.length; i++) {
					let c = this.columns[i];
					if (c.id == item.id) {
						return i;
					}
				}
			},
			activeItem(item) {
				// console.log("activeNames", item)
				console.log("点击左侧tab==>", item)
				this.currentSelectItem = item;
				this.handleSideClick = true
				this.sideCurrentIndex = this.findArrIndexById(item);
				this.tabName = item.name
				uni.setStorageSync('defaultTabName', item.name);
				uni.setStorageSync('sideCurrentIndex', this.sideCurrentIndex);
			},
			parentTabChange(index) {
				this.parentTabIndex = index;
				// console.log("parentTabChange this.columns", this.columns)
				// console.log("parentTabChange this.columns child", this.columns[index].children)
				// this.childrenColumns = this.columns[index].children;
				// if(this.childrenColumns == undefined){
				// 	var c = this.columns[index];
				// 	let item = {
				// 		id: c.id,
				// 		name: "全部",
				// 		parentId: "0",
				// 		weight: "0"
				// 	}
				// 	this.childrenColumns = [];
				// 	this.childrenColumns[0] = item
				// }
			},
			clearCartShop() {
				this.$nextTick(() => {
					for (var i = 0; i < this.columns.length; i++) {
						// this.$set(this.tabBadgeCache, i, 0);
						// console.log("当前", this.$refs.listItem[i])
						if (this.$refs.listItem[i] == undefined) {
							continue;
						}
						this.$refs.listItem[i].reload();
					}
				})
			},
			refeshTabBadge(arr) {
				console.log("arr", arr)
				if (arr == null || arr.length == 0) {
					for (var i = 0; i < this.columns.length; i++) {
						this.$set(this.tabBadgeCache, i, 0);
					}
				} else {
					for (var i = 0; i < arr.length; i++) {
						let item = arr[i]
						let currentTabIndex = this.getTabIndexFromColumnIdIndexCache(item.groupId);
						console.log("currentTabIndex", currentTabIndex)
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

			handleSubAction(subItem, parentIndex, subIndex) {
				// 处理子菜单项的点击事件
				// 可以在这里添加其他处理逻辑，比如更新sideCurrentIndex等
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
	/deep/ .uni-collapse-item__title-box {
		background-color: #f1f1f1;
	}

	// /deep/ .uni-collapse-item{
	// 	height: 50px;
	// }

	/* 折叠面板头部未展开状态样式 */
	/deep/ .uni-collapse .uni-collapse-item__wrap.uni-collapse-item--disabled {
		background-color: #f0f0f0;
		/* 设置折叠面板未展开时的背景色 */
	}

	/* 折叠面板头部展开状态样式 */
	/deep/ .uni-collapse .uni-collapse-item__content {
		background-color: #e0e0e0;
		/* 设置折叠面板展开时的背景色 */
	}

	.custom-collapse-bg {
		background-color: #f1f1f1 !important;
	}

	.submenu {
		margin-left: 20px;
		/* 根据需要调整子菜单的缩进 */
	}

	.submenu-item {
		cursor: pointer;
		/* 根据需要添加更多的样式 */
	}

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
		font-size: 15px;
		background-color: #f1f1f1;
	}

	.text-ellipsis__2-active {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 15px;
		background-color: white;
	}

	.text-active {
		background: white;
		font-weight: 600;
		color: #000000;
	}
</style>