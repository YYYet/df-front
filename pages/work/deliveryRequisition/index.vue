<!-- 虚拟列表演示(内置列表写法)(vue) -->

<!-- 请注意1：内置列表写法在微信小程序中部分较高版本调试库会报More than one slot named "cell" are found...的警告并导致开发者工具卡顿，将基础库版本调到2.18.0以下即可。因线上没有控制台打印，因此不会影响线上版本。 -->
<!-- 在微信小程序中如果是vue2推荐使用虚拟列表兼容写法(virtual-list-compatibility-demo)，如果是vue3推荐使用虚拟列表非内置列表写法(virtual-list-no-inner-demo.vue) -->
<!-- 写法简单，通过slot=cell插入所需cell，页面中无直接的for循环，在vue2中兼容性良好 -->
<!-- 在各平台兼容性请查阅https://z-paging.zxlee.cn/module/virtual-list.html -->
<template>
	<view class="content">
		
		<!-- 如果页面中的cell高度是固定不变的，则不需要设置cell-height-mode，如果页面中高度是动态改变的，则设置cell-height-mode="dynamic" -->
		<z-paging ref="paging" use-virtual-list :cell-height-mode="tabIndex===0?'fixed':'dynamic'" @query="queryList" @virtualTopHeightChange="virtualTopHeightChange">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<template #top>
				<view class="header">列表总数据量：10万条</view>
				<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
				<z-tabs :list="tabList" @change="tabChange" />
			</template>
			<template #cell="{item,index}">
				<view class="item" @click="itemClick(item,index)">
					<view class="item-content">
					<cardv2 :baseFormData="item"></cardv2>
					</view>
			<!-- 		<image class="item-image" mode="aspectFit" src="@/static/logo.png"></image>
					<view class="item-content">
						<text class="item-title">第{{item.title}}行</text>
						<text style="color: red;margin-left: 10rpx;">虚拟列表展示</text>
						<view class="item-detail">{{item.detail}}</view>
					</view> -->
					<view class="item-line"></view>
				</view>
						<uni-fab ref="fab"  :horizontal="horizontal" :vertical="vertical"
							@fabClick="fabClick" />
			</template>
			
		</z-paging>
		
			<!-- 普通弹窗 -->
					<uni-popup ref="popup" background-color="#fff" border-radius="10px 10px 0 0" type="bottom" :showClose="true" title="我的标题">
				<uni-section class="mb-10" title="筛选" type="line">
				  <template v-slot:right>
					<uni-icons type="closeempty" size="20" @click="closePopup()"></uni-icons>
				  </template>
				</uni-section>
						<uni-forms >
							<view class="popup-content" >
								<uni-forms-item label="仓库" name="name" >
									<uni-data-select
									  :localdata="ckdemo"
									  :clear="ckclear"
									></uni-data-select>
								</uni-forms-item>
							</view>
							<view class="popup-content" >
								<uni-forms-item label="货品" name="age">
								<uni-easyinput type="text" placeholder="货品名称/首字母/编码" />
								</uni-forms-item>
							</view>
						
							<view class="popup-content" >
								<uni-forms-item label="单号" name="age" >
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
						
					
				<!-- 		<view class="popup-content" >
							<text class="text">popup 内容</text>
						</view>
						<view class="popup-content" >
							<text class="text">popup 内容</text>
						</view>
						<view class="popup-content" >
							<text class="text">popup 内容</text>
						</view> -->
					</uni-popup>
	</view>
</template>

<script>
	import cardv2 from '../../common/cardv2/index.vue'
	export default {
		 components: {
		    // 注册组件
		    'cardv2': cardv2
		  },
		data() {
			return {
				tabList: ['全部','待审核','已审核','已分单','已汇总','状态1','状态2','状态3'],
				tabIndex: 0,
				topHeight: 0,
				testCardV1Data:{billNumber:'DH11122233', extra:"货品订货-特殊请购\n\r (7:00-22:00)",arrivalDate:"10/16",arrivalTime:"0:00",agent:'18888888888',distributionCenter:'配送中心',orderWarehouse:"山爸爸德清店",
				status:"已处理"},
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				ckclear: false,
				direction: 'horizontal',
				  ckdemo: [
				          { value: 0, text: "仓库1" },
				          { value: 1, text: "仓库2" },
				          { value: 2, text: "仓库3" },
				        ],
			
			}	
		},
		methods: {
				toggle(type) {
							this.type = type
							this.title = "sadasd"
							this.showClose = true
							// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
						
							this.$refs.popup.open()
						},
			closePopup(){
					this.$refs.popup.close()
			},
			onNavigationBarButtonTap(e) {
			console.log('测试',e)
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
			tabChange(index) {
				this.tabIndex = index;
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
				this.$request2.queryListLong(params).then(res => {
					// 将请求的结果数组传递给z-paging
					this.$refs.paging.complete(res.data.list);
				}).catch(res => {
					// 如果请求失败写this.$refs.paging.complete(false);
					// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					this.$refs.paging.complete(false);
				})
			},
			itemClick(item, index) {
				console.log('点击了', item);
				 this.$tab.navigateTo('/pages/work/deliveryRequisition/billInfo?billNumber='+item.billNumber)
			},
		}
	}
</script>

<style scoped >

	
	.item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* padding: 2rpx 3rpx; */
	}
	
	.item-content{
		flex: 1;
		margin-left: 3rpx;
	}
	
	.header{
		background-color: red;
		font-size: 24rpx;
		text-align: center;
		padding: 20rpx 0rpx;
		color: white;
	}
	
	.item-image{
		height: 150rpx;
		width: 150rpx;
		background-color: #eeeeee;
		border-radius: 10rpx;
	}
	
	.item-title{
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
</style>
