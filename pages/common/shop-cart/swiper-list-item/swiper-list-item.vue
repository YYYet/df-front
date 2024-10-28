<template>
	<view class="side-b">
		<z-paging v-if="firstLoaded || isCurrentPage" ref="paging" v-model="dataList" @query="queryList" :fixed="false"
			:auto-show-system-loading="true" :system-loading-mask="true">

			<uni-card v-for="(item,index) in dataList" :key="index" @click="itemClick(item)">

				<uni-row class="demo-uni-row">
					<uni-col :span="24">
						<span style="font-weight: bold;">{{ item.goods }}</span>
						<span style="font-weight: bold;margin-left: 5rpx;">{{ item.model }}</span>
						<span style="font-weight: bold;color: red;margin-left: 5rpx;">{{ item.unit }}</span>

					</uni-col>



				</uni-row>
				<uni-row class="demo-uni-row">
					<uni-col :span="12">
						<view style="color: darkgray;font-size: 20rpx;">库存数量: {{ item.storageNums }}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row">
					<uni-col :span="12">
						<view style="color: darkgray;font-size: 20rpx;">在途入库: {{ item.storageInTransitNums }}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row" style="display: flex;">
					<uni-col :span="12">
					</uni-col>
					<uni-col :span="12" style="justify-content: flex-end;align-items: flex-end;">
						<uni-number-box :min="0" :value="item.nums"
							@change="(val)=>numberCalculationAction(val,index,item)"  style="margin-left: 20%;" :step="item.step"/>
					</uni-col>
				</uni-row>
				<!-- 			<view class="side_b_title bg-white">
				<view class="goods">{{ item.goods }}</view>
				<view class="country">{{item.id}}</view>
			</view>
			<image src="#" mode="" style="width: 35px;height: 35px;margin-top: 6px;"></image>
			<view class="goods-info">
				<view class="title">{{ item.title }}</view>
				<view class="description">{{ item.description }}</view>
				<view class="price">
					<view>
						<text class="item-price">￥{{ item.price }}</text>
						<text class="unit">/{{ item.unit }}</text>
					</view>
					<uni-number-box :min="0" :value="item.nums"
						@change="(val)=>numberCalculationAction(val,index,item)" />
				</view>
			</view> -->
			</uni-card>

			<!-- 			<view class="item" v-for="(item,index) in dataList" :key="index" @click="itemClick(item)">
				<view class="side_b_title bg-white">
					<view class="goods">{{ item.goods }}</view>
					<view class="country">{{item.id}}</view>
				</view>
				<image src="#" mode="" style="width: 35px;height: 35px;margin-top: 6px;"></image>
				<view class="goods-info">
					<view class="title">{{ item.title }}</view>
					<view class="description">{{ item.description }}</view>
					<view class="price">
						<view>
							<text class="item-price">￥{{ item.price }}</text>
							<text class="unit">/{{ item.unit }}</text>
						</view>
						<uni-number-box :min="0" :value="item.nums"
							@change="(val)=>numberCalculationAction(val,index,item)" />
					</view>
				</view>
			</view> -->

		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				// 当前组件是否已经加载过了
				firstLoaded: false,
				// 是否滚动到当前页
				isCurrentPage: false
			}
		},
		props: {
			// 当前组件的index，也就是当前组件是swiper中的第几个
			tabIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			// 当前swiper切换到第几个index
			currentIndex: {
				type: Number,
				default: function() {
					return 0
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
		},
		methods: {
			numberCalculationAction(val, index, item) {
				// this.selectCache[this.sideCurrentIndex][index] += val;
				item.nums = val
				this.$emit('numberComputed', val, index, item)

			},
			// 接收父组件传过来的刷新列表要求
			reload() {
				this.$nextTick(() => {
					// 刷新列表数据(如果不希望列表pageNo被重置可以用refresh代替reload方法)
					console.log("reload")
					this.$refs.paging && this.$refs.paging.reload();
				})
			},
			queryList(pageNo, pageSize) {
				this.$request2.queryMaterialListByTab({
					"tabName": "测试" + this.currentIndex
				}).then(res => {
					// 将请求的结果数组传递给z-paging
					console.log("queryMaterialListByTab", res, {
						"tabName": "测试" + this.currentIndex
					})
					var list = res.data.list;
					this.$refs.paging.complete(list);
					this.firstLoaded = true;
				}).catch(res => {
					// 如果请求失败写this.$refs.paging.complete(false);
					// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					this.$refs.paging.complete(false);
				})
			},
			itemClick(item) {
				console.log('点击了', item.title);
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