<template>
	<view class="m-cart">
		<view class="search">
			<SearchBar></SearchBar>
		</view>

		<view class="fcb pl-32 pr-36 shop header-shop" id="topInfo">
			<view class="flex items-center">

				<view class="pl-15 flex items-center"><text class="text-32">大方传统菜</text><text
						class="text-24 text-second"></text></view>
			</view>
			<view class="desk text-30 w-100 fcc">
				[杭州店]
				<view class="mark"></view>
			</view>
		</view>

		<CartShop class="card-shop-wrap" :data="cartShopData" :columns="columns" @numberComputed="numberComputed" />
		<CartPay :goodsNum="goodsNum" :goodsTotalPrice="goodsTotalPrice" id="bottomInfo" />
	</view>
</template>

<script>
	import {
		cartShopData
	} from './data.js'
	import CartShop from './CartShop/index.vue'
	import CartPay from './CartPay/index.vue'
	import SearchBar from './SearchBar/SearchBar.vue'
	export default {
		components: {
			// 注册组件
			'CartShop': CartShop,
			'CartPay': CartPay,
			'SearchBar': SearchBar
		},
		data() {
			return {
				cartShopData: cartShopData,
				columns: [],
				cacheMap: {},
				goodsTotalPrice: 0,
				goodsNum: 0
			}
		},
		onLoad() {

		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.$request2.queryTabsList({}, 30).then(res => {
					console.log("queryTabsList", res)
					this.columns = res.data.list
					uni.setStorageSync('defaultTabName', this.columns[0].name);
				}).catch(res => {
					console.log("queryTabsList", res)
				})
			},
			numberComputed(val, index, item) {
				console.log("numberComputed", val, index, item)
				this.cacheMap[item.id] = item
				this.goodsTotalPrice = 0;
				for (let [key, value] of Object.entries(this.cacheMap)) {
					if (value.nums == 0) {
						delete this.cacheMap[key];
					} else {
						this.goodsTotalPrice += (value.price * value.nums)
					}
				}
				
				this.goodsNum = Object.values(this.cacheMap).reduce((accumulator, currentValue) => {
				  return accumulator + currentValue.nums;
				}, 0);
				
				// let keys = Object.keys(this.cacheMap);
				// this.goodsNum = keys.length;
				console.log("this.cacheMap", this.cacheMap)
			},

		}
	}
</script>

<style scoped lang="scss">
	.text-30 {
		fonts-size: 30rpx;
	}

	.ml-25 {
		margin-left: 25rpx;
	}

	.h-80 {
		height: 80rpx;
	}

	.h-110 {
		height: 110rpx;
	}

	.text-24 {
		font-size: 24rpx;
	}

	.bg-white {
		background: white;
	}

	.fcb {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flex {
		display: flex;
	}

	.items-center {
		align-items: center;
	}

	.px-32 {
		padding-left: 32rpx;
		padding-right: 32rpx;
	}

	.pl-32 {
		padding-left: 32rpx;
	}

	.text-white {
		color: white;
	}

	.pr-36 {
		padding-right: 36rpx;
	}

	.bg-white {
		background: white;
	}

	.fcc {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bg-white {
		background: white;
	}

	.search {
		background: white;
		flex-shrink: 0;
		height: 100rpx;
	}

	.shop {
		flex-shrink: 0;
		height: 100rpx;
		background: white;
	}

	.card-shop-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.m-cart {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}

	.desk {
		position: relative;

		.mark {
			position: absolute;
			width: 98rpx;
			height: 20rpx;
			background: #EEC5C1;
			opacity: 0.6;
			bottom: 0;

		}
	}

	.header-shop {
		background: #F5F5F5;
	}
</style>