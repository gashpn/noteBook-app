<template>
	<view class="hover-buttons">
		<!-- :style="{background:themeColor}" -->
	    <view class="bnt-style" @click="jump()">
	        <image class="image-wrap" :src="image"></image>   
	        <text class="bnt-name">{{name}}</text>                            
	    </view>                                                            
	</view>
</template>

<script>
	//新闻item
	export default {
		props: {
			name:{
				type:String,
				default:'新闻爆料'
			},
			image:{
				type:String,
				default:'/static/hover_news.png'
			},
			/* click:{
				type:String,
				default:'news'
			}, */
			/* themeColor:{
				type:String,
				default:'#4A8FF3'
			} */
		},
		data() {
			return {
				
			}
		},
		computed: {
			
		},
		methods: {
			jump(){
				uni.navigateTo({
					url:'/pages/addPassword/addPassword'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hover-buttons{
	    position: fixed;
		bottom: 180rpx;
	    right: 32rpx;
	    .bnt-style{
	        width: 120rpx;
	        height: 120rpx;
	        border-radius: 50%;
	        overflow: hidden;
	        display: flex;
	        flex-direction: column;
	        justify-content: center;
	        align-items: center;
	        color: #fff;
			background-image: linear-gradient(to bottom right,#55aaff,#4A8FF3);
			box-shadow: 2px 2px 5px rgba(0, 70, 212, 0.4);
			
			.image-wrap{
				height: 32rpx;
				width: 32rpx;
			}
			
	        .bnt-name{
	            font-size: 24rpx;
	            margin-top: 8rpx;
	        }
	    }    
	}
</style>
