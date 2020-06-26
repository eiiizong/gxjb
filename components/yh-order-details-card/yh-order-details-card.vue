<template>
  <view class="yh-order-details-card-wrapper">
    <view class="yh-order-details-card">
      <view class="shop-name">{{ shopInfo.shop_name}}</view>
      <view class="food-list">
        <template v-for="(item, index) in shoppingCartList">
          <template v-if="index < showNum">
            <yh-goods-card-order
              :cardData="item"
              :key="item.id"
            ></yh-goods-card-order>
          </template>
        </template>
      </view>
      <view class="see-more df ai-c jc-c" @click="handleSeeMore"  v-if="shoppingCartList.length > 2">
        <text>{{showNum===2?'显示全部':'收起'}}</text>
        <text class="icon icon-see-more" :class="[showNum===2?'':'more']"></text>
      </view>
      <view class="price-wrapper">
        <text class="icon icon-decoration icon-decoration-left"></text>
        <text class="icon icon-decoration icon-decoration-right"></text>
        <view class="full-reduction cell df ai-c jc-sb">
          <view class="left df ai-c">
            <text class="icon icon-full-reduction"></text>
            <text class="text">满减优惠</text>
          </view>
          <view class="right df ai-c">
            <view class="price">
              <text>-</text>
              <text>8</text>
            </view>
          </view>
        </view>
        <view class="delivery cell df ai-c jc-sb">
          <view class="left df ai-c">
            <text class="icon icon-delivery"></text>
            <text class="text">配送费</text>
          </view>
          <view class="right df ai-c">
            <view class="price">8</view>
          </view>
        </view>
        <view class="lunch-box cell df ai-c jc-sb">
          <view class="left df ai-c">
            <text class="icon icon-lunch-box"></text>
            <text class="text">餐盒费</text>
          </view>
          <view class="right df ai-c">
            <view class="price">8</view>
          </view>
        </view>
        <view class="total-price df ai-c jc-sb">
          <view class="left df ai-c">小计</view>
          <view class="right df ai-c">
            <view class="coupon df ai-fs">
              <text>优惠</text>
              <text class="price">7</text>
            </view>
            <view class="total">
              <text class="price">7</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * 订单详情
 * @description 订单详情
 */

import yhGoodsCardOrder from '@/components/yh-goods-card-order/yh-goods-card-order';

export default {
  name: 'yhOrderDetailsCard',
  props: {
    shopInfo: {
      type: [Object],
      default: () => {
        return {};
      },
    },
    shoppingCartList: {
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  components: {
    yhGoodsCardOrder,
  },
  data() {
    return {
      showNum: 2,
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    handleSeeMore() {
      const shoppingCartListLength = this.shoppingCartList.length
      const showNum = this.showNum
      if(showNum === 2) {
        this.showNum = shoppingCartListLength
      } else {
        this.showNum = 2
      }
    }
  },
  computed: {},
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
.yh-order-details-card-wrapper {
  width: 704rpx;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  margin-top: 14rpx;
}
.yh-order-details-card {
  width: 100%;
  border-radius: 12rpx;
  border: 1px solid $wrapper-border-color;
  background-image: $wrapper-background-image;
  .shop-name {
    font-size: 30rpx;
    font-weight: 700;
    line-height: 80rpx;
    color: #201e19;
    padding: 0 24rpx;
    border-bottom: 1px solid #f0ede6;
  }
  .food-list {
    padding: 0 24rpx;
  }
  .see-more {
    height: 92rpx;
    color: #09527d;
    font-size: 28rpx;
    .icon {
      margin-left: 10rpx;
    }
  }
  .price-wrapper {
    border-top: 1px dashed $wrapper-border-color;
    padding: 20rpx 40rpx;
    font-size: 28rpx;
    line-height: 1;
    color: #000;
    position: relative;
    .icon-decoration {
      width: 28rpx;
      height: 28rpx;
      border-radius: 50%;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAABlBMVEX19PL18e///of6AAAA/UlEQVQoz23QMU7FMAwG4L+KRDZyhI4cIwsSl2FnbI+Wo1RiYCRiikQU88fJM+0DD9XX2I6tAFF2rNk3AFTIa6W2DF9ioWKGq/yARQgiXaHAD/mKRSRR7iwnjcDCs6uehwrwatp27T2o5G86YleiRIopU3tfmTVO+k4cqdKRQ3jkBV7HPrAtVGj8r/irYuIYBVeZcqZgWiVNCZdyHd4Uhr7YKcJffMNPCeOjZ1XvwjbV0nr2sxfp2Ys0aqfGLsxepVk3hVtdO2XvZVlKO+wWk//Tm7DcabEOJ2lq03dpwCoqAeKURj4JU4epXpWANyljDTypiH4jZqwm12Vr/QALqdlG+20efgAAAABJRU5ErkJggg==);
      position: absolute;
      border: 1px solid $wrapper-border-color;
    }
    .icon-decoration-left {
      top: -14rpx;
      left: -14rpx;
    }
    .icon-decoration-right {
      top: -14rpx;
      right: -14rpx;
    }
    .cell {
      height: 68rpx;
      .left {
        padding-left: 36rpx;
        position: relative;
        .icon {
          position: absolute;
          left: -8rpx;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .right {
        font-size: 36rpx;
        .price {
          color: #8d2325;
          &::before {
            content: '¥';
          }
        }
      }
      &.full-reduction {
        .right {
          .price {
            color: #c0a062;
            &::before {
              content: '';
            }
            text {
              &:last-child {
                &::before {
                  content: '¥';
                }
              }
            }
          }
        }
      }
    }
    .total-price {
      height: 92rpx;
      border-top: 4rpx solid #f2f0eb;
      .right {
        font-weight: 700;
      }
      .coupon {
        margin-right: 40rpx;
        .price {
          font-size: 24rpx;
          color: #09527d;
          padding-left: 4rpx;
        }
      }
      .price {
        color: #8d2325;
        font-size: 48rpx;
        &::before {
          content: '¥';
        }
      }
    }
  }
  .icon-see-more {
    transition: all .3s;
    &.more {
      transform: rotate(-180deg);
    }
  }
}
</style>
