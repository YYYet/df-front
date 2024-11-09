<template>
  <view class="content">
    <movable-area class="movableArea">
      <movable-view class="movableView"
        :position="position"
        :x="x"
        :y="y"
        :direction="direction"
        :damping="damping"
        @change="onChange"
        @tap="onTap"
        @touchend="onTouchend">
        <image src="@/static/add.png" mode="widthFix" class="iconImage"></image>
      </movable-view>
    </movable-area>
  </view>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
      move: {
        x: 0,
        y: 0
      }
    };
  },
  props: {
    damping: {
      type: Number,
      default: 10
    },
    direction: {
      type: String,
      default: "all"
    },
    position: {
      type: Number,
      default: 4
    }
  },
  mounted() {
    uni.getSystemInfo({
      success: (res) => {
        this.x1 = 0;
        this.x2 = parseInt(res.windowWidth) - 50;
        this.y1 = 0;
        this.y2 = parseInt(res.windowHeight) - 20;
        setTimeout(() => {
          if (this.position == 1 || this.position == 2) this.y = parseInt(this.y2 * 0.2);
          if (this.position == 3 || this.position == 4) this.y = parseInt(this.y2 * 0.8);
          if (this.position == 1 || this.position == 3) this.x = parseInt(this.x1);
          if (this.position == 2 || this.position == 4) this.x = parseInt(this.x2);
          this.move.x = this.x;
          this.move.y = this.y;
        }, 1000)
      }
    })
  },
  methods: {
    onChange(e) {
      if (e.detail.source === "touch") {
        this.move.x = e.detail.x;
        this.move.y = e.detail.y;
      }
    },
    onTap(e) {
	  this.$emit("onTap", e)
    },
    onTouchend() {
      this.x = this.move.x;
      this.y = this.move.y;
      setTimeout(() => {
        if (this.move.x < this.x2 / 2) this.x = this.x1;
        else this.x = this.x2;
      }, 100)
    }
  },
};
</script>

<style scoped>
.content {
  position: relative;
  height: 100vh;
}
.movableArea {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}
.movableView {
  pointer-events: auto;
  width: 60rpx;
  height: 60rpx;
  padding: 10rpx;
  border-radius: 100%;
  border: 2px solid #33A3DC;
  background-color: #33A3DC;
}
.iconImage {
  display: block;
  width: 60rpx;
  height: 60rpx;
}
</style>