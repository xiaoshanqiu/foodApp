<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
    	<ul>
    		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
	    	<span class="text border1px">
	    		<span class="icon special" v-if="item.type > 0" :class="classMap[item.type]" ></span>
	    		{{item.name}}
	    	</span>
    		</li>
    	</ul>
    </div>
		<div class="goods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h2 class="title">{{item.name}}</h2>
					<ul>
						<li v-for="food in item.foods" class="food-style">
							<span class="foodImg">
								<img :src="food.icon" alt="" />
							</span>
							<span class="food-name">{{food.name}}
								<p class="description">{{food.description}}</p>
								<span class="description">好评率{{food.rating}}%</span>
								<span class="description">月售{{food.sellCount}}</span>
								<p class="price">￥{{food.price}}<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span></p>
								<div class="control-wrapper">
									<control :food="food"></control>
								</div>
							</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<div class="shopcar-wrapper">
			<shopcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcar>
		</div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopcar from '../shopcar/shopcar.vue';
import control from '../control/control.vue';

export default {
	props:{
		seller:{
			return:Object
		}
	},
	data(){
	 	return {
	 		goods:[],
	 		listHeight:[],
	 		scrollY:0
	 	}
  },
 	created() {
    this.$http.get('/api/goods').then(response => {
      this.goods = response.body.data;
      this.$nextTick(() => {
      	this._initScroll();
      	this._calculateHeight();
      })
    }),
    this.classMap = ['special','decrease']
  },
 	methods:{
 		_initScroll(){
 			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
 				click:true
 			});
 			this.foodScroll = new BScroll(this.$refs.foodWrapper,{
 				click:true,
 				probeType:3
 			});
 			this.foodScroll.on('scroll',(pos) => {
 				this.scrollY = Math.abs(Math.floor(pos.y))
 			})
 		},
 		_calculateHeight(){
 			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
 			let height = 0;
 			this.listHeight.push(height);
 			for(let i=0;i<foodList.length;i++){
 				let item = foodList[i];
 				height += item.clientHeight;
 				this.listHeight.push(height);
 			}
 		},
 		selectMenu(index,event){
 			if(!event._constructed){
 				return
 			}
 			console.log(event);
 			     
 			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
 			let ele = foodList[index];
 			this.foodScroll.scrollToElement(ele,300)
 		}
 	},
 	computed:{
 		currentIndex(){
 			for(let i=0;i<this.listHeight.length;i++){
 				let height1 = this.listHeight[i];
 				let height2 = this.listHeight[i+1];
 				if(!height2 || (this.scrollY>=height1 && this.scrollY < height2)){
 					return i
 				}
 			}
 			return 0;
 		},
	 	selectFoods(){
	 		let foodList = [];
	 		this.goods.forEach((good) => {
	 			good.foods.forEach((food) => {
	 				if(food.count){
	 					foodList.push(food);
	 				}
	 			})
	 		})
	 		return foodList;
	 	}
 		
 	},

 	components:{
 		shopcar,
 		control,
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import '../../common/mixin.scss';
  
	.goods{
		position: absolute;
		top: 182px;
		bottom: 48px;
		width: 100%;
		display:flex;
		overflow: hidden;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			.menu-item{
				display: table;
				padding: 0 12px;
				height: 54px;
				width: 56px;
				background-color: #f3f5f7;
				&.current{
					z-index: 10;
					margin-top: -1;
					font-weight: 700;
					background-color: pink;
				}
				span{
					line-height: 14px;
					font-size: 12px;
					font-weight: 200;
					vertical-align: middle;
					display: table-cell;
					text-align: center;
					color: rgb(7,17,27);
 				  @include border1px (rgba(7,17,27,.1));
					&.icon{
						display: inline-block;
						width: 12px;
						height: 12px;
					  line-height: 14px;
						background-size: cover;
						&.special{
							@include bgImage (special_3)
						}
						&.decrease{
							@include bgImage (decrease_3)
						}
					}
				}
			}
		}
		.goods-wrapper{
			flex:1;
			.title{
				font-size: 12px;
				padding-left: 14px;
				line-height: 24px;
				color: rgb(147,153,159);
				border-left: 1px solid #d9dde1;
				background-color: #f3f5f7;
			}
			.food-list{
				.food-style{
					margin:18px;
					padding-bottom: 18px;
					display: flex;
					@include border1px (rgba(7,17,27,.1));
					.foodImg{
						flex: 0 0 55px;
						display: inline-block;
						width: 55px;
						height: 55px;
						margin-right: 10px;
						img{
							width: 100%;
						}
					}
					.food-name{
						position: relative;
						flex:1;
						overflow: hidden;
						display: inline-block;
						vertical-align: top;
						line-height: 14px;
						font-size: 14px;
						color:rgb(7,17,27);
						.description{
							font-size: 10px;
							line-height: 20px;
							color: rgb(147,153,159);
						}
						.price{
							line-height: 24px;
							font-size: 14px;
							font-weight: 700;
							color: red;
							.old{
								font-size: 10px;
								line-height: 24px;
								margin-left: 8px;
								color: rgb(147,153,159);
							}
						}
						.control-wrapper{
							position: absolute;
							bottom: 0;
							right: 0;
						}
					}
				}
			}
		}
		.shopcar-wrapper{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 48px;
			background-color: #141d27;
		}
	}

</style>