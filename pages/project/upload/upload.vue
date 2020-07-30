<template>
  <view class="upload">
    <div class="top">
      <div class="cell time">
        <div class="name">巡检时间</div>
        <div class="value">{{ nowTime | FormatDate }}</div>
      </div>
      <div class="cell address">
        <div class="name">巡检地点</div>
        <yhCurrentAddressMap
          :location="userLocation"
          @getAddress="handleGetAddress"
        ></yhCurrentAddressMap>
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
          :disabled="uploadBtnDisabled"
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
import yhCurrentAddressMap from '@/components/yh-current-address-map/yh-current-address-map';

import {
  request,
  navigateTo,
  uploadFile,
  showLoading,
  hideLoading,
  showToast,
  redirectTo,
  getLocation,
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
    yhCurrentAddressMap,
  },
  data() {
    return {
      // 选中审核人员序号
      adminListIndex: -1,
      // 详细地址 信息
      addressInfo: {},
      // 时间
      nowTime: '',
      // 合同号
      contract_no: '',
      // 创建时间
      created_time: '',
      // 上传的图片
      uploadImages: [],
      // 上传的视频
      uploadVideos: [],
      serveImages: [],
      serveVideos: [],
      // 上传按钮 disabled
      uploadBtnDisabled: false,
      // 用户地理位置
      userLocation: {},
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
    this.getUserAddressInfo();
  },
  // 监听页面隐藏
  onHide() {},
  methods: {
    // 获取用户地理位置
    getUserAddressInfo() {
      getLocation('gcj02')
        .then((res) => {
          this.userLocation = Object.assign(
            {},
            {
              lat: parseFloat(res.latitude),
              lng: parseFloat(res.longitude),
            }
          );
        })
        .catch((err) => {
          this.userLocation = Object.assign({}, {});
        });
    },
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
      const url = 'orders/created';
      const header = {
        'access-token': this.accessToken,
      };
      const data = {
        admin_id: this.adminList[this.adminListIndex].admin_id,
        contract_no: this.contract_no,
        created_time: this.created_time,
        areas: this.addressInfo.areas.join(''),
        address: this.addressInfo.address,
        lat: this.addressInfo.lat,
        lng: this.addressInfo.lng,
        imgs: JSON.stringify(this.serveImages),
        videos: JSON.stringify(this.serveVideos),
      };
      const method = 'POST';
      request(url, data, header, method)
        .then((res) => {
          hideLoading();
          this.uploadBtnDisabled = false;
          redirectTo(
            `/pages/project/uploadResult/uploadResult?orderId=${res.id}&type=upload`
          );
        })
        .catch((err) => {
          showToast('上传失败');
          this.uploadBtnDisabled = false;
        });
    },
    // 请求 上传 img|video
    requestUpload(type, name, filePath) {
      name = 'attachment';
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
              // console.log('上传成功', name, res, data);
              resolve(data);
            } else {
              hideLoading();
              showToast('上传失败');
              reject(res);
            }
          })
          .catch((err) => {
            // console.log('上传失败', name, err);
            reject(err);
          });
      });
    },
    // 图片上传至服务器
    uploadImagesToServer() {
      const images = this.uploadImages;
      const videos = this.uploadVideos;
      this.requestUpload('img', images[0].id + '_1', images[0].path)
        .then((res) => {
          this.requestUpload('img', images[1].id + '_2', images[1].path)
            .then((res) => {
              this.requestUpload('img', images[2].id + '_3', images[2].path)
                .then((res) => {
                  this.requestUpload(
                    'video',
                    videos[0].id + '_4',
                    videos[0].tempFilePath
                  )
                    .then((res) => {
                      this.requestOrdersCreated();
                    })
                    .catch((err) => {
                      this.uploadBtnDisabled = false;
                      // console.log(err);
                    });
                })
                .catch((err) => {
                  this.uploadBtnDisabled = false;
                  // console.log(err);
                });
            })
            .catch((err) => {
              this.uploadBtnDisabled = false;
              // console.log(err);
            });
        })
        .catch((err) => {
          this.uploadBtnDisabled = false;
          // console.log(err);
        });
    },
    // 上传按钮 回调函数
    handleUpload() {
      this.uploadBtnDisabled = true;
      this.checkCanUpload();
    },
    // 图片本地上传 回调
    handleUploadImagesChange(images) {
      this.uploadImages = [].concat(images);
    },
    // 视频本地上传 回调
    handleUploadVideoChange(videos) {
      this.uploadVideos = [].concat(videos);
    },
    // picker 审核人员 change
    handlePickerAuditorsChange(e) {
      const value = e.detail.value;
      this.adminListIndex = parseInt(value);
    },
    // 检测上传
    checkCanUpload() {
      let canUse = true;
      const addressInfo = this.addressInfo;
      const contract_no = this.contract_no;
      const adminListIndex = this.adminListIndex;

      const uploadImages = this.uploadImages;
      const uploadVideos = this.uploadVideos;

      if (!addressInfo || !addressInfo.address) {
        canUse = false;
        showToast('无法获取您的地理位置,请检查后再开始上传！');
        this.uploadBtnDisabled = false;
        return;
      }
      if (adminListIndex < 0) {
        canUse = false;
        showToast('请选择巡检审核人员后再开始上传！');
        this.uploadBtnDisabled = false;
        return;
      }

      if (!contract_no) {
        canUse = false;
        showToast('请完善巡检合同号后再开始上传！');
        this.uploadBtnDisabled = false;
        return;
      }

      if (!uploadImages || uploadImages.length < 3) {
        canUse = false;
        showToast('请拍摄3张照片后再开始上传！');
        this.uploadBtnDisabled = false;
        return;
      }
      if (!uploadVideos || uploadVideos.length < 1) {
        canUse = false;
        showToast('请录制视频后再开始上传！');
        this.uploadBtnDisabled = false;
        return;
      }
      if (canUse) {
        showLoading('上传中...');
        this.uploadImagesToServer();
      }
    },
    // 子组件触发 传回地址信息
    handleGetAddress(e) {
      console.log('addressInfo', e);
      this.addressInfo = Object.assign({}, e);
    },
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN, GET_USER_INFO, GET_ADMIN_LIST]),
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
