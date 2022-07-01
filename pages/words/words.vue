<template>
	<view class="margin-common-16">
		<u-search placehoder="" :show-action="false" :clearabled="true" :animation="false" @change="change()"
			v-model="inputValue"></u-search>
		<view>
			<u-index-list :index-list="indexList">
				<template v-for="(item, index) in itemArr">
					<!-- #ifdef APP-NVUE -->
					<u-index-anchor :text="indexList[index]"></u-index-anchor>
					<!-- #endif -->
					<u-index-item>
						<!-- #ifndef APP-NVUE -->
						<u-index-anchor :text="indexList[index]"></u-index-anchor>
						<!-- #endif -->
						<view class="list-cell" v-for="(cell, index) in item">
							{{cell}}
						</view>
					</u-index-item>
				</template>
			</u-index-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				indexList: ["A", "B", "C","D","E","F","G","H"],
				itemArr: [
					['列表A1', '列表A2', '列表A3'],
					['列表B1', '列表B2', '列表B3'],
					['列表C1', '列表C2', '列表C3'],
					['列表D1', '列表D2', '列表D3'],
					['列表E1', '列表E2', '列表E3'],
				]
			}
		},
		methods: {
			change() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 10px 24rpx;
			overflow: hidden;
			color: #323233;
			font-size: 14px;
			line-height: 24px;
			background-color: #fff;
		}
</style>
