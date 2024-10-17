<template>
	<view>
			<uni-card :is-shadow="false" :title="billNumber">
			
	
			
				<uni-row class="demo-uni-row"  >
					<uni-col :span="12">
						<view class=" light">
							<text class="text" style="text-align: left; ">申请模板:</text>
						</view>
						<text class="text"  style="text-align: left; " >111</text>
					</uni-col>
					<uni-col :span="12">
						<view class=" light">
					       <text class="text" style="text-align: left;">到货时间:</text>
					   </view>
						<text class="text"  style="text-align: left; " >222</text>
					</uni-col>
				</uni-row>		
				
				<uni-row class="demo-uni-row"  >
					<uni-col :span="12">
						<view class=" light">
							<text class="text" style="text-align: left; ">订货仓库:</text>
						</view>
						<text class="text"  style="text-align: left; " >111</text>
					</uni-col>
					<uni-col :span="12">
						<view class=" light">
					       <text class="text" style="text-align: left;">配送中心:</text>
					   </view>
						<text class="text"  style="text-align: left; " >222</text>
					</uni-col>
				</uni-row>	
				
				<uni-row class="demo-uni-row"  >
					<uni-col :span="12">
						<view class=" light">
							<text class="text" style="text-align: left; ">经办人:</text>
						</view>
						<text class="text"  style="text-align: left; " >111</text>
					</uni-col>
					<uni-col :span="12">
						<view class=" light">
					       <text class="text" style="text-align: left;">原因备注:</text>
					   </view>
						<text class="text"  style="text-align: left; " >222</text>
					</uni-col>
				</uni-row>	
				
				<uni-row class="demo-uni-row"  >
					<uni-col :span="12">
						<view class=" light">
							<text class="text" style="text-align: left; ">制单人:</text>
						</view>
						<text class="text"  style="text-align: left; " >111</text>
					</uni-col>
					<uni-col :span="12">
						<view class=" light">
					       <text class="text" style="text-align: left;">制单日期:</text>
					   </view>
						<text class="text"  style="text-align: left; " >222</text>
					</uni-col>
				</uni-row>	
				
				<uni-row class="demo-uni-row"  >
					<uni-col :span="12">
						<view class=" light">
							<text class="text" style="text-align: left; ">单据图片:</text>
						</view>
						<text class="text"  style="text-align: left; " >111</text>
					</uni-col>
				
				</uni-row>
				
				<uni-row class="demo-uni-row"  >
					<uni-col :span="12">
						<view class=" light">
							<text class="text" style="text-align: left; ">备注:</text>
						</view>
						<text class="text"  style="text-align: left; " >111</text>
					</uni-col>
				
				</uni-row>
			</uni-card>
			
			<uni-card :is-shadow="false" >
				<uni-row   >
					<uni-col :span="12" style="text-align: left;">
						<view>
							<text class="text" >支付方式</text>
						</view>
					</uni-col>
					<uni-col :span="12" style="text-align: right; " >
						<text class="text"  >账期支付</text>
					</uni-col>
				</uni-row>	
			</uni-card>
			
			<uni-row   >
				<uni-col :span="12" style="text-align: center;">
					<view>
						<text class="text"  >共 x 条数据</text>
					</view>
				</uni-col>
			</uni-row>	
			<uni-row   >
				<uni-col :span="12" style="text-align: center;">
					<view>
						<text class="text" >货物总重量:0(KG)</text>
					</view>
				</uni-col>
				<uni-col :span="12" style="text-align: center; " >
					<text class="text"  >货物总体积:0(m”)</text>
				</uni-col>
			</uni-row>	
			<uni-card :is-shadow="false" >
				<uni-row>
					xxxxxxxxxxxx
				</uni-row>	
			</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				billNumber: ''
			}
		},
		  onLoad(query) {
		    // 获取传递的参数
		    this.billNumber = this.$route.query.billNumber;
		
		    console.log(this.billNumber);
		  },
		methods: {
			
		}
	}
</script>

<style>

</style>
