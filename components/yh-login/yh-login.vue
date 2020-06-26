<template>
  <view class="yh-login-wrapper">
    <div class="yh-login">
      <yh-popup type="center" ref="loginPopup" :maskClick="false">
        <!-- 授权登陆 -->
        <div class="content content-login" v-if="!isAuthorize">
          <text class="icon icon-close-popup" @click="closePopup"></text>
          <text class="icon icon-login-logo"></text>
          <div class="hint">请先授权登录</div>
          <div class="btn-wrapper">
            <button @getuserinfo="getUserInfo" open-type="getUserInfo">
              授权登陆
            </button>
          </div>
        </div>
        <!-- 电话号码绑定 -->
        <div class="content content-bind" v-if="!isRegister && isAuthorize">
          <text class="icon icon-close-popup" @click="closePopup"></text>
          <div class="hint">
            <div class="icon"></div>
            <div>请绑定手机</div>
          </div>
          <div class="input-wrapper">
            <input
              type="number"
              v-model="phone"
              maxlength="11"
              placeholder="请输入手机号"
            />
          </div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="verificationCode"
              maxlength="11"
              placeholder="验证码"
            />
            <button
              class="btn get-code"
              :class="[canGetVerificationCode ? '' : 'disabled']"
              :disabled="!canGetVerificationCode"
              @click="getVerificationCode"
            >
              {{ verificationCodeText }}
            </button>
          </div>
          <div class="btn-wrapper">
            <button
              class="btn"
              :disabled="disabled"
              :class="[disabled ? 'disabled' : '']"
              @click="handBindPhone"
            >
              绑定
            </button>
          </div>
        </div>
      </yh-popup>
    </div>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 * @property {Number} maxlength  最大输入长度，设置为
 */
