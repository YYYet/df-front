<template>
	<view>
		<!-- <uni-card v-for="(item,index) in dataList" :key="index" @click="itemClick(item)"> -->
		<uni-row class="demo-uni-row">
			<uni-col :span="20">
				<span style="font-weight: bold;">{{ item.name }}</span>
				<span style="font-weight: bold;margin-left: 5rpx;">{{ item.model }}</span>
				<span style="font-weight: bold;color: red;margin-left: 5rpx;">{{ item.unit }}</span>
				<span v-show="false">{{ item.unitId }}</span>
			</uni-col>
			<uni-col :span="4">
				<span style="font-size: 20rpx;">{{ item.number }}</span>
			</uni-col>
		</uni-row>
		<uni-row class="demo-uni-row">
			<uni-col :span="12">
				<view style="color: darkgray;font-size: 20rpx;">库存数量: {{ item.storageNums }}</view>
			</uni-col>
		</uni-row>
		<uni-row class="demo-uni-row">
			<uni-col :span="12">
				<view style="color: darkgray;font-size: 20rpx;">在途入库: {{ item.storageInTransitNums }}</view>
			</uni-col>
		</uni-row>
		<uni-row class="demo-uni-row" style="display: flex;" v-show="needNumberSelector">
			<uni-col :span="12">
			</uni-col>
			<uni-col :span="12" style="justify-content: flex-end;align-items: flex-end;">
				<uni-number-box :min="0" :value="item.nums" @change="(val)=>numberComputed(val,currentIndex,item)"
					style="margin-left: 20%;" :step="item.step" />
			</uni-col>
		</uni-row>
		<uni-row class="demo-uni-row" style="display: flex;"  v-show="needCheckButton" >
			<uni-col :span="20">
			</uni-col>
			<uni-col :span="4"  align = "right">
				<u-checkbox-group :name="'box-group-'+item.id">
					<u-checkbox
								:checked="checkButtonDefaultChecked"
					            :customStyle="{marginBottom: '8px'}" :disabled="checkButtonDefaultDisabled"
					            :name="'box-'+item.id" label="选择" @change="checkboxChange"/>
					</u-checkbox-group>
			</uni-col>
		</uni-row>
		<!-- </uni-card> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// dataList:[],
				// cacheMap:{}
			
			}
		},
		props: {
			needNumberSelector: {
				type: Boolean,
				default: false
			},
			needCheckButton: {
				type: Boolean,
				default: false
			},
			checkButtonDefaultChecked: {
				type: Boolean,
				default: false
			},
			checkButtonDefaultDisabled: {
				type: Boolean,
				default: false
			},
			item: {
				type: Object,
				default: function() {
					return {}
				}
			},
			currentIndex: {
				type: Number,
				default: function() {
					return 0
				}
			}
		},
		created() {
			// this.dataList = JSON.parse(this.$store.state.data.materialList);
		},
		mounted() {
			// this.dataList = JSON.parse(this.$store.state.data.materialList);
			// for (var i = 0; i < this.dataList.length; i++) {
			// 	this.cacheMap[this.dataList[i].id] = this.dataList[i]
			// }
		},
		methods: {
			   checkboxChange(n) {
						this.$emit("checkBox", n, this.item)
			        },
			numberComputed(val, currentIndex, item) {
				// this.selectCache[this.sideCurrentIndex][index] += val;
				// item.nums = val

				// this.cacheMap[item.id] = item

				// // this.$emit('numberComputed', val, index, item)
				// this.$store.dispatch('SetCacheMap', this.cacheMap)
				// this.$store.dispatch('SetTableList', JSON.stringify(this.dataList))
				this.$emit('numberComputed', val, currentIndex, item)

			},
			itemClick(item) {
				console.log('点击了', item.name);
			}
		}
	}
</script>

<style>

</style>