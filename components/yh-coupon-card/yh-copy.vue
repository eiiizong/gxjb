<template>
  <view class="yh-swiper-wrapper" :class="inputWrapperClass">copy</view>
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
// import yhButtonZdy from '@/components/yh-button-zdy/yh-button-zdy';
export default {
  name: 'yhSwiper2',
  props: {
    disabled: {
      type: [Boolean],
      default: false,
    },
    focus: {
      type: [Boolean],
      default: false,
    },
    clear: {
      type: [Boolean],
      default: false,
    },
    block: {
      type: [Boolean],
      default: false,
    },
    collapseKeyboard: {
      type: [Boolean],
      default: false,
    },
    border: {
      type: [Boolean],
      default: false,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    width: {
      type: [String, Number],
    },
    label: {
      type: [String],
      default: '',
    },
    className: {
      type: [String],
      default: '',
    },
    type: {
      type: [String],
      default: 'text',
    },
    placeholder: {
      type: [String],
      default: 'Please input some...',
    },
    placeholderColor: {
      type: [String],
      default: '#b2b2b2',
    },
    labelFor: {
      type: [String],
      default: '',
    },
    maxlength: {
      type: [Number],
      default: 140,
    },
  },
  components: {
    // yhButtonZdy
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    // console.log(this.$scopedSlots.prefix)
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
$input-bgc: #fff;
$input-height: 88rpx;
$label-width: 180rpx;
$label-height: 88rpx;
$label-color: #36404a;
$input-color: #36404a;
$input-focus-color: #40a9ff;
$border-color: #eee;
$input-focus-border-color: #40a9ff;
view,
text,
icon,
swiper {
  box-sizing: border-box;
}
.yh-swiper-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
