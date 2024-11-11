<template>
	<view>
		<z-paging ref="cardSearchPaging" use-virtual-list @query="queryList" v-model="dataList">
			<template #top>
				<SearchBar :readonly="false" @input="input"></SearchBar>
			</template>

			<template #cell="{item,index}">
				<uni-card>
					<MaterialInfo :item="item" :currentIndex="index" :needCheckButton="true" 
					:checkButtonDefaultChecked="!checkChecked(item) || newChecked[item.id] != undefined"
					:checkButtonDefaultDisabled="!checkChecked(item)"
						@numberComputed="numberComputed" @checkBox="checkBox" ></MaterialInfo>
				</uni-card>
			</template>
		</z-paging>
		<uni-fab ref="fab" class="custom-fab-add" horizontal="right" vertical="bottom" @fabClick="fabClick"  />
	</view>
</template>

<script>
	import SearchBar from '@/pages/common/searchBar/index.vue'
	import MaterialInfo from "@/pages/common/material-info/index.vue"
	import {
		getMaterialByName,
		getMaterialByNameV2,
		addOrUpDateShopV2
	} from '@/api/system/material.js'
	export default {
		components: {
			'MaterialInfo': MaterialInfo,
			'SearchBar': SearchBar
		},
		data() {
			return {
				dataList: [],
				cacheMap: {},
				checked: {},
				newChecked: {},
				currentTempNo: "",
				searchText: ""
			}
		},
		onLoad(intent) {
			console.log("intent", intent)
			this.currentTempNo = intent.currentTempNo
			console.log("this.currentTempNo", this.currentTempNo)
	
		
		},
		mounted() {
			
		},
		onShow() {
		
			let billEntry = uni.getStorageSync("billEntry");
			console.log("billEntry", billEntry)
			for (var i = 0; i < billEntry.length; i++) {
				let entry = billEntry[i];
				this.$set(this.checked, entry.materialId, entry);
				// this.checked[entry.id] = entry; 
			}
			console.log("checked", this.checked)
		},
		created() {

		},
		dataList: {
			handler(newVal) {

			},
			immediate: true
		},
		methods: {
			fabClick(){
				console.log("选中的集合", this.newChecked)
				uni.$emit("selectUpdateMaterial", this.newChecked)
				this.$tab.navigateBack();
			},
			checkChecked(item){
				return this.checked[item.id] == undefined;
			},
			checkBox(checked, item) {
				console.log('checked', checked, item);
				if (checked) {
					this.newChecked[item.id] = item;
				} else {
					// this.checked[item.id] = undefined;
					delete this.newChecked[item.id];
					// this.$delete(this.checked, item.id);
				}
				console.log("this.checked", this.checked)
				console.log("newChecked", this.newChecked)
			},
			input(txt) {
				this.searchText = txt
				this.$refs.cardSearchPaging.reload()
			},
			queryList(pageNo, pageSize) {
				console.log("搜索物品页面 queryList", pageNo, pageSize)
				// let cacheMap = this.$store.state.data.cacheMap;
				if (this.searchText == "") {
					return
				}
				getMaterialByNameV2(this.searchText, this.currentTempNo, pageNo, pageSize).then(res => {
					var list = res.result;
			
					this.$refs.cardSearchPaging.complete(list)
				}).catch(res => {
					this.$refs.cardSearchPaging.complete(false);
				})

			},
			itemClick(item) {
				console.log('点击了', item.name);
			},
			numberComputed(val, index, item) {
				item.nums = val
				uni.$emit('selectUpdateMaterial', val, index, item)
			}
		}
	}
</script>

<style>
  .custom-fab-add ::v-deep.uni-icons.uniui-plusempty.fab-circle-icon {
  		font-size: 0 !important;
  	}
  
  .custom-fab-add ::v-deep.uniui-plusempty:before {
  		content: "新增" !important;
  		font-size: 16px;
  		color: #fff;
  		font-weight: bold;
  }
</style>