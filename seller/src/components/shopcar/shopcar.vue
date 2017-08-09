<template>
	<div class="shopcar">
		<div class="content">
			<div class="content-left" @click = "toggleList">
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
				<div class="pay" :class="{enough:this.totalPrice >= this.minPrice}">
					{{pay}}
				</div>
			</div>

			<transition name="fold">
				<div class="shop-list" v-show ="listShow">
					<div class="shop-header">
							<h1 class="title">购物车</h1>
							<span class="empty" @click = "empty">清空</span>
					</div>
					<div class="shop-content" ref ="listContent">
							<ul>
								<li class="food" v-for="food in selectFoods">
									<span class="name">{{food.name}}</span>
									<div class="price">
										<span>{{food.price*food.count}}</span>
									</div>
									<div class='control-wrapper'>
										<control :food='food'></control>
									</div>
								</li>
							</ul>
					</div>
				</div>
			</transition>
		</div>

		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="hideList"></div> 
		</transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import control from '../control/control.vue';


	export default{
			data(){
				return{
					fold:true
				}	
			},
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
    	},
    	listShow(){
    		if(!this.totalCount){
    			return false;
    		}
    		let show = !this.fold;
    		return show
    	}
    },
    methods:{
    	toggleList(){
    		if(!this.totalCount){
    			return
    		}
    		this.fold = !this.fold;
    		this.$nextTick(() => {
    			if(!this.scroll){
						this.scroll = new BScroll(this.$refs.listContent,{
								click:true
						})						
					}else{
						this.scroll.refresh();
					}
    		})
    	},
    	empty(){
				this.selectFoods.forEach((item)=>{
					item.count=0;
				})
			},
			hideList(){
				this.fold = true
			}
    },
    components:{
			control,
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
		.fold-enter-active, .fold-leave-active {
      transition: all .5s;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3D(0,100%,0);;
      opacity:0;
    }

		.shop-list{
			position:absolute;
			bottom:48px;
			left:0;
			z-index:-1;
			width:100%;
			.shop-header{
	      padding: 0 18px;
	      height: 40px;
	      line-height:40px;
	      background: #f3f5f7;
	      border-bottom: 1px solid rgba(7,17,27,.1);
	      .title{
	        float:left;
	        font-size: 14px;
	        color: rgb(7,17,27);
	      }
	      .empty{
	        float: right;
	        font-size: 12px;
	        color:rgb(0, 160, 220);
	      }
	    }
		}

		.shop-content{
			padding: 0 18px;
			max-height:217px;
			overflow: hidden;
			background:#fff;
			.food{
				position: relative;
				padding: 12px 0;
				box-sizing: border-box;
				@include border1px(rgba(7, 17, 27,.1));
				.name{
					line-height:24px;
					font-size:14px;
					color:rgb(7,17,27);
				}
				.price{
					position: absolute;
					right:90px;
					bottom:12px;
					line-height: 24px;
					font-size:14px;
					font-weight:700;
					color:rgb(240,20,20);
					span{
						padding-right:10px;
					}
				}
				.control-wrapper{
					position: absolute;
					right:0;
					bottom: 6px;
				}
			}
		}
		.list-mask{
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    z-index: -2;
	    background:rgba(7,17,27,.6);
	    background-filter: blur(10px);
	  }
	  .fade-enter-active, .fade-leave-active {
	    transition: all .5s;
	  }
	  .fade-enter, .fade-leave-active {
	    opacity:0;
	  }
	}
</style>