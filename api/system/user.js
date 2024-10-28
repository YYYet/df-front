import upload from '@/utils/upload'
import request from '@/utils/request'

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 查询用户配送申请单模板信息Delivery application template information
export function getDeliveryApplicationTemplateInformationByUserOrg() {
  return request({
    url: '/system/user/deliveryApplicationTemplateInformationByUserOrg',
    method: 'get'
  })
}

// 查询订货仓库
export function getOrderWarehouseByUserOrg() {
  return request({
    url: '/system/user/orderWarehouseByUserOrg',
    method: 'get'
  })
}

// 查询配送中心
export function getDistributionCenterByUserOrg() {
  return request({
    url: '/system/user/distributionCenterByUserOrg',
    method: 'get'
  })
}
// 查询经办人
export function getAgentByUserOrg() {
  return request({
    url: '/system/user/agentByUserOrg',
    method: 'get'
  })
}

// 查询配送方式
export function getDeliveryMethodNameByUserOrg() {
  return request({
    url: '/system/user/deliveryMethodNameByUserOrg',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/system/user/profile/avatar',
    name: data.name,
    filePath: data.filePath
  })
}
