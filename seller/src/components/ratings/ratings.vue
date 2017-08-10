<template>
  <div class="ratings" ref="ratings">
  	<div>
	  	<div class="no1">
	  		<div class="integrated">
					<div class="scores">
		  			<h2>3.9</h2>
		  			<p>综合评分</p>
		  			<h6>高于周边商家69.2%</h6>
					</div>
	  		</div>
	  		<div class="grade">
	  			<div class="attitude">
	  				<span>服务态度</span>
	  				<div class="star-wrapper">
			      <star :star="seller.score" :size="36">你好</star>
				    </div> 
				    <span class="num">3.9</span>
			    </div>
	  			<div class="attitude">
	  				<span>商品评分</span>
	  				<div class="star-wrapper">
			      <star :star="seller.score" :size="36">你好</star>
				    </div> 
				    <span class="num">4.0</span>
			    </div>
			    <div class="attitude">
	  				<span>送达时间</span> 
	  				<span class="min">44分钟</span>
			    </div>
	  		</div>
	  	</div>
	 		<div class="nothing"></div>

	 		<div class="satisfaction">
	 			<ratingSelect :desc="desc" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
	 		</div>

	 		<!-- <div class="content-line">
				<div class="content">
					<i class="iconfont icon-check_circle"></i>
				</div>
				<span>只看有内容的评价</span>
	 		</div> -->

	 		<div class="personal">
		 		<ul>
		 			<li class="message" v-for="item in ratings" v-show="needshow(item.rateType,item.text)">
		 				<div class="photo">
		 					<img :src="item.avatar" alt="" />
		 				</div>
		 				<div class="message-cont">
		 					<div class="name-time">
		 						<span>{{item.username}}</span>
		 						<span class="time">{{formate(item.rateTime)}}</span>
		 					</div>
		 					<div class="star-song">
			 					<div class="star-wrapper">
				     		 <star :star="item.score" :size="48">你好</star>
					    	</div> 
				     		<span class="song" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
		 					</div>
		 					<div class="text">{{item.text}}</div>
		 					<div class="good" >
		 						<i :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down': item.rateType===1}"></i>
		 						<!-- <i class="iconfont icon-thumb_up"></i> -->
		 						<!-- <i class="iconfont icon-thumb_down"></i> -->
		 					</div>
		 				</div>
		 			</li>
		 		</ul>
	 		</div>
			
 		</div>
		<div class="shopcar-wrapper">
      <shopcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
    </div>
  </div>
</template>

<script>
	import BScroll from "better-scroll";
  import star from '../star/star.vue'
  import shopcar from '../shopcar/shopcar.vue'
	import ratingSelect from '../ratingSelect/ratingSelect.vue';



export default {
	data(){
		return {
			ratings:[],
			selectType:2,
			onlyContent:false,
			desc:{
				all:'全部',
				positive:'满意',
				negative:'不满意'
			}
		}
	},
	methods:{
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

	props:{
		seller:{
			return:Object
		}
	},
	components:{
    star,
    shopcar,
    ratingSelect,
  },
 	created() {
	  this.$http.get('/api/ratings').then(response => {
	    this.ratings = response.body.data;
	    this.$nextTick(() => {
	    	this.scroll = new BScroll(this.$refs.ratings,{
	    		click:true
	    	})
	    })
	  })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import '../../common/mixin.scss';

	.ratings{
		width: 100%;
		position: fixed;
		top: 184px;
		bottom: 0;
		overflow: hidden;
		.no1{
			display: flex;
			.integrated{
				flex: 0 0 137px;
				padding: 18px 0;
				.scores{
					padding-bottom: 6px;
					border-right: 1px solid #ddd;
					h2{
						line-height: 28px;
						font-size: 24px;
						text-align: center;
						color: rgb(255,153,0)
					}
					p{
						margin: 6px 0 8px 0;
						line-height: 12px;
						font-size: 12px;
						text-align: center;
						color: rgb(7,17,27);
					}
					h6{
						display: block;
						line-height: 10px;
						font-size: 10px;
						text-align: center;
						color: rgb(7,17,27);
					}
				}
			}
			.grade{
				flex:1;
				padding: 18px 24px;
				.attitude{
					margin-bottom: 8px;
					&:last-child{
						margin-bottom: 0;
					}
					span{
						vertical-align: top;
						display: inline-block;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.star-wrapper{
						vertical-align: top;
						display: inline-block;
						font-size: 10px;
						margin-top: 2px;
						margin-left: 12px;
					}
					.num{
						display: inline-block;
						line-height: 18px;
						font-size: 12px;
						color: rgb(255,153,0);
					}
					.min{
						margin-left: 12px;
						line-height: 18px;
						font-size: 12px;
						color: rgb(147,153,159);
					}
				}
			}
		}
		.nothing{
			height: 18px;
			border-top: 1px solid #e6e7e8;
			border-bottom: 1px solid #e6e7e8;
			background-color: #f3f5f7;
		}
		.satisfaction{
			padding: 18px 18px 0 18px;
			@include border1px (#ddd);
			.satis{
				padding-bottom: 18px;
				@include border1px (#ddd)
				span{
					display: inline-block;
					padding: 10px 12px;
					margin-right: 10px;
					font-size: 10px;
					color: #fff;
					background-color: #00a0dc;
					&.green{
						color: #000;
						background-color: #ccecf8;
					}
					&.gray{
						color: #000;
						background-color: #e9ebec;
					}
				}
			}
		}
		.content-line{
			@include border1px (#ddd);
			padding: 0 18px;
			color: #b7bbbf;
			.content{
				vertical-align: top;
				display: inline-block;
				i{
					line-height: 50px;
					margin-top: 14px;
					font-size: 20px;
				}
			}
			span{
				display: inline-block;
				line-height: 50px;
			}
		}
		.personal{
			padding: 0 18px;
			margin-bottom: 48px;
			.message{
				display: flex;
				padding: 18px 0;
				@include border1px (#ddd)
				.photo{
					flex:0 0 28px;
					height: 20px;
					width: 28px;
					margin-right: 12px;
					img{
						width: 100%;
					}
				}
				.message-cont{
					flex:1;
					.name-time{
						overflow: hidden;
						span{
							float: left;
							display: inline-block;
							line-height: 12px;
							font-size: 10px;
							color: rgb(7,17,27);
						}
						.time{
							float: right;
							line-height: 12px;
							font-size: 10px;
							font-size: 200;
							color: rgb(147,153,159);
						}
					}
					.star-song{
						margin: 4px 0 6px 0;
						.star-wrapper{
							display: inline-block;
							margin-right: 6px;
						}
						.song{
							display: inline-block;
							line-height: 12px;
							font-size: 10px;
							font-weight: 200;
							color: rgb(147,153,159);
						}
					}
					.text{
						line-height: 18px;
						font-size: 12px;
						padding-bottom: 8px;
						color: rgb(7,17,27);
					}
					.good{
						i{
							color: #00a0dc;
						}
						.icon-thumb_down{
	            color: rgb(147,153,159);
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
      background-color: #141d27;
    }
	}


</style>