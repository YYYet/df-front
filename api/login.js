import request from '@/utils/request'

// 登录方法
export function login(username, password, rememberme) {
  const data = {
    username,
    password,
    rememberme
    
  }
  return request({
    'url': '/login',
    headers: {
      isToken: false
    },
    'method': 'post',
    'data': data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
	  headers: {
	    isToken: true
	  },
    'url': '/getInfo',
    'method': 'get'
  })
}
// 获取用户详细信息
export function getPermissions() {
  return request({
	  headers: {
	    isToken: true
	  },
    'url': '/getPermissions',
    'method': 'get'
  })
}
// 退出方法
export function logout() {
  return request({
    'url': '/logout',
    'method': 'get'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    'url': '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
