<template>
		<view :style="{height:isShow?H+'px':0,overflow: 'hidden',transition:'all 0.5s cubic-bezier(0.25, 1.0, 0.25, 1.0)'}">
			<view class="menuitem" v-for="(item,index) in menuItem" :key="index"
			:class="{'current': currentIndex === index}"
			 @click.stop="itemClick(item.name,index)">
				{{item.name}}
			</view>
		</view>
</template>
:cs="{}"

<script>
	export default {
		name:"secondMenu",
		data() {
			return {
				isShow:false,
				currentIndex:-1
			};
		},
		props:['menuItem'],
		computed:{
			H(){
				return this.menuItem.length * 50
			}
		},
		methods:{
			itemClick(name,index){
				console.log('触发'+name)
				this.currentIndex = index
				this.$emit('itemClick',name)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menuitem{
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.current {
		background-color: #fff;
		color: #00A0DC;
	}
</style>
