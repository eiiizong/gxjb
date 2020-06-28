<template>
  <button
    class="yh-btn"
    :style="buttonStyle"
    :class="buttonClass"
    :open-type="openType"
    :loading="nLoading"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <text class="icon icon-loading" v-if="loading"></text>
    <slot></slot>
    <slot name="prefix"></slot>
    <text class="yh-btn-text" v-if="value">{{ value }}</text>
    <slot name="sufix"></slot>
  </button>
</template>

<script>
/** Transition 过渡动画
 * @description 简单过渡动画组件 * @tutorial https://ext.dcloud.net.cn/plugin?id=985
 * @property {Boolean} disabled = [false|true] 设置按钮为禁用状态
 * @property {Boolean} block = [false|true] 设置按钮为块级元素 占用父级元素100%的宽度
 * @property {Boolean} loading = [false|true] 设置按钮为加载中状态
 * @property {Boolean} ghost =[false|true] 幽灵属性 使按钮背景透明
 * @property {String} value 按钮名称，默认值为 操作按钮
 * @property {String} shape = [circle] 按钮形状，可选值为circle或者不设置
 * 
 * @property {String} type = [default|primary|dashed|text|success|info|warning|error] 设置按钮类型 不同背景色

 * @property {String} openType = [contact|primary|dashed|text|success|info|warning|error] 微信开发能力
 *  @value contact 打开客服会话
 * @value default 白色背景 * @property {String} size = [default|large|small] 设置按钮大小
 * 	@value default 默认
 */
