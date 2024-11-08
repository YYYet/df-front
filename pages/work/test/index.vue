<template>
	<view>
		
		123123123
		<button @click="test">Test</button>
	</view>
</template>

<script>
	import {
		queryWarehouse, queryTemplate
	} from '@/api/system/bill.js'
	import {
		getMaterialByTabV3
	} from '@/api/system/material.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			test(){
				getMaterialByTabV3(105454, 4, 1, 5).then(res=>{
					console.log("res", res)
				})
			}
		}
	}
</script>

<style>

</style>
