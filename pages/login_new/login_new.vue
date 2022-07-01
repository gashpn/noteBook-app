<template>
	<view class="margin-common-16">
		<u-form :model="form" ref="uForm">
			<u-form-item :required="true" label="姓名" prop="name">
				<u-input v-model="form.name" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}
				]
			}
		};
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>

<style>
	
</style>
