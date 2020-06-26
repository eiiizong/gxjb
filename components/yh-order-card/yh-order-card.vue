<template>
  <view class="yh-order-card-wrapper">
    <view class="yh-order-card">
      <div class="top">
        <div class="left">
          <div class="logo">
            <image :src="shopInfo.image" mode="" />
          </div>
          <div class="info">
            <div class="name">{{shopInfo.shop_name}}</div>
            <div class="time">{{ cardData.created_at }}</div>
          </div>
        </div>
        <div class="right">
          <text class="status active">配送中</text>
        </div>
      </div>
      <div class="list">
        <template v-for="item in cardData.goods">
          <div class="item" :key="item.id">
            <div class="left">
              <div class="img-border-wrapper">
                <image :src="item.img" mode="" />
              </div>
              <div class="goods-name">{{item.name}}</div>
            </div>
            <div class="right">
              <div class="price">{{item.sell_price}}</div>
            </div>
          </div>
        </template>
      </div>
      <view class="btn-box">
        <yh-button-zdy
          @click="handleDetail"
          text="ckxq"
          size="150-58"
        ></yh-button-zdy>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 * @property {Number} maxlength  最大输入长度，设置为 -1 的时候不限制最大长度 默认为140
 * @property {Boolean} collapseKeyboard = [false|true] 控制键盘的自动收起 当设置了maxlength时才有效果
 * @property {String} type = [text|password] 输入框类型
 *  @value text 文本输入框
 * @property {Boolean} disabled = [false|true] 是否禁用输入框
 */
import yhButtonZdy from '@/components/yh-button-zdy/yh-button-zdy';
export default {
  name: 'yhSwiper',
  props: {
    cardData: {
      type: [Object],
      default: () => {
        return {};
      },
    },
    shopInfo: {
      type: [Object],
      default: () => {
        return {};
      },
    }
  },
  components: {
    yhButtonZdy,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
  },
  methods: {
    handleDetail() {
      this.$emit('detail', this.cardData.id)
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
view,
text {
  box-sizing: border-box;
}
.yh-order-card-wrapper {
  width: 100%;
  margin-bottom: 20rpx;
}
.yh-order-card {
  margin: auto;
  width: 702rpx;
  background-image: linear-gradient(0deg, #faf6f0 0%, #ffffff 100%);
  border: 1px solid #f4ca94;
  border-radius: 12rpx;
  padding: 20rpx 20rpx 26rpx;
  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .right,
    .left {
      display: flex;
    }
    .left {
      flex: 1;
    }
    .logo {
      width: 80rpx;
      height: 80rpx;
      margin-right: 12rpx;
      image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
    }
    .info {
      flex: 1;
      overflow: hidden;
    }
    .name {
      font-size: 30rpx;
      font-weight: 700;
      line-height: 50rpx;
      color: #201e19;
    }
    .time {
      font-size: 22rpx;
      line-height: 34rpx;
      color: #999793;
    }
    .status {
      font-size: 30rpx;
      line-height: 50rpx;
      color: #84827f;
      &.active {
        color: #c0a062;
        font-weight: 700;
      }
    }
  }
  .list {
    padding-top: 30rpx;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .left,
      .right {
        display: flex;
        align-items: center;
      }
    }
    .goods-name {
      font-size: 28rpx;
      color: #201e19;
      line-height: 1.2;
    }
    .price {
      font-size: 30rpx;
      color: #8d2325;
      padding-left: 10rpx;
      font-weight: 500;
      &::before {
        content: '￥';
        font-size: 22rpx;
      }
    }
  }
  .btn-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 30rpx;
  }
}
.img-border-wrapper {
  width: 160rpx;
  height: 114rpx;
  border: 5rpx solid #f4ca94;
  border-radius: 12rpx;
  overflow: hidden;
  margin-right: 24rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
