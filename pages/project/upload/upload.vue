<template>
  <view class="upload">
    <div class="top">
      <div class="cell time">
        <div class="name">巡检时间</div>
        <div class="value">{{ nowTime | FormatDate }}</div>
      </div>
      <div class="cell address">
        <div class="name">巡检地点</div>
        <div class="select-address-wrapper">
          <picker class="picker-wrapper" mode="region" :value="addressRegion" @change="handlePickerRegionChange">
            <div class="picker">
              <div class="text">{{ addressRegion | FormatAddress }}</div>
              <div class="icon icon-arrow-right"></div>
            </div>
          </picker>
        </div>
        <div class="input-address-wrapper">
          <input class="input" placeholder="请输入详细地址" />
        </div>
      </div>
    </div>
    <div class="center">
      <div class="upload-images">
        <yhUploadImages
          :totalUploadNum="3"
          @change="handleUploadImagesChange"
        ></yhUploadImages>
      </div>
      <div class="upload-video">
        <yhUploadVideo
          :totalUploadNum="1"
          @change="handleUploadVideoChange"
        ></yhUploadVideo>
      </div>
    </div>
    <div class="bottom">
      <div class="button-wrapper">
        <yhButton
          className="zdy-btn"
          @click="handleUpload"
          value="开始上传"
        ></yhButton>
      </div>
    </div>
  </view>
</template>

<script>
import yhButton from '@/components/yh-button/yh-button';
import yhUploadImages from '@/components/yh-upload-images/yh-upload-images';
import yhUploadVideo from '@/components/yh-upload-video/yh-upload-video';

import { request, navigateTo } from '../../../common/utils/uniApi';

import { GET_ACCESS_TOKEN } from '../../../store/types';
import { mapGetters } from 'vuex';
export default {
  name: 'upload',
  components: {
    yhButton,
    yhUploadImages,
    yhUploadVideo,
  },
  data() {
    return {
      address: '',
      nowTime: new Date(),
      // 省市区
      addressRegion: ['四川省', '成都市', '锦江区'],
    };
  },
  // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
  onLoad() {},
  // 监听页面初次渲染完成
  onReady() {},
  // 监听页面显示
  onShow() {},
  // 监听页面隐藏
  onHide() {},
  methods: {
    // 上传按钮 回调函数
    handleUpload() {
      navigateTo(`/pages/project/uploadResult/uploadResult?orderId=${1234}`);
    },
    // 图片上传 回调
    handleUploadImagesChange(images) {
      console.log('handleUploadImagesChange', images);
    },
    // 视频上传 回调
    handleUploadVideoChange(video) {
      console.log('handleUploadVideoChange', video);
    },
    // picker 地址选择 change
    handlePickerRegionChange(e) {
      this.addressRegion = [].concat(e.detail.value)
    }
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
$border-color: #e8e8e8;
.upload {
  position: relative;
  padding-bottom: 210rpx;
  .top {
    border-bottom: 1px solid $border-color;
    padding-left: 36rpx;
    position: relative;
    .cell {
      padding: 30rpx 0 26rpx;
      .name {
        font-size: 32rpx;
        color: #1e1f20;
        line-height: 44rpx;
      }
      .value {
        font-size: 30rpx;
        color: #787979;
        line-height: 42rpx;
        padding-top: 26rpx;
      }
    }
    .time {
      border-bottom: 1px solid $border-color;
    }
    .input-address-wrapper {
      margin-top: 30rpx;
      padding-right: 36rpx;
      .input {
        font-size: 30rpx;
        line-height: 1.2;
        color: #787979;
        height: 90rpx;
        background-color: #f7f7f7;
        border-radius: 16rpx;
        padding: 0 24rpx;
      }
    }
    .select-address-wrapper {
      padding-right: 36rpx;
      margin-top: 24rpx;
      .picker {
        width: 100%;
        font-size: 30rpx;
        line-height: 1.2;
        color: #787979;
        height: 90rpx;
        background-color: #f7f7f7;
        border-radius: 16rpx;
        padding: 0 24rpx;
        padding-right: 60rpx;
        position: relative;
        display: flex;
        align-items: center;
        .icon {
          position: absolute;
          top: 50%;
          right: 24rpx;
          transform: translateY(-50%);
        }
      }
    }
  }
  .center {
    width: 100%;
    .upload-video,
    .upload-images {
      padding: 12rpx 36rpx;
      border-bottom: 1px solid $border-color;
    }
    .upload-video {
      border-bottom: 0;
    }
  }
  .bottom {
    position: fixed;
    bottom: 80rpx;
    left: 0;
    width: 100%;
    .button-wrapper {
      padding: 10rpx 36rpx;
    }
  }
}
</style>
