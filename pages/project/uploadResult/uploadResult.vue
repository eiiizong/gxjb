<template>
  <view class="upload-result">
    <div class="hint" v-if="type==='upload'">
      <div class="icon icon-success"></div>
      <div class="text">上传成功</div>
    </div>
    <div class="content">
      <div class="cell time">
        <div class="name">巡检时间</div>
        <div class="value">2020年6月18日 11：20：20</div>
      </div>
      <div class="cell address">
        <div class="name">巡检地点</div>
        <div class="value">
          四川省成都市锦江区大业路6号财富中心广场四川省成都市锦江区大业路6号财富中心广场
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
import { request, previewImage } from '../../../common/utils/uniApi';

import { GET_ACCESS_TOKEN } from '../../../store/types';
import { mapGetters } from 'vuex';
export default {
  name: 'upload',
  components: {},
  data() {
    return {
      orderId: '',
      imagesData: [
        {
          id: 1,
          path:
            'data:image/jpeg;base64,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',
        },
        {
          id: 2,
          path:
            'data:image/jpeg;base64,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',
        },
        {
          id: 3,
          path:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AfgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACBAEDBQAGB//EADMQAAICAQMCAwcDAgcAAAAAAAECAAMRBBIhBTETQVEiIzJhcXLBFDORQuFSYoGSobHR/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAHxEBAQEBAQACAgMAAAAAAAAAAAERAhIDEyFBFDFR/9oADAMBAAIRAxEAPwDUAhgSAIYm9r0I7EITpIEFRI7QpAhARabgJOJOJwi0OxOxJk4hoDidCnEQ0YAiD2hyDHoAREep/sqP834j5iPVB7lfu/EE1cIUrEMGBDEIQAYQMnVDEKADCBi0CkwQZOYtVBYkwczsw0xSD2nZkQ0q6CTJMEytKIMR6p+yv3R0mI9U/aX7vxDSo1MIGUB4atEldmEDKt0kNJOLgYQMqUwlMNUuBkgwa1axtqAky+7SX0oHsrIU+ec4i2KxVmdBzDaq1VDtW4U+e0w0YjMjOIBMgtGVHmCTBLSC0NJJaJdTPul+78RktEepH3S/d+I00mNYB3EvTVoexigpX0liVqOwjuMZejy25ENbIopPlDk1pKbFkNXiamGrEEGTWnL1WhFIqVV9njMfd6nrNdmGBGMTH09imsHIjquuwEEZzOb07Ovj/AqtBp67Vdc8HO1jmOuMg5OFiDao7gV7gzrdVvPJx8sx+0/V0x+ogJq328KeRFN0Z6vYptQL8QHMzjZNuLsY/JM6MboLNxKd8EvLZLi3ES6i3u1+stLxTqDe7X6xotArQwYotktV8x4ylMBhiFulAaGDJVKtDQg0p3SQc8iKtea2NDqBlUZuT2mnW2cczzaWBTkHmamn1S7MlvKcvcx6Xx9SzGo5GzPaI6ixUQsWGRBt1y+GVU7ifITNu6hXt2mok/Pyk8820++5zPzQW3GywsT37QN0o8QNzkSd48zOuTHndd7VuZ2ZXvHkZIIJxmUj9pLRbWKzoAozgy8g9x2lZaCepjMDjyMuVxFFaGGE2xyynFcCGtoiYMNWAk3lc6Nh19YQYRUOJO7Eny0nZzxR5QheViO+cXMj640nzdRo/qT5Yz6yXvrsUArgzN8T5zvEPkTD6of8jr9mWVS3E7aD2i28+s4WH1l+ay9wyFxJGcxXxT6yDZDyPcPo42EZlDHBlAuInNqMxTmxV+SWMoPLA0wrOtUoSERnwcZzjM0NNqk1FK21Z2t6zf8AFedOz4eSH5iweEHhi52a345JwJCX1uxVLFZh3AYEieV67rzbd4FZZVrJDc/EZkhmXlSR9DM7Svy5X0UNO8QT5+NXqOff2d8/Ee82ekdX1Fupro1Dqysu0E8HIHHMNip80r1G8TvEmVd1XRUsFbUKT6L7WPriN12q6hkYMp7EHIMpfuGd8jfE7NXTXctL3ItjdlJljOFGWYAepOIy9Rfvkb5Q9i1ozuwVVGSTwBF6eoaW9ylV6M3HHbP09YYXo9vkb4uLVYHa4bBwcHsZ2/5x4Xt4pgSc4mp0vWVU0vXa20hs5PnM6pTZYd3mOeYQ0/tAZGDMpcuuf8t1uoaZUDm0YPbAPMEdX0o/rb/YYH6LTbQUryEB+PzhfoKAwzSnPtcR/cvxWBaxttexjyxJ7wdp9R/M9ANHpuAalPJPaSdFpQUzSpyeOPl5zPR9defNZ2BzjBJHf0x/7I2ibt+lpbTulNajAYjd5HPOP4mU2nNQBswwPHBjlT1xYXwBDqeyonwnZftOMw8J/gOfunEJkHaQPTMosUM7s4cuxf1zkzZ6nob/ANPp2Q22vt22qCW575/7/wCInoNKDZXeW4Vj7OPQz1GgJZG8/dt3+kW4vierjyz06+zatlWpbHYFWOP9JyaLW4rCaW4MxJUhSCT/AGnsKyf16sRx4A84vVqmHWk0pVSq5YNznLZPrJ9Vp9XP+vL0Va9VselNQAT7ZTPf5xvp+j6lqiUrttqRRnc5YD6CeqpreouHFftH+gY/mLdOJGjTcOxI+KHuifFJ/df/2Q==',
        },
      ],
      videoData: [{}],
      // 巡检详情
      orderInfo: {},
      type: ''
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
    if(type) {
      this.type = type
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
    ...mapGetters([GET_ACCESS_TOKEN]),
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
