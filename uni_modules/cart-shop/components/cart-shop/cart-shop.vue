<template>
    <view class="cart-shop">
        <view class="side-a">
            <scroll-view :scroll-y="true" style="height: 100%" :scroll-top="scrollTop" :scroll-with-animation="true">
                <view class="item text-ellipsis__2 side-item" v-for="(item,index) in columns"
                      :key="index"
                      @click="handleSideAction(item,index)"
                      :class="[index===sideCurrentIndex&&'type_active']"
                >
                    {{ item.name }}
                </view>
            </scroll-view>
        </view>
        <view class="side-b">
            <scroll-view
                    id="side_b"
                    scroll-y
                    class="side-scroll"
                    scroll-with-animation
                    style="height: 100%"
                    :scroll-into-view="intoView"
                    @scroll="contentScroll"
            >
                <view :id="`v_${index}`" v-for="(item,index) in data" class="item_b" :key="item.id">
                    <view class="side_b_title bg-white">
                        <view class="goods">{{ item.name }}</view>
                        <view class="country">Soup in China</view>
                    </view>
                    <view class="item" v-for="ite in item.children" :key="ite.id">
                        <view class="img-box">
                            <image :src="ite.logo" class="img"></image>
                        </view>
                        <view class="goods-info">
                            <view class="title">{{ ite.name }}</view>
                            <view class="description">清肠祛湿</view>
                            <view class="num">月售{{ ite.monthlySales }}</view>
                            <view class="price">
                                <view>
                                    <text class="item-price">￥{{ ite.price }}</text>
                                    <text class="unit">/个</text>
                                </view>
                                <NumberCalculation/>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import NumberCalculation from './NumberCalculation.vue'
export default {
    components:{
        NumberCalculation
    },
    props:{
        data:{
            type:Array,
            default:()=>[]
        },
        columns:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            intoView:'v_0',
            sideCurrentIndex:0,
            scrollTop:0,
            contentHeightArr:[]
        }
    },
    mounted(){
        this.getHeight('.item_b').then(res=>{
            // res
            res.forEach((item,index)=>{
                let top = index > 0 ? this.contentHeightArr[index - 1] : 0;
                top += item.height;
                this.contentHeightArr.push(top)
            })
        })
    },
    methods:{
        async getHeight(element) {
            return new Promise((resolve) => {
                let view = uni.createSelectorQuery().in(this).selectAll(element);
                view.boundingClientRect(data => {
                    if(!data){
                        setTimeout(()=>{
                            this.getHeight()
                        },10)
                        return
                    }
                    resolve(data)
                }).exec();
            })
        },

        contentScroll(event){
            let scrollTop = event.target.scrollTop
            let index = this.contentHeightArr.findIndex((item)=>{
                return scrollTop<=item
            })



            this.sideCurrentIndex = index==-1?this.sideCurrentIndex:index
            this.scrollHeight()
        },
        handleSideAction(item,index){
            this.sideCurrentIndex = index
            this.intoView = `v_${index}`
            this.scrollHeight()
        },
        async getWrapSideHeight() {
            return new Promise(resolve => {
                let view = uni.createSelectorQuery().in(this).select(".side-a");
                view.boundingClientRect(data => {
                    resolve(data)
                }).exec();
            })
        },

        async scrollTopTo(OffsetHeight, itemTab) {
            let tabNav = await this.getWrapSideHeight()
            this.scrollTop = OffsetHeight - (tabNav.height - itemTab.height) / 2
        },
        async scrollHeight() {
            let tabs = await this.getHeight(".side-item")
            let itemTab = tabs[this.sideCurrentIndex]
            if (!itemTab) return

            let currentBeforeArr = tabs
                .slice(0, this.sideCurrentIndex)

            let OffsetHeight = currentBeforeArr
                .reduce((total, curr) => {
                    return total + curr.height
                }, 0);
            this.scrollTopTo(OffsetHeight,itemTab)
        },
    }
}
</script>


<style lang="scss" scoped>
.cart-shop{
  display: flex;
  flex: 1;
  overflow: hidden;
}
.side-scroll{
  position: relative;
}
.side_b_title{
  position: sticky;
  top: -2rpx;
  left: 0;
  z-index: 99;
  padding: 10rpx 24rpx;

  background: white;
}
.side-a{
  width: 160rpx;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  .item{
    text-align: center;
    padding: 20rpx 20rpx;
    display: flex;
    font-size: 24rpx;
    justify-content: center;
    align-items: center;
    color: #666666;
  }
  .type_active{
    background: white;
    font-weight: 600;
    color: #000000;
  }
}
.side-b{
  flex: 1;
  background: white;
  padding-bottom: 20rpx;
  box-sizing: border-box;
  .goods{
    font-size: 26rpx;

  }
  .country{
    font-size: 22rpx;
    color: #999999;
  }
  .item{
    padding: 0 24rpx;
    display: flex;
    margin-bottom: 20rpx;
    .img-box{
      width: 180rpx;
      height: 180rpx;
      margin-right: 22rpx;
      .img{
        width: 100%;
        height: 100%;
        border-radius: 8rpx;
      }
    }
    .goods-info{
      flex: 1;
    }
    .title{
      font-size: 26rpx;
      margin-bottom: 8rpx;
      font-weight: bold;
    }
    .num{
      color: #999999;
      font-size: 22rpx;
    }
    .description{
      font-size: 22rpx;
      color: #666666;
      margin-bottom: 16rpx;
    }
    .price{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-price{
        font-size: 32rpx;
      }
      .unit{
        color: #999999;
        font-size: 22rpx;
      }
    }
  }
}
</style>