export default {
  name: 'yhButton',
  props: {
    // 按钮值 文本
    value: {
      type: [String],
      default: '',
    },
    // 类名
    className: {
      type: [String],
      default: '',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否显示加载中状态 自定义
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否显示加载中状态 原生 微信自带
    nLoading: {
      type: Boolean,
      default: false,
    },
    // 以下未确定
    type: {
      type: [String],
      default: '',
    },
    openType: {
      type: [String],
      default: '',
    },
    size: {
      type: [String],
      default: '',
    },
    shape: {
      type: [String],
      default: '',
    },
    width: {
      type: [String, Number],
      default: '',
    },

    block: {
      type: Boolean,
      default: false,
    },
    long: {
      type: Boolean,
      default: false,
    },

    shadow: {
      type: Boolean,
      default: false,
    },
    // 幽灵属性 使按钮背景透明
    ghost: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    buttonClass() {
      const className = this.className;
      const disabled = this.disabled;
      let str = '';

      if (className) {
        str += `${className} `;
      }
      if (disabled) {
        str += `${disabled} `;
      }
      return str;
    },
    buttonStyle() {
      const width = this.width;
      let str = '';

      if (width) {
        str += 'width: ' + width + 'rpx';
      }
      return str;
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
$button-bgc: #fff;
$button-bgc-primary: #2d8cf0;
$button-bgc-info: #2db7f5;
$button-bgc-success: #19be6b;
$button-bgc-warning: #f90;
$button-bgc-error: #ed4014;

$button-color: #515a6e;
$button-color-reverse: #fff;

$button-border-color: #dcdee2;

$button-height: 64rpx;
$button-height-large: 80rpx;
$button-height-small: 42rpx;

$button-font-size: 28rpx;
$button-font-size-large: 32rpx;
$button-font-size-small: 24rpx;

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
text,
view,
button {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.icon-loading {
  width: 32rpx;
  height: 32rpx;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFQElEQVRoQ81aaahVVRhdi36UPxppLqMyKKPhh5lKQT0atbJErcCQIrLBCm3OoJQsIs0kp7IfJZahYlbSAGJKVGaDFNFAo5VZVDThj7Bgxbru8ziet8+559777r3ng8297+69v73Wnr5hP6IfRNLJAMYAOBTAYamyJ4AfAWwLn/7+EYB1JP29ZWGzGiSNAHARgAsBnNiEnvcBvA5gPcnXmuhf69IwAUnHA5gGYEKzg0b6rQKwgOT6RnU2REDSrQH8fo0OVLL9kkDkvZLty61A2OOPADirhOI/ACTlPwBHAzigRL90k0kknyzTp+4KSDoNwIpwQGM6/wTwAoAXSfqzj0jyYTYR6xoP4MwS4O4leX+9doUEJJ0P4NUcJR8AWAxgOcm/6g2UrpfkQz8WwJ0A9ijo+xbJ04t05xKQNB3AfZHONeAkDb4lkXQKgLsCmTxd20l6BaMSJSDpPACxq20JyStbQh3fYlcBWARg9xzdb5A8I1bXh4CkvQB8B2CfTId5JG/ub/CJPkkjATwN4MCcMeaSnJqtixFYDeCSTMNRJPPOQr9ykvQlgGNylE4kuTRdtwsBSdeFpUy3GUfShqZjIukrAIMiA37mm4ykr+ma9BKQNADAuwBOSHWcQdKHuaMi6UgA3+YM+iDJe2IEbgMwK9XpJZIXdxR5ajBJviyeioy/I6yCfamdKyDJlnITgKNSHXpIbugWgYDL5862KCu2PZenCWTv/IUkJ3cTfCBgkM/l4BhCcnOyAmsBnB0a/gpgBMmvu00gkNgIYHgEy+0kZzNsn19SDezW3lgF8IGA7/45ETwbSPaYgO983/2JjCa5pkIEhgF4JwfPQBOwT3NNaPAzyUOqAj7BIekHAIdHcE02gbe950PlIpI3VJDAMzkR4HwT+DhlvK4n+XgFCdjtfiiCa5UJ2HE7IlSObCXAbhdxSZMAPBHRv9EEfgewb6gcTPLzdgFpVq8kR3GOCrOyxQQct+4WagaQ/KfZgdrVT5JtlG1VVnaYgA3X/qHmIJJpm9AuTA3plXQsgNjOqK3AhwCcWbMMJVlzkqomkoxrSAbXYhN4GcCoUDGW5PNVA288IWJ7LBXs1Fz9rCGbSnJuFQkkmCQ96qCL5Bf+zQTSnuizJK+oKgFJDvrHk7Rhq4kJDAbwafh7K8mBFSbgrb6NpM/tTgJhfzmUHBp+G07SwU3lRNLDAGaS/DtLwNnmB8KPt5D0PqucSFpD0in9XklWwBmyJCO8iWQsgOgqIUmnOuwluUsmJZ2VWAlgXEA5geSyriLODC7JAf40kj/1WYFwDpw5fjNUriV5blUISHJa32HuzCymbGLLhuKm0GhMXrq808QkLQcwJTv7vbdQAkiSc/gOop2f3AJgWLd9I0l3ALCTOSM2cbHcqNMp80PjV0he0OkZT03oZQCcD83FkJde91vVxKBoFknPQkdFkg3qZpKFz1NFDxxOpB4XUC8lmRBqOxFJfm/2O/Igkt8UDVjvicmxQTIDK0le2m70kkb7vQ3ASSQdrxdKmUe+BQCSTIVtxXSSie9UT39D9ZLuDlv3HJJby3SuSyDYCGfq5gWF9kPsasxJ+yRlBstrE+55Xx7/Aria5Pay+koRCCS8tFMA9ATlnwBYCMBby2FpwxLcAwO3KzObZCyd3toWyvaWdG0gkhxwJwHsdiwjua5oNEl7A/CzabrYw/RN91vDM9DM/0qE1fADoFfD2QK7IImYjA1gUvwI7teWpBwcGtp996P46lbTOKW3UMH+NTg/y7o4f+lXzqQ4XfN9qjjHuaI/L4H/AWst3QCSAJaTAAAAAElFTkSuQmCC)
    no-repeat center center;
  background-size: 100% 100%;
  margin-right: 10rpx;
  animation: spin 1s infinite linear;
}
.yh-btn {
  flex: 1;
  margin: 0;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-weight: 400;
  line-height: 1;
  border-radius: 8rpx;
  padding: 0 18rpx;
  font-size: $button-font-size;
  height: $button-height;
  color: $button-color;
  background-color: $button-bgc;
  border: 1px solid $button-border-color;
  transition: opacity 0.3s ease-in-out;
  &.zdy-btn {
    width: 100%;
    height: 90rpx;
    font-size: 32rpx;
    letter-spacing: 2rpx;
    color: #fff;
    background-image: linear-gradient(180deg, #004b9f 0%, #004695 100%);
    box-shadow: 0rpx -6rpx 12rpx 0rpx rgba(30, 31, 32, 0.06);
    border-radius: 16rpx;
  }
  &.zdy-btn-2 {
    width: 170rpx;
    height: 70rpx;
    border: 1px solid #004b9f;
    background-color: #fff;
    color: #003383;
    line-height: 44rpx;
    border-radius: 8rpx;
  }
  &.button-hover,
  &:active,
  &[disabled],
  &.disabled {
    opacity: 0.8;
  }
  .icon {
    color: #fff;
  }
  // 清除微信边框
  &::after {
    border: 0;
  }

  &.shadow {
    box-shadow: 4rpx 14rpx 30rpx 0 $button-color;
  }
  &.ghost {
    background-color: transparent;
  }
  &.circle {
    border-radius: 400px;
  }
  &.long {
    width: 100%;
    border-radius: 0;
    margin: 0;
  }
  &.dashed {
    border-style: dashed;
    background-color: transparent;
    border-color: $button-border-color;
  }
  &.text {
    background-color: transparent !important;
    border: 0;
    padding: 0;
    height: auto;
    box-shadow: none;
  }
  &.primary {
    background-color: $button-bgc-primary;
    border-color: $button-bgc-primary;
    color: $button-color-reverse;
    &.shadow {
      box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-primary;
    }
    &.ghost {
      background-color: transparent;
      color: $button-bgc-primary;
    }
    &.dashed {
      border-style: dashed;
    }
  }
  &.info {
    background-color: $button-bgc-info;
    border-color: $button-bgc-info;
    color: $button-color-reverse;
    &.shadow {
      box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-info;
    }
    &.ghost {
      background-color: transparent;
      color: $button-bgc-info;
    }
    &.dashed {
      border-style: dashed;
    }
  }
  &.success {
    background-color: $button-bgc-success;
    border-color: $button-bgc-success;
    color: $button-color-reverse;
    &.shadow {
      box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-success;
    }
    &.ghost {
      background-color: transparent;
      color: $button-bgc-success;
    }
    &.dashed {
      border-style: dashed;
    }
  }
  &.warning {
    background-color: $button-bgc-warning;
    border-color: $button-bgc-warning;
    color: $button-color-reverse;
    &.shadow {
      box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-warning;
    }
    &.ghost {
      background-color: transparent;
      color: $button-bgc-warning;
    }
    &.dashed {
      border-style: dashed;
    }
  }
  &.error {
    background-color: $button-bgc-error;
    border-color: $button-bgc-error;
    color: $button-color-reverse;
    &.shadow {
      box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-error;
    }
    &.ghost {
      background-color: transparent;
      color: $button-bgc-error;
    }
    &.dashed {
      border-style: dashed;
    }
  }
  &.small {
    height: $button-height-small;
    font-size: $button-font-size-small;
    .icon-loading {
      font-size: $button-font-size-small + 8rpx;
    }
  }
  &.large {
    height: $button-height-large;
    font-size: $button-font-size-large;
    .icon-loading {
      font-size: $button-font-size-large + 8rpx;
    }
  }
  &.sufix {
    .yh-text {
      margin-right: 10rpx;
    }
  }
  &.prefix {
    .yh-text {
      margin-left: 10rpx;
    }
  }
}
</style>
