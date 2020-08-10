<template>
  <view
    class="yh-current-address-map-wrapper"
    :class="[propAddress ? 'details' : '']"
  >
    <template v-if="!propAddress">
      <view
        class="yh-current-address-map"
        v-if="location && location.lat && location.lng"
      >
        <view class="address" v-if="address">{{ address }}</view>
        <view class="address" v-else @click="reRequest">{{
          errorMessage
        }}</view>
        <view class="map-wrapper" v-if="address">
          <map
            :longitude="location.lng"
            :latitude="location.lat"
            :show-location="true"
            :markers="markers"
          ></map>
        </view>
      </view>
      <view class="no-open" v-else @click="handleGetAddressInfoError">
        点击打开设置页允许获取地理位置权限
      </view>
    </template>
    <template v-else>
      <view class="yh-current-address-map">
        <view class="address">{{ propAddress }}</view>
        <view class="map-wrapper">
          <map
            :longitude="location.lng"
            :latitude="location.lat"
            :show-location="true"
            :markers="markers"
          ></map>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
/**
 * yh-current-address-map-wrapper
 * @description input输入框组件
 */
import {
  openSetting,
  showToast,
  showLoading,
  hideLoading,
} from '../../common/utils/uniApi';
import qqMapWxJssdk from '@/common/utils/qqmap-wx-jssdk.min.js';
export default {
  name: 'yhCurrentAddressMap',
  props: {
    location: {
      type: [Object],
      default: () => {
        return {
          // lat: 39.984060,
          // lng: 116.307520,
        };
      },
    },
    propAddress: {
      type: [String],
      default: '',
    },
  },
  data() {
    return {
      qqMap: null,
      address: '',
      markers: [],
      // 错误信息
      errorMessage: '',
      // 是否刷新地址
      isRefresh: true,
    };
  },
  created() {
    this.qqMap = new qqMapWxJssdk({
      key: 'LHCBZ-RHQH3-YPB3Z-YHXKO-IJ6XV-H3FQB',
    });
  },
  mounted() {},
  methods: {
    // 根据经纬度获取位置
    reverseGeocoder(location) {
      const _this = this;
      if (!location || !location.lat || !location.lng) {
        hideLoading();
        showToast('解析地址参数不正确');
        return;
      }
      this.qqMap.reverseGeocoder({
        location: `${location.lat},${location.lng}`,
        coord_type: 1,
        get_poi: 0,
        // poi_options: '1',
        success(res) {
          const address = res.result.address;
          const addressComponent = res.result.address_component;
          _this.address = address;
          _this.$emit('getAddress', {
            address: address,
            lat: location.lat,
            lng: location.lng,
            areas: [
              addressComponent.province,
              addressComponent.city,
              addressComponent.district,
            ],
          });
          hideLoading();
          // showToast('解析地址成功');
          console.log('reverseGeocoder', res);
        },
        fail(err) {
          hideLoading();
          showToast('解析地址失败');
          _this.address = '';
          _this.errorMessage = '解析地址错误,点击重新解析!';
        },
      });
    },
    // 处理错误 获取用户地理位置权限
    handleGetAddressInfoError() {
      openSetting().then((res) => {
        // 打开设置页 可刷新
        this.isRefresh = true;
      });
    },
    // 重新请求
    reRequest() {
      showLoading('正在解析...');
      reverseGeocoder(this.location);
    },
  },
  computed: {},
  watch: {
    location(newData, oldData) {
      console.log('父组件传入的经纬度: ', newData);
      if (newData && newData.lat && newData.lng) {
        // 相同经纬度 不在请求数据
        if (newData.lat === oldData.lat && newData.lng === oldData.lng) {
          return;
        }
        // 确保只刷新一次
        if (!this.propAddress && this.isRefresh) {
          this.isRefresh = false;
          this.reverseGeocoder(newData);
        }
        this.markers = [
          {
            id: 1,
            latitude: newData.lat,
            longitude: newData.lng,
            width: 40,
            height: 40,
            iconPath: 'https://s1.ax1x.com/2020/07/30/aKmTKg.png',
          },
        ];
      } else {
        this.$emit('getAddress', {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';

map,
view {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.yh-current-address-map-wrapper {
  width: 100%;
  padding-right: 36rpx;
  font-size: 30rpx;
  color: #787979;
  line-height: 42rpx;
  &.details {
    padding-right: 0;
  }
  .address {
    padding-top: 26rpx;
  }
  .map-wrapper {
    width: 100%;
    height: 600rpx;
    display: flex;
    margin-top: 26rpx;
    map {
      width: 100%;
      height: 100%;
    }
  }
  .no-open {
    padding-top: 26rpx;
    color: #f22;
  }
}
</style>
