<template>
  <view class="flex items-center">
      <view class="fcc btn-num reduce"
            @click.stop="reduce"
            v-if="numValue>0"
      >
          <view class="text"></view>
      </view>
      <view class="fs-28 num" v-if="numValue>0">{{ numValue }}</view>

      <view class="fcc btn-num increase" @click.stop="increase">
          <uni-icons type="plusempty" size="16" color="white"></uni-icons>
      </view>
  </view>
</template>

<script>
export default {
  props:{
    value:{
      type:Number,
      default:0
    },
    max:{
      type:Number,
      default:10000
    },
    min:{
      type:Number,
      default:0
    }
  },
  watch:{
    value:{
      handler(value){

        this.numValue = value
      },
      immediate:true
    },
  },
  data(){
    return{
      numValue:0
    }
  },
  methods:{
    reduce(){
      if(this.numValue<=this.min){

      }else {
        this.numValue --
      }

      this.$emit('input',this.numValue)
      this.$emit('change',this.numValue)
    },
    increase(){
      this.numValue ++
      this.$emit('change',this.numValue)
      if(this.numValue>this.max){
        this.numValue = this.max
      }
      this.$emit('input',this.numValue)
    }
  }
}
</script>

<style lang="scss" scoped>
$theme-color:#fd545b;
.btn-num{
  width: 42rpx;
  height: 42rpx;
  border: 1px solid $theme-color;
  border-radius: 50%;
}
.reduce{
  color: $theme-color;
  margin-right: 20rpx;
  .text{
    width: 24rpx;
    height: 4rpx;
    background: $theme-color;
  }
}
.w-48{
	width: 48rpx;
}
.mx-20{
  margin: 0 20rpx;
}
.h-48{
	height: 48rpx;
}
.fs-28{
	font-size: 28rpx;
}
.reduce{
  color: $theme-color;
  .text{
    width: 24rpx;
    height: 4rpx;
    background: $theme-color;
  }
}
.fcb{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.fcc{
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex{
	display: flex;
}
.items-center{
	align-items: center;
}
.increase{
  color: white;
  background: $theme-color;
}
.btn-num{
  margin-left: 20rpx;

}
</style>
