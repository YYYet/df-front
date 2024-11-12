<template>
	<view class="side-b">
		<z-paging v-if="firstLoaded || isCurrentPage" ref="paging" v-model="dataList" @query="queryList" :fixed="false"
			:auto-show-system-loading="true" :system-loading-mask="true" show-refresher-update-time >
			<uni-card v-for="(item,index) in dataList" :key="index" @click="itemClick(item)">
				<MaterialInfo :item="item" :currentIndex="index" :needNumberSelector="true"
					@numberComputed="numberComputed"></MaterialInfo>
			</uni-card>
		</z-paging>
	</view>
</template>

<script>
	import {
		getMaterialByTab,
		getMaterialByTabV3,
		addOrUpDateShopV2
	} from '@/api/system/material.js'
	import MaterialInfo from "@/pages/common/deliveryRequisition/material-info/index.vue"
	export default {
		components: {
			'MaterialInfo': MaterialInfo
		},
		data() {
			return {
				dataList: [],
				firstLoaded: false,
				isCurrentPage: false
			}
		},
		props: {
			needNumberSelector: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			tabIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			currentIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			currentTab: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if (newVal === this.tabIndex) {
						// 懒加载，当滑动到当前的item时，才去加载
						if (!this.firstLoaded) {
							// 这里需要延迟渲染z-paging的原因是为了避免在一些平台上立即渲染可能引发的底层报错问题
							this.$nextTick(() => {
								setTimeout(() => {
									this.isCurrentPage = true;
								}, 100);
							})
						}
					}
				},
				immediate: true
			},
			dataList: {
				handler(newVal) {
					// console.log("dataList change", newVal)
					// console.log('watch开始处理左侧tab角标:', newVal);
					uni.$emit('watchDataList', newVal)
				},
				deep: true
			},
		},
		methods: {
			numberComputed(val, index, item) {
				item.nums = val
				item.seq = index
				item.currentTabIndex = this.currentIndex
				// this.$set(this.dataList, index, item);
				let tempNo = uni.getStorageSync("applicationTemplate").billNumber;
				let tempName = uni.getStorageSync("applicationTemplate").name;
				addOrUpDateShopV2(tempNo, item).then(res => {
					console.log("添加物品到购物车", res)
					this.$set(this.dataList, index, item);
				})
				console.log("购物车右侧列表中物料构造", val, index, item, this.dataList)
			},
			numberComputedOther(item) {
				// this.$set(this.dataList, item.seq, item);
			},
			numberComputedOtherBySearchPage(item) {
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].id == item.id) {
						this.$set(this.dataList, i, item);
					}
				}

			},
			// 接收父组件传过来的刷新列表要求
			reload() {
				this.$nextTick(() => {
					// 刷新列表数据(如果不希望列表pageNo被重置可以用refresh代替reload方法)
					console.log("reload")
					this.$refs.paging && this.$refs.paging.reload();
				})
			},
			refresh() {
				// 刷新列表数据(如果不希望列表pageNo被重置可以用refresh代替reload方法)
				console.log("refresh")
				this.$refs.paging && this.$refs.paging.refresh();
			},
			clearCache() {
				this.columns = [];
				this.cacheMap = {};
				this.$store.dispatch('ClearCacheMapByTabIndex', this.currentIndex)
			},
			queryList(pageNo, pageSize) {
					let applicationTemplate = uni.getStorageSync("applicationTemplate");
				console.log("pageNo", pageNo, "pageSize", pageSize, "currentIndex", this.currentIndex, "currentTab", this
					.currentTab, this.firstLoaded, applicationTemplate);
				
				getMaterialByTabV3(this.currentTab.id, applicationTemplate.billNumber, pageNo, pageSize).then(res => {
					console.log("queryMaterialListByTab", res)
					var list = res.result;
					this.$refs.paging.complete(list);
					this.firstLoaded = true;
				}).catch(res => {
					this.$refs.paging.complete(false);
				})
			},
			itemClick(item) {
				console.log('点击了', item.name);
			}
		}
	}
</script>

<style>
	/* 注意:父节点需要固定高度，z-paging的height:100%才会生效 */
	.content {
		height: 100%;
	}

	.side-b {
		flex: 1;
		height: 100%;
		background: white;
		padding-bottom: 20rpx;
		box-sizing: border-box;

	}

	.item {
		position: relative;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 30rpx;
		border-bottom: 1px solid #e5e5e5;
	}

	.item-detail {
		padding: 5rpx 15rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: white;
		background-color: #007AFF;
	}

	.item-line {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		height: 1px;
		width: 100%;
		background-color: #eeeeee;
	}

	.side_b_title {
		position: sticky;
		top: -2rpx;
		left: 0;
		z-index: 99;
		padding: 10rpx 24rpx;

		background: white;
	}


	.goods {
		font-size: 26rpx;

	}

	.country {
		font-size: 22rpx;
		color: #999999;
	}

	.goods-info {
		flex: 1;
	}

	.title {
		font-size: 26rpx;
		margin-bottom: 8rpx;
		font-weight: bold;
	}

	.num {
		color: #999999;
		font-size: 22rpx;
	}

	.description {
		font-size: 22rpx;
		color: #666666;
		margin-bottom: 16rpx;
	}

	.item {
		padding: 0 24rpx;
		display: flex;
		margin-bottom: 20rpx;


	}

	.img-box {
		width: 180rpx;
		height: 180rpx;
		margin-right: 22rpx;

		.img {
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
		}
	}

	.item-price {
		font-size: 32rpx;
	}

	.unit {
		color: #999999;
		font-size: 22rpx;
	}

	.price {
		display: flex;
		align-items: center;
		justify-content: space-between;


	}
</style>