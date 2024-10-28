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
					<swiper-list-item ref="listItem" :tabIndex="index" :currentIndex="sideCurrentIndex"
						@numberComputed="numberComputed"></swiper-list-item>
				</swiper-item>
			</swiper>
		</z-paging-swiper>
	</view>
</template>

<script>
	import {
		login
	} from '../../../../api/login'
	import NumerCalculation from '../NumerCalculation/NumerCalculation.vue'
	import SwiperListItem from '../swiper-list-item/swiper-list-item.vue'
	export default {
		components: {
			// 注册组件
			'NumerCalculation': NumerCalculation,
			'swiper-list-item': SwiperListItem
		},
		props: {
			data: {
				type: Array,
				default: () => []
			},
			columns: {
				type: Array,
				default: () => []
			},
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
				tabClickCache: [true],
				tabBadgeCache: [],
				cacheMap: [

				],
				tabsStyle: {
					position: 'fixed',
					top: '0',
					left: '0',
					bottom: '0',
					width: '100rpx', // 设置宽度
					flexDirection: 'column', // 设置垂直布局
					background: '#fff' // 背景颜色
				}
			}
		},

		mounted() {
			this.getContentHeight()
			console.log("mounted", this.columns)
			for (var i = 0; i < this.columns.length; i++) {
				this.tabClickCache.push(false);
				this.cacheMap.push([])
			}
			this.sideCurrentIndex = uni.getStorageSync('sideCurrentIndex');
			this.sideCurrentId = uni.getStorageSync('sideCurrentId');
			// this.tabBadgeCache = uni.getStorageSync('tabBadgeCache');
			this.tabClickCache[this.sideCurrentIndex] = true;
			console.log("sideCurrentIndex", this.sideCurrentIndex)
		},


		methods: {
			// tabs通知swiper切换
			// tabsChange(index) {
			// 	this.sideCurrentIndex = index;
			// 	uni.setStorageSync('sideCurrentIndex', this.sideCurrentIndex);
			// },
			// swiper滑动中
			swiperTransition(e) {
				// this.$refs.tabs.setDx(e.detail.dx);
			},
			// swiper滑动结束
			swiperAnimationfinish(e) {
				console.log("e", e)
				this.current = e.detail.current;
				this.sideCurrentIndex = this.current;
				// this.$refs.tabs.unlockDx();
			},
			// 如果要通知当前展示的z-paging刷新，请调用此方法
			reloadCurrentList() {
				this.$refs.listItem[this.current].reload();
			},

			virtualTopHeightChange(topHeight) {
				this.topHeight = topHeight;
			},

			numberComputed(val, index, item) {
				console.log("创建缓存列表", this.cacheMap, this.sideCurrentIndex)
				this.cacheMap[this.sideCurrentIndex][item.id] = item.nums
				let goodsNum = 0;
				for (let v of Object.values(this.cacheMap[this.sideCurrentIndex])) {
					goodsNum += v
				}
				console.log("当前tab下数量", goodsNum)
				this.$set(this.tabBadgeCache, this.sideCurrentIndex, goodsNum);
				console.log("缓存", this.cacheMap)
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
				console.log("handleSideAction==>", item, index)

				this.handleSideClick = true
				this.sideCurrentIndex = index
				console.log("item==>", item)
				this.tabName = item.name
				uni.setStorageSync('defaultTabName', item.name);
				uni.setStorageSync('sideCurrentIndex', this.sideCurrentIndex);
				if (this.tabClickCache[index] == false) {
					console.log("刷新列表")
					this.reloadCurrentList()
					this.tabClickCache[index] = true;
				}

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