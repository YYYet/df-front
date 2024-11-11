<template>
	<view class="card-with-stripe">
					<uni-card :is-shadow="false" class="card-content"  style="background-color: #F7F7F7;">
						<uni-row>
							<text class="text"  style="text-align: left; text-align: center;color: black;font-weight: bolder;font-size: 34rpx;" v-text="baseFormData.materialName"></text>
						</uni-row>	
						<uni-row>
							<uni-forms >
								<uni-forms-item label="订货仓库:" class="item" label-width="auto" err-show-type="none"  >
										<text class="text"  v-text="baseFormData.orderWarehouse"></text>
								</uni-forms-item>
								
								<uni-row>
									
									<uni-col :span="8" align="right" :offset="12">
									<!-- 	<uni-forms-item label="备注:" class="item"  label-width="auto"  err-show-type="none" >
												<text class="text" v-text="baseFormData.remark"></text>
										</uni-forms-item> -->
								
									
									<uni-number-box :value="baseFormData.qty" background="#fff" color="#000" @change="changeValue" />
									
									</uni-col>
									<uni-col :span="4" >
										<uni-forms-item class="item" style="text-align: right;"  err-show-type="none" >
												<!-- <text class="text" style="font-size: 30rpx;font-weight: bold;color: #000;"  v-text="baseFormData.qty" ></text> -->
												<!-- <uni-number-box v-model="baseFormData.qty" v-show="showNumberBox" style="margin-right: ;"></uni-number-box> -->
												<text class="text"  v-text="baseFormData.unitName"></text>
										</uni-forms-item>
												
									</uni-col>
								</uni-row>	
						
							</uni-forms>
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
		  },
		  showNumberBox: {
		    type: Boolean,
		    default: false
		  }
		},
		methods: {
			changeValue(val){
				console.log(val)
				this.baseFormData.qty = val;
				this.$emit("numberBoxChangeValue", val, this.baseFormData)
			}
		}
	}
</script>

<style>
	.minus {
			width: 22px;
			height: 22px;
			border-width: 1px;
			border-color: #E6E6E6;
			border-style: solid;
			border-top-left-radius: 100px;
			border-top-right-radius: 100px;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
			@include flex;
			justify-content: center;
			align-items: center;
		}
	
		.input {
			padding: 0 10px;
		}
	
		.plus {
			width: 22px;
			height: 22px;
			background-color: #FF0000;
			border-radius: 50%;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;
		}
	.numberText {
	    display: block;
	    font-size: 13px;
	    margin: 0px 0px;
		align-items: center;
		
	    }
	/deep/ .uni-forms-item__label {
		 font-size: 14px;
		 color: gray;
	}
	.item{
		 display: flex; /* 使用flexbox布局 */
		 align-items: center; /* 垂直居中 */
		 width: 100%; /* 设置宽度 */
		 margin-bottom: 3rpx;
		 height: 65rpx;
	}
.card-with-stripe {
  position: relative;
}

.card-with-stripe::before {
  content: '';
  position: absolute;
  left: 10px; /* 紧贴左侧 */
  top: 0;
  bottom: 0;
  width: 5px; /* 条纹宽度 */
  background-color: orange; /* 条纹颜色 */
  border-radius: 5px 0 0 5px; /* 圆角 */
}

.card-content {
  
  height: 110px;
}



</style>
