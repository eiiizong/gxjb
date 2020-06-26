<template>
  <view class="yh-swiper-wrapper" v-if="banners && banners.length > 0">
    <div class="yh-swiper">
      <swiper
        class="swiper"
        :indicator-dots="indicatorDots"
        :indicator-color="indicatorColor"
        :indicator-active-color="indicatorActiveColor"
        :autoplay="autoplay"
        :current="current"
        :circular="circular"
        :interval="interval"
        :duration="duration"
        :vertical="vertical"
        @change="change"
      >
        <template v-for="item in banners">
          <swiper-item class="swiper-item" :key="item.id">
            <view class="swiper-item-content">
              <image :src="item.thumb" @click="hanldeImage" :data-id="item.id"></image>
            </view>
          </swiper-item>
        </template>
      </swiper>
    </div>
  </view>
</template>

<script>
/**
 * @description swiper滑动
 * @property {Array}   banners                         数据
 */
export default {
  name: 'yhSwiper',
  props: {
    banners: {
      type: [Array],
      required: true,
    },
    indicatorDots: {
      type: [Boolean],
      default: false,
    },
    indicatorColor: {
      type: [String],
      default: '#838383',
    },
    indicatorActiveColor: {
      type: [String],
      default: '#fff',
    },
    autoplay: {
      type: [Boolean],
      default: false,
    },
    current: {
      type: [Number],
      default: 0,
    },
    interval: {
      type: [Number],
      default: 5000,
    },
    duration: {
      type: [Number],
      default: 500,
    },
    circular: {
      type: [Boolean],
      default: true,
    },
    vertical: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    change(e) {
      this.$emit('change', e);
    },
    hanldeImage(e) {
      const id = e.target.dataset.id
      this.$emit('clickItem', id);
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
$swiper-padding-top: 0rpx;
$swiper-item-height: 272rpx;
$swiper-item-padding-left: 24rpx;
view,
text,
swiper-item,
image,
swiper {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.yh-swiper-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: $swiper-padding-top;
  position: relative;
  z-index: 1000;
}
.yh-swiper {
  flex: 1;
  display: flex;
  width: 100%;
}
.swiper {
 flex: 1;
  display: flex;
  height: $swiper-item-height;
}
.swiper-item {
  display: flex;
  width: 100%;
  padding: 0 $swiper-item-padding-left;
}
.swiper-item-content {
  width: 100%;
  border-radius: 20rpx;
  overflow: hidden;
  height: $swiper-item-height;
  display: flex;
  font-size: 0;
  image {
    width: 100%;
    height: 100%;
    font-size: 0;
  }
}
</style>
