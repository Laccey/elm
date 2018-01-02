<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)" ref="menuList">
          <span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list"  ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="food-icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  const ERR_OK = 0;
  export default {
    // name: 'goods'
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this._followScroll(i);
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.menuScroll.scrollToElement(el, 300, 0, -100);
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .goods
    display:flex;
    overflow:hidden;
    position:absolute;
    width:100%;
    top:177px;
    bottom:46px;
    .menu-wrapper
      flex:0 0 80px;
      width:80px;
      background:#f3f5f7;
      .menu-item
        display:table;
        line-height:14px;
        height:54px;
        width:56px;
        padding:0 12px;
        &.current
          position:relative;
          margin-top:-1px;
          z-index:10;
          background:#fff;
          font-weight:700;
          .text
            border-none();
        .text
          display:table-cell;
          font-size:12px;
          font-weight:200;
          width:56px;
          /*padding:0 12px;*/
          vertical-align:middle;
          border-1px(rgba(7,17,27,0.1));
          .icon
            display:inline-block;
            width:12px;
            height:12px;
            vertical-align:top;
            margin-right:2px;
            background-size:100%;
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')

    .foods-wrapper
      flex:auto;
      .title
        height:26px;
        font-size:12px;
        line-height:26px;
        background:#f3f5f7;
        color:rgb(147,153,159);
        padding-left:14px;
        border-left:2px solid #d9ded1;

      .food-item
        display:flex;
        margin:18px 18px 0 18px;
        padding-bottom:18px;
        border-1px(rgba(7,17,27,0.1));
        &.last-child
          border-none();
        .icon
          flex:0 0 57px;
          margin-right:10px;
        .content
          flex:auto;
          .name
            font-size:14px;
            height:14px;
            line-height:14px;
            color:rgb(7,17,27);
            margin:2px 0 8px;
          .desc,.extra
            font-size:10px;
            line-heihgt:10px;
            color:rgb(147,153,159);
          .desc
            line-height:14px;
            margin-bottom:8px;
          .extra
            .sellCount
              margin-right:12px;
          .price
            line-height:24px;
            font-weight:700;
            .now
              margin-right:8px;
              color:red;
              font-size:14px;
            .old
              color:rgb(147,153,159);
              font-size:10px;
              text-decoration:line-through;

          .cartcontrol-wrapper
            position:absolute;
            right:0;
            bottom:12px;
</style>
