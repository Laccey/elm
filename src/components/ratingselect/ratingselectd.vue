<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch border-1px" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    // name: "ratingselect"
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('ratingtype-select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('content-toggle');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .rating-type
    margin:0 18px;
    padding:18px 0;
    border-1px(rgba(7,17,27,0.1));
    .block
      padding:8px 12px;
      border-radius:1px;
      margin-right:8px;
      font-size:12px;
      color:rgb(77,85,93);
      line-height:16px;
      &.active
        color:#fff;
      &.positive
        background:rgba(0,160,220,0.2);
        &.active
          background:rgb(0,160,220);
      &.negative
        background:rgba(77,85,93,0.2);
        &.active
          background:rgb(77,85,93);
      .count
        font-size:8px;
        margin-left:2px;
  .switch
    padding:12px 18px;
    line-height:24px;
    border-1px(rgba(7,17,27,0.1));
    color:rgb(147,153,159);
    font-size:0;
    &.on
      .icon-check_circle
        color:#00c850;
    .icon-check_circle
      display:inline-block;
      font-size:24px;
      margin-right:4px;
      vertical-align:top;
    .text
      font-size:12px;

</style>

