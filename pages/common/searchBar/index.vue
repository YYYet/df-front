<template>
  <uni-search-bar
      class="w-600 text-left search-bar flex-1"
      bgColor="rgba(0,0,0,0.04)"
      :placeholder="placeholder"
      v-model="searchText"
      clearButton="auto"
	  cancelButton="none"
      :readonly="readonly"
	  @focus="focusHandle"
      @confirm="searchHandle"
	  @input="inputHandle"
  />
</template>

<script>

export default {
  props:{
    cancelText:{
      type:String,
      default:'取消'
    },
    value:String,
    placeholder:{
      type:String,
      default:'输入关键词搜索'
    },
	readonly:{
	  type:Boolean,
	  default: false
	}
  },
  watch:{
    value:{
      handler(val){
        this.searchText = val
      },
      immediate:true
    }
  },
  data(){
    return{
      searchText:''
    }
  },
  methods:{
     inputHandle(e){
          this.$emit('input',e)
          // this.$emit('search',this.searchText)
     },
    clearHandle(){
      this.searchText = ''
      this.$emit('input',this.searchText)
      this.$emit('search',this.searchText)
    },
    cancelHandle(){
      this.searchText = ''
      this.$emit('input',this.searchText)
      this.$emit('search',this.searchText)
    },
    searchHandle(){
      this.$emit('input',this.searchText)
      this.$emit('search',this.searchText)
    },
    blurHandle(){
        this.$emit('blur',this.searchText)
    },
    focusHandle(){
        this.$emit('focus',this.searchText)
    }

  }
}
</script>

<style lang="scss">

</style>
