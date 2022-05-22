// export let BASE_URL = 'http://localhost:8097/note'
// export let BASE_URL = 'http://172.28.224.1:8097/note'
export let BASE_URL = 'http://106.55.42.110:8080/note'
import { encryptDes,decryptDes } from './des.js'
class Api {
	uploadFile(url, path, cb) {
		uni.showLoading({
			mask: true,
			title: '加载中'
		})
		uni.uploadFile({
			url: BASE_URL + url,
			filePath: path,
			header: {
				'token': uni.getStorageSync("token")
			},
			success(res) {
				if (res.statusCode !== 200) {
					uni.showToast({
						icon: 'none',
						title: '网络请求错误'
					})
					throw '500'
				}
				cb(JSON.parse(res.data))
			},
			fail(res) {
				console.log(res)
				uni.showToast({
					icon: 'none',
					title: res.errMsg
				})
			},
			complete(res) {
				uni.hideLoading()
			}
		})
	}
	
	async get(url, param) {
		for (let i in param) {
			if (param[i] == null || param[i].toString().trim() == '') delete param[i]
		}
		return this.request(url, param, 'GET')
	}

	async post(url, param) {
		return this.request(url, param, 'POST')
	}

	async put(url, param) {
		return this.request(url, param, 'PUT')
	}

	async del(url, param) {
		return this.request(url, param, 'DELETE')
	}

	async request(url, param, method) {
		let [error, res] = await uni.request({
			header: {
				'token': uni.getStorageSync("token")
			},
			method: method,
			data: {'data':encryptDes(JSON.stringify(param),'19970346')},
			url: BASE_URL + url
		})
		if (error) {
			uni.showToast({
				icon: 'none',
				title: '网络请求错误'
			})
		} else if (res.statusCode == 401) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
			throw '401'
		} else if (res.statusCode == 400) {
			uni.showToast({
				icon: 'none',
				title: '网络请求错误，请联系客服人员'
			})
			throw '400'
		} else if (res.statusCode == 409) {
			uni.showToast({
				icon: 'none',
				title: res.data.message
			})
			throw '409'
		} else if (res.statusCode != 200) {
			let msg = '服务器错误：'
			if (res.data) {
				msg += res.data.exception
			}
			uni.showToast({
				icon: 'none',
				title: msg
			})
			throw 'err'
		} else {
			console.log(res.data)
			if(res.data.code === "500"){
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}else{
				return decryptDes(res.data.data,'19970346')
			}
		}
	}
	
}

export default new Api()
