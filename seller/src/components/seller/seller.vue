<template>
  <div class="seller">
    <div class="notice-wrapper">
    	<notice > </notice>
    </div>
    <div class="desk-wrapper">
    	<desk></desk>
    </div>
  </div>
</template>

<script>
import notice from '../notice/notice.vue'
import desk from '../desk/desk.vue'

export default {
 props:{
 	seller:{
 		return:Object
 	}
 },
 components:{
 	notice,
 },
 components:{
 	desk,
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

	.seller{
		height: 100vh;
		font-size: 50px;
		text-align: center;
		line-height: 200px;
	}


</style>