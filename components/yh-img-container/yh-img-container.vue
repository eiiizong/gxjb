<template>
  <view class="yh-img-container-wrapper" :style="wrapperStyle" @click.stop="handleClick">
    <view class="yh-img-container">
      <div class="bg"></div>
      <view class="img-box">
        <image :src="src" mode="" />
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
export default {
  name: 'yhImgContainer',
  props: {
    size: {
      type: [Number],
      default: 170,
    },
    src: {
      type: [String],
      default: '/static/images/foods/01.png',
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    // console.log(this.$scopedSlots.prefix)
  },
  methods: {
    handleClick(e) {
      this.$emit('click',e)
    }
  },
  computed: {
    wrapperStyle() {
      let str = '';
      const size = this.size;
      str += `width: ${size}rpx; height: ${size}rpx;`;
      return str;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
view,
image {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.yh-img-container-wrapper {
  display: flex;
}
.yh-img-container {
  flex: 1;
  display: flex;
  height: 100%;
  position: relative;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(data:image/png;base64,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);
    background-repeat: no-repeat;
    background-position: top left;
    background-size: 100%;
  }
}
.img-box {
  flex: 1;
  display: flex;
  height: 100%;
  overflow: hidden;
  image {
    border-radius: $wrapper-border-radius - 4rpx;
    width: 100%;
    height: 100%;
  }
}
</style>
