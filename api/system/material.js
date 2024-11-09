import request from '@/utils/request'

// 查询物料tab信息
export function getMaterialTabs() {
  return request({
    url: '/system/material/getTabs',
    method: 'get'
  })
}
export function getMaterialTabsByGroupId(groupId) {
	console.log("groupId", groupId)
  return request({
    url: '/system/material/getTabs?pid='+groupId,
    method: 'get'
  })
}

export function getMaterialByTab(groupId, page, pageSize) {
  return request({
    url: '/system/material/getMaterialByTabV2?groupId='+groupId+"&page="+page+"&pageSize="+pageSize,
    method: 'get'
  })
}

export function getMaterialByTabV3(groupId, billNo, page, pageSize) {
  return request({
    url: '/system/material/getMaterialByTabV3?groupId='+groupId+"&billNo="+billNo+"&page="+page+"&pageSize="+pageSize,
    method: 'get'
  })
}

export function getMaterialByName(name, page, pageSize) {
  return request({
    url: '/system/material/getMaterialByNameV2?name='+name+"&page="+page+"&pageSize="+pageSize,
    method: 'get'
  })
}



export function getMaterialByNameV2(name, billNo, page, pageSize) {
	
  return request({
    url: '/system/material/getMaterialByNameV3?name='+name+"&billNo="+billNo+"&page="+page+"&pageSize="+pageSize,
    method: 'get'
  })
}
export function getMaterialAddedV2(page, pageSize) {
	
  return request({
    url: '/system/material/getMaterialAddedV2?&page='+page+"&pageSize="+pageSize,
    method: 'get'
  })
}

export function addOrUpDateShopV2(item) {
 //     private Integer createOrgId;
    // private Integer groupId;
    // private String name;
    // private String id;
    // private String number;
    // private Integer nums;
    // private Integer unit;
    // private Integer useOrgId;

  return request({
    url: '/system/material/addOrUpDateShopV2',
    method: 'post',
	data: item
  })
}

export function clearShopV2(page, pageSize) {
	
  return request({
    url: '/system/material/clearShopV2',
    method: 'get'
  })
}