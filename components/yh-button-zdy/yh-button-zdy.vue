<template>
  <view
    class="yh-button-wrapper"
    :class="[block ? 'block' : '', shadow ? 'shadow' : '']"
  >
    <button
      class="yh-button icon"
      :class="[size ? 'icon-btn-' + size : '']"
      :open-type="openType"
      :loading="nLoading"
      hover-class="hover"
      :disabled="disabled"
      @click="handleClick"
    >
      <view class="icon" :class="[text ? 'icon-text-' + text : '']">{{
        label
      }}</view>
    </button>
  </view>
</template>

<script>
/** Transition 过渡动画
 * @description 简单过渡动画组件 * @tutorial https://ext.dcloud.net.cn/plugin?id=985
 * @property {String} textType = [addAdderss|true] 设置按钮为禁用状态
 */
export default {
  name: 'yhButtonZdy',
  props: {
    textType: {
      type: [String],
      default: 'addAdderss',
    },
    size: {
      type: [String],
      default: '',
    },
    text: {
      type: [String],
      default: '',
    },
    label: {
      type: [String],
      default: '',
    },
    block: {
      type: [Boolean],
      default: false,
    },
    disabled: {
      type: [Boolean],
      default: false,
    },
    shadow: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="scss">
view,
button {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.yh-button-wrapper {
  width: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &.block {
    width: 100%;
    display: flex;
  }
  &.shadow {
    padding-top: 6rpx;
  }
}
.yh-button {
  margin: 0;
  outline: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-size: 32rpx;
  color: #fffde3;
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 100%;
  background-color: transparent;
  position: relative;
  &::after {
    border: 0;
    background-color: transparent;
  }
  view {
    margin: auto;
    background-repeat: no-repeat;
    background-position: top left;
    background-size: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.hover {
    opacity: .6;
  }
  &[disabled] {
    background-color: transparent;
    opacity: .6;
  }
}
</style>
