<template>
	<view class="main-password-add">
		<form @submit="formSubmit" @reset="formReset">
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
				<!-- <input :password="false" class="uni-input input-styles" v-model="object.remark" maxlength="-1" placeholder="备注" /> -->
				<textarea class="text-area-style" @input="remarkInput" v-model="object.remark" placeholder="备注" maxlength="200"></textarea>
				<view class="bottom-styles">{{start}}/200</view>
			</view>
			<gline class="line"></gline>
			<view class="uni-btn-v button-style">
				<button :loading="loading" type="primary" size="100" form-type="submit">保存</button>
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
				applicatinShow:false,
				userShow:false,
				passwordShow:false,
				object:{
					application:'',
					username:'',
					password:'',
					remark:''
				},
				loading:false,
				start:0,
				
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log(e)
				this.loading = true
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// this.object = JSON.parse(JSON.stringify(e.detail.value))
				console.log(this.object.password)
				if(this.object.application===''){
					this.applicatinShow = true
				}else{
					this.applicatinShow = false
				}
				if(this.object.username === ''){
					this.userShow = true
				}else{
					this.userShow = false
				}
				if(this.object.password === ''){
					this.passwordShow = true
				}else{
					this.passwordShow = false
				}
				if(this.applicatinShow === false && this.userShow === false && this.passwordShow === false){
					this.$api.post('/app/application/save',this.object).then((res)=>{
						console.log(res)
						if(res){
							uni.showToast({
								icon:'none',
								title:'保存成功'
							})
							this.loading = false
							//清空数据
							this.object = {
								application:'',
								username:'',
								password:''
							}
						}else{
							uni.showToast({
								icon:'none',
								title:res
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
			formReset: function(e) {
				console.log('清空数据')
			},
			remarkInput(){
				this.start = this.object.remark.length
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-password-add {
		.uni-form-item {
			padding: 0 32rpx;
			position: relative;
			
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
			
			.input-styles{
				min-height: 100rpx;
			}
			
			.warning-font-style{
				font-size: 20rpx;
				color: #E04B28;
			}
			
			.text-area-style{
				border: solid;
				border-radius: 8rpx;
				border-color: #dadada;
				border-width: 2rpx;
				padding: 10rpx 16rpx;
				width: 95%;
			}
			
			.bottom-styles{
				position: absolute;
				right: 40rpx;
				bottom: 10rpx;
				color: grey;
				font-size: 20rpx;
			}
		}
		
		.line{
			margin-top: 10rpx;
		}
		
		.button-style{
			margin: 200rpx 32rpx;
		}
	}
</style>
