<template>
  <view class="yh-control-purchase-quantity-wrapper">
    <view class="yh-control-purchase-quantity">
      <text class="icon icon-sub" v-if="value" @click="handleSub"></text>
      <text class="value" v-show="value">{{ value }}</text>
      <text class="icon icon-add" @click="handleAdd"></text>
    </view>
  </view>
</template>

<script>
/**
 * @description 
 * @property {Number} value  数值
 */

export default {
  name: 'yhControlPurchaseQuantity',
  components: {},
  props: {
    value: {
      type: [Number],
      default: 0,
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleSub(event) {
      this.$emit('sub',event);
    },
    handleAdd(event) {
      this.$emit('add',event);
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';

view,
text {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.yh-control-purchase-quantity-wrapper {
  display: flex;
  align-items: center;
}
.yh-control-purchase-quantity {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .value {
    min-width: 50rpx;
    height: 50rpx;
    background-color: #f0f2f4;
    text-align: center;
    line-height: 50rpx;
    color: #13120f;
    font-size: 26rpx;
    padding: 0 8rpx;
  }
}
</style>
