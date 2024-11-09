<template>
	<view class="page fade" animation="slide-in-right">
		<view class="content">

			<!-- 		<uni-row v-for="(item, index) in materialInfo.entry" :key="index">
				<cardv3 :baseFormData="item"></cardv3>
			</uni-row> -->
			<z-paging ref="materialPaging" use-inner-list @query="setList" v-model="dataList">
				<template #top>
					<uni-card :is-shadow="false" :title="billNumber">
						<uni-row class="demo-uni-row">
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left; ">申请模板:</text>
								</view>
								<text class="text" style="text-align: left; color: black;font-weight: bold;">111</text>
							</uni-col>
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left;">到货时间:</text>
								</view>
								<text class="text"
									style="text-align: left; color: black;font-weight: bold;">{{materialInfo.arrivalDate | formatDate}}</text>
							</uni-col>
						</uni-row>

						<uni-row class="demo-uni-row">
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left; ">订货组织:</text>
								</view>
								<text class="text"
									style="text-align: left; color: black;font-weight: bold;">{{materialInfo.orderOrg}}</text>
							</uni-col>
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left;">配送组织:</text>
								</view>
								<text class="text"
									style="text-align: left; color: black;font-weight: bold;">{{materialInfo.distributionOrg}}</text>
							</uni-col>
						</uni-row>

						<uni-row class="demo-uni-row">
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left; ">经办人:</text>
								</view>
								<text class="text"
									style="text-align: left; color: black;font-weight: bold;">{{materialInfo.agent}}</text>
							</uni-col>
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left;">原因备注:</text>
								</view>
								<text class="text" style="text-align: left; color: black;font-weight: bold;">222</text>
							</uni-col>
						</uni-row>

						<uni-row class="demo-uni-row">
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left; ">制单人:</text>
								</view>
								<text class="text"
									style="text-align: left; color: black;font-weight: bold;">{{materialInfo.creator}}</text>
							</uni-col>
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left;">制单日期:</text>
								</view>
								<text class="text"
									style="text-align: left; color: black;font-weight: bold;">{{materialInfo.createDate | formatDate}}</text>
							</uni-col>
						</uni-row>

						<uni-row class="demo-uni-row">
							<uni-col :span="12">
								<view class=" light">
									<text class="text" style="text-align: left; ">备注:</text>
								</view>
								<text class="text" style="text-align: left; color: black;font-weight: bold;">{{materialInfo.note}}</text>
							</uni-col>

						</uni-row>

						<fabv1 @onTap="onTap"></fabv1>
						<uni-badge class="audited-badge" text="已提交"
							v-show="formatBillStatus(materialInfo.status) == '已提交'" />
						<uni-badge class="unaudited-badge" text="暂存"
							v-show="formatBillStatus(materialInfo.status) == '暂存'" />
					</uni-card>


					<uni-row>
						<uni-col :span="12" style="text-align: left;">
							<view style="margin-left: 10%;">
								共<text class="text" v-text="'  '+ dataList.length+'  '" style="color: skyblue;"
									width="50rpx"></text>条数据
							</view>
						</uni-col>
						<uni-col :span="12" style="text-align: right;">
							<view style="margin-right: 10%;">
								<text class="text" style="color: skyblue;" @click="gotoFilter()">筛选</text>
							</view>
						</uni-col>
					</uni-row>

					<uni-row>
						<uni-col :span="12" style="text-align: center;">
							<view>
								<text class="text">货物总重量:0(KG)</text>
							</view>
						</uni-col>
						<uni-col :span="12" style="text-align: center; ">
							<text class="text">货物总体积:0(m)</text>
						</uni-col>
					</uni-row>

				</template>
				<template #cell="{item,index}">
					<cardv3 :baseFormData="item"></cardv3>
				</template>
			</z-paging>
		</view>
	</view>
</template>

