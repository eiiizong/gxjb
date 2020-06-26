<template>
  <view class="yh-coupon-card-wrapper">
    <view class="yh-coupon-card icon icon-coupon-card">
      <view class="name">{{ cardData.name }}</view>
      <view class="time">{{ cardData.time }}</view>
      <view class="num">
        <text>数量：</text>
        <text>{{ cardData.num }}</text>
      </view>
      <view class="btn-box">
        <yh-button-zdy @click="handleUse" text="ljsy" size="150-58"></yh-button-zdy>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 */
import yhButtonZdy from '@/components/yh-button-zdy/yh-button-zdy';
export default {
  name: 'yhCouponCard',
  props: {
    cardData: {
      type: [Object],
      default: () => {
        return {};
      },
    },
  },
  components: {
    yhButtonZdy,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    // console.log(this.$scopedSlots.prefix)
  },
  methods: {
    handleUse(e) {
      this.$emit('use', this.cardData.id)
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
view,
text{
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.yh-coupon-card-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 24rpx;
  .yh-coupon-card {
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 26rpx 24rpx;
    position: relative;
    .name {
      font-size: 28rpx;
      line-height: 1;
      color: #201e19;
    }
    .time {
      font-size: 22rpx;
      line-height: 1;
      padding-top: 18rpx;
      color: #999793;
    }
    .num {
      font-size: 24rpx;
      line-height: 1;
      font-weight: bold;
      padding-top: 18rpx;
      color: #c0a062;
      display: flex;
      align-items: center;
      text {
        &:last-child {
          font-size: 26rpx;
          line-height: 1;
          font-weight: 400;
        }
      }
    }
    .btn-box {
      position: absolute;
      right: 24rpx;
      bottom: 24rpx;
    }
  }
}
</style>
