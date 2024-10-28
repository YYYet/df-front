<template>
  <uni-search-bar
      class="w-600 text-left search-bar flex-1"
      bgColor="rgba(0,0,0,0.04)"
      @confirm="searchHandle"
      :placeholder="placeholder"
      v-model="searchText"
      cancelText="取消"
      @blur="blurHandle"
      @input="inputHandle"
      @cancel="cancelHandle"
      @clear="clearHandle"
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
     inputHandle(){

          this.$emit('input',this.searchText)
          this.$emit('search',this.searchText)
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
    }

  }
}
</script>

<style lang="scss">

</style>
