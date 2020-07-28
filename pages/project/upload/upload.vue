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
          <picker
            class="picker-wrapper"
            mode="region"
            :value="addressRegion"
            @change="handlePickerRegionChange"
          >
            <div class="picker">
              <div class="text">{{ addressRegion | FormatAddress }}</div>
              <div class="icon icon-arrow-right"></div>
            </div>
          </picker>
        </div>
        <div class="input-address-wrapper">
          <input class="input" placeholder="请输入详细地址" v-model="address" />
        </div>
      </div>
      <div class="cell info">
        <div class="name">巡检审核信息</div>
        <div class="select-address-wrapper">
          <picker
            class="picker-wrapper"
            :value="adminListIndex > -1 ? adminListIndex : 0"
            :range="adminList"
            range-key="name"
            @change="handlePickerAuditorsChange"
          >
            <div class="picker">
              <div class="text">
                {{ adminList[adminListIndex].name || '请选择审核人员' }}
              </div>
              <div class="icon icon-arrow-right"></div>
            </div>
          </picker>
        </div>
        <div class="input-address-wrapper">
          <input
            class="input"
            placeholder="请输入合同号"
            v-model="contract_no"
          />
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
          :disabled="!checkUploadButtonCanUse"
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

import {
  request,
  navigateTo,
  uploadFile,
  showLoading,
  hideLoading,
  showToast,
} from '../../../common/utils/uniApi';

import {
  GET_ACCESS_TOKEN,
  GET_USER_INFO,
  GET_ADMIN_LIST,
} from '../../../store/types';
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
      // 选中审核人员序号
      adminListIndex: -1,
      // 详细地址
      address: '财富中心C座',
      // 时间
      nowTime: '',
      // 省市区
      addressRegion: ['四川省', '成都市', '锦江区'],
      // 合同号
      contract_no: ' contract_no_hh123',
      // 创建时间
      created_time: '',
      // 上传的图片
      uploadImages: [],
      // 上传的视频
      uploadVideos: [],
      serveImages: [],
      serveVideos: [],
    };
  },
  // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
  onLoad() {},
  // 监听页面初次渲染完成
  onReady() {},
  // 监听页面显示
  onShow() {
    this.nowTime = new Date();
    this.formatCreatedtime(this.nowTime);
    this.requestUpload();
  },
  // 监听页面隐藏
  onHide() {},
  methods: {
    // 格式化创建时间
    formatCreatedtime(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      this.created_time = `${year}-${month}-${day} ${hours}:${minute}:${second}`;
    },
    // 请求 创建巡检记录
    requestOrdersCreated() {
      console.log('requestOrdersCreated');
      const url = 'orders/created';
      const header = {
        'access-token': this.accessToken,
      };
      const data = {
        admin_id: this.userInfo.id,
        contract_no: this.contract_no,
        created_time: this.created_time,
        areas: this.addressRegion.join(''),
        address: this.address,
        imgs: JSON.stringify([
          'data:image/jpeg;base64,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',
          'data:image/jpeg;base64,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',
          'data:image/jpeg;base64,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',
        ]),
        videos: '123456789',
      };
      const method = 'POST';
      request(url, data, header, method)
        .then((res) => {
          navigateTo(
            `/pages/project/uploadResult/uploadResult?orderId=${res.id}&type=upload`
          );
        })
        .catch((err) => {});
    },
    // 请求 上传 img|video
    requestUpload(type, name, filePath) {
      const url = `upload/${type}`;
      const header = {
        'access-token': this.accessToken,
      };
      const data = {
        attachment: name,
      };
      const method = 'POST';
      return new Promise((resolve, reject) => {
        uploadFile(url, filePath, name, header, data)
          .then((res) => {
            const data = JSON.parse(res.data);

            if (res.statusCode === 200 && data.status === '200') {
              const resultData = data.data;
              if (resultData.object === 'img') {
                this.serveImages.push(resultData.src);
              }
              if (resultData.object === 'video') {
                this.serveVideos.push(resultData.src);
              }
              console.log('上传成功', name, res, data);
              resolve(data);
            } else {
              console.log('上传失败', name, res, data);
            }
          })

          .catch((err) => {
            console.log('上传失败', name, err);
            reject(err);
          });
      });
    },
    // 图片上传至服务器
    async uploadImagesToServer() {
      const images = this.uploadImages;
      const videos = this.uploadVideos;
      const uploadImg0 = await this.requestUpload(
        'img',
        images[0].id + '_1',
        images[0].path
      );
      const uploadImg1 = await this.requestUpload(
        'img',
        images[1].id + '_2',
        images[1].path
      );
      const uploadImg2 = await this.requestUpload(
        'img',
        images[2].id + '_3',
        images[2].path
      );
      const uploadVideos = await this.requestUpload(
        'video',
        videos[0].id + '_4',
        videos[0].tempFilePath
      );
      console.log('upload over =========================');
    },
    // 视频上传至服务器
    async uploadVideoToServer() {
      const videos = this.uploadVideos;
      const uploadVideos = await this.requestUpload(
        'video',
        videos[0].id,
        videos[0].tempFilePath
      );
    },
    // 上传按钮 回调函数
    handleUpload() {
      // showLoading('上传中');
      // this.uploadImagesToServer();
      // this.uploadVideoToServer();
      // hideLoading();
      // showToast('上传成功', 'success');
      this.requestOrdersCreated();
    },
    // 图片本地上传 回调
    handleUploadImagesChange(images) {
      console.log('handleUploadImagesChange', images);
      this.uploadImages = [].concat(images);
    },
    // 视频本地上传 回调
    handleUploadVideoChange(videos) {
      console.log('handleUploadVideoChange', videos);
      this.uploadVideos = [].concat(videos);
    },
    // picker 地址选择 change
    handlePickerRegionChange(e) {
      this.addressRegion = [].concat(e.detail.value);
    },
    // picker 审核人员 change
    handlePickerAuditorsChange(e) {
      const value = e.detail.value;
      this.adminListIndex = parseInt(value);
    },
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN, GET_USER_INFO, GET_ADMIN_LIST]),
    // 检测上传按钮是否可用
    checkUploadButtonCanUse() {
      let canUse = true;
      const address = this.address;
      const addressRegion = this.addressRegion;

      if (!addressRegion || addressRegion.length < 3) {
        canUse = false;
      }
      if (!address) {
        canUse = false;
      }
      return canUse;
    },
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
    .address {
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
