<template>
	<view>

		<!-- 如果页面中的cell高度是固定不变的，则不需要设置cell-height-mode，如果页面中高度是动态改变的，则设置cell-height-mode="dynamic" -->
		<z-paging ref="paging" use-virtual-list :cell-height-mode="tabIndex===0?'fixed':'dynamic'" @query="queryList"
			@virtualTopHeightChange="virtualTopHeightChange" show-refresher-update-time>
			<template #top>
				<view class="header">列表总数据量：{{total}}条</view>
				<z-tabs :list="tabList" @change="tabChange" />
			</template>
			<template #cell="{item,index}">
				<view class="item">
					<view v-show="tabIndex==1||tabIndex==2" style="margin-left: 20rpx;">
						<radio class="radio" @click="radioClick(item)" :checked="radioCache[item.billNumber]"
							:value="item.billNumber"></radio>
					</view>
					<view class="item-content" @click="itemClick(item,index)">
						<cardv2 :baseFormData="item"></cardv2>
					</view>
					<view class="item-line"></view>
				</view>

			</template>
			<uni-fab ref="fab" :horizontal="horizontal" :vertical="vertical" @fabClick="fabClick" style="bottom: 100px;" />
			<!-- 		<template #bottom>
				<uni-row class="demo-uni-row">
					<uni-col :span="12" v-show="false">
						<view class="demo-uni-col light">
							<button type="default">废弃</button>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="demo-uni-col light">
							<button type="default">合并</button>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="demo-uni-col light">
							<button type="primary">审核</button>
						</view>
					</uni-col>
				</uni-row>
			</template> -->
		</z-paging>

		<!-- 普通弹窗 -->
		<uni-popup ref="popup" background-color="#fff" border-radius="10px 10px 0 0" type="bottom" :showClose="true"
			title="我的标题">
			<uni-section class="mb-10" title="筛选" type="line">
				<template v-slot:right>
					<uni-icons type="closeempty" size="20" @click="closePopup()"></uni-icons>
				</template>
			</uni-section>
			<uni-forms>
				<view class="popup-content">
					<uni-forms-item label="仓库" name="name">
						<uni-data-select :localdata="ckdemo" :clear="ckclear"></uni-data-select>
					</uni-forms-item>
				</view>
				<view class="popup-content">
					<uni-forms-item label="货品" name="age">
						<uni-easyinput type="text" placeholder="货品名称/首字母/编码" />
					</uni-forms-item>
				</view>

				<view class="popup-content">
					<uni-forms-item label="单号" name="age">
						<uni-easyinput type="text" placeholder="请输入单号" />
					</uni-forms-item>
				</view>
			</uni-forms>
			<uni-row class="demo-uni-row">
				<uni-col :span="12">
					<view class="demo-uni-col light">
						<button type="default">重置</button>
					</view>
				</uni-col>
				<uni-col :span="12">
					<view class="demo-uni-col light">
						<button type="primary">查询</button>
					</view>
				</uni-col>
			</uni-row>


		</uni-popup>
	</view>
</template>

