<template>
	<view>

		<!-- 如果页面中的cell高度是固定不变的，则不需要设置cell-height-mode，如果页面中高度是动态改变的，则设置cell-height-mode="dynamic" -->
		<z-paging ref="paging" use-virtual-list :cell-height-mode="tabIndex===0?'fixed':'dynamic'" @query="queryList"
			@virtualTopHeightChange="virtualTopHeightChange" show-refresher-update-time style="background-color: #F7F7F7;" 
			show-loading-more-when-reload>
			<template #top>
				<view class="header">列表总数据量：{{total}}条</view>
				<z-tabs :list="tabList" @change="tabChange"  :current="tabIndex"/>
			</template>
			<template #cell="{item,index}">
				<!-- 'animate__animated animate__backInLeft': cardMoveOutAnimationCache[item.billNumber], -->
				<!-- ,
				 'animate__animated  animate__slideInLeft': !cardMoveOutAnimationCache[item.billNumber] -->
				<view v-bind:class="{ 'item': true }" :id="item.id">
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
		
			
					<template #bottom>
				<uni-row class="demo-uni-row">
					<uni-col :span="24" v-show="tabIndex===1 && ( Object.keys(radioCache).length != 0)">
						<view class="demo-uni-col light">
							<button type="primary" @click="billOp('audit')">提交</button>
						</view>
					</uni-col>
					<uni-col :span="24" v-show="tabIndex===2 && (Object.keys(radioCache).length != 0)">
						<view class="demo-uni-col light">
							<button type="default" @click="billOp('unAudit')">撤销</button>
						</view>
					</uni-col>
				</uni-row>
			</template>
		</z-paging>
	<uni-fab ref="fab" class="custom-fab-add" :horizontal="horizontal" :vertical="vertical" @fabClick="fabClick"  />
	
		
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" background-color="#fff" border-radius="10px 10px 0 0" type="bottom" :showClose="true"
			title="我的标题">
			<uni-section class="mb-10" title="筛选" type="line">
				<template v-slot:right>
					<uni-icons type="closeempty" size="20" @click="closePopup()"></uni-icons>
				</template>
			</uni-section>
			<uni-forms>
	<!-- 			<view class="popup-content">
					<uni-forms-item label="仓库" name="name">
						<uni-data-select :localdata="ckdemo" :clear="ckclear"></uni-data-select>
					</uni-forms-item>
				</view> -->
				<view class="popup-content">
					<uni-forms-item label="货品" name="material">
						<uni-easyinput type="text" placeholder="货品名称/首字母/编码" v-model="billQueryObj.material" />
					</uni-forms-item>
				</view>

				<view class="popup-content">
					<uni-forms-item label="单号" name="billNumber">
						<uni-easyinput type="text" placeholder="请输入单号" v-model="billQueryObj.billNumber" />
					</uni-forms-item>
				</view>
			</uni-forms>
			<uni-row class="demo-uni-row">
				<uni-col :span="12">
					<view class="demo-uni-col light">
						<button type="default" @click="queryBtnClick(false)">重置</button>
					</view>
				</uni-col>
				<uni-col :span="12">
					<view class="demo-uni-col light">
						<button type="primary" @click="queryBtnClick(true)">查询</button>
					</view>
				</uni-col>
			</uni-row>


		</uni-popup>
	</view>
</template>

