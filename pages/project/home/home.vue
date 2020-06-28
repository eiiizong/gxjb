<template>
  <view class="home">
    <div class="company-info">
      <div class="name">
        成都大中华广告传播有限公司成都大中华广告传播有限公司
      </div>
      <div class="account">
        <div>ID：</div>
        <div>ggj5547</div>
      </div>
      <div class="button-wrapper">
        <yhButton
          className="zdy-btn-2"
          @click="handleLoginOut"
          value="退出"
        ></yhButton>
      </div>
    </div>
    <div class="hint">提示：距上次巡检已 1天1小时12分钟！</div>
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
          <div class="item" :key="item.id">
            <div class="time">2020年6月1日 09:32:00</div>
            <div class="address">四川省成都市锦江区大业路 财富中心</div>
            <div class="img-box">
              <img src="/static/images/home/icon-upload-ok.png" alt="" />
            </div>
          </div>
        </template>
      </div>
    </scroll-view>
  </view>
</template>

<script>
import yhButton from '@/components/yh-button/yh-button';
import { request,redirectTo } from '../../../common/utils/uniApi';

import { GET_ACCESS_TOKEN } from '../../../store/types';
import { mapGetters } from 'vuex';
export default {
  name: 'home',
  components: {
    yhButton,
  },
  data() {
    return {
      account: '1234',
      historyList: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  // 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
  onLoad() {},
  // 监听页面初次渲染完成
  onReady() {},
  // 监听页面显示
  onShow() {},
  // 监听页面隐藏
  onHide() {},
  methods: {
    // 退出登陆 回调函数
    handleLoginOut() {
      console.log('退出登陆');
      redirectTo(`/pages/project/login/login?type=loginOut`)
    },
    // 创建新的巡检记录 回调函数
    handleCreateNewRecord() {
      console.log('创建新的巡检记录');
      redirectTo(`/pages/project/upload/upload`)
    },
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN]),
  },
  watch: {},
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
  }
}
</style>
