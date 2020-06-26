<template>
  <view class="yh-popup-input-wrapper">
    <div class="yh-popup-input">
      <yh-popup type="center" ref="loginPopup" @change="handlePopupChange">
        <!-- 授权登陆 -->
        <div class="content">
          <div class="title">
            <text>{{ title }}</text>
            <!-- <text class="icon icon-close"></text> -->
          </div>
          <div class="input-wrapper">
            <input
              :type="type"
              :value="value"
              v-if="inputType === 'input'"
              :placeholder="placeholder"
              @input="inputChange"
            />
            <textarea
              v-if="inputType === 'textarea'"
              auto-height
              :type="type"
              :value="value"
              :placeholder="placeholder"
              @input="inputChange"
            />
          </div>
          <div class="btn-wrapper">
            <button @click="handleCancel">取消</button>
            <button @click="handleConfirm">确定</button>
          </div>
        </div>
      </yh-popup>
    </div>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 * @property {Number} maxlength  最大输入长度，设置为
 */
import yhPopup from '@/components/yh-popup/yh-popup';
export default {
  name: 'yhPopupInput',
  props: {
    show: {
      type: [Boolean],
      default: false,
    },
    type: {
      type: [String],
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    inputType: {
      type: [String],
      default: 'input',
    },
    placeholder: {
      type: [String],
      default: '请输入',
    },
    title: {
      type: [String],
      default: '',
    },
  },
  components: {
    yhPopup,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    const show = this.show;
    if (show) {
      this.openPopup();
    } else {
      this.closePopup();
    }
  },
  methods: {
    openPopup() {
      this.$nextTick(() => {
        this.$refs['loginPopup'].open();
      });
    },
    closePopup() {
      this.$nextTick(() => {
        this.$refs['loginPopup'].close();
      });
    },
    handleCancel() {
      this.$emit('cancel');
    },
    handleConfirm() {
      this.$emit('confirm');
    },
    inputChange(e) {
      const value = e.target.value;
      this.$emit('input', value);
    },
    handlePopupChange(e) {
      this.$emit('change', e.show);
    },
  },
  computed: {},
  watch: {
    show(newValue) {
      if (newValue) {
        this.openPopup();
      } else {
        this.closePopup();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
view,
text {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.yh-popup-input-wrapper {
  width: 100%;
}
.content {
  width: 600rpx;
  border-radius: 12rpx;
  background-color: #fff;
  color: #1f1c18;
  font-size: 32rpx;
  overflow: hidden;
  .title {
    font-weight: 500;
    line-height: 100rpx;
    padding: 0 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .input-wrapper {
    display: flex;
    padding: 0 24rpx 34rpx;
    textarea,
    input {
      height: 80rpx;
      font-size: 28rpx;
      line-height: 1.4;
      flex: 1;
      padding: 0 12rpx;
      background-image: $wrapper-background-image;
      border: 1px solid $wrapper-border-color;
      border-radius: 8rpx;
    }
    textarea {
      min-height: 200rpx;
    }
  }
  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border-top: 1px solid #d2d3d5;
    button {
      width: 50%;
      color: #333;
      line-height: 100rpx;
      font-size: 28rpx;
      border-radius: 0;
      background-color: transparent;
      &:last-child {
        color: #127fff;
        border-left: 1px solid #d2d3d5;
      }
    }
  }
}
</style>
