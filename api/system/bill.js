import request from '@/utils/request'

export function getApplyGood(status, page, pageSize) {
	
  return request({
    url: '/system/applyGoods/page?page='+page+"&pageSize="+pageSize+"&status="+status,
    method: 'get'
  })
}
export function auditApplyGoodBill(billNumberList) {
  return request({
    url: '/system/applyGoods/auditBill',
    method: 'post',
	data: {"numberList":billNumberList}
  })
}
export function unAuditApplyGoodBill(billNumberList) {
  return request({
    url: '/system/applyGoods/unAuditBill',
    method: 'post',
	data: {"numberList":billNumberList}
  })
}
export function getApplyGoodByCondition(condition, status, page, pageSize) {
	
  return request({
    url: '/system/applyGoods/conditionPage?condition='+window.btoa(encodeURIComponent(condition))+"&status="+status+"&page="+page+"&pageSize="+pageSize,
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
  export function updateApplyGood(data) {
    return request({
      url: '/system/applyGoods/updateBill',
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
