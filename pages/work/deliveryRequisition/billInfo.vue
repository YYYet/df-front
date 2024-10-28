<template>
<view class="page fade" animation="slide-in-right">
        <view class="content">
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
			
			<uni-row>
				<uni-col :span="12" style="text-align: left;">
					<view style="margin-left: 10%;">
						共<text class="text" v-text="'  '+ materialListSize+'  '" style="color: skyblue;" width="50rpx"></text>条数据
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
						<text class="text" >货物总重量:0(KG)</text>
					</view>
				</uni-col>
				<uni-col :span="12" style="text-align: center; " >
					<text class="text">货物总体积:0(m)</text>
				</uni-col>
			</uni-row>	
			
			<uni-row v-for="(item, index) in materialList" :key="index">
				<cardv3 :baseFormData="item"></cardv3>
			</uni-row>
</view>
</view>
</template>

<script>
	import cardv3 from '../../common/cardv3/index.vue'
	export default {
			 components: {
				    // 注册组件
				    'cardv3': cardv3
				  },
		data() {
			return {
				billNumber: '',
				materialListSize: 5,
				materialList: [
					{orderWarehouse:"测试1",remark:"备注1",number:100,unit:"个"},
					{orderWarehouse:"测试2",remark:"备注2",number:300,unit:"只"},
					{orderWarehouse:"测试3",remark:"备注3",number:200,unit:"捆"},
					{orderWarehouse:"测试3",remark:"备注3",number:200,unit:"捆"},
					{orderWarehouse:"测试3",remark:"备注3",number:200,unit:"捆"}
				]
			}
		},
		  onLoad(query) {
		    // 获取传递的参数
		    this.billNumber = this.$route.query.billNumber;
		
		    console.log(this.billNumber);
		  },
		methods: {
			gotoFilter(){
				this.$tab.navigateTo('/pages/work/deliveryRequisition/filter')
				
			}
		}
	}
</script>

<style lang="scss">

</style>
