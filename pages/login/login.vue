<template>
	<view class="content">
		<image class="logo" src="../../static/huafei.jpg"></image>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item">
				<view class="title">
					<view class="warning-style">*</view>
					账户
				</view>
				<input class="uni-input input-style" name="userName" placeholder="输入账户" />
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
				<input :password="true" class="uni-input input-style" name="password" placeholder="输入密码" />
				<view v-show="passwordShow" class="warning-font-style">
					密码不能为空
				</view>
			</view>
			<gline class="line"></gline>
			<view class="uni-btn-v button-style">
				<button :loading="loading" type="primary" size="100" form-type="submit">登录</button>
				<!-- <button type="default" form-type="reset">Reset</button> -->
			</view>
		</form>
	</view>
</template>

<script>
	import gline from "../../components/g-line.vue"
	export default {
		components:{
			gline
		},
		data() {
			return {
				userShow:false,
				passwordShow:false,
				object:{},
				loading:false
			}
		},
		methods: {
			formSubmit: function(e) {
				this.loading = true
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				this.object = JSON.parse(JSON.stringify(e.detail.value))
				console.log(this.object.password)
				if(this.object.userName === ''){
					this.userShow = true
				}else{
					this.userShow = false
				}
				if(this.object.password === ''){
					this.passwordShow = true
				}else{
					this.passwordShow = false
				}
				if(this.userShow === false && this.passwordShow === false){
					this.$api.post('/sys/app/login',this.object).then((res)=>{
						console.log(res)
						let response = JSON.parse(res)
						if(response.code === '0000'){
							uni.setStorageSync('token',response.result.token)
							uni.showToast({
								icon:'none',
								title:'登录成功'
							})
							this.loading = false
							uni.redirectTo({
								url:'../index/index'
							})
						}else{
							uni.showToast({
								icon:'none',
								title:response.result
							})
						}
					})
				}else{
					this.loading = false
				}
				/* uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				}); */
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.uni-form-item {
		padding: 0 32rpx;
		
		.title {
			padding: 20rpx 0;
			display: flex;
			flex-direction: row;
			
			.warning-style{
				color: #E04B28;
			}
		}
		
		.input-style{
			
		}
		
		.warning-font-style{
			font-size: 20rpx;
			color: #E04B28;
		}
	}
	
	.line{
		margin-top: 10rpx;
	}
	
	.button-style{
		margin-top: 200rpx;
	}
</style>
