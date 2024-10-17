<template>
	
	<view>
		
		<uni-card :is-shadow="false">
							<uni-forms ref="baseForm" class="baseForm">
					
								<uni-forms-item label="收货仓库:" label-width="auto" class="item" err-show-type="none" label-align="center">
									<text class="text" v-text="baseFormData.receivingWarehouse" ></text>
								</uni-forms-item>
								<uni-forms-item label="总金额:" label-width="auto" class="item" err-show-type="none" label-align="center">
									<text class="text"  v-text="baseFormData.totalAmount"></text>
								</uni-forms-item>
								<uni-forms-item label="含运费总金额:" label-width="auto" class="item" err-show-type="none" label-align="center">
									<text class="text" v-text="baseFormData.totalFreightIncluded"></text>
								</uni-forms-item>
								<uni-forms-item label="供应商:" label-width="auto" class="item" err-show-type="none" label-align="center">
									<text class="text" v-text="baseFormData.supplier"></text>
								</uni-forms-item>
								<uni-forms-item label="单号:" label-width="auto" class="item" err-show-type="none" label-align="center">
									<text class="text" v-text="baseFormData.number"></text>
								</uni-forms-item>
								<uni-forms-item label="订货单号:" label-width="auto" class="item" err-show-type="none" label-align="center">
									<text class="text" v-text="baseFormData.orderNumber"></text>
								</uni-forms-item>
								<uni-forms-item label="实际到货时间:" label-width="auto" class="item" err-show-type="none" label-align="center">
									<text class="text" v-text="baseFormData.actualArrivalTime"></text>
								</uni-forms-item>
								<uni-badge class="audited-badge" text="已审核" v-show="baseFormData.status == '已审核'"/>
								<uni-badge class="unaudited-badge" text="未审核"  v-show="baseFormData.status == '未审核'"/>
							</uni-forms>

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
