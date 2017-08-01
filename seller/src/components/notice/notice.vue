<template>
	<div class="notice">
		你好啊
		{{notice}}
	</div>
</template>

<script>
	export default{
		props:{
			notice:{
				return:Array
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice{
		font-size: 20px;
		color: yellow;
	}
</style>