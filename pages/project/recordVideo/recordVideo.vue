<template>
  <view class="record-video">
    <yhRecordVideo></yhRecordVideo>
  </view>
</template>

<script>
import yhRecordVideo from '@/components/yh-record-video/yh-record-video';

import { request } from '../../../common/utils/uniApi';
import { GET_ACCESS_TOKEN } from '../../../store/types';
import { mapGetters } from 'vuex';
export default {
  name: 'upload',
  components: {
    yhRecordVideo
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
    
  },
  computed: {
    ...mapGetters([GET_ACCESS_TOKEN]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.record-video {
  position: relative;
  height: 100%;
}
</style>