<script>
	import cardv2 from '@/pages/common/deliveryRequisition/cardv2/index.vue'
	import {
		getApplyGood,getApplyGoodByCondition,unAuditApplyGoodBill,auditApplyGoodBill
	} from '@/api/system/bill.js'
	import {
		showConfirm
	} from '@/utils/common.js'
	export default {
		components: {
			// 注册组件
			'cardv2': cardv2
		},
		data() {
			return {
				// , '已分单', '已汇总', '状态1', '状态2', '状态3'
				tabList: ['全部', '保存', '已提交'],
				cardMoveOutAnimationCache:{},
				billQueryObj: {
					material: "",
					billNumber:""
				},
				tabIndex: 0,
				total: 0,
				topHeight: 0,
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
			
			this.$nextTick(()=>{
				this.$refs.paging.refresh()
			})
		},
		onLoad(e) {
			uni.$on('selectTab', (tabIndex) => {
				console.log("selectTab",tabIndex)
				this.tabChange(tabIndex);
			});	
		},
		methods: {
			isOpenMoveAnimation(item){
				if(this.cardMoveOutAnimationCache[item.id] == undefined || this.cardMoveOutAnimationCache[item.id] == false){
					
				}
			},
			test(arr){
				console.log("virtualList.sync ", arr)
			},
			billOp(op){
				console.log("当前页面选中的单据", this.radioCache)
				if(this.radioCache == null || Object.keys(this.radioCache).length === 0){
					return;
				}
	
				const opMap = {
					"audit": ()=>{
						uni.showLoading({
						  title: '提交中，请稍后', // 提示信息
						  mask: true // 显示透明蒙层防止触摸穿透
						});
						let billNumberList = Object.keys(this.radioCache);
						
						// this.cardMoveOutAnimationCache[list[i].id]
						auditApplyGoodBill(billNumberList).then(res=>{
							// this.$modal.msgSuccess("提交成功")
							uni.hideLoading()
							showConfirm('单据提交成功：\n\r'+billNumberListStr);
							this.$refs.paging.refresh()
						
							// for (var i = 0; i < billNumberList.length; i++) {
							// 	this.cardMoveOutAnimationCache[billNumberList[i]] = true;
							// }
						}).catch(error=>{
							uni.hideLoading()
						});
						 this.radioCache = {};
					},
					"unAudit":()=>{
						uni.showLoading({
						  title: '撤销中，请稍后', // 提示信息
						  mask: true // 显示透明蒙层防止触摸穿透
						});
						let billNumberList = Object.keys(this.radioCache);
										
						unAuditApplyGoodBill(Object.keys(this.radioCache)).then(res=>{
							// this.$modal.msgSuccess("撤销成功")
							uni.hideLoading()
							showConfirm('单据撤销成功：\n\r'+billNumberListStr);
							this.$refs.paging.refresh()
							
						}).catch(error=>{
							uni.hideLoading()
						});
						 this.radioCache = {};
					}
				}
				
				let billNumberListStr = Object.keys(this.radioCache).join("\n\r");
				showConfirm('请确认是否'+(op == "audit"?"提交":"撤销")+"单据：\n\r"+billNumberListStr).then(res => {
					if (res.confirm) {
						opMap[op]();
					}
				})
				
			},
			queryBtnClick(isQuery){
				if(isQuery){
					let condition = ""
					
					if(this.billQueryObj.material == "" && this.billQueryObj.billNumber != ""){
						condition = "FBillNo like '%"+this.billQueryObj.billNumber +"%'";
					}
					if(this.billQueryObj.material != "" && this.billQueryObj.billNumber == ""){
								const reg = /^[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]+$/;
						console.log("this.isChinese(this.billQueryObj.material)", reg.test(this.billQueryObj.material), this.billQueryObj.material)
						
						if(reg.test(this.billQueryObj.material)){
							condition = "FMaterialName like '%"+this.billQueryObj.material+"%' ";
						}else{
							condition = "FMaterialId like '%"+this.billQueryObj.material+"%' ";
						}
					}
					// if(this.billQueryObj.material != "" && this.billQueryObj.billNumber != ""){
					// 	condition = "(FMaterialName like '%"+this.billQueryObj.material+"%' or FMaterialId '%"+this.billQueryObj.material+"%') and  (FBillNo like '%"+this.billQueryObj.billNumber +"%')";
					// }
					// 	TODO: 需要做sql联查分录
					
					
					getApplyGoodByCondition(condition,this.tabList[this.tabIndex], 1, 99999).then(res => {
						let list = res.result.data;
						this.total = res.result.total;
						console.log("list", res)
						this.$refs.paging.complete(list);
					}).catch(res => {
						console.log("res", res)
						this.$refs.paging.complete(false);
					})
					
						this.$refs.popup.close()
				}
				if(!isQuery){
					this.billQueryObj.material = "";
					this.billQueryObj.billNumber = "";
					
				}
			},
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
								_this.$tab.navigateTo('/pages/work/deliveryRequisition/add')
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
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			onNavigationBarButtonTap(e) {
				console.log('高级查询', e)
				if (e.index == 0) {
					this.toggle('bottom');
				}
			},
			fabClick() {
			
				this.$tab.navigateTo('/pages/work/deliveryRequisition/add')
			},
	
			tabChange(index) {
				this.tabIndex = index;
				if(this.tabIndex == 1){
					// this.content = this.buildFabMenu(this.tabIndex)
				}
				// 当切换tab或搜索时请调用组件的reload方法，请勿直接调用：queryList方法！！
			
				this.$nextTick(()=>{
						this.$refs.paging.reload();
						this.radioCache = {}
						this.cardMoveOutAnimationCache = {}
				})
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
					for (var i = 0; i < list.length; i++) {
						this.cardMoveOutAnimationCache[list[i].billNumber] = false;
					}
					this.$refs.paging.complete(list);
				}).catch(res => {
					console.log("res", res)
					this.$refs.paging.complete(false);
					
				})

			},
			itemClick(item, index) {
				console.log('点击了', item);
				this.$tab.navigateTo('/pages/work/deliveryRequisition/billInfo/index?billNumber=' + item.billNumber)
			},
		}
	}
</script>

<style scoped>




	
/* 		/deep/.uni-fab__circle {
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
		background-color: #1791FF;
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