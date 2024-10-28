<template>
	<view>
		<ch-picker ref="ChPicker" position="bottom" :columns="columns" :defaultIndex="curIndexs" @confirm="clickChange">
		</ch-picker>
		<uni-card>
			<uni-forms ref="form" border v-model="baseData">
				<uni-forms-item label="订货模式" label-width="auto" class="item">
					<uni-data-checkbox v-model="baseData.orderModel" :localdata="orderModelList" @change="change"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="申请模板"   label-width="auto" class="item" v-show="showApplicationTemplate">
					<uni-list-item showArrow  clickable  @tap="pickerShow('申请模板')" :border="false" :right-text="baseData.applicationTemplate"/>
				</uni-forms-item>
				<uni-forms-item label="预计到货时间" label-width="auto" class="item">
						<uni-datetime-picker type="date"  :border="false" v-model="baseData.estimatedTimeOfArrival"/>	
				</uni-forms-item>
				<uni-forms-item label="订货仓库" label-width="auto" class="item">
					<uni-list-item showArrow  clickable  @tap="pickerShow('订货仓库')" :border="false" :right-text="baseData.orderWarehouse"/>
				</uni-forms-item>
				<uni-forms-item label="配送中心" label-width="auto" class="item">
						<uni-list-item showArrow  clickable  @tap="pickerShow('配送中心')" :border="false" :right-text="baseData.distributionCenter"/>
				</uni-forms-item>
				<uni-forms-item label="经办人" label-width="auto" class="item">
					<uni-list-item showArrow  clickable  @tap="pickerShow('经办人')" :border="false" :right-text="baseData.agent"/>
				</uni-forms-item>
				<uni-forms-item label="配送方式名称" label-width="auto" class="item">
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
				<uni-forms-item label="单据图片" label-width="auto" class="item"></uni-forms-item>
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
	export default {
		data() {
			return {
				curPick: "",
				showApplicationTemplate:true,
				tempApplicationTemplate:"",
				baseData:{
					// 申请模板
					applicationTemplate: "",
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
				}, {
					text: '自定义订货',
					value: 1
				}],
				columns: [],
				curIndexs: [0]
			}
		},
		methods: {
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
				this.$tab.navigateTo('/pages/common/shop-cart/index')
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
					getDeliveryApplicationTemplateInformationByUserOrg().then(response => {
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
				if(flag == '订货仓库'){
					getOrderWarehouseByUserOrg().then(response => {
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
				console.log(e);
				var flag = this.curPick;
				if(flag == '申请模板'){
					this.baseData.applicationTemplate = e.columns[0].label;
					this.tempApplicationTemplate = this.baseData.applicationTemplate;
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
		height: 70rpx;
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