<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评价</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <!--<ratingselect @ratingtype-select="ratingtypeSelect" @content-toggle="contentToggle" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>-->
      <ratingselectd @ratingtype-select="ratingtypeSelect" @content-toggle="contentToggle" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselectd>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="rating in ratings">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <!--<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>-->
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  import split from '../split/split';
  import ratingselectd from '../ratingselect/ratingselectd';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    // name: 'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
      ratingtypeSelect(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      contentToggle() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
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
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselectd,
      BScroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position:absolute;
    top:177px;
    bottom:0;
    width:100%;
    left:0;
    overflow:hidden;
    .overview
      display:flex;
      padding:18px 0;
      .overview-left
        flex:0 0 137px;
        width:137px;
        text-align:center;
        border-right:1px solid rgba(7,17,27,0.1);
        padding:6px 0;
        @media only screen and (max-width:320px)
          flex:0 0 120px;
          width:120px;
        .score
          line-height:28px;
          font-size:24px;
          color:rgb(255,153,0);
          margin-bottom:6px;
        .title
          line-height:12px;
          font-size:12px;
          color:rgb(7,17,27);
          margin-bottom:8px;
        .rank
          line-height:10px;
          font-size:10px;
          color:rgb(147,153,159);
      .overview-right
        flex:auto;
        padding:6px 0 6px 24px;
        @media only screen and (max-width:320px)
          padding-left:6px;
        .score-wrapper
          font-size:0;
          margin-bottom:8px;
          .title
            line-height:18px;
            vertical-align:top;
            font-size:12px;
            color:rgb(7,17,27);
          .star
            display:inline-block;
            vertical-align:top;
            margin:0 12px;
          .score
            vertical-align:top;
            font-size:12px;
            color:rgb(255,153,0);
            line-height:18px;
        .delivery-wrapper
          font-size:0;
          .title
            line-height:18px;
            font-size:12px;
            color:rgb(7,17,27);
          .delivery
            line-height:18px;
            font-size:12px;
            color:rgb(147,153,159);
            margin-left:12px;
    .rating-wrapper
      padding:0 18px;
      .rating-item
        padding:18px 0;
        display:flex;
        border-1px(rgba(7,17,27,0.1));
        .avatar
          flex:0,0,28px;
          margin-right:12px;
          img
            border-radius:50%;
        .content
          flex:1;
          position:relative;
          .name
            line-height:12px;
            font-size:10px;
            color:rgb(7,17,27);
            margin-bottom:4px;
          .star-wrapper
            margin-bottom:6px;
            font-size:0;
            .star
              display:inline-block;
              vertical-align:top;
              margin-right:6px;
            .delivery
              font-size:10px;
              vertical-align:top;
              color:rgb(147,153,159);
              font-weight:200;
          .text
            line-height:18px;
            font-size:12px;
            color:rgb(7,17,27);
            margin-bottom:8px;
          .recommend
            line-height:16px;
            font-size:0;
            .icon-thumb_up,.item
              display:inline-block;
              margin:0 8px 4px 0;
              font-size:9px;
            .icon-thumb_up
              color:rgb(0,160,220);
              font-size:12px;
            .item
              padding:0 6px;
              border:1px solid rgba(7,17,27,0.1);
              border-radius:1px;
              color:rgb(147,153,159);
          .time
            position:absolute;
            top:0;
            right:0;
            font-size:10px;
            color:rgb(147,153,159);
</style>
