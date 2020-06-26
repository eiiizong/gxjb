<template>
  <view
    class="yh-address-card-wrapper"
    v-if="addressData"
    :class="[addressData.is_default === '1' ? 'active' : '']"
    @click.stop="handleAddress"
  >
    <view class="yh-address-card">
      <view class="left">
        <text
          class="icon"
          :class="[
            addressData.is_default === '1'
              ? 'icon-checkbox-circle-checked'
              : 'icon-checkbox-circle',
          ]"
          v-if="type === 'select'"
        ></text>
        <text class="icon icon-address" v-else></text>
      </view>
      <view class="center">
        <view>
          <view class="name">
            <text
              >{{ addressData.accept_name }}({{
                addressData.gender === '2' ? '先生' : '女士'
              }})</text
            >
            <text class="tel" v-if="addressData.telphone">{{
              addressData.telphone|FormatPhoneNumbere}}</text>
          </view>
          <view class="addr" v-if="addressData.full_address">{{
            addressData.full_address
          }}</view>
        </view>
      </view>
      <view class="right">
        <text class="icon icon-edit" @click.stop="handleEdit"></text>
        <text class="icon icon-delete" @click.stop="handleDelete"></text>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 */
export default {
  name: 'yhAddressCard',
  props: {
    addressData: {
      type: [Object],
      default: () => {
        return {};
      },
    },
    type: {
      type: [String],
      default: ''
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
    handleAddress() {
      this.$emit('click', this.addressData.id);
    },
    handleEdit() {
      this.$emit('edit', this.addressData.id);
    },
    handleDelete() {
      this.$emit('delete', this.addressData.id);
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
text,
view {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.yh-address-card-wrapper {
  padding: 0 26rpx 0 30rpx;
  display: flex;
  width: 100%;
  margin: 0 auto;
  width: 702rpx;
  height: 138rpx;
  background-image: $wrapper-background-image;
  // box-shadow: 0px 4rpx 4rpx 0px rgba(0, 0, 0, 0.3);
  border-radius: $wrapper-border-radius;
  border: 1px solid $wrapper-border-color;
  transition: all .3s;
  &.active {
    background-image: $wrapper-background-image-active;
  }
}
.yh-address-card {
  display: flex;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  .icon {
    display: flex;
    font-size: 36rpx;
    color: $wrapper-border-color;
    transition: all .3s;
  }
  .left {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .center {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 150rpx 0 76rpx;
    .name {
      font-size: 32rpx;
      color: #1f1c18;
      line-height: 1;
      display: flex;
      align-items: center;
      text {
        white-space: nowrap;
      }
      .tel {
        font-size: 28rpx;
        padding-left: 24rpx;
      }
    }
    .addr {
      width: 100%;
      font-size: 24rpx;
      color: #65625d;
      line-height: 32rpx;
      margin-top: 10rpx;
      max-height: 64rpx;
      overflow: hidden;
      @include textOverflow(2);
    }
  }
  .right {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
}

.icon-edit {
  width: 26rpx;
  height: 28rpx;
  margin-right: 44rpx;
  background: url(data:image/png;base64,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)
    no-repeat left top;
  background-size: 100%;
}
.icon-delete {
  width: 26rpx;
  height: 28rpx;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA4CAYAAACyutuQAAADZ0lEQVRoge2aW4hNURjHf2fMDCP3e0jKJaGmiPCAmZpSFCkPNMn9gdQ8KHkgSt7cZwgpZTyIwmhyTaM8ISWSIblNxIz73WD01aemZe1z9jlrnXN20/7XPKxv7bXX9zuz9rp860s0HFlGljQVWARMA4YDJcAn4D7QANQCD313XZgFllJgn4KYEqgBwHRgI3AMWAe88tV5ga8XqVYC1wNgTCWASuBOyOdDySfQKuAgUJxmu/7AZWCyDyd8AU0Bahzay1A8BfRxdcQHkLzjUMD32KLfikwQI4FyBf9ueXYwsNXVGR+z3FzgtMV+FZgPvLXUjQfOA0MMeyswFHidqTM+/kOVFtszBbXBiO4Cs4Hfhr0IWODijA+gGRbbFuBDina3dS0K877QcgXqrbOUqbqQ7c9YbKNdHCrUaXa9frCJNNt3sdjagJMh2/ew2MboTiId/QTqgWoB2qtriC8lHIdN5wzbVwCDZMgt8QiTby0v0Kmyo6hVgHZ2IKAa+YY2AQ+Asnaz3lhgkvHwc+BWHpwUjdDFOMifbzop1BbqrHRU//6pygJ0JY/fW5VlJFn98X18yLtioKgrBoq6YiCL1mo46mzAznsp0Ahc1MObKTnkndO1cLWrM65AEq3Zo8frOcBuo14Ww8N6JKjQIIqpamAWMEqP5xNdHHIFKjfKMy3lhFE2+yxL8Y605ArUzyh3TVFfYjkD9TTK3V0ciieFqCsGirpioKgrBoq6YqCoKwaKumKgqMsVyLyBC1NvxtLbfP5GrkCPjPKLFPUvgS+G7YlRfurikCvQCaC5Xdk8gtcZDpr1GOkATXq9n7FcU2MEZoJe9N4DLhj1nzVGLjk/jwOuKrdr/o/EFI4D77MBZBv7RQHPNqW4kmkO+M+0V32K+tAKGnItFpsZH8ileln6+mjrPwjIlvhQmsGlsi+VWt5jzeAKApKLpD+GbaDG1nKtvhq3M3UjHaB3wE2LfQfQLcdAuyzpAz+Aa7aHk81yBywpX+M0h2eDhm6zKYnXSf7EQksfctv41dZ3suSlYo1ZD8uy4+nql4aYG23tki2skp2xwvfWxIM2B8GkAhJdAtZECEaSnbYleyDM1me/7gTe+PMrbcmGVtIPFqcaMWG3PpKMJHmhkiQ7TxOMOuUARDau0q/8qOZG938BfwHSl5Q8jzwuxgAAAABJRU5ErkJggg==)
    no-repeat left top;
  background-size: 100%;
}
</style>
