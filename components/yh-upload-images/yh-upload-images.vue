<template>
  <view class="yh-upload-images-wrapper">
    <div class="toolbar">
      <div class="left">
        <div class="name">照片</div>
        <div class="hint">（需拍摄{{ totalUploadNum || 1 }}张）</div>
      </div>
      <div class="right">
        <text class="current-num">{{ currentUploadNum }}</text>
        <text class="delimiter">/</text>
        <text class="total-num">{{ totalUploadNum || 1 }}</text>
      </div>
    </div>
    <div class="list">
      <template v-if="images.length > 0">
        <template v-for="(item, index) in images">
          <div
            class="img-box"
            :key="item.id"
            @click.stop.prevent="handlePreviewImage(index)"
          >
            <image :src="item.path" mode="" />
            <div class="delete" @click.stop="handleDelete(index)">
              <div class="icon icon-delete"></div>
            </div>
          </div>
        </template>
      </template>
      <div
        class="upload-button"
        :style="uploadButtonStyle"
        @click="handlePhoto"
        v-if="Number(currentUploadNum) < totalUploadNum"
      ></div>
    </div>
  </view>
</template>

<script>
/**
 * 上传图片
 */
import { chooseImage, previewImage } from '../../common/utils/uniApi';
export default {
  name: 'yhUploadImages',
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
      images: [],
      base64:
        'data:image/png;base64,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',
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 上传照片
    handlePhoto() {
      chooseImage(1, 'original', ['camera'])
        .then(res => {
          console.log('接口调用成功', res);
          const files = {
            ...res.tempFiles[0],
            id: 'yh_img_' + +new Date(),
          };
          this.images = [].concat(this.images).concat(files);
          this.$emit('change', this.images);
        })
        .catch(err => {
          console.log('接口调用失败', err);
        });
    },
    // 删除照片
    handleDelete(index) {
      const data = [].concat(this.images);
      data.splice(index, 1);
      this.images = [].concat(data);
      this.$emit('change', this.images);
    },
    // 预览照片
    handlePreviewImage(index) {
      const data = this.images;
      const current = index + '';
      const urls = data.map(item => {
        return item.path;
      });
      previewImage(current, urls);
    },
  },
  computed: {
    uploadButtonStyle() {
      let str = '';
      const base64 = this.base64;
      str += `background-image:url(${base64});`;
      return str;
    },
    // 已上传数量
    currentUploadNum() {
      const data = this.images;
      return data.length;
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
    .left,
    .right {
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
    .right {
      font-size: 26rpx;
      color: #bcbec7;
    }
  }
  .list {
    padding-top: 30rpx;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .img-box {
      width: 210rpx;
      height: 210rpx;
      margin-bottom: 24rpx;
      margin-right: 24rpx;
      display: flex;
      position: relative;
      image {
        width: 100%;
        height: 100%;
        border-radius: $boder-radius;
        border: solid 1rpx #f7f7f7;
        background-color: #f7f7f7;
      }
      .delete {
        display: flex;
        width: 50rpx;
        height: 50rpx;
        background-color: #003383;
        border-top-right-radius: $boder-radius;
        border-bottom-left-radius: $boder-radius;
        position: absolute;
        top: 0;
        right: 0;
        .icon-delete {
          margin: auto;
        }
      }
      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
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
