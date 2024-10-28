<script>
  import config from './config'
  import store from '@/store'
  import { getToken } from '@/utils/auth'

  export default {
	    data() {
	      return {
	        isPageVisible: true
	      };
	    },
    onLaunch: function() {
      this.initApp()
    },
	
    methods: {
	  togglePageVisibility() {
	      this.isPageVisible = !this.isPageVisible;
	      const animationClass = this.isPageVisible ? 'slide-in-from-right' : '';
	      document.body.className = animationClass;
	    },
		 mounted() {
		    this.togglePageVisibility();
		  },
      // 初始化应用
      initApp() {
        // 初始化应用配置
        this.initConfig()
        // 检查用户登录状态
        //#ifdef H5
        this.checkLogin()
        //#endif
      },
      initConfig() {
        this.globalData.config = config
      },
      checkLogin() {
        if (!getToken()) {
          this.$tab.reLaunch('/pages/login') 
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/static/scss/index.scss';
  @import '@/static/scss/animations.scss';

</style>
