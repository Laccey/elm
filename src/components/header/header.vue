<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%;" alt="avatar">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    // name: "header.vue"
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color:#fff;
    position:relative;
    background:rgba(7,17,27,0.5);
    overflow:hidden;
    .content-wrapper
      position relative;
      padding:24px 12px 18px 24px;
      overflow:hidden;
      .avatar
        float:left;
        img
          border-radius 2px;
      .content
        float:left;
        font-size:14px;
        margin-left:16px;
        .title
          margin:2px 0 8px 0;
          font-size:0;
          .brand
            display inline-block;
            width:30px;
            height:18px;
            bg-image('brand');
            background-size:100%;
            vertical-align:top;
          .name
            font-size:16px;
            font-weight:bold;
            line-height:18px;
            margin-left:6px;
        .description
          font-size:12px;
          margin-bottom:10px;
          line-height:12px;
        .support
          font-size:0;
          .icon
            display:inline-block;
            /*float:left;*/
            vertical-align:top;
            width:12px;
            height:12px;
            margin-right:4px;
            background-size:100%;
            &.decrease
              bg-image('decrease_1');
            &.discount
              bg-image('discount_1');
            &.guarantee
              bg_image('guarantee_1');
            &.invoice
              bg-image('invoice_1');
            &.special
              bg-image('special_1');
          .text
            font-size:10px;
            line-height:12px;

      .support-count
        position:absolute;
        right:12px;
        bottom:18px;
        padding:0 8px;
        height:24px;
        line-height 24px;
        border-radius:14px;
        background-color:rgba(0,0,0,.2);
        text-align:center;
        .count
          font-size:10px;
        .icon-keyboard_arrow_right
          font-size:10px;

    .bulletin-wrapper
      position:relative;
      height:28px;
      line-height:28px;
      padding:0 22px 0 12px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      background:rgba(7,17,27,.2);
      .bulletin-title
        display:inline-block;
        width:22px;
        height:12px;
        background-size:100%;
        bg-image('bulletin');
        vertical-align:top;
        margin-top:8px;
      .bulletin-text
        font-size:10px;
        margin:0 4px;
      .icon-keyboard_arrow_right
        position:absolute;
        font-size:10px;
        right:12px;
        bottom:8px;

    .background
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:-1;
      filter:blur(10px);
    .detail
      position:fixed;
      top:0;
      left:0;
      z-index:100;
      width:100%;
      height:100%;
      overflow:auto;
      backdrop-filter: blur(10px)
      opacity: 1;
      background: rgba(7, 17, 27, 0.8);
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s;
      &.fade-enter, &.fade-leave-to
        opacity: 0;
        background: rgba(7, 17, 27, 0);
      .detail-wrapper
        min-height:100%;
        width:100%;
        .detail-main
          margin-top:64px;
          padding-bottom:64px;
          .name
            line-height:16px;
            text-align:center;
            font-size:16px;
            font-weight:700;
          .star-wrapper
            margin:18px auto;
            text-align: center;
          .title
            display:flex;
            width:80%;
            margin:28px auto 24px;
            .line
              flex:auto;
              height:0;
              border-bottom:1px solid rgba(255,255,255,0.2);
              position :relative;
              top:6px;
            .text
              padding:0 12px;
              font-size:14px;
              font-weight:700;
          .supports
            width:80%;
            margin:0 auto;
            .support-item
              padding:0 12px;
              margin-bottom:12px;
              font-size:0;
              &:last-child
                margin-bottom: 0;
              .icon
                display:inline-block;
                width:16px;
                height:16px;
                vertical-align:top;
                margin-right:6px;
                background-size:100%;
                &.decrease
                  bg-image('decrease_2');
                &.discount
                  bg-image('discount_2');
                &.guarantee
                  bg_image('guarantee_2');
                &.invoice
                  bg-image('invoice_2');
                &.special
                  bg-image('special_2');

              .text
                font-size:12px;
                font-weight:100;
                line-height:16px;

          .bulletin
            width:80%;
            margin:0 auto;
            .content
              padding:0 12px;
              font-size:12px;
              line-height:24px;
              font-weight:200;
      .detail-close
        position:relative;
        width:32px;
        height:32px;
        margin:-64px auto 0;
        clear:both;
        font-size :32px;
</style>
