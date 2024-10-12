const TokenKey = 'App-Token'
const CookieKey = 'App-Cookie'

export function getCookies() {
  return uni.getStorageSync(CookieKey)
}

export function setCookies(cookie) {
  return uni.setStorageSync(CookieKey, cookie)
}

export function removeCookies() {
  return uni.removeStorageSync(CookieKey)
}

export function getToken() {
  return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
  return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
  return uni.removeStorageSync(TokenKey)
}
