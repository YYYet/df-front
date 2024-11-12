<template>
    <view class="cart-pay">
        <view class="h-110"></view>
        <view class="h-110 fcb px-32 safe-padding operation bg-white">
            <view class="flex items-center">
                <view class="cart" @click="clickCart">
                    <view class="badge">{{goodsNum}}</view>
                </view>
                <!-- <view class="ml-25 text-30">￥{{goodsTotalPrice}}</view> -->
            </view>
            <view class="fcc">
                <view class="pay fcc text-30 h-80 text-white "
                        @click="submit">保存
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props:{
        goodsNum:{
            type:Number,
            default:0
        },
		goodsTotalPrice:{
		    type:Number,
		    default:0
		},
        disabled:{
            type:Boolean,
            default:false
        },
        coupon:{
            type:Boolean,
            default: false
        },
        // 是否是堂食
        forHere:{
            type:Boolean,
            default: true
        }
    },
    methods:{
        submit(){
            this.$emit('submit')
        },
		clickCart(){
			console.log("cart-pay clickCart")
			this.$emit("clickCart")
		}
    }
}
</script>

<style lang="scss" scoped>
.text-30{
	fonts-size:30rpx;
}
.ml-25{
	margin-left: 25rpx;
}
.h-80{
	height: 80rpx;
}
.h-110{
	height: 110rpx;
}
.bg-white{
	background: white;
}
.fcb{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.flex{
	display: flex;
}
.items-center{
	align-items: center;
}
.px-32{
	padding-left: 32rpx;
	padding-right: 32rpx;
}
.text-white{
	color: white;
}
.fcc{
	display: flex;
	align-items: center;
	justify-content: center;
}
.operation{
  border-top: 2px solid #F5F5F5;
  position: fixed;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  z-index: 119;
}
.cart{
  width: 104rpx;
  height: 104rpx;
  background: url("~@/static/cart.png");
  background-size: cover;
    position: relative;
}
.eat{
  width: 200rpx;
  height: 82rpx;
  background: #000000;
  border-radius: 200rpx 200rpx 200rpx 200rpx;

}
.pay{
  background:  #9E2A22;
  width: 168rpx;
  height: 82rpx;
  border-radius: 200rpx 200rpx 200rpx 200rpx;
}
.disabled{
  background: #fd545b80;
}
.coupon{
  width: 126rpx;
  height: 36rpx;
  background: #E2E2E2;
  border-radius: 200rpx 200rpx 200rpx 200rpx;
  color: #666666;

}
.use-coupon{
  height: 36rpx;
  background: rgba(158, 42, 34, 0.3);
  border-radius: 200rpx 200rpx 200rpx 200rpx;
  padding-left: 8rpx;
  padding-right: 8rpx;
  color: #9E2A22;
  display: inline-block;
  line-height: 36rpx;
  font-size: 20rpx;

}
.badge{
    right: -2rpx;
    top: -2rpx;
    background-color: #9E2A22;
    position: absolute;
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    justify-content: center;
    flex-direction: row;
    height: 20px;
    min-width: 20px;
    padding: 0 4px;
    line-height: 18px;
    color: #fff;
    border-radius: 100px;
    border: 1px solid #fff;
    text-align: center;
    font-family: Helvetica Neue,Helvetica,sans-serif;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    font-size: 12px;
    z-index: 9;
    cursor: pointer;
}
</style>