<script>
	import cardv2 from '../../common/cardv2/index.vue'
	import {
		getApplyGood
	} from '@/api/system/bill.js'

	export default {
		components: {
			// 注册组件
			'cardv2': cardv2
		},
		data() {
			return {
				// , '已分单', '已汇总', '状态1', '状态2', '状态3'
				tabList: ['全部', '暂存', '已提交'],
				tabIndex: 0,
				total: 0,
				topHeight: 0,
				content: [{
						// iconPath: '/static/add.png',
						// selectedIconPath: '/static/add.png',
						text: '添加',
						active: false
					},
					{
						// iconPath: '/static/add.png',
						// selectedIconPath: '/static/add.png',
						text: '提交',
						active: false
					},
					{
						// iconPath: '/static/add.png',
						// selectedIconPath: '/static/add.png',
						text: '审核',
						active: false
					},
					{
						// iconPath: '/static/add.png',
						// selectedIconPath: '/static/add.png',
						text: '反审核',
						active: false
					}
				],
				testCardV1Data: {
					billNumber: 'DH11122233',
					extra: "货品订货-特殊请购\n\r (7:00-22:00)",
					arrivalDate: "10/16",
					arrivalTime: "0:00",
					agent: '18888888888',
					distributionCenter: '配送中心',
					orderWarehouse: "山爸爸德清店",
					status: "已处理"
				},
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				ckclear: false,
				radioCache: {},
				direction: 'horizontal',
				ckdemo: [{
						value: 0,
						text: "仓库1"
					},
					{
						value: 1,
						text: "仓库2"
					},
					{
						value: 2,
						text: "仓库3"
					},
				],

			}
		},
		onShow() {

		},
		methods: {
			trigger(e) {
				console.log(e)
				this.content[e.index].active = !e.item.active
				let _this = this;
				if (e.index == 0) {
					uni.showModal({
						title: '提示',
						content: `确认前往制单`,
						success: function(res) {
							if (res.confirm) {
								if (_this.$refs.fab.isShow) {
									_this.$refs.fab.close()
								}
								_this.$tab.navigateTo('/pages/work/deliveryRequisition/edit')
								console.log('用户点击确定')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
			},
			radioClick(item) {
				if (this.radioCache[item.billNumber] == null) {
					this.$set(this.radioCache, item.billNumber, true);
				} else {
					this.$set(this.radioCache, item.billNumber, !this.radioCache[item.billNumber]);
					this.$delete(this.radioCache, item.billNumber);
				}
				console.log("radioCache", item, this.radioCache)
			},
			toggle(type) {
				this.type = type
				this.title = "sadasd"
				this.showClose = true
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			onNavigationBarButtonTap(e) {
				console.log('测试', e)
				if (e.index == 0) {
					uni.showToast({
						title: '点击了高级查询按钮',
						icon: 'none'
					})
					this.toggle('bottom');
				}
			},
			fabClick() {
				uni.showToast({
					title: '点击了悬浮按钮',
					icon: 'none'
				})
				this.$tab.navigateTo('/pages/work/deliveryRequisition/edit')
			},
			buildFabMenu(tabIndex){
				if(tabIndex == 1){
						return [{
											// iconPath: '/static/add.png',
											// selectedIconPath: '/static/add.png',
											text: '添加',
											active: false
										},
										{
											// iconPath: '/static/add.png',
											// selectedIconPath: '/static/add.png',
											text: '提交',
											active: false
										}
									]
				}
				if(tabIndex == 2){
						return [{
											// iconPath: '/static/add.png',
											// selectedIconPath: '/static/add.png',
											text: '添加',
											active: false
										},
											{
											// iconPath: '/static/add.png',
											// selectedIconPath: '/static/add.png',
											text: '审核',
											active: false
										}
									];
				}
				if(tabIndex == 3){
						return [{
											// iconPath: '/static/add.png',
											// selectedIconPath: '/static/add.png',
											text: '添加',
											active: false
										},
											{
											// iconPath: '/static/add.png',
											// selectedIconPath: '/static/add.png',
											text: '反审核',
											active: false
										}
									];
				}
			},
			tabChange(index) {
				this.tabIndex = index;
				if(this.tabIndex == 1){
					this.content = this.buildFabMenu(this.tabIndex)
				}
				// 当切换tab或搜索时请调用组件的reload方法，请勿直接调用：queryList方法！！
				this.$refs.paging.reload();
			},
			virtualTopHeightChange(topHeight) {
				this.topHeight = topHeight;
			},
			queryList(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
				const params = {
					pageNo: pageNo,
					pageSize: pageSize,
					random: this.tabIndex === 1
				}

				getApplyGood(this.tabList[this.tabIndex], pageNo, pageSize).then(res => {
					let list = res.result.data;
					this.total = res.result.total;
					console.log("list", res)
					this.$refs.paging.complete(list);
				}).catch(res => {
					// 如果请求失败写this.$refs.paging.complete(false);
					// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					console.log("res", res)
					this.$refs.paging.complete(false);
				})

				// this.$request2.queryListLong(params).then(res => {
				// 	// 将请求的结果数组传递给z-paging
				// 	this.$refs.paging.complete(res.data.list);
				// }).catch(res => {
				// 	// 如果请求失败写this.$refs.paging.complete(false);
				// 	// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
				// 	// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
				// 	this.$refs.paging.complete(false);
				// })
			},
			itemClick(item, index) {
				console.log('点击了', item);
				this.$tab.navigateTo('/pages/work/deliveryRequisition/billInfo?billNumber=' + item.billNumber)
			},
		}
	}
</script>

<style scoped>
	/* 	/deep/.uni-fab__circle {
		margin-bottom: 10%;
	} */

	.item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* padding: 2rpx 3rpx; */
	}

	.item-content {
		flex: 1;
		/* margin-left: 3rpx; */
	}

	.header {
		background-color: steelblue;
		font-size: 24rpx;
		text-align: center;
		padding: 20rpx 0rpx;
		color: white;
	}

	.item-image {
		height: 150rpx;
		width: 150rpx;
		background-color: #eeeeee;
		border-radius: 10rpx;
	}

	.item-title {
		background-color: red;
		color: white;
		font-size: 26rpx;
		border-radius: 5rpx;
		padding: 5rpx 10rpx;
	}

	.item-detail {
		margin-top: 10rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #aaaaaa;
		word-break: break-all;
	}

	.item-line {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		height: 1px;
		width: 100%;
		background-color: #eeeeee;
	}


	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-title {
		font-size: 18px;
		color: #fff;
		background-color: #007aff;
		padding: 10px;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.demo-uni-row {
		margin-top: 10px;
		margin-bottom: 10px;
	}


	.demo-uni-col {
		height: 36px;
		border-radius: 4px;
	}

	.bottom-row {
		position: fixed;
		bottom: 0;
		/* 距离底部5%的视口高度 */
		left: 0;
		right: 0;
	}
</style>