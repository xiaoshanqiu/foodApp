<template>
	<div class="food" v-show="showFlag" ref="food">
		<div>
			<div class="food-cont">
				<div class="pic">
					<img :src="food.image" alt="" />
					<div class="back" @click="hide">
						<i class="iconfont icon-arrow_lift"></i>
					</div>
				</div>
			</div>

			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月销{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>

				<div class="control-wrapper">
					<control :food="food"></control>
				</div>

				<transition name="fade">
					<div @click="addFirst($event)" class="buy" v-show="!food.count || food-count === 0 ">
						加入购物车
					</div>
				</transition>
			</div>
		
 			<div class="nothing"></div>

			<div class="jieshao">
				<h1 class="title">商品介绍</h1>
				<p>{{food.info}}</p>
			</div>

 			<div class="nothing"></div>
			
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingSelect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
			</div>

			<div class="rating-wrapper">
	      <ul v-show="food.ratings && food.ratings.length">
	        <li v-show="needshow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
	          <div class="user">
	            <span class="name">{{rating.username}}</span>
	            <img :src="rating.avatar" width="12" height="12" alt="" class="avatar">
	          </div>
	          <div class="time">{{formate(rating.rateTime)}}</div>
	          <p class="text">
			        <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>
			        {{rating.text}}
	        </p>
	        </li>
	      </ul>
	      <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
	    </div>
		</div>

		<div class="shopcar-wrapper">
      <shopcar :deliveryPrice="food.deliveryPrice" :minPrice="food.minPrice"></shopcar>
    </div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	import control from '../control/control.vue';
	import Vue from 'vue';
	import ratingSelect from '../ratingSelect/ratingSelect.vue';
  import shopcar from '../shopcar/shopcar.vue';

	export default{
		data(){
			return{
				showFlag:false,
				ratings:[],
				selectType:2,
				onlyContent:false,
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		props:{
			food:{
				return:Object
			}
		},
		methods:{
			show(){
				this.showFlag = true
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide(){
				this.showFlag = false
			},
			addFirst(event){
				if(!event._constructed){
					return
				}
				Vue.set(this.food,"count",1)
			},

			needshow(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType == 2){
					return true
				}else{
					return type === this.selectType;
				}
			},
			formate(date){

			  var date = new Date(date);//如果date为13位不需要乘1000
			  var Y = date.getFullYear() + '-';
			  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			  var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
			  return Y+M+D+h+m+s;
			}
		},
		watch:{
			'selectType'(type){
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			'onlyContent'(onlyContent){
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			}
		},
		components:{
	 		control,
	 		ratingSelect,
    	shopcar,
	 	}
	}
</script>

<style lang="scss" scoped>
  @import '../../common/mixin.scss';
	.food{
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: #fff;
		.food-cont{
			.pic{
				// width: 100vw;
				// height: 100vw;
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;
				img{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
				}
				.back{
					position: absolute;
					left: 5px;
					top: 5px;
					height: 35px;
					width: 35px;
					border-radius: 50%;
					color: #ccc;
					text-align: center;
					background-color: rgba(7,17,27,.3);
					i{
						font-size: 25px;
						line-height: 35px;
					}
				}
			}
		}
		.content{
			padding: 18px;
			position: relative;
			.title{
				line-height: 14px;
				font-size: 14px;
				font-weight: 700;
				color:rgb(7,17,27);
			}
			.detail{
				margin-top: 8px;
				span{
					line-height: 10px;
					font-size: 10px;
					color: rgb(147,153,159);
				}
			}
			.price{
				margin-top: 18px;
				.now{
					line-height: 24px;
					font-size: 14px;
					font-weight: 700;
					color: rgb(240,20,20);
				}
			}
			.buy{
				position: absolute;
				right: 18px;
				bottom: 18px;
				width: 74px;
				padding: 6px 12px;
				line-height: 12px;
				font-size: 10px;
				border-radius: 12px;
				text-align: center;
				color: rgb(255,255,255);
				background-color: rgb(0,160,220);
			}
			.control-wrapper{
				position: absolute;
				right: 22px;
				bottom: 15px; 
			}
		}
		.nothing{
			height: 16px;
			border-top: 1px solid #e6e7e8;
			border-bottom: 1px solid #e6e7e8;
			background-color: #f3f5f7;
		}
		.jieshao{
			padding:18px;
			.title{
				margin-bottom: 6px;
			}
			p{
				line-height: 24px;
				font-size: 12px;
				font-weight: 200;
				color: rgb(77,85,93);
			}
		}
		.rating{
			padding: 18px 18px 0 18px;
			@include border1px (rgba(7,17,27,.1));
			.title{
				margin-bottom: 12px;
			}
		}
		.nothing{
			height: 16px;
			border-top: 1px solid #e6e7e8;
			border-bottom: 1px solid #e6e7e8;
			background-color: #f3f5f7;
		}
		.rating-wrapper{
      padding: 0 18px;
      .rating-item{
        position: relative;
        padding: 16px 0;
        @include border1px(rgba(7,17,27,.1));
        .user{
          position: absolute;
          right:0;
          top:16px;
          line-height: 16px;
          font-size: 0;
          .name{
            display:inline-block;
            margin-right:6px;
            vertical-align: top;
            font-size: 10px;
            color:rgb(147,153,159);
          }
          .avatar{
            border-radius:50%;
          }
        }
        .time{
          margin-bottom:6px;
          line-height: 12px;
          font-size: 10px;
          color:rgb(147,153,159);
        }
        .text{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7,17,27);
          .icon-thumb_up,.icon-thumb_down{
            margin-right: 4px;
            line-height: 24px;
            font-size: 12px;
          }
          .icon-thumb_up{
            color: rgb(0, 160, 220);
          }
          .icon-thumb_down{
            color: rgb(147,153,159);
          }
        }
      }
    }
    .no-rating{
      padding: 16px 0;
      font-size: 12px;
      color:rgb(147, 153, 159);
    }
    .shopcar-wrapper{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #141d27;
    }
	}

</style>