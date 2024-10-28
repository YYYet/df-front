<template>
	<view>
		<ch-picker ref="ChPicker" position="bottom" :columns="columns" :defaultIndex="curIndexs"  @confirm="clickChange">
		</ch-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rightText: "全部仓库",
				name: "",
				curIndexs: [0]
			}
		},
		props: {
			baseFormData: {
				type: [Object],
				default: null
			},
			data:{
			    type:Array,
			    default:()=>[]
			},
			columns:{
			    type:Array,
			    default:()=>[]
			},
		},
		methods: {
			toggle() {
				this.$refs.popup.open()
			},
			pickerShow() {
				this.$refs.ChPicker.show()
			},
			// pickerChange(e) {
			// 	// console.log(e);
			// 	this.curIndexs = e.indexs
			// },
			clickChange(e){
				console.log(e);
				this.rightText = e.columns[0].label
			}

		}
	}
</script>

<style>
	
	/* 使用/deep/选择器确保样式穿透组件作用域 */
	/deep/ .uni-forms-item {
	  padding-top: 0;
	  padding-bottom: 0;
	  margin-top: 0;
	  margin-bottom: 0;
	}
	/deep/ .uni-forms-item__label {
		 margin-left: 20rpx;
	}
	
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
	.bottom-row {
		position: fixed;
		bottom: 0;
		/* 距离底部5%的视口高度 */
		left: 0;
		right: 0;
	}

	.demo-uni-row {
		margin-top: 10px;
		margin-bottom: 10px;
	}


	.demo-uni-col {
		height: 36px;
		border-radius: 4px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>