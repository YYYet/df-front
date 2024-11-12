<template>

	<view>

		<uni-card :is-shadow="false" :is-full="false" style="border-radius: 20rpx;">
			<template v-slot:title>
				<view
					style="margin-left:10px;margin-top: 20px;;padding: 0px 10px;border-radius: 11px;font-weight: bold;">
					<uni-row>
						<text v-text="baseFormData.billNumber"></text>
					</uni-row>
				</view>
				<view style="margin-top: 5px">
					<uni-row style="height: 24px;">
						<uni-col :span="18" style="height: 24px; 
						display: flex;
						flex-direction: column;
						justify-content: flex-end; ">
							<text v-text="baseFormData.extra"
								style="margin-left:10px;padding: 0 10px;font-size: 12px;color: #909399;height: 100%;
								display: flex;
								flex-direction: column;
								justify-content: center;"></text>
						</uni-col>
						<uni-col :span="6" align="right">
							<view>
								<uni-tag :text="billStatus(baseFormData.status)" type="success" 
								:style="{'background-color': billStatus(baseFormData.status)=='已提交'?'#DEF3EE':'#E5F3FE',
								'color': billStatus(baseFormData.status)=='已提交'?'#35B893':'#1591FF',
								'display': 'inline','font-weight': 'bold','margin-left': 'auto'}" 
								/>
								
						<!-- 		<uni-tag :text="billStatus(baseFormData.status)" type="primary"
								style="background-color: #E5F3FE;color: #1591FF;
								display: inline;font-weight: bold;margin-left: auto;"
								v-show="billStatus(baseFormData.status).startsWith('暂')"></uni-tag> -->
							</view>
						</uni-col>
					</uni-row>
				</view>
			</template>
				<u-line></u-line>
				<view>
					<uni-row>
						<label class="uni-list-cell uni-list-cell-pd">
							<view style="display: flex;">
								<view style="margin-left:1px;padding: 0 10px;font-size: 12px;color: #909399;"> 
									订货组织:	
								</view>
								<view >
									<text class="text" v-text="baseFormData.orderOrg"
													style="text-align: left; color: black;"></text>
								</view>
							</view>
						</label>
					</uni-row>
					<uni-row>
						<label class="uni-list-cell uni-list-cell-pd">
							<view style="display: flex;">
								<view style="margin-left:1px;padding: 0 10px;font-size: 12px;color: #909399;"> 
									配送组织:	
								</view>
								<view >
									<text class="text" v-text="baseFormData.distributionOrg"
													style="text-align: left; color: black;"></text>
								</view>
							</view>
						</label>
					</uni-row>
					<uni-row>
						<label class="uni-list-cell uni-list-cell-pd">
							<view style="display: flex;">
								<view style="margin-left:1px;padding: 0 10px;font-size: 12px;color: #909399;"> 
									经办人员:	
								</view>
								<view >
									<text class="text" v-text="baseFormData.agent"
													style="text-align: left; color: black;"></text>
								</view>
							</view>
						</label>
					</uni-row>
				</view>
				
					<u-line ></u-line>
					<template v-slot:actions>
						<uni-row style="display: flex;justify-content: flex-end;height: 50px;align-items: center;">
							<label >
								<view style="display: flex;">
									<view style="display: flex;align-items: center;"> 
										<text class="text" 
												style="color: #909399;align-items: center;">到货时间:</text>
									</view>
									<view style="display: flex;align-items: center;margin-left: 10px;">
										<text class="text" v-text="formatDate(baseFormData.arrivalDate)"
														style=" color: #FF8C21;
														align-items: center;font-size: 25px;"></text>
										<text class="text" v-text="baseFormData.arrivalTime"
														style="margin-left:5px; text-align: center; 
														color: #FF8C21;font-size: 25px;"></text>
									</view>
								</view>
							</label>
						</uni-row>
					</template>
		</uni-card>

	</view>

</template>

<script>
	import {
		formatBillStatus,
		formatDateV2
	} from '@/utils/common.js'

	export default {
		data() {
			return {

			}
		},
		props: {
			baseFormData: {
				type: [Object],
				default: null
			}
		},
		methods: {
			billStatus(status) {
				let text = formatBillStatus(status);
				if (text.length === 2) {
					return text[0] + '\xa0\xa0\xa0\xa0' + text[1]; // 在两个字的文本中间添加不间断空格
				}
				return text;

			},
			formatDate(v) {
				return formatDateV2(v);
			}
		}
	}
</script>

<style>
	.item {
		display: flex;
		/* 使用flexbox布局 */
		align-items: left;
		/* 垂直居中 */
		width: 100%;
		/* 设置宽度 */
		box-sizing: border-box;
		/* 盒模型为边框盒模型 */
		margin-bottom: 0px;
		height: 45rpx;

	}

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

	.baseForm {}

	.custom-form-item {}

	.item {
		display: flex;
		/* 使用flexbox布局 */
		align-items: center;
		/* 垂直居中 */
		width: 100%;
		/* 设置宽度 */
		box-sizing: border-box;
		/* 盒模型为边框盒模型 */
		margin-bottom: 0px;
		height: 45rpx;
	}

	.text {
		display: block;
		font-size: 13px;
		margin: 0px 0px;
	}
</style>