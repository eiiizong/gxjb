<template>
  <view class="yh-goods-card-order-wrapper">
    <view class="yh-goods-card-order">
      <view class="img-border-wrapper">
        <image :src="cardData.img" />
      </view>
      <div class="goods-info">
        <div class="food-name">{{cardData.goods_name}}</div>
        <div class="food-type" v-if="cardData.spec_str&&cardData.spec_str.length>0">
          <template v-for="(item, index) in cardData.spec_str">
            <text :key="index">{{item}}</text>
          </template>
        </div>
        <div class="bottom">
          <view class="price">{{cardData.sell_price}}</view>
          <div class="num">
            <text class="icon">x</text>
            <text>{{cardData.num}}</text>
          </div>
          <view class="total-price">{{totalPrice}}</view>
        </div>
      </div>
    </view>
  </view>
</template>

<script>
/**
 * 选中食品卡片
 */

import Big from '@/common/utils/big.js';
export default {
  name: 'yhGoodsCardOrder',
  props: {
    cardData: {
      type: [Object],
      default: () => {
        return {}
      },
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    // console.log(this.$scopedSlots.prefix)
  },
  methods: {},
  computed: {
    totalPrice() {
      let str = ''
      const data = this.cardData
      const price = new Big(data.sell_price)
      return  price.times(data.num)
    }
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
view,
text {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.yh-goods-card-order-wrapper {
  width: 100%;
  display: flex;
  padding: 20rpx 0;
  overflow: hidden;
  border-bottom: 1px solid #f7f5f0;
  .yh-goods-card-order {
    flex: 1;
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .img-border-wrapper {
    width: 160rpx;
    height: 160rpx;
    display: flex;
    border: 4rpx solid #c0a062;
    border-radius: 8rpx;
    margin-right: 20rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 4rpx;
    }
  }
  .goods-info {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-size: 28rpx;
    color: #201e19;
    position: relative;
    .food-name {
      line-height: 52rpx;
      @include textOverflow();
    }
    .food-type {
      position: absolute;
      top: 58rpx;
      left: 0;
      font-size: 22rpx;
      color: #999793;
      text {
        padding-right: 24rpx;
        position: relative;
        &::after {
          content: '';
          width: 1px;
          height: 20rpx;
          position: absolute;
          background-color: #999793;
          top: 50%;
          transform: translateY(-50%);
          right: 10rpx;
        }
        &:last-child {
          padding-left: 0;
          &::after {
            display: none;
          }
        }
      }
    }
    .bottom {
      display: flex;
      margin-top: 58rpx;
      font-size: 36rpx;
      line-height: 1;
      position: relative;
      color: #8d2325;
      .price {
        width: 132rpx;
        &::before {
          content: '￥';
          font-size: 32rpx;
        }
      }
      .num {
        color: #1f1c18;
        display: flex;
        align-items: center;
        .icon {
          font-size: 28rpx;;
          color: #999793
        }
      }
      .total-price {
        position: absolute;
        right: 0;
        top: 0;
        font-weight: 700;
        &::before {
          content: '￥';
          font-size: 32rpx;
        }
      }
    }
  }
}
</style>