<script>
	import cardv3 from '../../common/cardv3/index.vue'
	import fabV1 from "@/pages/common/fabv1/index.vue"
	import {
		queryApplyGood,	unAuditApplyGoodBill,
		auditApplyGoodBill
	} from '@/api/system/bill.js'
	import {
		formatBillStatus,showConfirm,toast
	} from '@/utils/common.js'

	
	export default {
		components: {
			// 注册组件
			'cardv3': cardv3,
			'fabv1': fabV1
		},
		data() {
			return {
				billNumber: '',
				materialListSize: 0,
				materialInfo: {
					createDate: ""
				},
				dataList: [],
				materialList: [{
						orderWarehouse: "测试1",
						remark: "备注1",
						number: 100,
						unit: "个"
					},
					{
						orderWarehouse: "测试2",
						remark: "备注2",
						number: 300,
						unit: "只"
					},
					{
						orderWarehouse: "测试3",
						remark: "备注3",
						number: 200,
						unit: "捆"
					},
					{
						orderWarehouse: "测试3",
						remark: "备注3",
						number: 200,
						unit: "捆"
					},
					{
						orderWarehouse: "测试3",
						remark: "备注3",
						number: 200,
						unit: "捆"
					}
				],

				x: 0,
				y: 0,
				x1: 0,
				x2: 0,
				y1: 0,
				y2: 0,
				move: {
					x: 0,
					y: 0
				}
			}
		},
		onUnload() {
			uni.$off('refreshBillEntryInfo');
		},
		onLoad(query) {

			uni.$on('refreshBillEntryInfo', (data) => {
				this.filterList(data.name);
			});

			// 获取传递的参数
			this.billNumber = this.$route.query.billNumber;


		},
		onShow() {

		},
		created() {
			this.queryBill();

		},
		methods: {
			formatBillStatus,
			onTap(e) {
				console.log("onTap", e)
				console.log("this.materialInfo", this.materialInfo)
		
				if (formatBillStatus(this.materialInfo.status) == '已提交') {
					showConfirm('是否撤销该单据').then(res => {
						if (res.confirm) {
							unAuditApplyGoodBill([this.billNumber]).then(res => {
								this.queryBill();
								toast("撤销成功")
							});
						}
					})
				
				}
				if (formatBillStatus(this.materialInfo.status) == '暂存') {
					showConfirm('是否提交该单据').then(res => {
						if (res.confirm) {
							auditApplyGoodBill([this.billNumber]).then(res => {
								this.queryBill();
									toast("提交成功")
							});
						}
					})
			
				}
			},
			queryBill() {
				queryApplyGood(this.billNumber).then(res => {
					this.materialInfo = res.result;
					this.materialListSize = this.materialInfo.entry.length

					console.log(this.billNumber, res);
					this.$nextTick(() => {
						this.setList()
					})
				})
			},
			filterList(keyWord) {
				this.$refs.materialPaging.complete(this.materialInfo.entry.filter(item => item.materialName.includes(
					keyWord)));
			},
			setList() {
				this.$refs.materialPaging.complete(this.materialInfo.entry)
			},
			gotoFilter() {
				this.$tab.navigateTo('/pages/work/deliveryRequisition/filter')

			}
		}
	}
</script>

<style lang="scss">
	.audited-badge {
		position: absolute;
		top: 10px;
		/* 根据需要调整 */
		right: 10px;
		/* 根据需要调整 */
		transform: rotate(45deg);
		white-space: nowrap;
		padding: 5px 10px;
		background-color: #4CAF50;
		/* 绿色背景，可根据需要调整 */
		color: white;
		text-align: center;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.unaudited-badge {
		position: absolute;
		top: 10px;
		/* 根据需要调整 */
		right: 10px;
		/* 根据需要调整 */
		transform: rotate(45deg);
		white-space: nowrap;
		padding: 5px 10px;
		background-color: blue;
		/* 绿色背景，可根据需要调整 */
		color: white;
		text-align: center;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
</style>