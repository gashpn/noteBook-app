<template>
	<view class="line" :style="{'background-color': color,}"></view>
</template>

<script>
	export default {
		props:{
			color:{
				type:String,
				default:'#dadada'
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped>
	.line{
		height: 0.5rpx;
		margin: 0 32rpx;
	}
</style>
