<template>
	<div class="supports" :class=[className]>
		<ul>
			<li v-for="(item,index) in supports">
				<span class="icon" :class="classMap[index]"></span>
				<p>{{item.description}}</p>
			</li>
		</ul>

	</div>

</template>

<script>
 export default{
 	props:{
 		supports:{
 			return: Array
 		},
 		className:{
 			return:String
 		}
 	},
	created(){
		this.classMap = ['decrease','discount','guarantee','invoice','decrease']
	}

 }
</script>
<style scoped lang="scss">

  @import '../../common/mixin.scss';

	.supports{
		li{
			margin-bottom: 1px;
			p{
				display: inline-block;
				vertical-align: top;
				margin-left: 4px;
				line-height: 12px;
				font-size: 10px;
				font-weight: 200px;
				color:rgb(255,255,255);
			}
			.icon{
				display: inline-block;
				vertical-align: top;
				height: 12px;
				width: 12px;
				background-size: cover;
				&.decrease{
					@include bgImage (decrease_1);
				}
				&.discount{
					@include bgImage (discount_1);
				}
				&.guarantee{
					@include bgImage (guarantee_1);
				}
				&.invoice{
					@include bgImage (invoice_1);
				}
				&.decrease{
					@include bgImage (decrease_1);
				}
			}
		}
		&.big{
			padding: 24px 12px 28px 12px;
			li{
				margin-bottom: 12px;
				&:last-child{
					margin-bottom: 0;
				}
			p{
				margin-right: 6px;
				line-height: 16px;
				font-size: 12px;
				font-weight: 200px;
			}
				.icon{
					height: 16px;
					width: 16px;
					&.decrease{
						@include bgImage (decrease_2);
					}
					&.discount{
						@include bgImage (discount_2);
					}
					&.guarantee{
						@include bgImage (guarantee_2);
					}
					&.invoice{
						@include bgImage (invoice_2);
					}
					&.decrease{
						@include bgImage (decrease_2);
					}
				}
			}
		}
	}
</style>