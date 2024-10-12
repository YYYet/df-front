<template>
  <view class="container">
    <uni-list>
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'person-filled'}" title="姓名" :rightText="user.userName" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'phone-filled'}" title="手机号码" :rightText="user.phone" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'email-filled'}" title="邮箱" :rightText="user.email" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'auth-filled'}" title="岗位" :rightText="postGroup" />
      <!-- <uni-list-item showExtraIcon="true" :extraIcon="{type: 'staff-filled'}" title="角色" :rightText="roleGroup" /> -->
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'calendar-filled'}" title="创建日期" :rightText="user.joinDate" />
    </uni-list>
  </view>
</template>

<script>
  import { getUserProfile } from "@/api/system/user"

  export default {
    data() {
      return {
        user: {},
        roleGroup: "",
        postGroup: ""
      }
    },
    onLoad() {
      this.getUser()
    },
    methods: {
      getUser() {
		      this.$store.dispatch('GetInfo').then(res => {
				  this.user = res.user 
			  })
        // getUserProfile().then(response => {
        //   this.user = response.data
        //   this.roleGroup = response.roleGroup
        //   this.postGroup = response.postGroup
        // })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }
</style>
