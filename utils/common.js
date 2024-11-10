import {
	login
} from "../api/login"

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
		if (value !== null && value !== "" && typeof(value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
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
			() => status == 'A' || status == 'D' || status == 'Z' || status == 'B',
			() => "暂存"
		],
		[
			() => status == 'C',
			() => "已提交"
		],
	]
	const target = map.find((m) => m[0]());
	if (target) {
		return target[1]();
	} else {
		return "未知类型";
	}
}


export function formatDateV2(value) {
	if (value) {
		const date = new Date(value);
		return `${date.getMonth() + 1}-${date.getDate()}`;
	}
}

export function calculateLayoutHeight(id1, id2) {
	const query = uni.createSelectorQuery();
	let rect1 = {
		left: 0,
		top: 0,
		width: 0,
		height: 0
	};
	let rect2 = {
		left: 0,
		top: 0,
		width: 0,
		height: 0
	};
	query.select('#' + id1).boundingClientRect(rect => {
		// "rect1" = { left: x1, right: x1 + width1, top: y1, bottom: y1 + height1, width: width1, height: height1 }
		rect1 = rect;
	});

	query.select('#' + id2).boundingClientRect(rect => {
		// rect2 = { left: x2, right: x2 + width2, top: y2, bottom: y2 + height2, width: width2, height: height2 }
		rect2 = rect;
	});
	query.exec();
	// console.log("rect1", rect1, "rect2", rect2)
	// 计算两个控件之间的水平和垂直距离
	const horizontalDistance = Math.abs(rect1.left - rect2.left);
	const verticalDistance = Math.abs(rect1.top - rect2.top);
	// 计算两点之间的欧几里得距离
	// const distance = Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2));
	const distance = rect2.top - rect1.bottom;
	// console.log('两个控件之间的显示距离是：', distance);
	return distance;
}

export function isChinese(value) {
const reg = /^[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]+$/;
  return reg.test(str);
}