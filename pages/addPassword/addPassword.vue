<template>
	<view class="main-password-add">
		<!-- <form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item">
				<view class="title">
					<view class="warning-style">*</view>
					APP名称
				</view>
				<input class="uni-input input-style" v-model="object.application" placeholder="输入app名称" />
				<view v-show="applicatinShow" class="warning-font-style">
					APP名称不能为空
				</view>
			</view>
			<gline class="line"></gline>
			<view class="uni-form-item">
				<view class="title">
					<view class="warning-style">*</view>
					账户
				</view>
				<input class="uni-input input-style" v-model="object.username" placeholder="输入账户" />
				<view v-show="userShow" class="warning-font-style">
					账户不能为空
				</view>
			</view>
			<gline class="line"></gline>
			<view class="uni-form-item">
				<view class="title">
					<view class="warning-style">*</view>
					密码
				</view>
				<input :password="true" class="uni-input input-style" v-model="object.password" placeholder="输入密码" />
				<view v-show="passwordShow" class="warning-font-style">
					密码不能为空
				</view>
			</view>
			<gline class="line"></gline>
			<view class="uni-form-item">
				<view class="title">
					备注
				</view>
				<textarea class="text-area-style" @input="remarkInput" v-model="object.remark" placeholder="备注" maxlength="200"></textarea>
				<view class="bottom-styles">{{start}}/200</view>
			</view>
			<gline class="line"></gline>
			<view class="uni-btn-v button-style">
				<button :loading="loading" type="primary" size="100" form-type="submit">保存</button>
			</view>
		</form> -->
		<u--form :model="object" ref="uForm">
			<u-form-item :required="true" label="应用" prop="application">
				<u-input :clearable="true" v-model="object.application" />
			</u-form-item>
			<u-form-item :required="true" label="账户" prop="username">
				<u-input :clearable="true" v-model="object.username" />
			</u-form-item>
			<u-form-item :required="true" label="密码" prop="password">
				<u-input :clearable="true" v-model="object.password" />
			</u-form-item>
			<u-form-item label="备注">
				<!-- <u-input type="textarea" :clearable="true" v-model="object.remark" /> -->
				<u--textarea :maxlength="300" v-model="object.remark" placeholder="请输入内容" count></u--textarea>
			</u-form-item>
			<u-form-item label="logo">
				<u-upload :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3" multiple
					:maxCount="1" :previewFullImage="true"></u-upload>
			</u-form-item>

		</u--form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	import {BASE_URL} from '../../utils/api.js'
	import gline from "../../components/g-line.vue"
	export default {
		components: {
			gline
		},
		data() {
			return {
				applicatinShow: false,
				userShow: false,
				passwordShow: false,
				object: {
					application: '',
					username: '',
					password: '',
					remark: '',
					logo: [{}]
				},
				loading: false,
				start: 0,
				fileList3: [],
				rules: {
					application: [{
						required: true,
						message: '请输入应用名',
						trigger: ['blur', 'change']
					}],
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: ['blur', 'change']
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}]
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			if(option.id){
				this.object = option
			}
		},
		methods: {
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: BASE_URL+'/note/file/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							console.log(res)
							this.fileList3[0].url=res.data
							this.object.logo = res.data
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			formSubmit: function(e) {
				console.log(e)
				this.loading = true
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// this.object = JSON.parse(JSON.stringify(e.detail.value))
				console.log(this.object.password)
				if (this.object.application === '') {
					this.applicatinShow = true
				} else {
					this.applicatinShow = false
				}
				if (this.object.username === '') {
					this.userShow = true
				} else {
					this.userShow = false
				}
				if (this.object.password === '') {
					this.passwordShow = true
				} else {
					this.passwordShow = false
				}
				if (this.applicatinShow === false && this.userShow === false && this.passwordShow === false) {
					this.$api.post('/app/application/save', this.object).then((res) => {
						console.log(res)
						if (res) {
							uni.showToast({
								icon: 'none',
								title: '保存成功'
							})
							this.loading = false
							//清空数据
							this.object = {
								application: '',
								username: '',
								password: ''
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res
							})
						}
					})
				} else {
					this.loading = false
				}
				/* uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				}); */
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			remarkInput() {
				this.start = this.object.remark.length
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
					this.$api.post('/app/application/save', this.object).then((res) => {
						console.log(res)
						if (res) {
							uni.showToast({
								icon: 'none',
								title: '保存成功'
							})
							this.loading = false
							//清空数据
							this.object = {
								application: '',
								username: '',
								password: '',
								remark:'',
								logo:''
							}
							this.fileList3 = []
						} else {
							uni.showToast({
								icon: 'none',
								title: res
							})
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-password-add {
		margin: 0 32rpx;

		.uni-form-item {
			padding: 0 32rpx;
			position: relative;

			.title {
				padding: 20rpx 0;
				display: flex;
				flex-direction: row;

				.warning-style {
					color: #E04B28;
				}
			}

			.input-style {}

			.input-styles {
				min-height: 100rpx;
			}

			.warning-font-style {
				font-size: 20rpx;
				color: #E04B28;
			}

			.text-area-style {
				border: solid;
				border-radius: 8rpx;
				border-color: #dadada;
				border-width: 2rpx;
				padding: 10rpx 16rpx;
				width: 95%;
			}

			.bottom-styles {
				position: absolute;
				right: 40rpx;
				bottom: 10rpx;
				color: grey;
				font-size: 20rpx;
			}
		}

		.line {
			margin-top: 10rpx;
		}

		.button-style {
			margin: 200rpx 32rpx;
		}
	}
</style>
