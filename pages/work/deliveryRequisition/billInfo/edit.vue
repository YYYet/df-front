<template>
	<view class="page fade animate__animated" animation="slide-in-right">
		<u-picker :show="uViewPickShow" :columns="columns" @confirm="selectTemplate"
			@cancel="uViewPickShow = false"></u-picker>
		<u-calendar :show="uViewCalendarShow" @close="uViewCalendarShow = false" @confirm="selectDate">
		</u-calendar>
		<view class="content">

			<!-- 		<uni-row v-for="(item, index) in materialInfo.entry" :key="index">
				<cardv3 :baseFormData="item"></cardv3>
			</uni-row> -->

			<uni-card :is-shadow="false" :title="billNumber" :is-full="false" style="border-radius: 20rpx;">
				<template v-slot:title>
					<view style="margin-top: 20px;">
						<uni-row>
							<uni-col :span="12">
								<text v-text="billNumber"
									style="padding: 0px 10px;border-radius: 11px;font-weight: bold;"></text>
							</uni-col>
							<uni-col :span="12" align="right">
								<uni-tag :text="billStatus(materialInfo.status)" type="success" style="background-color: #DEF3EE;color: #35B893;
										font-weight: bold;amargin-left:auto;" v-show="billStatus(materialInfo.status)=='已提交'" />
								<uni-tag :text="billStatus(materialInfo.status)" type="primary" style="background-color: #E5F3FE;color: #1591FF;
												font-weight: bold;margin-left:auto;" v-show="billStatus(materialInfo.status).startsWith('暂')" />
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
									<text class="text" style="font-size: 12px;color: #909399;letter-spacing: 2px;">
										申请模板:</text>
								</view>
								<view style="margin-left: auto;">
									<!-- <text class="text" style="text-align: left; color: black;" @click="pickTemplate">{{materialInfo.tempName}}</text> -->
									<u--text suffixIcon="arrow-right" iconStyle="font-size: 12px"
										:text="materialInfo.tempName" @click="pickTemplate"></u--text>
								</view>
							</view>
						</label>
					</uni-row>

					<uni-row style="margin-top: 5px;">
						<label>
							<view style="display: flex;">
								<view>
									<text class="text" style="font-size: 12px;color: #909399;letter-spacing: 2px;">
										到货时间:</text>
								</view>
								<view style="margin-left: auto;">
									<!-- <u-cell  :title="materialInfo.arrivalDate | formatDate" :isLink="true" arrow-direction="left" @click="uViewCalendarShow = true"></u-cell> -->
									<u--text suffixIcon="arrow-right" iconStyle="font-size: 12px"
										:text="materialInfo.arrivalDate | formatDate"
										@click="uViewCalendarShow = true"></u--text>
									<!-- 	<text class="text" style="text-align: left; color: black;" @click="uViewCalendarShow = true">
										{{materialInfo.arrivalDate | formatDate}}</text><u-icon name="arrow-right"></u-icon> -->
								</view>
							</view>
						</label>
					</uni-row>
					<uni-row style="margin-top: 5px;">
						<label>
							<view style="display: flex;">
								<view>
									<text class="text" style="font-size: 12px;color: #909399;letter-spacing: 2px;">
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
									<text class="text" style="font-size: 12px;color: #909399;letter-spacing: 2px;">
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
									<text class="text" style="font-size: 12px;color: #909399;letter-spacing: 2px;">
										经办人:</text>
								</view>
								<view style="margin-left: auto;">
									<text class="text"
										style="text-align: left; color: black;">{{materialInfo.agent}}</text>
								</view>
							</view>
						</label>
					</uni-row>
					<uni-row style="margin-top: 5px;">
						<label>
							<view style="display: flex;">
								<view>
									<text class="text" style="font-size: 12px;color: #909399;letter-spacing: 2px;">
										备注:</text>
								</view>

							</view>
						</label>
					</uni-row>
					<uni-row>
						<u--textarea v-model="materialInfo.note" placeholder="请输入内容"></u--textarea>
					</uni-row>
				</view>

				<!-- <fabv1 @onTap="onTap"></fabv1> -->
			</uni-card>
			<uni-fab ref="fab" horizontal="right" class="custom-fab-update" vertical="bottom" @fabClick="onTap" />
			<!-- 			<uni-card>
				<uni-row>
					<uni-col :span="12">
						<view class="light">
							<text class="text" style="text-align: left;">制单人:</text>
						</view>
						<text class="text"
							style="text-align: left; color: black;font-weight: bold;">{{materialInfo.creator}}</text>
					</uni-col>
					<uni-col :span="12" align="right">
						<view class="light">
							<text class="text" style="text-align: left;margin-left: auto;">制单日期:</text>
						</view>
						<text class="text"
							style="text-align: left; color: black;font-weight: bold;margin-left: auto;">{{materialInfo.createDate | formatDate}}</text>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row" style="height: 40px;">
					<view class="light">
						<text class="text" style="text-align: left; ">备注:</text>
					</view>
					<text class="text"
						style="text-align: left; color: black;font-weight: bold;">{{materialInfo.note}}</text>
				</uni-row>
			</uni-card> -->

			<uni-card>
				<uni-row>
					<uni-col :span="12" style="text-align: left;">
						<view style="margin-left: 10%;">
							共<text class="text" v-text="'  '+ newEntryList.length+'  '" style="color: #1592FD;"
								width="50rpx"></text>条数据
						</view>
					</uni-col>
					<uni-col :span="12" style="text-align: right;">
						<view style="margin-right: 10%;">
							<text class="text" style="color: #1592FD;" @click="gotoSearch()">增加</text>
						</view>
					</uni-col>
				</uni-row>

				<uni-row style="margin-top: 20px;margin-bottom: 20px;">
					<uni-col :span="12" style="text-align: left;">
						<uni-card style="height: 60px;background-color: #F1F3FF;
								border-radius: 10%;margin-right: 10px;display: flex;flex-direction: column;justify-content: center;"
							:isFull="true" :is-shadow="false">
							<uni-row>
								<uni-col :span="14">
									<text style="color: black;height: 60px;" class="uni-body">货物总重量</text>
								</uni-col>
								<uni-col :span="6" align="right">
									<text style="color: #1592FD;height: 60px;font-size: 25px;" class="uni-body">0</text>
								</uni-col>
								<uni-col :span="4">
									<text style="color: black;height: 60px;font-size: 15px;"
										class="uni-body">(kg)</text>
								</uni-col>
							</uni-row>
						</uni-card>
					</uni-col>
					<uni-col :span="12" style="text-align: left; ">
						<uni-card style="height: 60px;background-color: #F1F3FF;
								border-radius: 10%;margin-left: 10px;display: flex;flex-direction: column;justify-content: center;"
							:isFull="true" :is-shadow="false">
							<uni-row>
								<uni-col :span="14">
									<text style="color: black;height: 60px;" class="uni-body">货物总体积</text>
								</uni-col>
								<uni-col :span="6" align="right">
									<text style="color: #1592FD;height: 60px;font-size: 25px;" class="uni-body">0</text>
								</uni-col>
								<uni-col :span="4">
									<text style="color: black;height: 60px;font-size: 15px;" class="uni-body">(m)</text>
								</uni-col>
							</uni-row>
						</uni-card>
					</uni-col>
				</uni-row>
				<u-line></u-line>

				<uni-swipe-action ref="swipeAction">

					<uni-swipe-action-item v-for="(card, index) in dataList" :key="index"
						@click="onClick(index, card, $event)" :right-options="options1"
						:ref="'swipeAction' + index"
						 >
						<cardv4 :baseFormData="card" @numberBoxChangeValue="numberBoxChangeValue"></cardv4>
					</uni-swipe-action-item>


				</uni-swipe-action>



				<!-- 	<uni-row v-for="(item, index) in dataList" :key="index">
					<cardv3 :baseFormData="item"></cardv3>
				</uni-row> -->
			</uni-card>
		</view>
	</view>
