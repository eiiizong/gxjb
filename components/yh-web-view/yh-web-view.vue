<template>
  <view class="yh-webview-wrapper">
    <web-view
      :webview-styles="webviewStyles"
      src="https://www.baidu.com"
    ></web-view>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 */
// import yhButtonZdy from '@/components/yh-button-zdy/yh-button-zdy';
export default {
  name: 'yhWebview',
  props: {
    disabled: {
      type: [Boolean],
      default: false,
    },
  },
  components: {
    // yhButtonZdy
  },
  data() {
    return {
      webviewStyles: {
        progress: {
          color: '#FF3333',
        },
      },
    };
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
