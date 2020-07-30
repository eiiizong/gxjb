<template>
  <view class="login">
    <view class="bg">
      <img src="/static/images/login/bg-header.jpg" alt="" />
    </view>
    <view class="content">
      <view class="hint">请用广告商账号登录</view>
      <view class="input-wrapper">
        <view class="label">
          <view class="img-box">
            <img src="/static/images/login/icon-username.png" alt="" />
          </view>
          <view>账号</view>
        </view>
        <view class="input">
          <input
            type="number"
            maxlength="11"
            placeholder="请输入手机号码"
            v-model="account"
          />
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
          <input type="password" placeholder="请输入密码" v-model="password" />
        </view>
      </view>
      <div class="button-wrapper">
        <yhButton
          className="zdy-btn"
          @click="handleLogin"
          :value="loginBtnText"
          :disabled="loginBtnDisabled"
          :loading="loginBtnIsLoading"
        ></yhButton>
      </div>
    </view>
  </view>
</template>

<script>
import yhButton from '@/components/yh-button/yh-button';
import {
  request,
  redirectTo,
  login,
  setStorage,
  getStorage,
} from '../../../common/utils/uniApi';

import { CHANGE_ACCESS_TOKEN, CHANGE_USER_INFO } from '../../../store/types';
// import { mapGetters } from 'vuex';
export default {
  name: 'login',
  components: {
    yhButton,
  },
  data() {
    return {
      account: '',
      password: '',
      loginBtnText: '登陆',
      loginBtnIsLoading: false,
      loginBtnDisabled: false,
      type: '',
    };
  },
  // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
  onLoad(e) {
    if (e.type) {
      this.type = e.type;
    }
    getStorage('USER_ACCOUNT_INFO')
      .then((res) => {
        const data = JSON.parse(res.data);
        const { account, password } = data;
        this.account = account;
        this.password = password;
        // if (data.access_token) {
        //   this.$store.commit(CHANGE_ACCESS_TOKEN, data.access_token);
        //   this.$store.commit(CHANGE_USER_INFO, data);
        //   if (!this.type) {
        //     this.changeBtnStatus(true);
        //     setTimeout(() => {
        //       redirectTo(`/pages/project/home/home`);
        //     }, 1000);
        //   } else {
        //     this.changeBtnStatus(false);
        //   }
        // }
        if (!this.type) {
          this.handleLogin();
        }
      })
      .catch((err) => {});
  },
  // 监听页面初次渲染完成
  onReady() {},
  // 监听页面显示
  onShow() {
    this.checkLogin();
  },
  // 监听页面隐藏
  onHide() {},
  methods: {
    // 登陆 回调函数
    handleLogin() {
      // console.log('登陆');
      this.changeBtnStatus(true);
      this.requestWechatLogin();
    },
    // 改变按钮状态
    changeBtnStatus(bool) {
      if (bool) {
        this.loginBtnText = '登陆中...';
        this.loginBtnIsLoading = true;
        this.loginBtnDisabled = true;
      } else {
        this.loginBtnText = '登陆';
        this.loginBtnIsLoading = false;
        this.loginBtnDisabled = false;
      }
    },
    // 登陆请求
    requestLogin(code) {
      const url = 'login';
      const header = {
        code,
      };
      const data = {
        phone: this.account,
        password: this.password,
      };
      const method = 'POST';
      request(url, data, header, method)
        .then((res) => {
          const { access_token } = res;
          if (access_token) {
            this.$store.commit(CHANGE_ACCESS_TOKEN, access_token);
            this.$store.commit(CHANGE_USER_INFO, res);
            // 将账号密码缓存至本地
            setStorage(
              'USER_ACCOUNT_INFO',
              JSON.stringify({
                ...res,
                code: code,
                account: this.account,
                password: this.password,
              })
            );
          }
          redirectTo(`/pages/project/home/home`);
        })
        .catch((err) => {
          this.changeBtnStatus(false);
        });
    },
    // 微信小程序 login
    requestWechatLogin() {
      login()
        .then((res) => {
          this.requestLogin(res);
        })
        .catch((err) => {});
    },
    // 检测登陆
    checkLogin() {
      const account = this.account;
      const password = this.password;
      if (!account) {
        this.loginBtnDisabled = true;
        return;
      }
      if (!password) {
        this.loginBtnDisabled = true;
        return;
      }
      this.loginBtnDisabled = false;
    },
  },
  computed: {},
  watch: {
    account(newData) {
      this.checkLogin();
    },
    password(newData) {
      this.checkLogin();
    },
  },
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
      margin-bottom: 62rpx;
    }
  }
  .input-wrapper {
    margin-bottom: 28rpx;
    .label {
      font-size: 24rpx;
      color: #4a4c4d;
      display: flex;
      align-items: center;
      height: 34rpx;
      line-height: 34rpx;
      .img-box {
        width: 24rpx;
        height: 24rpx;
        margin-right: 8rpx;
      }
    }
    .input {
      padding-top: 14rpx;
      input {
        height: 90rpx;
        background-color: #f7f7f7;
        border-radius: 16rpx;
        font-size: 30rpx;
        line-height: 1.2;
        padding: 0 32rpx;
      }
    }
  }
  .button-wrapper {
    padding-top: 32rpx;
  }
}
</style>
