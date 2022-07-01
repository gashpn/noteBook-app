<template>
	<view>
		<view class="main-box" @longpress="openChoose()">
			<image class="image-style" :src="appli.logo?appli.logo:'/static/logo.png'"></image>
			<view>
				<view class="name-style">{{appli.application}}</view>
				<view class="password-style font-blue">账户：{{appli.username}}</view>
				<!-- <view class="password-style">密码：{{appli.password}}</view> -->
				<u--input style="margin-left: -14rpx;" border="false" :disabled="true" disabledColor="#FFFFFF" :value="appli.password" :password="password">
					<template slot="suffix">
						<!-- <u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取哈哈哈"></u-code> -->
						<!-- <u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button> -->
						<u-icon v-if="!password" name="eye-off" color="#828282" size="20" @click="password=true"></u-icon>
						<u-icon v-if="password" name="eye" color="#828282" size="20" @click="password=false"></u-icon>
					</template>
				</u--input>
				<view class="password-style font-grey">备注：{{appli.remark}}</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="choose-style" v-show="choose">
			<view style="line-height: 64rpx;" @click="updatePass(appli)">修 改</view>
			<view style="line-height: 64rpx;" @click="deletePass(appli)">删 除</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			/* url:{
				type:String,
				default:'/static/logo.png'
			},
			applicationName:{
				type:String,
				default:'应用'
			},
			password:{
				type:String,
				default:'654321'
			} */
			appli: {
				type: Object,
				default: {
					url: '/static/logo.png',
					applicationName: '应用',
					username: '123456',
					password: '654321'
				}
			}
		},
		data() {
			return {
				password:true,
				choose: false,
				formData: {
					name: 'LiMing',
					email: 'dcloud@email.com'
				},
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对email字段进行必填验证
					email: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					}
				}
			}
		},
		methods: {
			getPasswordDetail(){
				this.$api.post('/app/application/deletePass', param).then((res) => {
					console.log(res)
					if (res) {
						this.choose = false
						uni.showToast({
							icon: 'none',
							title: '删除成功'
						})
						this.$emit('delete', 'delete')
					}
				})
			},
			openChoose() {
				this.choose = true
			},
			deletePass(data) {
				// console.log(data)
				let param = {
					id: data.id
				}
				this.$api.post('/app/application/deletePass', param).then((res) => {
					console.log(res)
					if (res) {
						this.choose = false
						uni.showToast({
							icon: 'none',
							title: '删除成功'
						})
						this.$emit('delete', 'delete')
					}
				})
			},
			updatePass(data) {
				this.open(data)
				console.log(data)
			},
			open(data) {
				uni.navigateTo({
					url:'/pages/addPassword/addPassword?id='+data.id+'&application='+data.application+'&username='+data.username+'&password='+data.password+'&remark='+data.remark+'&logo='+data.logo
				})
			},
			submit() {

			}
		}
	}
</script>

<style scoped lang="scss">
	.main-box {
		margin: 20rpx 32rpx;
		display: flex;
		flex-direction: row;

		.image-style {
			height: 100rpx;
			width: 100rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}

		.name-style {
			margin-bottom: 10rpx;
			font-size: 32rpx;
		}

		.password-style {
			font-size: 24rpx;
		}
	}

	.line {
		height: 0.5rpx;
		background-color: #dadada;
		margin: 0 32rpx;
	}

	.choose-style {
		z-index: 999;
		position: absolute;
		width: 180rpx;
		background-color: #dadada;
		text-align: center;
		margin-left: 400rpx;
		border-radius: 10rpx;
		margin-top: -100rpx;
	}

	.pop-style {
		height: 600rpx;
		background-color: #FFFFFF;
	}
</style>
