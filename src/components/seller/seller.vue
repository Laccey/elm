<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="count">({{seller.ratingCount}})</span>
          <span class="count">月售{{seller.sellCount}}单</span>
        </div>
        <!--<div class="collect">-->
          <!--<span class="icon-favorite"></span>-->
        <!--</div>-->
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  import split from '../split/split';

  export default {
    // name: 'seller'
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position:absolute;
    top:177px;
    left:0;
    bottom:0;
    width:100%;
    overflow:hidden;
    .seller-content
      .overview
        padding:18px;
        .name
          line-height:14px;
          font-size:14px;
          color:rgb(7,17,27);
          margin-bottom:8px;
        .star-wrapper
          padding-bottom:18px;
          border-1px(rgba(7,17,27,0.1));
          font-size:0;
          color:rgb(77,85,93);
          .star
            display:inline-block;
            vertical-align:top;
            margin-right:8px;
          .count
            line-height:18px;
            display:inline-block;
            vertical-align:top;
            font-size:10px;
            margin-right:12px;
        .remark
          display:flex;
          margin-top:18px;
          .block
            flex:1;
            text-align:center;
            border-right:1px solid rgba(7,17,27,0.1);
            &:last-child
              border-right:none;
            h2
              font-size:10px;
              line-height:10px;
              margin-bottom:4px;
              color:rgb(147,153,159);
            .content
              line-height:24px;
              font-size:10px;
              color:rgb(7,17,27);
              .stress
                font-size:24px;
      .bulletin
        margin-top:18px;
</style>
