<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
      // name: "cartcontrol"
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size:0;
    .cart-decrease
      display:inline-block;
      padding:6px;
      opacity: 1;
      transform: translate3d(0, 0, 0);
      .inner
        font-size:24px;
        line-height:24px;
        color:rgb(0,160,220);
        transform: rotate(0);
        transition: all 0.4s linear;
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear;
      &.move-enter, &.move-leave-to
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner
          transform: rotate(180deg);
    .cart-count
      display:inline-block;
      font-size:10px;
      vertical-align:top;
      line-height:24px;
      padding-top:6px;
      width:12px;
      text-align:center;
      color:rgb(147,153,159);
    .cart-add
      display:inline-block;
      padding:6px;
      font-size:24px;
      line-height:24px;
      color:rgb(0,160,220);
</style>
