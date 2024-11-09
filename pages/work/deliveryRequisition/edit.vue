<template>
	<view>
		<ch-picker ref="ChPicker" position="bottom" :columns="columns" :defaultIndex="curIndexs" @confirm="clickChange">
		</ch-picker>
		<uni-card>
			<uni-forms ref="form" border v-model="baseData">
				<uni-forms-item label="订货模式" label-width="auto" class="item">
					<uni-list-item showArrow  clickable  :border="false" right-text="模板订货"/>
					<!-- <uni-data-checkbox v-model="baseData.orderModel" :localdata="orderModelList" @change="change" style="text-align: right;"></uni-data-checkbox> -->
				</uni-forms-item>
				<uni-forms-item label="申请模板"   label-width="auto" class="item" v-show="showApplicationTemplate">
					<uni-list-item showArrow  clickable  @tap="pickerShow('申请模板')" :border="false" :right-text="baseData.applicationTemplate.templateName"/>
				</uni-forms-item>
				<uni-forms-item label="预计到货时间" label-width="auto" class="item">
						<uni-datetime-picker type="date"  :border="false" v-model="baseData.applicationTemplate.arrivalDate"/>	
				</uni-forms-item>
		<!-- 		<uni-forms-item label="订货仓库" label-width="auto" class="item">
					<uni-list-item showArrow  clickable  @tap="pickerShow('订货仓库')" :border="false" :right-text="baseData.orderWarehouse"/>
				</uni-forms-item>
				<uni-forms-item label="配送中心" label-width="auto" class="item">
						<uni-list-item showArrow  clickable  @tap="pickerShow('配送中心')" :border="false" :right-text="baseData.distributionCenter"/>
				</uni-forms-item> -->
				<uni-forms-item label="经办人" label-width="auto" class="item">
					<!-- <uni-list-item showArrow  clickable  @tap="pickerShow('经办人')" :border="false" :right-text="baseData.applicationTemplate.agent"/> -->
						<uni-list-item showArrow  clickable  :border="false" :right-text="baseData.applicationTemplate.agent"/>
				</uni-forms-item>
	<!-- 			<uni-forms-item label="配送方式名称" label-width="auto" class="item">
					<uni-list-item showArrow  clickable  @tap="pickerShow('配送方式名称')" :border="false" :right-text="baseData.deliveryMethodName"/>
				</uni-forms-item>
				<uni-forms-item label="联系地址" label-width="80px" class="item">
					<uni-easyinput :inputBorder="false" class="list-item-input" v-model="baseData.address" placeholder="请输入联系地址" ></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="联系人" label-width="80px" class="item">
					<uni-easyinput :inputBorder="false" class="list-item-input" v-model="baseData.contactPerson" placeholder="请输入联系人"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="联系电话" label-width="80px" class="item">
					<uni-easyinput :inputBorder="false" class="list-item-input" v-model="baseData.phone" placeholder="请输入联系电话"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="单据图片" label-width="auto" class="item"></uni-forms-item> -->
				<uni-forms-item label="备注" label-width="auto" class="item-remark">
					<uni-easyinput type="textarea"  v-model="baseData.remark" placeholder="请输入内容"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
		</uni-card>

		<button @click="gotoCartShop">添加/查看货品</button>
	</view>
</template>

