<template>
  <div class="seller">
    <div class="title-star">
      <div class="line">
        <div class="heart">
          <i class="iconfont icon-favorite" @click="showToggle" v-bind:class="{active:isShow}"></i>
          <span v-text="btnText"></span>
        </div>
        <div class="title">
          <p>{{seller.name}}</p>
        </div>
        <div class="star-sell">
          <div class="star-wrapper">
           <star :star="seller.foodScore" :size="36"></star>
          </div> 
          <div class="rank-month">
            <span class="rank">({{seller.rankRate}})</span>
            <span class="month">月售{{seller.sellCount}}单</span>
          </div>
        </div>
      </div>
      <div class="price">
        <div class="message">
          <p>起送价</p>
          <span class="money">{{seller.minPrice}}</span>
          <span class="yuan">元</span>
        </div>
        <div class="message">
          <p>商家配送</p>
          <span class="money">{{seller.deliveryPrice}}</span>
          <span class="yuan">元</span>
        </div>
        <div class="message">
          <p>平均配送时间</p>
          <span class="money">{{seller.deliveryTime}}</span>
          <span class="yuan">分钟</span>
        </div>
      </div>
    </div>

    <div class="nothing"></div>
  
    <div class="activity">
      <div class="activity-content">
        <p class="title">公告与活动</p>
        <div class="content">
          {{seller.bulletin}}
        </div>
      </div>
    </div>
    
    <div class="supports-wrapper">
      <supports v-if="seller.supports" :supports="seller.supports" :className="offer"></supports>
    </div>

    <div class="nothing"></div>

    <div class="scene">
      <p class="title-scene">商家实景</p>
      <div class="pic-scene" ref="picWrapper">
        <ul ref="picWidth">
          <li v-for="(item,index) in seller.pics">
           <img :src="seller.pics[index]" alt="" />
          </li>
        </ul>
      </div>

    </div>
    
    <div class="nothing"></div>

    <div class="business">
      <p class="title-business">商家信息</p>
      <div class="content-business">
        <ul>
          <li v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>·
    
     


    <div class="shopcar-wrapper">
      <shopcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../star/star.vue'
  import supports from '../supports/supports.vue'
  import shopcar from '../shopcar/shopcar.vue'


  export default {
    data(){
      return{
        offer:'offer',
        btnText:"收藏",  
        isShow:false,
      }
    },
    props:{
   	  seller:{
   		 return:Object
   	  }
    },
    components:{
      supports,
      star,
      shopcar,
    },
    watch:{
      'seller'(){
        this._scroll();
      }
    },
    methods:{
      _scroll(){
        if(this.seller.pics){
          let picWidth = 120;
          let picMargin = 6;
          let outerWidth = (picWidth+picMargin)*this.seller.pics.length - picMargin + 'px';
          this.$refs.picWidth.style.width = outerWidth;

          this.picScroll = new BScroll(this.$refs.picWrapper,{
            scrollX: true,
          })
        }
      },
      showToggle:function(){  
        this.isShow = !this.isShow  
        if(this.isShow){  
            this.btnText = "已收藏"  
        }else{  
            this.btnText = "收藏"  
        }  
      } 
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import '../../common/mixin.scss';
  
	.seller{
		.title-star{
      padding: 0 18px;
      .line{
        position: relative;
        padding: 18px 0;
        @include border1px (#e6e7e8)
        .heart{
          width: 40px;
          position: absolute;
          right: 0;
          bottom: 18px;
          text-align: center;
          i{
            display: block;
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 4px;
            color: #ccc;
            &.active{
            color: rgb(240,20,20);

            }
          }
          span{
            line-height: 10px;
            font-size: 10px;
            color: rgb(77,85,93);
          }
        }
        .title{
          p{
            line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
        }
        .star-sell{
          .star-wrapper{
            display: inline-block;
            vertical-align: top;
            margin-top: 8px;
          }
          .rank-month{
            margin-top: 5px;
            display: inline-block;
            color: rgb(77,85,93);
            .rank{
              margin: 0 12px 0 8px;
              font-size: 10px;
            }
            .month{
              font-size: 10px;
            }
          }
        }
      }
      .price{
        display: flex;
        padding: 18px 0;
        .message{
          flex:1;
          text-align: center;
          border-right: 1px solid rgba(7,17,27,.1);
          &:last-child{
            border-right: none;
          }
          p{
            line-height: 10px;
            margin-bottom: 4px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
          span{
            line-height: 24px;
            font-weight: 200;
            color: rgb(7,17,27);
          }
          .money{
            font-size: 24px;
          }
          .yuan{
            font-size: 10px;
          }
        }
      }
    }
    .nothing{
      height: 18px;
      box-sizing:border-box;
      border-top: 1px solid #e6e7e8;
      border-bottom: 1px solid #e6e7e8;
      background-color: #f3f5f7;
    }
    .activity{
      padding: 18px 18px 0 18px;
      .title{
        font-size: 13px;
      }
      .content{
        padding: 8px 12px 16px 12px;
        line-height: 24px;
        font-size: 12px;
        font-weight: 200px;
        color: rgb(240,20,20);
        @include border1px (rgba(7,17,27,.1))
      }
    }
    .scene{
      box-sizing:border-box;
      padding: 18px;
      width: 100%;
      .title-scene{
        font-size: 13px;
        margin-bottom: 12px;
      }
      .pic-scene{
        overflow: hidden;
        ul{
          white-space: nowrap;
          font-size: 0;
          li{
            display: inline-block;
            width: 120px;
            height: 90px;
            margin-right: 6px;
            &:last-child{
              margin-right: 0;
            }
            img{
              width: 100%;
            }
          }
        }
      }
    }
    .business{
      padding: 18px 18px 0 18px;
      margin-bottom: 48px;
      .title-business{
        padding-bottom: 12px;
        font-size: 13px;
        @include border1px (rgba(7,17,27,.1))
      }
      .content-business{
        li{
          padding: 16px 12px;
          line-height: 16px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(7,17,27);
          @include border1px (rgba(7,17,27,.1));

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