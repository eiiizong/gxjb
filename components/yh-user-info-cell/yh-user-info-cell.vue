<template>
  <view class="yh-user-info-cell-wrapper">
    <view
      class="yh-user-info-cell icon"
      @click="handleTap"
      :class="[
        size == 'small' ? 'icon-border-702-100' : 'icon-border-702-138',
        picker ? 'picker' : '',
      ]"
    >
      <template v-if="picker">
        <picker
          class="picker-wrapper"
          @change="bindPickerChange"
          :mode="mode"
          :range="range"
          :value="pickerValue"
        >
          <view class="picker-con">
            <view class="label" :class="labelBold ? 'bold' : ''">
              {{
              label
              }}
            </view>
            <view class="value" :style="valueStyle">
              <template v-if="!avatar">{{ mode==='selector'?range[pickerValue]: pickerValue}}</template>
              <template v-else>
                <view class="avatar icon icon-avatar-border">
                  <image :src="value" mode />
                </view>
              </template>
            </view>
            <text class="icon icon-arrow-right" v-if="link"></text>
          </view>
        </picker>
      </template>
      <template v-else>
        <view class="label" :class="labelBold ? 'bold' : ''">{{ label }}</view>
        <view class="value" :style="valueStyle">
          <template v-if="!avatar">{{ value }}</template>
          <template v-else>
            <view class="avatar icon icon-avatar-border">
              <image :src="value" mode />
            </view>
          </template>
        </view>
        <text class="icon icon-arrow-right" v-if="link"></text>
      </template>
    </view>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 * @property {Number} maxlength  最大输入长度，设置为 -1 的时候不限制最大长度 默认为140
 */
export default {
  name: 'yhSwiper',
  props: {
    height: {
      type: [Number],
      default: 100,
    },
    label: {
      type: [String],
      default: '',
    },
    label: {
      type: [String],
      default: '',
    },
    labelBold: {
      type: [Boolean],
      default: false,
    },
    value: {
      type: [String],
      default: '',
    },
    valueColor: {
      type: [String],
      default: '#999793',
    },
    size: {
      type: [String],
      default: 'small',
    },
    link: {
      type: [Boolean],
      default: false,
    },
    avatar: {
      type: [Boolean],
      default: false,
    },
    src: {
      type: [String],
      default: '',
    },
    picker: {
      type: [Boolean],
      default: false,
    },
    mode: {
      type: [String],
      default: 'selector',
    },
    range: {
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  data () {
    return {
      pickerValue: '',
    };
  },
  created () {
    this.formatPickerValue(this.value);
  },
  mounted () {
    // console.log(this.$scopedSlots.prefix)
  },
  methods: {
    handleTap () {
      if (this.link && !this.picker) {
        this.$emit('click');
      }
    },
    formatPickerValue () {
      const range = this.range;
      const value = this.value;
      const mode = this.mode;
      const picker = this.picker;
      if (picker) {
        if (mode === 'selector') {
          this.pickerValue = value;
        }
        if (mode === 'date') {
          if (value) {
            this.pickerValue =
              value.substr(0, 4) +
              '年' +
              value.substr(5, 2) +
              '月' +
              value.substr(8, 2) + '日';
          } else {
            this.pickerValue = '请设置您的生日'
          }
        }
      }
    },
    bindPickerChange (e) {
      const range = this.range;
      const mode = this.mode;
      const pickerValue = e.target.value;
      let value = ''
      console.log(pickerValue);
      if (mode === 'selector') {
        this.pickerValue = pickerValue;
        this.$emit('change', pickerValue)
      }
      if (mode === 'date') {
        value =
          pickerValue.substr(0, 4) +
          '年' +
          pickerValue.substr(5, 2) +
          '月' +
          pickerValue.substr(8, 2) +
          '日';
        this.pickerValue = value;
        this.$emit('change', value)
      }
    },
  },
  computed: {
    valueStyle () {
      let str = '';
      const valueColor = this.valueColor;
      if (valueColor) {
        str += `color: ${valueColor};`;
      }
      return str;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
view,
text,
icon,
swiper {
  box-sizing: border-box;
}
.yh-user-info-cell-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 24rpx;

  .yh-user-info-cell {
    // flex: 1;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 70rpx 0 30rpx;
    color: #1f1c18;
    font-size: 30rpx;
    &.picker {
      padding: 0;
    }
  }
  .picker-wrapper {
    flex: 1;
    height: 100%;
  }
  .picker-con {
    width: 100%;
    height: 100rpx;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 70rpx 0 30rpx;
  }
  .label {
    &.bold {
      font-weight: 700;
    }
  }
  .value {
    color: #999793;
  }
  .avatar {
    width: 100rpx;
    height: 100rpx;
    padding: 12rpx;
    overflow: hidden;
    border-radius: 50%;
    image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .icon-arrow-right {
    position: absolute;
    top: 50%;
    right: 30rpx;
    transform: translateY(-50%);
  }
}
</style>