<script>
	import { getDeliveryApplicationTemplateInformationByUserOrg, getOrderWarehouseByUserOrg, 
	getDistributionCenterByUserOrg, getAgentByUserOrg, getDeliveryMethodNameByUserOrg } from '@/api/system/user.js'
	import { queryTemplate } from '@/api/system/bill.js'
		import { getMaterialTabs,getMaterialTabsByGroupId } from '@/api/system/material.js'
	export default {
		data() {
			return {
				curPick: "",
				showApplicationTemplate:true,
				tempApplicationTemplate:"",
				columnIdIndexCache:{},
				applicationTemplateList: [],
				baseData:{
					// 申请模板
					applicationTemplate: {
						templateName: "",
						arrivalDate: "",
						agent: ""
					},
					orderModel: 0,
					// 预计到货时间
					estimatedTimeOfArrival: "",
					// 订货仓库
					orderWarehouse:"",
					// 配送中心
					distributionCenter:"",
					// 经办人
					agent:"",
					// 配送方式名称
					deliveryMethodName:"",
					// 联系地址
					address:"",
					// 联系人
					contactPerson:"",
					phone:"",
					remark:""
				},
				orderModelList: [{
					text: '模板订货',
					value: 0
				}],
				columns: [],
				curIndexs: [0]
			}
		},
		onShow() {
		
			queryTemplate().then(response => {
				var list = response.result;
				console.log("list", list)
				if(list.length != 0 ){
					this.initApplication(list[0])
				}else{
					this.$modal.msg("无匹配的模板")
				}
				console.log("this.baseData", this.baseData)
				// this.columns[0] = list.map(item => {
				// 	return {
				// 			label: item.name,
				// 			value: item.number
				// 	}
				// });
			
			})	
		},
		methods: {
			    initApplication(item){
					this.baseData.applicationTemplate.templateName = item.name;
					this.baseData.applicationTemplate.arrivalDate = item.arrivalDate;
					this.baseData.applicationTemplate.agent = item.auditor;
					uni.setStorageSync("applicationTemplate", item)
				},
				getData() {
						
						// getMaterialTabsByGroupId(0).then(res=>{
						// 		let parentColums = res.result
						// 		uni.setStorageSync('parentColums', columns);
						// })
								uni.showLoading({
								  title: '正在加载购物车', // 提示信息
								  mask: true // 显示透明蒙层防止触摸穿透
								});
							getMaterialTabs().then(res => {
								console.log("edit queryTabsList", res)
								let columns = res.result
								let lineColumns = []
								for (var i = 0; i < columns.length; i++) {
									let item = columns[i];
									if(item.children != undefined){
										lineColumns.push(item)
										lineColumns.push(...item.children);
									}else{
										lineColumns.push(item)
									}
									
								}
								
								// lineColumns.sort(function(a, b) {
								//   return a.seq - b.seq;
								// });
								
								// console.log("lineColumns", lineColumns)
								// console.log("treeColumns", columns)
								// this.$store.commit("SET_TAB_LIST", this.columns)
								 // this.$store.dispatch('SetTabList',this.columns)
								uni.setStorageSync('treeColumns', columns);
								uni.setStorageSync('columns', lineColumns);
								uni.setStorageSync('defaultTabName', columns[0].name);
								
								uni.setStorageSync("applyListData", this.baseData)
								
								// console.log("edit this.columns", columns)
								for (var i = 0; i < lineColumns.length; i++) {
									this.columnIdIndexCache[lineColumns[i].id] = i;
								}
								uni.setStorageSync("columnIdIndexCache", this.columnIdIndexCache)
								// console.log("edit this.columnIdIndexCache", this.columnIdIndexCache)
								
								this.$store.dispatch('SetColumnIdIndexCacheMap', this.columnIdIndexCache)
								
								uni.hideLoading()
								this.$tab.navigateTo('/pages/work/itemAddition/index')
							}).catch(res => {
								console.log(" edit queryTabsList", res)
								uni.hideLoading()
							})
						},
			change(e){
				console.log("e",e)
				if(e.detail.data.value == 1){
					this.tempApplicationTemplate = this.baseData.applicationTemplate;
					this.baseData.applicationTemplate = "";
					this.showApplicationTemplate = false;
				}
				if(e.detail.data.value == 0){
					this.baseData.applicationTemplate = this.tempApplicationTemplate;
					this.showApplicationTemplate = true;
				}
			},
			gotoCartShop(){
				this.getData()
				
			},
			    openDateTimePicker() {
			      this.$refs.datetimePicker.show(); // 调用uni-datetime-picker的show方法
			    },
		toggle() {
				this.$refs.popup.open()
			},
			pickerShow(flag) {
				console.log("flag",flag)
				this.curPick = flag;
				if(flag == '申请模板'){
				queryTemplate().then(response => {
					var result = response.result;
					if(result.length  == 0){
						this.$modal.msg("无匹配的模板")
					}else{
						this.columns[0] = result.map(item => {
								return {
									label: item.name,
									value: item
								}
							});
						this.$refs.ChPicker.show()
					}
				
				})	
					
				}
				if(flag == '订货仓库'){
					getOrderWarehouseByUserOrg().then(response => {
						var result = response.result;
						this.columns[0] = result.map(item => {
							return {
								label: item.name,
								value: item.number
							}
						});
						this.$refs.ChPicker.show()
					})
				}
				if(flag == '配送中心'){
					getDistributionCenterByUserOrg().then(response => {
						var result = response.result;
						this.columns[0] = result.map(item => {
							return {
								label: item.templateName,
								value: item.templateNumber
							}
						});
						this.$refs.ChPicker.show()
					})
				}
				if(flag == '经办人'){
					getAgentByUserOrg().then(response => {
						var result = response.result;
						this.columns[0] = result.map(item => {
							return {
								label: item.templateName,
								value: item.templateNumber
							}
						});
						this.$refs.ChPicker.show()
					})
				}
				if(flag == '配送方式名称'){
					getDeliveryMethodNameByUserOrg().then(response => {
						var result = response.result;
						this.columns[0] = result.map(item => {
							return {
								label: item.templateName,
								value: item.templateNumber
							}
						});
						this.$refs.ChPicker.show()
					})
				}
				
			},
			// pickerChange(e) {
			// 	// console.log(e);
			// 	this.curIndexs = e.indexs
			// },
			clickChange(e){
				console.log("clickChange",e);
				var flag = this.curPick;
				if(flag == '申请模板'){
					// this.baseData.applicationTemplate = e.columns[0].label;
					// this.tempApplicationTemplate = this.baseData.applicationTemplate;
						this.initApplication(e.columns[0].value)
				}
				if(flag == '订货仓库'){
				    this.baseData.orderWarehouse = e.columns[0].label;
				}
				if(flag == '配送中心'){
					this.baseData.distributionCenter = e.columns[0].label;
				}
				if(flag == '经办人'){
					this.baseData.agent = e.columns[0].label;
				}
				if(flag == '配送方式名称'){
					this.baseData.deliveryMethodName = e.columns[0].label;
				}
			}
		}
	}
</script>

<style>
	
/* 设置uni-list-item中uni-easyinput的高度 */
.list-item-input >>> .uni-easyinput__content {
  height: 100%; /* 根据uni-list-item的高度调整 */
  border: none; /* 去除边框 */
}

/* 或者使用/deep/选择器，具体取决于你使用的Vue版本 */
.list-item-input /deep/ .uni-easyinput__content {
  height: 100%;
  border: none;
}
	.item {
		display: flex;
		/* 使用flexbox布局 */
		align-items: center;
		/* 垂直居中 */
		width: 100%;
		/* 设置宽度 */
		margin-bottom: 0px;
		height: 80rpx;
	}
	.item-remark {
		display: flex;
		/* 使用flexbox布局 */
		align-items: center;
		/* 垂直居中 */
		width: 100%;
		/* 设置宽度 */
		margin-bottom: 0px;
		height: 200rpx;
	}
</style>