</template>

<script>
	import cardv3 from '@/pages/common/cardv3/index.vue'
	import cardv4 from '@/pages/common/cardv4/index.vue'
	import MaterialInfo from "@/pages/common/deliveryRequisition/material-info/index.vue"
	import {
		queryApplyGood,
		unAuditApplyGoodBill,
		auditApplyGoodBill,
		queryTemplate
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
			'cardv4': cardv4,
			'MaterialInfo': MaterialInfo
		},
		data() {
			return {
				billNumber: '',
				materialListSize: 0,
				materialInfo: {
					createDate: ""
				},
				options1: [{
					text: '删除'
				}],
				uViewPickShow: false,
				uViewCalendarShow: false,
				currentSelectTemp: {},
				columns: [
					[]
				],
				dataList: [],
				hideDataMap: {},
				tempList: [],
				materialList: [],
				deleteEntryList: [],
				newEntryList: [],
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
			uni.$off('selectUpdateMaterial');
		},
		onLoad(query) {
			console.log("query", query)
			
			uni.$on('selectUpdateMaterial', (obj) => {
				// this.filterList(data.name);
				console.log("回到更新界面", obj)
				let arr2 = Object.values(obj);
				// let material = {
				// 	orderWarehouse: "",
				// 	qty: item.nums,
				// 	unitName: item.unit,
				// 	materialName: item.name
				// }
				
				for (var i = 0; i < arr2.length; i++) {
					let newSelectItem = arr2[i];
					console.log("newSelectItem", newSelectItem)
					let material = {
						"orderWarehouse": "",
						"qty": newSelectItem.nums,
						"materialId": newSelectItem.id,
						"unitName": newSelectItem.unit,
						"materialName": newSelectItem.name
					}
					
					// // 该元素之前被隐藏，现在需要重现
					// if(this.hideDataMap[newSelectItem.id] != undefined && this.hideDataMap[newSelectItem.id]){
					// 	delete this.hideDataMap[newSelectItem.id];
					// }
		
					this.dataList.push(material);	
					console.log("向newEntryList中push", this.newEntryList)
					// this.newEntryList.push(material);	
				}
				
		
				console.log("this.dataList", this.dataList)
				// this.dataList.push(material);
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

			formatBillStatus,
			onClick(index, card, event) {
				console.log('点击了' + (event.position === 'left' ? '左侧' : '右侧') + event.content.text + '按钮', card,index)
				   
				if (event.position === 'right') {
					let refFlag = 'swipeAction' + index;
					// this.$refs[refFlag][0].closeHandler();
					this.$refs.swipeAction.closeAll();
					
					// this.deleteEntryList.push(card);
					// this.newEntryList = this.dataList.filter(item => !this.deleteEntryList.includes(item));
					// this.$delete(this.dataList, index)
					this.dataList.splice(index, 1)
					// this.$set(this.hideDataMap, card.materialId, true);
					console.log("this.dataList", this.dataList)
				}
			},
			selectDate(e) {
				console.log("selectDate", e)
				this.materialInfo.arrivalDate = e[0];
				this.uViewCalendarShow = false;
			},
			selectTemplate(e) {
				this.currentSelectTemp = this.tempList[e.indexs[0]];
				this.materialInfo.tempName = this.currentSelectTemp.name;
				this.materialInfo.tempNo = this.currentSelectTemp.billNumber
				this.materialInfo.arrivalDate = this.currentSelectTemp.arrivalDate;
				this.uViewPickShow = false;
				console.log("selectTemplate", e, this.currentSelectTemp)
			},
			pickTemplate() {
				queryTemplate().then(response => {
					var result = response.result;
					this.tempList = result;
					if (result.length == 0) {
						this.$modal.msg("无匹配的模板")
					} else {
						this.$set(this.columns, 0, result.map(item => {
							return item.name
						}))
						console.log("templateList", this.columns)
						this.uViewPickShow = true;
						// this.$refs.ChPicker.show()
					}

				})
			},
			billStatus(status) {
				let text = this.formatBillStatus(status);
				if (text.length === 2) {
					return text[0] + '\xa0\xa0\xa0\xa0' + text[1]; // 在两个字的文本中间添加不间断空格
				}
				return text;

			},
			onNavigationBarButtonTap(e) {
				console.log('编辑', e)
				if (this.billStatus(this.materialInfo.status) == '已提交') {
					this.$modal.confirm("该单据已提交，若需编辑请先撤销");
					return;
				}

				if (e.index == 0) {}
			},
			numberBoxChangeValue(val, item){
				console.log("numberBoxChangeValue", val, item)
				
			},
			onTap(e) {
				
				console.log("this.materialInfo ", this.materialInfo , this.dataList)
				
				this.$modal.confirm("更新接口暂未对接，此处仅作模拟，以下为更新所需数据\n\r TEMP "+ JSON.stringify(this.materialInfo) + "\n\r ENTRY" + JSON.stringify(this.dataList))
				
				// console.log("onTap", e)
				// console.log("this.materialInfo", this.materialInfo)

				// if (formatBillStatus(this.materialInfo.status) == '已提交') {
				// 	showConfirm('是否撤销该单据').then(res => {
				// 		if (res.confirm) {
				// 			this.$modal.loading("撤销中");
				// 			unAuditApplyGoodBill([this.billNumber]).then(res => {
				// 				this.queryBill();
				// 				this.$modal.closeLoading()
				// 				this.$modal.confirm("单据撤销成功\n\r"+this.billNumber);
				// 				// toast("撤销成功")
				// 			});
				// 		}
				// 	})
				// }

				// if (formatBillStatus(this.materialInfo.status) == '暂存') {
				// 	showConfirm('是否提交该单据').then(res => {
				// 		if (res.confirm) {
				// 			this.$modal.loading("提交中");
				// 			auditApplyGoodBill([this.billNumber]).then(res => {
				// 				this.queryBill();
				// 				this.$modal.closeLoading()
				// 				this.$modal.confirm("单据撤销成功\n\r"+this.billNumber);
				// 				// toast("提交成功")
				// 			});
				// 		}
				// 	})

				// }
			},
			queryBill() {
				queryApplyGood(this.billNumber).then(res => {
					this.materialInfo = res.result;
					this.materialListSize = this.materialInfo.entry.length;
					this.dataList = this.materialInfo.entry;
					this.newEntryList = this.dataList;
					console.log(this.billNumber, res);
					this.$nextTick(() => {
						this.setList()
					})
				})
			},
			filterList(keyWord) {
				this.dataList = this.materialInfo.entry.filter(item => item.materialName.includes(
					keyWord));
				// this.$refs.materialPaging.complete();
			},
			setList() {
				// this.$refs.materialPaging.complete(this.materialInfo.entry)
			},
			gotoSearch() {
				console.log("this.currentSelectTemp", this.currentSelectTemp)
						console.log("billEntry", this.dataList)
				uni.setStorageSync("billEntry", this.dataList);
				this.$tab.navigateTo('/pages/common/material-search/index?currentTempNo='+this.materialInfo.tempNo)
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