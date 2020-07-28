<template>
  <view class="upload-result">
    <div class="hint" v-if="type === 'upload'">
      <div class="icon icon-success"></div>
      <div class="text">上传成功</div>
    </div>
    <div class="content">
      <div class="cell time">
        <div class="name">巡检时间</div>
        <div class="value">
          {{ new Date(orderInfo.created_at) | FormatDate }}
        </div>
      </div>
      <div class="cell address">
        <div class="name">巡检地点</div>
        <div class="value">
          {{ orderInfo.areas + orderInfo.address }}
        </div>
      </div>
      <div class="cell">
        <div class="name">审核人员</div>
        <div class="value">
          {{ admin.name || '暂无' }}
        </div>
      </div>
      <div class="cell">
        <div class="name">合同号</div>
        <div class="value">
          {{ orderInfo.contract_no || '暂无' }}
        </div>
      </div>
      <div class="cell photo">
        <div class="name">照片</div>
        <div class="images-wrapper">
          <template v-for="(item, index) in imagesData">
            <div
              class="img-box"
              :key="item.id"
              @click="handlePreviewImage(index)"
            >
              <image :src="item.path" />
            </div>
          </template>
        </div>
      </div>
      <div class="cell video">
        <div class="name">视频</div>
        <div class="video-wrapper">
          <template v-for="item in videoData">
            <div class="video-box" :key="item.id">
              <video
                class="video"
                :src="item.tempFilePath"
                :duration="item.duration"
                :poster="item.thumbTempFilePath"
                enable-play-gesture
                enable-auto-rotation
              ></video>
            </div>
          </template>
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
  </view>
</template>

<script>
import {
  request,
  previewImage,
  setNavigationBarTitle,
} from '../../../common/utils/uniApi';

import { GET_ACCESS_TOKEN, GET_ADMIN_LIST } from '../../../store/types';
import { mapGetters } from 'vuex';
export default {
  name: 'upload',
  components: {},
  data() {
    return {
      orderId: '',
      imagesData: [],
      videoData: [],
      // 巡检详情
      orderInfo: {},
      type: '',
      // 审核人员
      admin: {},
    };
  },
  // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
  onLoad(e) {
    const orderId = e.orderId;
    // 类型 upload history
    const type = e.type;
    if (orderId) {
      this.orderId = orderId;
      this.requestOrdersDetails(orderId);
    }
    if (type) {
      this.type = type;
    }
    if (type === 'history') {
      setNavigationBarTitle('巡检详情');
    }
  },
  // 监听页面初次渲染完成
  onReady() {},
  // 监听页面显示
  onShow() {},
  // 监听页面隐藏
  onHide() {},
  methods: {
    // 请求 巡检详情
    requestOrdersDetails(id) {
      if (!id) {
        return;
      }
      const url = `orders/view/${id}`;
      const header = {
        'access-token': this.accessToken,
      };
      const data = {};
      const method = 'POST';
      request(url, data, header, method)
        .then((res) => {
          this.orderInfo = Object.assign({}, res);
          this.imagesData = JSON.parse(res.imgs).map((item, index) => {
            return {
              id: 'img_' + +new Date() + index,
              path: item,
            };
          });
          this.videoData = [
            {
              id: 1,
              tempFilePath: res.videos,
            },
          ];
          this.adminList.filter((item) => {
            if (item.admin_id === res.admin_id) {
              this.admin = Object.assign({}, item);
              return true;
            }
          });
        })
        .catch((err) => {});
    },
    // 预览图片
    handlePreviewImage(index) {
      const data = this.imagesData;
      const current = index + '';
      const urls = data.map((item) => {
        return item.path;
      });
      previewImage(current, urls);
    },
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN, GET_ADMIN_LIST]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
$boder-radius: 16rpx;
.upload-result {
  position: relative;
  padding-bottom: 30rpx;
  .hint {
    padding-top: 64rpx;
    text-align: center;
    .icon {
      margin: auto;
    }
    .text {
      padding-top: 24rpx;
      font-size: 30rpx;
      line-height: 50rpx;
      letter-spacing: 0rpx;
      color: #54d769;
      padding-bottom: 60rpx;
    }
  }
  .content {
    padding-left: 36rpx;
    position: relative;
    .cell {
      padding: 30rpx 36rpx 26rpx 0;
      border-bottom: 1px solid $border-color;
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
      &.photo {
        padding-bottom: 12rpx;
      }
    }

    .images-wrapper {
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
        &:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
    .video-wrapper {
      padding-top: 30rpx;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .video-box {
        width: 210rpx;
        height: 210rpx;
        margin-bottom: 24rpx;
        margin-right: 24rpx;
        display: flex;
        position: relative;
        border-radius: $boder-radius;
        border: solid 1rpx #f7f7f7;
        background-color: #f7f7f7;
        overflow: hidden;
        .video {
          width: 100%;
          height: 100%;
          border-radius: $boder-radius;
        }
      }
    }
  }
}
</style>
