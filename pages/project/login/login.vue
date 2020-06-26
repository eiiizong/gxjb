<template>
  <view class="login"> login{{ 18482108808 | FormatPhoneNumbere }} </view>
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
  onShow() {
    console.log(this);
  },
  // 监听页面隐藏
  onHide() {},
  methods: {},
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN])
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  height: 100vh;
}
</style>
