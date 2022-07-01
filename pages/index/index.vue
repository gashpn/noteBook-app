<template>
	<view>
		<u-navbar leftText="返回" :safeAreaInsetTop="false">
			<view @click="openLeftMenu()" class="u-nav-slot" slot="left">
				<u-icon name="list-dot" size="19"></u-icon>
			</view>
			<view class="u-nav-slot border-cirle-stle" slot="center">
				<view>
					<u-input placeholder="请输入搜索关键词" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399"
						border="false" v-model="inputValue" @change="change"></u-input>
				</view>
			</view>
		</u-navbar>
		<u-popup :show="show" mode="left"  @close="close">
		        <view class="menu-style">
					<view class="avatar-style flex-row">
						<u-avatar v-if="imgUrl!=null||imgUrl!=''" :text="userName.substring(0,1)"></u-avatar>
						<u-avatar v-if="imgUrl.length>0" :src="imgUrl"></u-avatar>
						<view class="username-style">{{userName}}</view>
					</view>
		            <view @click="menuClick('note')" class="menu flex-row" :style="{'background-color':backgroundColor}">
						<u-icon name="edit-pen" color="#c1c1c1" size="20" style="margin-right: 10rpx;"></u-icon>
						<view>笔记</view>
					</view>
					<view @click="menuClick('forget')" class="menu flex-row" :style="{'background-color':backgroundColor1}">
						<u-icon name="忘" color="#c1c1c1" size="15" style="margin-right: 10rpx;margin-left: 5rpx;"></u-icon>
						<view>备忘录</view>
					</view>
					<view @click="menuClick('pdf')" class="menu flex-row" :style="{'background-color':backgroundColor2}">
						<u-icon name="order" color="#c1c1c1" size="20" style="margin-right: 10rpx;"></u-icon>
						<view>pdf转word</view>
						
					</view>
					<view @click="menuClick('version')" class="flex-row-between version-style" :style="{'background-color':backgroundColor3}">
						<view class="flex-row">
							<u-icon name="download" color="#c1c1c1" size="20" style="margin-right: 10rpx;margin-top: -24rpx;"></u-icon>
							<view>版本更新</view>
						</view>
						
						<view style="margin-top: 4rpx;" class="font-size-12 font-grey" v-if="version === newVersion">{{versions}}</view>
						<view class="font-size-10 new-style font-white" v-if="version < newVersion">新</view>
					</view>
		        </view>
			</u-popup>
		<mescroll-body style="margin-top: 50px;" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
			@up="upCallback" :up="{auto:false}" :down="{auto:true}">
			<password v-for="(item,index) in dataList" :appli="item" @delete="delPass"></password>
			<!-- <view v-for="data in dataList"> 数据列表... </view> -->
		</mescroll-body>
		<define-button name="新增密码"></define-button>
	</view>
</template>

<script>
	import defineButton from "../../components/definebutton.vue"
	import password from "../../components/password.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			password,
			defineButton
		},
		data() {
			return {
				page: {
					pageNum: 1,
					pageSize: 10,
					application: null
				},
				dataList: [],
				inputValue: '', //搜索关键词
				show:false,
				userName:'高淑萍',
				imgUrl:'',
				version:100,
				newVersion:100,
				versions:'1.0.0',
				backgroundColor:'#ffffff',      //菜单点击背景色
				backgroundColor1:'#ffffff',      //菜单点击背景色
				backgroundColor2:'#ffffff',      //菜单点击背景色
				backgroundColor3:'#ffffff',      //菜单点击背景色
			}
		},
		onLoad() {

		},
		created() {
			// this.getPassword()
		},
		methods: {
			upCallback(page) {
				// console.log(page)
				this.page.pageNum = page.num; // 页码, 默认从1开始
				this.page.pageSize = page.size; // 页长, 默认每页10条
				this.getPassword()
			},
			getPassword(application) {
				this.page.application = application
				this.$api.post('/app/application/passwordList', this.page).then((res) => {
					// console.log(res)
					let response = JSON.parse(res)
					console.log(response)
					if (this.page.pageNum == 1) this.dataList = []; //如果是第一页需手动置空列表
					this.dataList = this.dataList.concat(response.records); //追加新数据

					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(response.records.length, res.total);
				})
			},
			delPass(del) {
				this.getPassword()
			},
			change(e) {
				this.dataList = []
				this.getPassword(e)
			},
			openLeftMenu(){
				this.show = true
			},
			      close() {
			        this.show = false
			        // console.log('close');
			      },
			menuClick(type){
				switch(type){
					case 'note':{
						this.backgroundColor = '#e8e8e8'
						this.backgroundColor1 = '#ffffff'
						this.backgroundColor2 = '#ffffff'
						this.backgroundColor3 = '#ffffff'
						uni.showToast({
							icon:'none',
							title:'该功能暂未开发，敬请期待'
						})
					}break
					case 'forget':{
						this.backgroundColor1 = '#e8e8e8'
						this.backgroundColor = '#ffffff'
						this.backgroundColor2 = '#ffffff'
						this.backgroundColor3 = '#ffffff'
						uni.showToast({
							icon:'none',
							title:'该功能暂未开发，敬请期待'
						})
					}break
					case 'pdf':{
						this.backgroundColor2 = '#e8e8e8'
						this.backgroundColor1 = '#ffffff'
						this.backgroundColor = '#ffffff'
						this.backgroundColor3 = '#ffffff'
						uni.showToast({
							icon:'none',
							title:'该功能暂未开发，敬请期待'
						})
					}break
					case 'version':{
						this.backgroundColor3 = '#e8e8e8'
						this.backgroundColor1 = '#ffffff'
						this.backgroundColor2 = '#ffffff'
						this.backgroundColor = '#ffffff'
						uni.showToast({
							icon:'none',
							title:'该功能暂未开发，敬请期待'
						})
					}break
				}
				
			}
		}
	}
</script>

<style scoped>
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

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.border-cirle-stle {
		border: 2rpx solid #d5d5d5;
		border-radius: 100rpx;
	}
	
	.menu-style{
		/* padding: 40rpx 64rpx; */
		width: 400rpx;
	}
	
	.avatar-style{
		margin: 40rpx 64rpx;
		/* margin-left: calc(50% - 40rpx); */
		margin-bottom: 60rpx;
	}
	
	.username-style{
		margin: 20rpx 0 0 20rpx;
	}
	
	.menu{
		line-height: 100rpx;
		padding: 0 64rpx;
	}
	
	.new-style{
		margin-top: 4rpx;
		height: 36rpx;
		padding: 0 16rpx;
		border-radius: 20rpx;
		background-color: #ff0000;
	}
	
	.version-style{
		height: 66rpx;
		padding: 34rpx 64rpx 0 64rpx;
	}
</style>
