export default {
	// 关闭所有页面，打开到应用内的某个页面
	reLaunch(url) {
		return uni.reLaunch({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	},
	// 跳转到tabBar页面，并关闭其他所有非tabBar页面
	switchTab(url) {
		return uni.switchTab({
			url: url
		})
	},
	// 关闭当前页面，跳转到应用内的某个页面
	redirectTo(url) {
		return uni.redirectTo({
			url: url
		})
	},
	// 保留当前页面，跳转到应用内的某个页面
	navigateTo(url) {
		return uni.navigateTo({
			url: url
		})
	},
	// 关闭当前页面，返回上一页面或多级页面
	navigateBack() {
		return uni.navigateBack()
	},

	navigateBackPage(pages) {
		return uni.navigateBack({
			delta: pages // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
		});
	}
}