<template>
  <view class="yh-goods-card-wrapper" :class="[last ? 'last' : '']">
    <view class="img-box">
      <image :src="cardData.img" />
    </view>
    <div class="goods-info">
      <div class="top">
        <div class="food-name">{{ cardData.goods_name }}</div>
        <div class="food-desc" v-if="cardData.desc">{{ cardData.desc }}</div>
      </div>
      <div class="bottom">
        <div class="food-sale" v-if="cardData.sale">
          月售{{ cardData.sale }}份
        </div>
        <div class="handle">
          <view class="price">{{ cardData.sell_price }}</view>
          <view class="handle-btn">
            <yh-control-purchase-quantity
              :value="cardData.num"
              @sub="handleSub"
              @add="handleAdd"
            ></yh-control-purchase-quantity>
          </view>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 * @property {Number} maxlength  最大输入长度
 */
import yhControlPurchaseQuantity from '@/components/yh-control-purchase-quantity/yh-control-purchase-quantity';
export default {
  name: 'yhGoodsCard',
  components: {
    yhControlPurchaseQuantity,
  },
  props: {
    last: {
      type: [Boolean],
      default: false,
    },
    cardData: {
      type: [Object],
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    // console.log(this.$scopedSlots.prefix)
  },
  methods: {
    handleSub() {
      const data = this.cardData;
      this.$emit('sub', data.category_id, data.id,data.is_multiple_spec,data);
    },
    handleAdd() {
      const data = this.cardData;
      this.$emit('add', data.category_id, data.id, data.is_multiple_spec,data);
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
view,
text,
icon {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.yh-goods-card-wrapper {
  width: 100%;
  // background-color: #f0f;
  display: flex;
  margin-bottom: 20rpx;
  &.last {
    margin-bottom: 0;
  }
  .img-box {
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
    justify-content: space-between;
  }
  .handle {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .handle-btn {
    display: flex;
    align-items: center;
  }
  .food-name {
    font-size: 30rpx;
    line-height: 38rpx;
    @include textOverflow();
  }
  .food-desc {
    font-size: 22rpx;
    color: #999793;
    padding-top: 8rpx;
    @include textOverflow();
  }
  .food-sale {
    font-size: 22rpx;
    color: #999793;
  }
  .price {
    font-size: 36rpx;
    color: #8d2325;
    &::before {
      content: '￥';
      font-size: 32rpx;
    }
  }
}
</style>
