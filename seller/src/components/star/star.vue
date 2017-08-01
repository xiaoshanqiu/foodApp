<template>
	<div class="star" :class="typeSize">
		评分{{star}}
		<ul>
			<li v-for="item in classItem" class="star-item" :class="item"></li>
		</ul>
	</div>
</template>
	
<script>
	const LENGTH = 5;

	export default{
		 props:{
      star:{
        return:Number
      },
      size:{
      	return:Number
      }
    },
    computed:{
    	typeSize(){
    		return 'type' + this.size
    	},
    	classItem() {
    		let result = [];
    		let score = Math.floor(this.star * 2)/2;
    		let hasDecimal = score % 1 !== 0;
    		let integer = Math.floor(score);
    		     
    		for(let i=0;i<integer;i++){
    			result.push('on')
    		};
    		if(hasDecimal){
    			result.push('half');
    		}
    		while(result.length< LENGTH){
    			result.push('off');
    		}
    		return result;
    	}
    }
	}
</script>

<style lang="scss" scoped>
  @import '../../common/mixin.scss';
	.star{
		font-size: 0;
		text-align: center;
		.star-item{
			display: inline-block;
			height: 24px;
			width: 24px;
			margin-right: 24px;
			background-size: cover;
			&:last-child{
				margin-right: 0px;
			}
		}

		&.type24{
			.star-item{
				&.on{
					@include bgImage (star24_on);
				}
				&.half{
					@include bgImage (star24_half);
				}
				&.off{
					@include bgImage (star24_off);
				}
			}
		}
	}
</style>