<template>
  <view class="yh-current-address-map-wrapper">
    <div class="yh-current-address-map">
      <div class="address">{{ address }}</div>
      <div class="map-wrapper">
        <map
          :longitude="location.lng"
          :latitude="location.lat"
          :show-location="true"
          :markers="markers"
        ></map>
      </div>
    </div>
  </view>
</template>

<script>
/**
 * yh-current-address-map-wrapper
 * @description input输入框组件
 */
import qqMapWxJssdk from '@/common/utils/qqmap-wx-jssdk.min.js';
export default {
  name: 'yhCurrentAddressMap',
  props: {
    location: {
      type: [Object],
      default: () => {
        return {
          lat: 39.984060,
          lng: 116.307520,
        };
      },
    },
  },
  data() {
    return {
      qqMap: null,
      address: '',
      markers: [{}]
    };
  },
  created() {
    this.qqMap = new qqMapWxJssdk({
      key: 'LHCBZ-RHQH3-YPB3Z-YHXKO-IJ6XV-H3FQB',
    });
    // this.reverseGeocoder(this.location);
  },
  mounted() {
    // console.log(this.$scopedSlots.prefix)
  },
  methods: {
    reverseGeocoder(location) {
      const _this = this;
      this.qqMap.reverseGeocoder({
        location: `${location.lat},${location.lng}`,
        coord_type: 1,
        get_poi: 0,
        // poi_options: '1',
        success(res) {
          _this.address = res.result.address;
          console.log('reverseGeocoder', res);
        },
        fail(err) {
          console.log(err, 100000);
        },
      });
    },
  },
  computed: {},
  watch: {
    location(newData) {
      console.log(newData);
      if (newData && newData.lat && newData.lng) {
        this.reverseGeocoder(newData);
        this.markers = [
          {
            id: 1,
            latitude: newData.lat,
            longitude	: newData.lng,
            width: 32,
            height: 32,
            iconPath: 'https://s1.ax1x.com/2020/07/30/aKmTKg.png',
          }
        ]
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
text,
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
}
</style>
