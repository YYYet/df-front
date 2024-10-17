<template>
	
	<view  >

		<uni-card :is-shadow="false" :title="baseFormData.billNumber" :extra="baseFormData.extra">
					<uni-row class="demo-uni-row"  >
						<uni-col :span="6">
							<view class=" light">
								<text class="text" v-text="baseFormData.arrivalDate" style="text-align: left; font-size: 20px; font-weight: bold; text-align: center;color: black;"></text>
								<text class="text" v-text="baseFormData.arrivalTime" style="text-align: left; text-align: center; color: darkgrey;" ></text>
								<text class="text"  style="text-align: left; text-align: center;color: darkgrey;">到货时间</text>
							</view>
						</uni-col>
						<uni-col :span="12">
							<view class=" light">
								<uni-forms >
									<uni-forms-item label="订货仓库:" label-width="auto" class="item"  err-show-type="none" label-align="center" >
											<text class="text" v-text="baseFormData.orderWarehouse" style="text-align: left;font-weight: bold; color: black;"></text>
									</uni-forms-item>
									<uni-forms-item label="配送中心:" label-width="auto" class="item"   err-show-type="none" label-align="center">
											<text class="text" v-text="baseFormData.distributionCenter" style="text-align: left;font-weight: bold; color: black;"></text>
									</uni-forms-item>
									<uni-forms-item label="经办人:" label-width="auto"  class="item"  err-show-type="none" label-align="center">
											<text class="text" v-text="baseFormData.agent" style="text-align: left;font-weight: bold; color: black;"></text>
									</uni-forms-item>
								</uni-forms>
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class=" light">
								<text class="text" style="text-align: right;" v-text="baseFormData.status"></text>
							</view>
						</uni-col>
					</uni-row>		
					
							
					

		</uni-card>
			
	</view>
		
</template>

<script>
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
			
		}
	}
</script>

<style>
	.item{
		 display: flex; /* 使用flexbox布局 */
		 align-items: center; /* 垂直居中 */
		 width: 100%; /* 设置宽度 */
		 box-sizing: border-box; /* 盒模型为边框盒模型 */
		 margin-bottom: 0px;
		 height: 45rpx;
		 font-family: 'Courier New', Courier, monospace;
		 font-weight: bold;
		 color: black;
	}
	.audited-badge {
	  position: absolute;
	  top: 10px; /* 根据需要调整 */
	  right: 10px; /* 根据需要调整 */
	  transform: rotate(45deg);
	  white-space: nowrap;
	  padding: 5px 10px;
	  background-color: #4CAF50; /* 绿色背景，可根据需要调整 */
	  color: white;
	  text-align: center;
	  border-radius: 5px;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
	.unaudited-badge {
	  position: absolute;
	  top: 10px; /* 根据需要调整 */
	  right: 10px; /* 根据需要调整 */
	  transform: rotate(45deg);
	  white-space: nowrap;
	  padding: 5px 10px;
	  background-color: blue; /* 绿色背景，可根据需要调整 */
	  color: white;
	  text-align: center;
	  border-radius: 5px;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
	
	.baseForm{

	}
	.custom-form-item {

	}
	.item{
		 display: flex; /* 使用flexbox布局 */
		 align-items: center; /* 垂直居中 */
		 width: 100%; /* 设置宽度 */
		 box-sizing: border-box; /* 盒模型为边框盒模型 */
		 margin-bottom: 0px;
		 height: 45rpx;
	}
    .text {
        display: block;
        font-size: 13px;
        margin: 0px 0px;
        }

</style>
