<template>
  <view class="home">
    <div class="company-info">
      <div class="name">
        {{ userInfo.name }}
      </div>
      <div class="account">
        <div>ID：</div>
        <div>{{ userInfo.id }}</div>
      </div>
      <div class="button-wrapper">
        <yhButton
          className="zdy-btn-2"
          @click="handleLoginOut"
          value="退出"
        ></yhButton>
      </div>
    </div>
    <div class="hint">提示：{{ userInfo.last_create || '暂无记录' }}！</div>
    <div class="button-wrapper">
      <yhButton
        className="zdy-btn"
        @click="handleCreateNewRecord"
        value="创建新的巡检记录"
      ></yhButton>
    </div>
    <div class="history">
      <view class="img-box">
        <img src="/static/images/home/icon-history.png" alt="" />
      </view>
      <div>历史记录</div>
    </div>
    <scroll-view scroll-y class="scroll-wrapper">
      <div class="list">
        <template v-for="item in historyList">
          <div
            class="item"
            :key="item.id"
            @click="handlehistoryListItem(item.id || item)"
          >
            <div class="time">{{ item.created_at | FormatTime }}</div>
            <div class="address">{{ item.areas + item.address }}</div>
            <div class="img-box">
              <img src="/static/images/home/icon-upload-ok.png" alt="" />
            </div>
          </div>
        </template>
        <div class="no-content" v-if="!historyList || historyList.length < 1">
          暂无记录
        </div>
      </div>
    </scroll-view>
  </view>
</template>

<script>
import yhButton from '@/components/yh-button/yh-button';

import {
  request,
  redirectTo,
  navigateTo,
  hideHomeButton,
  showToast,
} from '../../../common/utils/uniApi';

import {
  GET_ACCESS_TOKEN,
  GET_USER_INFO,
  CHANGE_USER_INFO,
  CHANGE_ADMIN_LIST,
} from '../../../store/types';
import { mapGetters } from 'vuex';
export default {
  name: 'home',
  components: { yhButton },
  data() {
    return {
      // 历史巡检列表
      historyList: [],
    };
  },
  // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
  onLoad() {
    hideHomeButton();
  },
  // 监听页面初次渲染完成
  onReady() {},
  // 监听页面显示
  onShow() {
    if (this.accessToken) {
      this.requestUserCenter();
      this.requestOrdersList();
    }
  },
  // 监听页面隐藏
  onHide() {},
  methods: {
    // 请求 用户中心
    requestUserCenter() {
      const url = 'user/center';
      const header = {
        'access-token': this.accessToken,
      };
      const data = {};
      const method = 'POST';
      request(url, data, header, method)
        .then((res) => {
          this.$store.commit(CHANGE_USER_INFO, {
            ...this.userInfo,
            ...res,
          });
          this.$store.commit(CHANGE_ADMIN_LIST, res.admin_list);
        })
        .catch((err) => {});
    },
    // 请求 退出登陆
    requestLogout() {
      const url = 'logout';
      const header = {
        'access-token': this.accessToken,
      };
      const data = {};
      const method = 'POST';
      request(url, data, header, method)
        .then((res) => {
          showToast('退出成功')
          setTimeout(() => {
            redirectTo(`/pages/project/login/login?type=loginOut`);
          }, 1000);
        })
        .catch((err) => {});
    },
    // 请求 巡检列表
    requestOrdersList() {
      const url = 'orders/list';
      const header = {
        'access-token': this.accessToken,
      };
      const data = {};
      const method = 'POST';
      request(url, data, header, method)
        .then((res) => {
          this.historyList = [].concat(res);
        })
        .catch((err) => {});
    },
    // 退出登陆 回调函数
    handleLoginOut() {
      // console.log('退出登陆');
      this.requestLogout();
    },
    // 创建新的巡检记录 回调函数
    handleCreateNewRecord() {
      console.log('创建新的巡检记录');
      navigateTo(`/pages/project/upload/upload`);
    },
    // 巡检记录详情
    handlehistoryListItem(id) {
      navigateTo(
        `/pages/project/uploadResult/uploadResult?orderId=${id}&type=history`
      );
    },
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN, GET_USER_INFO]),
  },
  watch: {
    accessToken: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.requestUserCenter();
          this.requestOrdersList();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$border-radius: 12rpx;
.home {
  position: relative;
  height: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  .company-info {
    width: 100%;
    min-height: 188rpx;
    background-color: #fff;
    box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(30, 31, 32, 0.06);
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    padding: 40rpx 230rpx 40rpx 44rpx;
    position: relative;
    font-size: 34rpx;
    line-height: 44rpx;
    color: #1e1f20;
    .button-wrapper {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 44rpx;
    }
    .account {
      font-size: 28rpx;
      line-height: 1;
      color: #a5a5a6;
      display: flex;
      align-items: center;
      margin-top: 20rpx;
    }
  }
  .hint {
    font-size: 28rpx;
    color: #b99f4e;
    line-height: 120rpx;
    height: 120rpx;
    text-align: center;
  }
  > .button-wrapper {
    padding: 0 36rpx;
  }
  .history {
    padding: 0 20rpx;
    display: flex;
    align-items: center;
    height: 50rpx;
    font-size: 36rpx;
    font-weight: 500;
    color: #171918;
    margin: 40rpx 0 24rpx;
    .img-box {
      width: 30rpx;
      height: 28rpx;
      margin-right: 12rpx;
      display: flex;
    }
  }
  .scroll-wrapper {
    flex: 1;
    overflow: hidden;
  }
  .list {
    padding: 0 20rpx 20rpx;
    .item {
      width: 100%;
      min-height: 140rpx;
      background-color: #ffffff;
      box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(30, 31, 32, 0.06),
        0rpx 2rpx 4rpx 0rpx rgba(30, 31, 32, 0.05);
      border-radius: 16rpx;
      margin-bottom: 20rpx;
      position: relative;
      font-size: 34rpx;
      line-height: 44rpx;
      color: #14141c;
      padding: 20rpx 120rpx 20rpx 24rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .address {
        font-size: 26rpx;
        line-height: 38rpx;
        color: #a5a5a6;
        padding-top: 12rpx;
      }
      .img-box {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 112rpx;
        height: 54rpx;
      }
    }
    .no-content {
      text-align: center;
      font-size: 28rpx;
      padding-top: 200rpx;
      color: #999;
    }
  }
}
</style>
