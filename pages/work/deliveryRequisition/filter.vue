<template>
	<view>
		<filterv1 :baseFormData="baseFormData"></filterv1>
	</view>
</template>

<script>
	import filterv1 from '../../common/filterv1/index.vue'
	export default {
			 components: {
				    // 注册组件
				    'filterv1': filterv1
				  },
		data() {
			return {
				baseFormData:{orderWarehouseList:["全部仓库","仓库1"]}
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
