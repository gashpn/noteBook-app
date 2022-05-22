<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback"
						 :up="{auto:false}">
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
		components:{
			password,
			defineButton
		},
		data() {
			return {
				page:{
					pageNum:1,
					pageSize:10
				},
				dataList:[],
			}
		},
		onLoad() {

		},
		created() {
			this.getPassword()
		},
		methods: {
			upCallback(page) {
				// console.log(page)
				this.page.pageNum = page.num; // 页码, 默认从1开始
				this.page.pageSize = page.size; // 页长, 默认每页10条
				this.getPassword()
			},
			getPassword(){
				this.$api.post('/app/application/passwordList',this.page).then((res)=>{
					// console.log(res)
					let response = JSON.parse(res)
					if (this.page.pageNum == 1) this.dataList = []; //如果是第一页需手动置空列表
					this.dataList = this.dataList.concat(response.records); //追加新数据
					
					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(response.records.length, res.total);
				})
			},
			delPass(del){
				this.getPassword()
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
</style>
