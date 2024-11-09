<template>
	<view>
		<ch-picker ref="ChPicker" position="bottom" :columns="columns" :defaultIndex="curIndexs" @confirm="clickChange">
		</ch-picker>
		<!-- 		<uni-list>
			<uni-list-item showArrow="" title="订货仓库" clickable :rightText="rightText" @tap="pickerShow">

			</uni-list-item>
			<uni-list-item title="货品名称">
					<template v-slot:footer>
					<uni-easyinput :inputBorder="false" class="list-item-input"   v-model="name" placeholder="按首字母/名称/编码" @input="input"></uni-easyinput>
					</template>
			</uni-list-item>
		</uni-list> -->

		<uni-forms ref="form" border>
<!-- 			<uni-forms-item label="订货仓库" name="name" label-width="70" style="background-color: white;">
				<uni-list-item showArrow clickable :rightText="rightText" @tap="pickerShow">

				</uni-list-item>
			</uni-forms-item> -->

			<uni-forms-item label="货品名称" name="email" label-width="70" style="background-color: white;">
				<uni-easyinput :inputBorder="false" class="list-item-input" v-model="name" placeholder="按首字/名称/编码"
					></uni-easyinput>
			</uni-forms-item>
		</uni-forms>

		<uni-row class="demo-uni-row bottom-row">
			<uni-col :span="12">
				<view class="demo-uni-col light">
					<button type="default">重置</button>
				</view>
			</uni-col>
			<uni-col :span="12">
				<view class="demo-uni-col light">
					<button type="primary" @click="filter">查询</button>
				</view>
			</uni-col>
		</uni-row>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				rightText: "全部仓库",
				name: "",
				curIndexs: [0],
				columns: [
					[{
						label: "全部仓库",
						value: 0,
					}, {
						label: "仓库1",
						value: 1,
					}, {
						label: "仓库2",
						value: 2,
					}, {
						label: "仓库3",
						value: 3,
					}, ]
				],
			}
		},
		props: {
			baseFormData: {
				type: [Object],
				default: null
			}
		},
		methods: {
			filter(){
				uni.$emit('refreshBillEntryInfo', { name: this.name });
				this.$tab.navigateBack()
			},
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
			clickChange(e) {
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
	.list-item-input>>>.uni-easyinput__content {
		height: 100%;
		/* 根据uni-list-item的高度调整 */
		border: none;
		/* 去除边框 */
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