import yhPopup from '@/components/yh-popup/yh-popup';
import { request } from '@/common/utils/uniApi';
import { mapGetters } from 'vuex';
import {
  GET_AUTHORIZE_STATUS,
  GET_REGISTER_STATUS,
  CHANGE_AUTHORIZE_STATUS,
  CHANGE_USERINFO,
  GET_USERINFO,
  GET_OPEN_ID,
  GET_LOGIN_REQUEST_COMPLATED_STATUS,
} from '@/store/types';
export default {
  name: 'yhLogin',
  props: {
    showLoginPopup: {
      type: [Boolean],
      default: false,
    },
  },
  components: {
    yhPopup,
  },
  data() {
    return {
      show: false,
      disabled: true,
      haveTimer: false,
      phone: '',
      verificationCode: '',
      canGetVerificationCode: false,
      verificationCodeText: '获取验证码',
      timer: null,
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 隐藏弹窗显示
    closePopup() {
      this.$nextTick(() => {
        this.$refs['loginPopup'].close();
      });
      this.show = false;
      this.$emit('close');
    },
    // 显示弹窗显示
    openPopup() {
      console.log('准备打开弹窗');
      // 登陆是否请求完成
      const loginRequestIsCompleted = this.loginRequestIsCompleted;
      if (!loginRequestIsCompleted) {
        console.log('登陆是否请求未完成 弹窗关闭');
        this.show = false;
        this.$emit('close');
        return;
      }
      this.show = true;
      this.$nextTick(() => {
        this.$refs['loginPopup'].open();
      });
    },
    // 获取用户信息
    getUserInfo(e) {
      const userInfo = e.detail.userInfo;
      if (userInfo) {
        this.$store.commit(CHANGE_USERINFO, userInfo);
        this.$store.commit(CHANGE_AUTHORIZE_STATUS, true);
      }
    },
    // 获取验证码
    getVerificationCode() {
      this.canGetVerificationCode = false;
      this.haveTimer = true;
      let time = 60;
      const url = 'verification/send/register';
      const header = {};
      const method = 'POST';
      const data = {
        phone: this.phone,
      };
      request(url, data, header, method).then(res => {
        console.log(res);
      });
      this.timer = setInterval(() => {
        time--;
        this.verificationCodeText = `${time}s后获取`;
        if (time === 1) {
          clearInterval(this.timer);
          this.verificationCodeText = '获取验证码';
          this.canGetVerificationCode = true;
          this.haveTimer = false;
        }
      }, 1000);
    },
    // 绑定电话号码请求
    handBindPhone() {
      this.disabled = true;
      const url = 'register';
      const data = {
        ...this.userInfo,
        phone: this.phone,
        username: this.userInfo.nickName,
        avatar: this.userInfo.avatarUrl,
        verificationCode: this.verificationCode,
      };
      const header = {
        'open-id': this.openid,
      };
      const method = 'POST';
      request(url, data, header, method)
        .then(res => {
          this.$store.commit(CHANGE_USERINFO, {
            ...this.userInfo,
            ...res,
          });
          this.show = false;
        })
        .catch(err => {
          this.disabled = false;
        });
    },
    checkPhone(value) {
      let result = true;
      if (!/^1[3456789]\d{9}$/.test(value)) {
        result = false;
      }
      return result;
    },
  },
  computed: {
    ...mapGetters([
      GET_AUTHORIZE_STATUS,
      GET_USERINFO,
      GET_REGISTER_STATUS,
      GET_OPEN_ID,
      GET_LOGIN_REQUEST_COMPLATED_STATUS,
    ]),
  },
  watch: {
    isRegister(newVal) {
      console.log('isRegister', newVal);
      const isAuthorize = this.isAuthorize;
      // 已注册
      if (newVal) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    isAuthorize(newVal) {
      console.log('isAuthorize', newVal);
      const isRegister = this.isRegister;
      if (newVal) {
        if (isRegister) {
          this.show = false;
        } else {
          this.show = true;
        }
      } else {
        this.show = true;
      }
    },
    show(newVal) {
      console.log('show', newVal);
      if (newVal) {
        this.openPopup();
      } else {
        this.closePopup();
      }
    },
    phone(newVal) {
      const verificationCode = this.verificationCode;
      var haveTimer = this.haveTimer;
      let phoneIsOk = this.checkPhone(newVal);
      if (phoneIsOk && verificationCode) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      // 手机号正确 才能点击获取验证码 且倒计时没有完成
      if (phoneIsOk && !haveTimer) {
        this.canGetVerificationCode = true;
      }
    },
    verificationCode(newVal) {
      const phone = this.phone;
      if (this.checkPhone(phone) && newVal) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    loginRequestIsCompleted(val) {
      if (val) {
        if (!this.isRegister || !this.isAuthorize) {
          this.show = true;
        }
      }
    },
    showLoginPopup(val) {
      console.log('showLoginPopup', val);
      this.show = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
view,
text {
  box-sizing: border-box;
}
.yh-login-wrapper {
  width: 100%;
}
.content {
  width: 600rpx;
  height: 460rpx;
  background-color: #fff;
  border-radius: 20rpx;
  color: #000;
  font-size: 36rpx;
  position: relative;
  .btn-wrapper {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 64rpx 40rpx;
    button {
      width: 100%;
      height: 80rpx;
      background-color: #ff7772;
      border-radius: 10rpx;
      color: #fff;
      line-height: 80rpx;
      font-weight: 500;
      transition: all 0.3s;
      &.disabled {
        opacity: 0.5;
      }
    }
  }
  &.content-login {
    .hint {
      padding-top: 218rpx;
      text-align: center;
      color: #000;
    }
    .icon-login-logo {
      position: absolute;
      top: -74rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 248rpx;
      height: 292rpx;
      background-image: url(data:image/png;base64,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);
    }
  }
  &.content-bind {
    padding-top: 282rpx;
    height: 642rpx;
    background: url(data:image/png;base64,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)
      no-repeat top left #fff;
    background-size: 100% 265rpx;
    position: relative;
  }
  .btn {
    &::after {
      border: 0;
    }
  }
  .input-wrapper {
    position: relative;
    margin-bottom: 20rpx;
    input {
      width: 524rpx;
      height: 90rpx;
      margin: auto;
      font-size: 30rpx;
      background-color: #f4f4f4;
      border-radius: 5rpx;
      line-height: 1.4;
      text-align: left;
      padding-left: 24rpx;
      font-weight: 400;
      padding-right: 180rpx;
    }
    .btn {
      position: absolute;
      top: 50%;
      right: 64rpx;
      transform: translateY(-50%);
      background-color: transparent;
      &.get-code {
        width: auto;
        height: auto;
        color: #ff7772;
        font-size: 30rpx;
        line-height: 1;
        &.disabled {
          color: #999;
        }
      }
    }
  }
  .icon-close-popup {
    position: absolute;
    top: -20rpx;
    right: 20rpx;
    width: 52rpx;
    height: 52rpx;
    z-index: 9999;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAMAAAAqwkWTAAABKVBMVEX09PQAAAD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09fX0+Pj16Oj0+vr/fnn26un/g37/gHz17e3/hYH/e3b40dD+kIz4y8n8pqP/d3L4z83/h4P7s7D/c277r6v+lZH+ko77sK78op74zMv409L/iob+jYn/b2n8rKj8qKX31tX8pKD9mZX24uH5yMb5xcP0/Pz32dj6vLn25uX33dz7trP/aWMfLKNXAAAANnRSTlP+AFXg+vMUm+xAEffkA8Lc0yTFiEcJBumhdcuT8LJ32CqBDU4fzr6uOaaVWyYYtmtoMzE7enN40Kj7AAAIrElEQVRo3qzWCVPaQBTA8dcEEhIS7vu+1Xpru4FAClIFKmDV8aJVW7//l+gjklkiS4PHikdmmP3zm7cE4ZPjUqMlYUva/BoW12qpPK94cCl8PlVbE8NfN6UtoRRVnXdxDsWE4L7E7RYxU/XH3TBb7ri/iqniLiftB4XY+0OlQjknroWqeT6e8bpgbrm8mTifr4bWxFy5UHpfSN5a55KiT5kLEPplBRWfmOPWt+S3hyqRLwlfQHHPJ+aXdeVWAr7El0jlbaFSUNpLhzw0whLRuCf0eU8Kll4fkg+TGyneTSMsEY0ji09tJA/lV4bkAheumRqymoiYqlqYK8ivCQmR4k7e1KwuIoCq/E4xIqwciga5dMprZVYWmd/eapoLRlcLRfdzWb/ZebWIYInP5vajq4RkqejL0MyrROavjK8oyc4hIZIOmNN5owgf7kA6IjiE1O1yOk8zbxHhA/Lp8rb6v5Ba4RK8C4C8S0TAxSe4ivqf0DZ2AN4vAsDS9vKQXE4o1q7vEuEPJVGWl4VKkbQf4GNEAP50RGaHoofpvDmfjxDhnPzpwygrFDv4EgD4OBFAoHgQY4SCyZAXgHyYiIA3lAwuhFSBy2bgY0WQyXKCaoXoDYGf2+ZDRAR46xZBQ4Viyg12kaY1NI2s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);
    background-size: 100%;
  }
  .hint {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fdfaf9;
    font-size: 36rpx;
    font-weight: 700;
    line-height: 1;
    .icon {
      width: 110rpx;
      height: 110rpx;
      margin: 28rpx 0 16rpx;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8g2+bRAAAAK3RSTlMAFPrW7wsHMIfb4cppfDthSB22IpQsxOivob5cj/NxJ882QrqaU1hOqIF0jldppQAAEhNJREFUeNrcm+d6ozoQhlWQQPSOwMIU45r7v78TnycbCZddYZzEZPbXeo3hZdqnkRZ8hVFKCEy6fhusPWs48HhT5Y7TYmbbDLeOk1ebmB9Sy1sH275LICGUgmUYfQfLun5/JktLvnEwZswuDKNGb2+oNozCZgxjZ8PL//n2fZdFkCwCDzb+1rUGvvnfVUXxzoTQ24Uh9E5ZFP87csMHy937DQSvbBRGjRnuTlYZ4+LsJj1DddHGg7Xe9WYTEfCaBpswOA68apltSDI9PsNmbcVTL+ib18MjUebvToI7dv32qKHadrhY7/zX8h+N+uBYVpgV6G2WoYK1VekFfvQi5YVEZugK3hZvT7LC4VYQZq/gPui7Im7ZOMtm++/M1/1w+YSNH1ic6YAhaVpfx/y48pMf5EtCr8yZgbSqIf6wFmtVU1TgfFj3EfgRI4nvpvn9TDt36TNS61RnLSKsTxNn3ZI7Lcbs3OPvg9obEfjJD+Qe7E/l3wq/gfN3JnE8uatt2Ptmppjp9/td4J6O4qzOmHH/R1g+uP53xybsAlEVd2MQO1UpPPcsi5vbspESGGVnae16oqwcfDdS7djamd+Kl+xExYw7udLGqedu/axJ3rkk2C3Ad8KkMf2t6w0xLtAd722s/bfRkch3S4xu+ow5fDi6oQnJ5FZplfc6CmqHoPuetk5Nt3QKdDPNuHDDcyDS6Zo7yfz9WsSsvkVnV2mQfT0dSUIvLm5Xbm65fUJn/HZzljqOFHEqHj/1X+08Yq4P2LglmcrjEyQTTMwwsA7t7TsEDfhKg71XGTcyLS+9XQfpc0S4v7JK50b22dz9SkWW7AZ8zca4FfgNJE+LDpj1rojtKzojF/uvUizQdEv7ulBXInh+m416N82v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)
        no-repeat top left;
      background-size: 100%;
    }
  }
}
</style>
