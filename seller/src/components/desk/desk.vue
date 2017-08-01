<template>
	<div class="desk">
		你好啊
		{{desk}}
	</div>
</template>

<script>
	export default{
		props:{
			desk:{
				return:Array
			}
		}
	}
	
</script>
<style lang="scss" scoped> 
	.desk{
		font-size: 20px;
		color: pink;
	}
</style>