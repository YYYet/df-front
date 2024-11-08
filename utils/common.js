/**
* 显示消息提示框
* @param content 提示的标题
*/
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}

/**
* 显示模态弹窗
* @param content 提示的标题
*/
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        resolve(res)
      }
    })
  })
}

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}


export function formatBillStatus(status) {
		const map = [
					[
						()=> status=='A' || status=='D' ||status=='Z' || status=='B',
						()=> "暂存"
					],
					[
						()=> status=='C',
						()=> "已提交"
					],
				]
		const target = map.find((m)=>m[0]());
		if(target){
			return target[1]();
		}else{
			return "未知类型";
		}		
}


export function  formatDateV2(value){
			if (value) {
			  const date = new Date(value);
			  return `${date.getMonth() + 1}/${date.getDate()}`;
			}
	  }