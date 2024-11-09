
<script>
  import config from './config'
  import store from '@/store'
  import { getToken } from '@/utils/auth'
	import pageAnimation from './components/page-animation'

  export default {
		mixins: [pageAnimation],
	
	    data() {
	      return {
	        isPageVisible: true,
			showLoadingForDom: false
	      };
	    },
    onLaunch: function() {

      this.initApp()
    },

    methods: {
		
	  formatDateV2(value){
			if (value) {
			  const date = new Date(value);
			  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			}
	  },
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
  @import '@/static/css/animate.min.css';
  
    .loading {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  
radio .wx-radio-input {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #d9d9d9;
  background-color: #fff;
}
 
radio .wx-radio-input::after {
  width: 20px;
  height: 20px;
  display: block;
  content: '';
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}
 
radio .wx-radio-input:checked::after {
  transform: translateX(50%) translateY(50%) scale(0.6);
  background-color: #09BB07;
}



</style>
