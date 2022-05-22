<template>
	<view>
		<view class="main-box" @longpress="openChoose()">
			<image class="image-style" :src="appli.url?appli.url:'/static/logo.png'"></image>
			<view>
				<view class="name-style">{{appli.application}}</view>
				<view class="password-style">账户：{{appli.username}}</view>
				<view class="password-style">密码：{{appli.password}}</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="choose-style" v-show="choose">
			<view style="line-height: 48rpx;" @click="updatePass(appli)">修改</view>
			<view style="line-height: 48rpx;" @click="deletePass(appli)">删除</view>
		</view>

		<uni-popup ref="popup" :mask-click="false" type="bottom" :animation="false">
			<view class="pop-style">
				<uni-forms ref="form" :modelValue="formData" :rules="rules">
					<uni-forms-item label="账户" name="name">
						<uni-easyinput type="text" v-model="appli.username" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="密码" name="email">
						<input class="input" v-model="appli.password" type="text" placeholder="请输入用户名"
							@input="binddata('email',appli.password)" />
					</uni-forms-item>
				</uni-forms>
				<button @click="submit">提交</button>
			</view>
		</uni-popup>
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
			openChoose() {
				this.choose = true
			},
			deletePass(data) {
				// console.log(data)
				let param ={
					id:data.id
				}
				this.$api.post('/app/application/deletePass',param).then((res)=>{
					console.log(res)
					if(res){
						this.choose = false
						uni.showToast({
							icon:'none',
							title:'删除成功'
						})
						this.$emit('delete','delete')
					}
				})
			},
			updatePass(data) {
				this.open()
				console.log(data)
			},
			open() {
				this.$refs.popup.open('top')
				this.choose = false
			},
			close() {
				this.$refs.popup.close()
			},
			submit(){
				
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
		width: 100rpx;
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
