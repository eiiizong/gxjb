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
            :value="
              auditorsList.indexOf(auditors) > 0
                ? auditorsList.indexOf(auditors)
                : 0
            "
            :range="auditorsList"
            @change="handlePickerAuditorsChange"
          >
            <div class="picker">
              <div class="text">{{ auditors }}</div>
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

import { GET_ACCESS_TOKEN, GET_USER_INFO } from '../../../store/types';
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
      auditors: '请选择审核人员',
      auditorsList: ['张三', '李四', '王老五'],
      // 详细地址
      address: '财富中心C座',
      // 时间
      nowTime: '',
      // 省市区
      addressRegion: ['四川省', '成都市', '锦江区'],
      // 合同号
      contract_no: '',
      // 创建时间
      created_time: '',
      // 上传的图片
      uploadImages: [],
      // 上传的视频
      uploadVideos: [],
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
        imgs: JSON.stringify([]),
        videos: '123',
      };
      const method = 'POST';
      request(url, data, header, method)
        .then((res) => {
          navigateTo(
            `/pages/project/uploadResult/uploadResult?orderId=${res.id}`
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
            resolve(res);
            console.log('ok', name);
          })
          .catch((err) => {
            console.log('error', name);
            // reject(err);
            resolve(err);
          })
          .finally(() => {
            console.log(type, name);
            resolve(0);
          });
      });
    },
    // 上传按钮 回调函数
    async handleUpload() {
      showLoading('上传中');
      const images = this.uploadImages;
      const videos = this.uploadVideos;
      const uploadImg0 = await this.requestUpload(
        'img',
        images[0].id,
        images[0].path
      );
      const uploadImg1 = await this.requestUpload(
        'img',
        images[1].id,
        images[1].path
      );
      const uploadImg2 = await this.requestUpload(
        'img',
        images[2].id,
        images[2].path
      );
      const uploadVideos = await this.requestUpload(
        'video',
        videos[0].id,
        videos[0].tempFilePath
      );
      hideLoading();
      showToast('上传成功', 'success');
      this.requestOrdersCreated();
    },
    // 图片上传 回调
    handleUploadImagesChange(images) {
      console.log('handleUploadImagesChange', images);
      this.uploadImages = [].concat(images);
    },
    // 视频上传 回调
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
      console.log(e);
      this.auditors = this.auditorsList[e.detail.value];
    },
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN, GET_USER_INFO]),
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
