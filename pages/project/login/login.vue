<template>
  <view class="login">
    <view class="bg">
      <img src="/static/images/login/bg-header.png" alt="" />
    </view>
    <view class="content">
      <view class="hint">请用广告商账号登录</view>
      <view class="input-wrapper">
        <view class="label">
          <view class="img-box">
            <img src="/static/images/login/icon-username.png" alt="" />
          </view>
          <view>ID</view>
        </view>
        <view class="input">
          <input type="text" placeholder="请输入手机号码" />
        </view>
      </view>
      <view class="input-wrapper">
        <view class="label">
          <view class="img-box">
            <img src="/static/images/login/icon-password.png" alt="" />
          </view>
          <view>密码</view>
        </view>
        <view class="input">
          <input type="text" placeholder="请输入密码" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '../../../common/utils/uniApi';

import { GET_ACCESS_TOKEN } from '../../../store/types';
import { mapGetters } from 'vuex';
export default {
  name: 'login',
  components: {},
  data() {
    return {};
  },
  // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
  onLoad() {},
  // 监听页面初次渲染完成
  onReady() {},
  // 监听页面显示
  onShow() {},
  // 监听页面隐藏
  onHide() {},
  methods: {},
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
$top-image-height: 470rpx;
$border-radius: 32rpx;
.login {
  position: relative;
  height: 100%;
  height: 100vh;
  width: 100%;
  padding-top: $top-image-height - 40rpx;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: $top-image-height;
  }
  .content {
    flex: 1;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px -6px 12px 0px rgba(30, 31, 32, 0.06);
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    position: relative;
    z-index: 2;
    padding: 56rpx;
    .hint {
      font-size: 40rpx;
      font-weight: normal;
      font-stretch: normal;
      line-height: 56rpx;
      letter-spacing: 0px;
      color: #1e1f20;
    }
  }
}
</style>
