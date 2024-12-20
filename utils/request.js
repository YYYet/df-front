import store from '@/store'
import config from '@/config'
import { getToken,getCookies } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'

let timeout = 10000
const baseUrl = config.baseUrl

const request = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (getToken() && !isToken) {
    config.header['token'] = getToken()
  }

  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
	  // uni.showLoading({
	  //   title: "加载中",
	  //   icon: 'none'
	  // })
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout ||  timeout,
        url: config.baseUrl || baseUrl + config.url,
        data: config.data,
        header: config.header,
		enableCookie: true,
        dataType: 'json'
      }).then(response => {
		 // uni.hideLoading()
        let [error, res] = response
        if (error) {
          toast('后端接口连接异常')
          reject('后端接口连接异常')
          return
        }
	
        const code = res.data.code || 200
        // const msg = errorCode[code]|| res.msg || res.data.msg || errorCode['default']
		  const msg =  res.data.msg 
		  	console.log("Promise response", response, res)
        if (code === 401) {
          showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
            if (res.confirm) {
              store.dispatch('LogOut').then(res => {
                uni.reLaunch({ url: '/pages/login' })
              })
            }
          })
          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          // toast(msg)
		  showConfirm(msg).then(res => {
		    if (res.confirm) {
		
		    }
		  })
          reject('500')
        } else if (code === 408) {
			showConfirm(msg).then(res => {
			  if (res.confirm) {
				uni.reLaunch({ url: '/pages/login' })
			  }
			})
		   reject(msg)
		}else if (code !== 200) {
          toast(msg)
          reject(code)
        }
        resolve(res.data)
      })
      .catch(error => {
			 // uni.hideLoading()
        let { message } = error
        if (message === 'Network Error') {
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast(message)
        reject(error)
      })
  })
}

export default request
