<template>
  <view class="upload">
    创建新的巡检记录
  </view>
</template>

<script>
import yhButton from '@/components/yh-button/yh-button';
import { request } from '../../../common/utils/uniApi';

import { GET_ACCESS_TOKEN } from '../../../store/types';
import { mapGetters } from 'vuex';
export default {
  name: 'upload',
  components: {
    yhButton,
  },
  data() {
    return {
      account: '1234',
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
    // 登陆 回调函数
    handleLogin() {
      console.log('登陆');
      this.changeBtnStatus(true)
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
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
$top-image-height: 470rpx;
$border-radius: 32rpx;
.upload {
  position: relative;
  
}
</style>
