<template>
	<view class="page fade" animation="slide-in-right">
		<view class="content">

			<!-- 		<uni-row v-for="(item, index) in materialInfo.entry" :key="index">
				<cardv3 :baseFormData="item"></cardv3>
			</uni-row> -->
			<z-paging ref="materialPaging" use-inner-list @query="setList" v-model="dataList">
				<template #top>
					<uni-card :is-shadow="false" :title="billNumber" :is-full="false" style="border-radius: 20rpx;">
						<template v-slot:title>
							<view style="margin-top: 20px;">
								<uni-row>
									<uni-col :span="12">
										<text v-text="billNumber"
											style="padding: 0px 10px;border-radius: 11px;font-weight: bold;"></text>
									</uni-col>
									<uni-col :span="12" align="right">
										<view class="tag-view" style="display: flex;">

											<uni-tag :text="billStatus(materialInfo.status)" type="success" style="background-color: #DEF3EE;color: #35B893;
										font-weight: bold;amargin-left:auto;" v-if="billStatus(materialInfo.status)=='已提交'" />

											<uni-tag :text="billStatus(materialInfo.status)" type="primary" style="background-color: #E5F3FE;color: #1591FF;
												font-weight: bold;margin-left:auto;" v-if="billStatus(materialInfo.status).startsWith('暂')" />
										</view>
									</uni-col>

								</uni-row>

							</view>

						</template>
						<u-line></u-line>
						<view>
							<uni-row style="margin-top: 5px;">
								<label>
									<view style="display: flex;">
										<view>
											<text class="text"
												style="font-size: 12px;color: #909399;letter-spacing: 2px;">
												申请模板:</text>
										</view>
										<view style="margin-left: auto;">
											<text class="text" style="text-align: left; color: black;">111</text>
										</view>
									</view>
								</label>
							</uni-row>
							<uni-row style="margin-top: 5px;">
								<label>
									<view style="display: flex;">
										<view>
											<text class="text"
												style="font-size: 12px;color: #909399;letter-spacing: 2px;">
												到货时间:</text>
										</view>
										<view style="margin-left: auto;">
											<text class="text" style="text-align: left; color: black;">
												{{materialInfo.arrivalDate | formatDate}}</text>
										</view>
									</view>
								</label>
							</uni-row>
							<uni-row style="margin-top: 5px;">
								<label>
									<view style="display: flex;">
										<view>
											<text class="text"
												style="font-size: 12px;color: #909399;letter-spacing: 2px;">
												订货组织:</text>
										</view>
										<view style="margin-left: auto;">
											<text class="text"
												style="text-align: left; color: black;">{{materialInfo.orderOrg}}</text>
										</view>
									</view>
								</label>
							</uni-row>
							<uni-row style="margin-top: 5px;">
								<label>
									<view style="display: flex;">
										<view>
											<text class="text"
												style="font-size: 12px;color: #909399;letter-spacing: 2px;">
												配送组织:</text>
										</view>
										<view style="margin-left: auto;">
											<text class="text"
												style="text-align: left; color: black;">{{materialInfo.distributionOrg}}</text>
										</view>
									</view>
								</label>
							</uni-row>
							<uni-row style="margin-top: 5px;">
								<label>
									<view style="display: flex;">
										<view>
											<text class="text"
												style="font-size: 12px;color: #909399;letter-spacing: 2px;">
												经办人:</text>
										</view>
										<view style="margin-left: auto;">
											<text class="text"
												style="text-align: left; color: black;">{{materialInfo.agent}}</text>
										</view>
									</view>
								</label>
							</uni-row>
						</view>




						<!-- 
						<uni-row class="demo-uni-row">
					
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
								<text class="text"
									style="text-align: left; color: black;font-weight: bold;">{{materialInfo.note}}</text>
							</uni-col>

						</uni-row> -->


						<!-- 		<uni-badge class="audited-badge" text="已提交"
							v-show="formatBillStatus(materialInfo.status) == '已提交'" />
						<uni-badge class="unaudited-badge" text="暂存"
							v-show="formatBillStatus(materialInfo.status) == '暂存'" /> -->
						<!-- <fabv1 @onTap="onTap"></fabv1> -->
					</uni-card>
					<uni-card>

						<uni-row>
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
								<text class="text"
									style="text-align: left; color: black;font-weight: bold;">{{materialInfo.note}}</text>
							</uni-col>

						</uni-row>
					</uni-card>

					<uni-card>
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

							<uni-row v-for="(item, index) in materialInfo.entry" :key="index">
									<cardv3 :baseFormData="item"></cardv3>
				          </uni-row>
					</uni-card>
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
		queryApplyGood,
		unAuditApplyGoodBill,
		auditApplyGoodBill
	} from '@/api/system/bill.js'
	import {
		formatBillStatus,
		showConfirm,
		toast
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
				indexList: ['https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg',
				],
				materialListSize: 0,
				materialInfo: {
					createDate: ""
				},
				dataList: [],
				materialList: [],
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
			console.log("query", query)
			uni.$on('refreshBillEntryInfo', (data) => {
				this.filterList(data.name);
			});
			// 获取传递的参数
			this.billNumber = query.billNumber;
		},
		onShow() {

		},
		created() {
			this.queryBill();

		},
		methods: {
			scrolltolower() {

			},

			formatBillStatus,
			billStatus(status) {
				let text = this.formatBillStatus(status);
				if (text.length === 2) {
					return text[0] + '\xa0\xa0\xa0\xa0' + text[1]; // 在两个字的文本中间添加不间断空格
				}
				return text;

			},
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