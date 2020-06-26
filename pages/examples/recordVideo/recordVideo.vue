<template>
  <view class="example example-record-video">
    <div class="video-wrapper">
      
    </div>
    <yhRecordVideo></yhRecordVideo>
  </view>
</template>

<script>
import yhRecordVideo from '../../../components/yh-record-video/yh-record-video'
export default {
  name: 'exampleRecordVideo',
  components: {
    yhRecordVideo
  },
  data() {
    return {};
  },
  onLoad() {},
  onReady() {},
  onShow() {},
  onHide() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.example-record-video {
  width: 100%;
}
</style>
