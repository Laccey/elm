<template>
  <transition name="move">
    <div v-show="showFood" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
        <div class="ratings" v-show="food.ratings">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import Vue from 'vue';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

  export default {
    // name: "food"
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFood: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFood = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFood = false;
      },
      addFirst(event) {
        // 防止PC端多次点击
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    events: {
      'ratingtype.select'(type) {
        this.selectType = type;
        this.scroll.refresh();
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.scroll.refresh();
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position:fixed
    left:0;
    top:0;
    bottom:48px;
    z-index:30;
    width:100%;
    background-color:#fff;
    transform:translate3d(0,0,0);
    transition: all 0.4s;
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s;
    &.move-enter, &.move-leave-to
      transform:translate3d(100%,0,0);
    .image-header
      position:relative;
      width:100%;
      height:0;
      padding-top:100%;
      img
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
      .back
        position:absolute;
        top:10px;
        left:0;
        .icon-arrow_lift
          display:block;
          padding:10px;
          font-size:20px;
          color:#fff;
    .content
      padding:18px;
      position:relative;
      .title
        font-size:14px;
        font-weight:700;
        color:rgb(7,17,27);
        line-height:14px;
        margin-bottom:8px;
      .detail
        margin-bottom:18px;
        font-size:10px;
        line-height:10px;
        color:rgb(147,153,159);
        .sell-count
          margin-right:12px;
      .price
        line-height:24px;
        font-weight:700;
        .now
          font-size:14px;
          color:rgb(240,20,20);
          margin-right:8px;
        .old
          font-size:10px;
          color:rgb(147,153,159);
          text-decoration:line-through;
      .cartcontrol-wrapper
        position:absolute;
        right:12px;
        bottom:12px;
      .buy
        position:absolute;
        right:18px;
        bottom:18px;
        z-index:10;
        padding:0 12px;
        height:24px;
        line-height:24px;
        background:rgb(0,160,220);
        border-radius:12px;
        color:#fff;
        font-size:10px;
        opacity:1;
        transition:all 0.4s;
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.4s;
        &.fade-enter, &.fade-leave-to
          opacity:0;
    .info
      padding:18px;
      .title
        font-size:14px;
        color:rgb(7,17,27);
        line-height:14px;
        margin-bottom:6px;
      .text
        font-size:12px;
        color:rgb(77,85,93);
        font-weight:200;
        line-height:24px;
        padding:0 8px;
    .ratings
      padding-top:18px;
      .title
        font-size:14px;
        color:rgb(7,17,27);
        line-height:14px;
        margin-left:18px;
      .rating-wrapper
        padding:0 18px;
        .rating-item
          padding:16px 0;
          position:relative;
          border-1px(rgba(7,17,27,0.1));
          .user
            position:absolute;
            right:0;
            top:16px;
            font-size:0;
            .name
              display:inline-block;
              /*line-height:12px;*/
              font-size:10px;
              color:rgb(147,153,159);
              margin-right:6px;
              vertical-align:top;
            .avatar
              border-radius:50%;
          .time
            line-height:12px;
            font-size:10px;
            color:rgb(147,153,159);
            margin-bottom:6px;
          .text
            line-height:16px;
            font-size:12px;
            color:rgb(7,17,27);
            .icon-thumb_up,.icon-thumb_down
              line-height:16px;
              color:rgb(0,160,220);
              margin-right:4px;
            .icon-thumb_down
              color:rgb(147,153,159);



</style>

