import request from '@/utils/request'

export function getApplyGood(status, page, pageSize) {
	
  return request({
    url: '/system/applyGoods/page?page='+page+"&pageSize="+pageSize+"&status="+status,
    method: 'get'
  })
}

export function queryApplyGood(billNumber) {
  return request({
    url: '/system/applyGoods/queryBill?billNumber='+billNumber,
    method: 'get'
  })
}

  export function saveApplyGood(data) {
    return request({
      url: '/system/applyGoods/saveBill',
      method: 'post',
	  data: data
    })
  }

export function queryWarehouse() {
  return request({
    url: '/system/warehouse/queryWarehouse',
    method: 'get'
  })
}

export function queryTemplate() {
  return request({
    url: '/system/template/queryTemplate',
    method: 'get'
  })
}
