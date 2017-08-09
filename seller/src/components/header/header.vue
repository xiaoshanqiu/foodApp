<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="imgs">
        <img width="64" height="64" :src="seller.avatar" alt="" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <h2>{{seller.name}}</h2>
        </div>
        <p class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <div class="supports-wrapper">
          <supports v-if="seller.supports" :supports="seller.supports"></supports>
        </div>
      </div>
    </div>
    <div class="num-wrapper" v-if="seller.supports" @click='showDetail'>
      <div class="num-content">
        {{seller.supports.length}}个
        <i class="iconfont icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="notice-wrapper" @click='showDetail'>
      <span class="not"></span>
      <p>{{seller.bulletin}}</p>
      <i class="iconfont icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" />
    </div>
    
    <transition name="fade">
      <div class="detail-wrapper" v-show="detailShow" @click="closeDetail">
        <div class="detail">
          <div class="txt">
            <h2>{{seller.name}}</h2>
            
            <div class="star-wrapper">
              <star :star="seller.score" :size="24">你好</star>
            </div>
             
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>

            <div class="supports-wrapper">
              <supports v-if="seller.supports" :supports="seller.supports" :className="big1"></supports>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="home">
               <p class="bulletin">{{seller.bulletin}}</p>
            </div>
          </div>
          <div class="close" @click="closeDetail">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </div>

    </transition>
  </div>
</template>

<script>
  import supports from '../supports/supports.vue'
  import star from '../star/star.vue'
  
  export default {
    props:{
      seller:{
        return:Object
      }
    },
    data(){
      return{
        detailShow:false,
        big1:'big'
      }
    },
    methods:{
      showDetail(){
        this.detailShow = true;
      },
      closeDetail(){
        this.detailShow = false;
      }
    },
    components:{
      supports,
      star,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import '../../common/mixin.scss';
  
  .header{
    position: relative;
    background-color: rgba(7,17,27,.5);
    .content-wrapper{
      padding: 24px 0 18px 24px;
      font-size: 0;
      .imgs{
        display: inline-block;
        margin-right: 18px;
        border-radius: 2px;
        overflow: hidden;
      }
      .content{
        display: inline-block;
        vertical-align: top;
        .brand{
          vertical-align: top;
          margin-right: 6px;
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bgImage('brand');
          background-size: cover;
        }
        h2{
          display: inline-block;
          line-height: 18px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }
        .desc{
          margin: 8px 0 10px 0;
          line-height: 12px;
          font-weight: 200;
          font-size: 12px;
          color: #fff;
        }
        .supports-wrapper{
          height: 12px;
          overflow: hidden;
          &:active{
            height: auto;
          }
        }
      }
    }
    .num-wrapper{
      height: 24px;
      width: 43px;
      position: absolute;
      right: 12px;
      top: 68px;
      background-color: rgba(0,0,0,.2);
      border-radius: 10px;
      .num-content{
        box-size:border-box;
        font-size: 10px;
        line-height: 24px;
        font-weight: 200px;
        text-align: center;
        color: rgb(255,255,255);
      }
    } 
    .notice-wrapper{
      position: relative;
      padding: 12px;
      overflow: hidden;
      color: rgb(255,255,255);
      background-color: rgba(7,17,27,.2);
      .not{
        float: left;
        width: 24px;
        height: 12px;
        margin-right: 4px;
        @include bgImage('bulletin');
        background-size: cover;
      }
      p{
        font-size: 10px;
        margin-right: 16px;
        @include ellipsis;
      }
      i{
        position: absolute;
        top: 10px;
        right: 12px;
      }
    }
    .background{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 143px;
      overflow: hidden;
      filter:blur(10px);
      z-index: -1;
      img{
        width: 100%;
      }
    }
    .detail-wrapper{
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      overflow: auto;
      background-color: rgba(7,17,27,.8);
      z-index: 1;
      .detail{
        position: relative;
        min-height: 100%;
        backdrop-filter:blur(10px);
        color: #fff;
        .txt{
          padding: 0 32px 96px;
          color: #fff;
          h2{
            margin-top: 64px;
            line-height: 16px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
          }
          .star{
            margin: 16px auto 28px auto;
          }
        }
        .title{
          display: flex;
          .line{
            position: relative;
            top: -7px;
            flex:1;
            border-bottom: 1px solid rgba(255,255,255,.2)
          }
          .text{
            padding: 0 12px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .home{
          margin-top: 24px;
          .bulletin{
            line-height: 24px;
            font-size: 12px;
            font-weight: 200;
          }
        }
        .close{
          padding: 32px 0;
          position: absolute;
          bottom: 0;
          width: 100%;
          font-size: 32px;
          text-align: center;
          z-index: 10;
          color: rgba(255,255,255,.5);
        }
      }
    }
    .fade-enter-active,.fade-leave-active{
      transition: opacity .6s;
    }
    .fade-enter,.fade-leave-to{
      opacity: 0;
    }

  }
 
</style>