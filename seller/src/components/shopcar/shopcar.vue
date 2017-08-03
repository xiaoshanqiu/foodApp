<template>
	<div class="shopcar">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{hightlight:totalCount > 0}">
						<i class="iconfont icon-shopping_cart"></i>
					</div>

					<div class="num" v-show="totalCount">{{totalCount}}</div>
				</div>
				<div class="money">￥{{totalPrice}}</div>
				<div class="cost">另需配送费{{deliveryPrice}}元
				</div>
			</div>

			<div class="content-right">
				<!-- {{minPrice}}元起送 -->
				<div class="pay" :class="{enough:this.totalPrice >= this.minPrice}">
					{{pay}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		 props:{
      deliveryPrice:{
        return:Number,
        default:0
      },
      minPrice:{
      	return:Number,
      	default:0
      },
      selectFoods:{
      	return:Array,
      	default(){
      		return [
      			{
      				price:10,
      				count:0
      			}
      		]
      	}
      }
    },
    computed:{
    	totalPrice(){
    		let price = 0;
    		this.selectFoods.forEach((goods) => {
    			price += goods.price * goods.count
    		})
    		return price
    	},
    	totalCount(){
    		let count = 0;
    		this.selectFoods.forEach((goods) => {
    			count += goods.count
    		})
    		return count
    	},
    	pay(){
    		if(this.totalPrice === 0){
    			return `最低配￥${this.minPrice}元`
    		}else if(this.totalPrice < this.minPrice){
    			let diff = this.minPrice - this.totalPrice;
    			return `还差￥${diff}元`
    		}else{
    			return `去结算`
    		}
    	}
    }
	}
</script>

<style lang="scss" scoped>

  @import '../../common/mixin.scss';

	.shopcar{
		font-size: 20px;
		color: #fff;
		.content{
			display: flex;
			.content-left{
				flex:1;
				.logo-wrapper{
					position: relative;
					float: left;
					height: 56px;
					width: 56px;
					padding: 6;
					margin: -12px 12px 4px 12px;
					border-radius: 50%;
					background-color: #141d27;
					.logo{
						height: 44px;
						width: 44px;
						position: absolute;
						left: 6px;
						top: 6px;
						border-radius: 50%;
						line-height: 44px;
						text-align: center;
						background-color: rgba(255,255,255,.2);
						i{
							color: #fff;
						}
						&.hightlight{
							background-color: #00a0dc;
						}
					}
					.num{
						position: absolute;
						right: 0;
						top: 0;
						padding: 2px 6px;
						line-height: 16px;
						border-radius: 10px;
						font-size: 9px;
						font-weight: 700;
						background-color: red;
					}
				}
				.money{
					float: left;
					vertical-align: top;
					margin: 12px 12px 12px 0;
					line-height: 24px;
					font-weight: 700;
					font-size: 16px;
					color: rgba(255,255,255,.4);
				}
				.cost{
					float: left;
					vertical-align: top;
					margin-top: 12px;
					border-left: 1px solid rgba(255,255,255,.1);
					padding-left: 12px;
					line-height: 24px;
					font-weight: 700;
					font-size: 10px;
					color: rgba(255,255,255,.4);
				}
			}
			.content-right{
				flex:0 0 105px;
				width: 105px;
				line-height: 48px;
				font-size: 12px;
				font-weight: 700;
				text-align: center;
				color:rgba(255,255,255,.4);
				background-color: #2b333b;
				.pay{
					&.enough{
						color: #fff;
						background-color: #00b43c;
					}
				}
			}
		}
	}
</style>