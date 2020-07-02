<template>
  <view class="yh-record-video-wrapper">
    <view class="yh-record-video">
      <camera
        class="camera"
        :flash="flash"
        :device-position="devicePosition"
        :frame-size="frameSize"
        @error="handleError"
        @stop="handleStop"
        @initdone="handleInitdone"
      >
        <cover-view class="time">{{recordTime}}</cover-view>
        <cover-view class="toolbar-bottom">
          <cover-image
            class="start"
            @tap.stop="handleRecord"
            :src="
              isStartRecord
                ? 'https://s1.ax1x.com/2020/06/21/N8wOZd.png'
                : 'https://s1.ax1x.com/2020/06/21/N8aqSO.png'
            "
          ></cover-image>
          <cover-image
            class="change"
            @tap.stop="handleChangeDevicePosition"
            src="https://s1.ax1x.com/2020/06/21/N8wMVA.png"
          ></cover-image>
        </cover-view>
      </camera>
    </view>
  </view>
</template>

<script>
/**
 * 视频录制
 * @description 视频录制
 */

export default {
  name: 'yhRecordVideo',
  props: {},
  components: {
    // yhButtonZdy
  },
  data() {
    return {
      // 摄像头朝向 front back(默认)
      devicePosition: 'front',
      // 分辨率 low medium(默认) high 不支持动态修改
      resolution: 'medium',
      // 闪光灯 auto(默认) on off
      flash: 'auto',
      // 指定期望的相机帧数据尺寸
      frameSize: 'medium',
      isStartRecord: false,
      recordTime: '00:00',
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 用户不允许使用摄像头时触发
    handleError(e) {
      console.log('用户不允许使用摄像头', e);
    },
    // 摄像头在非正常终止时触发，如退出后台等情况
    handleStop(e) {
      console.log('摄像头在非正常终止', e);
    },
    // 相机初始化完成时触发，e.detail = {maxZoom}
    handleInitdone(e) {
      console.log('相机初始化完成', e);
    },
    // 开始录像时触发
    handleRecord() {
      const isStartRecord = this.isStartRecord;
      const ctx = uni.createCameraContext();
      let time = 0;
      let timer = null;
      clearInterval(timer);

      // 已经开始录像
      if (isStartRecord) {
        ctx.stopRecord({
          // 是否压缩视频
          compressed: false,
          success(res) {
            console.log('视频录制停止', res);
            clearInterval(timer);
            this.isStartRecord = !isStartRecord;
            const { size, tempVideoPath, tempThumbPath } = res;
          },
          fail(err) {
            clearInterval(timer);
            this.isStartRecord = !isStartRecord;
          },
        });
      } else {
        // 计时
        timer = setInterval(() => {
          time++;
          if (time < 10) {
            this.recordTime = '00:0' + time;
          } else {
            this.recordTime = '00:' + time;
          }
        }, 1000);

        ctx.startRecord({
          timeoutCallback(res) {
            console.log('视频录制超时', res);
            clearInterval(timer);
            this.isStartRecord = !isStartRecord;
            const { size, tempVideoPath, tempThumbPath } = res;
          },
          success(res) {
            console.log('视频录制开始成功', res);
          },
          fail(err) {
            console.log('视频录制开始失败', err);
            clearInterval(timer);
            this.isStartRecord = !isStartRecord;
          },
        });
      }
      this.isStartRecord = !isStartRecord;
    },
    // 切换摄像头朝向
    handleChangeDevicePosition() {
      if (this.devicePosition === 'back') {
        this.devicePosition = 'front';
      } else {
        this.devicePosition = 'back';
      }
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
view,
text {
  box-sizing: border-box;
  box-sizing: border-box;
}
.yh-record-video-wrapper {
  width: 100%;
  height: 100vh;
}
.yh-record-video {
  width: 100%;
  height: 100%;
  position: relative;
  .camera {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .time {
    width: 100%;
    color: #fff;
    text-align: center;
    padding-top: 40rpx;
    line-height: 80rpx;
    background-color: #f0f;
  }
  .toolbar-bottom {
    height: 170rpx;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #000;
    .start {
      position: absolute;
      width: 120rpx;
      height: 120rpx;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      bottom: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .change {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 40rpx;
      width: 60rpx;
      height: 60rpx;
    }
  }
}
</style>
