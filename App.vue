
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
	 //  if (this.$dd.env.platform !== "notInDingTalk") {
		// let style = document.createElement('style');
		// style.type = 'text/css';
		// style.innerHTML = "uni-page-head,.uni-page-head{display:none;}";
		// document.getElementsByTagName('head').item(0).appendChild(style);
	 //  }
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
  @import "@/uni_modules/uview-ui/index.scss";
  @import '@/static/scss/index.scss';
  @import '@/static/scss/animations.scss';
  @import '@/static/css/animate.min.css';
  
  
  .custom-fab-add ::v-deep.uni-icons.uniui-plusempty.fab-circle-icon {
  		font-size: 0 !important;
  	}
  
  .custom-fab-add ::v-deep.uniui-plusempty:before {
  		content: "新增" !important;
  		font-size: 16px;
  		color: #fff;
  		font-weight: bold;
  }

  .custom-fab-submit ::v-deep.uni-icons.uniui-plusempty.fab-circle-icon {
  		font-size: 0 !important;
  	}
  
  .custom-fab-submit ::v-deep.uniui-plusempty:before {
  		content: "提交" !important;
  		font-size: 16px;
  		color: #fff;
  		font-weight: bold;
  }

  .custom-fab-undo ::v-deep.uni-icons.uniui-plusempty.fab-circle-icon {
  		font-size: 0 !important;
  	}
  
  .custom-fab-undo ::v-deep.uniui-plusempty:before {
  		content: "撤销" !important;
  		font-size: 16px;
  		color: #fff;
  		font-weight: bold;
  }
  
  .custom-fab-update ::v-deep.uni-icons.uniui-plusempty.fab-circle-icon {
  		font-size: 0 !important;
  	}
  
  .custom-fab-update ::v-deep.uniui-plusempty:before {
  		content: "更新" !important;
  		font-size: 16px;
  		color: #fff;
  		font-weight: bold;
  }
   
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
