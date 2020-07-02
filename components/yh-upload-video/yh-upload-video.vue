<template>
  <view class="yh-upload-images-wrapper">
    <div class="toolbar">
      <div class="left">
        <div class="name">视频</div>
        <div class="hint">（需录制20秒）</div>
      </div>
    </div>
    <div class="list">
      <template v-if="videoData && videoData.length > 0">
        有视频
      </template>
      <div
        class="upload-button"
        :style="uploadButtonStyle"
        @click="handleVideo"
      ></div>
    </div>
  </view>
</template>

<script>
/**
 * 上传视频
 */
import { chooseImage, previewImage } from '../../common/utils/uniApi';
export default {
  name: 'yhUploadVideo',
  props: {
    // 总共上传数量
    totalUploadNum: {
      type: [Number],
      default: 1,
    },
  },
  components: {},
  data() {
    return {
      videoData: [],
      base64:
        'data:image/png;base64,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',
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 上传视频 回调函数
    handleVideo() {
      this.$emit('change');
    },
  },
  computed: {
    uploadButtonStyle() {
      let str = '';
      const base64 = this.base64;
      str += `background-image:url(${base64});`;
      return str;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
$boder-radius: 16rpx;
.yh-upload-images-wrapper {
  width: 100%;
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 44rpx;
    height: 44rpx;
    padding-top: 10rpx;
    .left {
      display: flex;
      align-items: center;
    }
    .name {
      font-size: 32rpx;
      color: #1e1f20;
    }
    .hint {
      font-size: 26rpx;
      color: #b99f4e;
    }
  }
  .list {
    padding-top: 30rpx;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .upload-button {
      background-repeat: no-repeat;
      background-size: 100%;
      width: 210rpx;
      height: 210rpx;
      background-color: #f7f7f7;
      border-radius: $boder-radius;
      border: solid 1rpx #f7f7f7;
      margin-bottom: 24rpx;
    }
  }
}
</style>
