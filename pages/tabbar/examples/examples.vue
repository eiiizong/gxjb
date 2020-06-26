<template>
  <view class="examples">
    <div class="info">
      以下是该框架自带扩展组件示例
    </div>
    <div class="content">
      <div class="list">
        <template v-for="item in list">
          <div class="item" :key="item.id" @tap="handleClickItem(item.path)">
            <div class="left">
              {{ item.name }}
            </div>
            <div class="right"></div>
          </div>
        </template>
      </div>
    </div>
  </view>
</template>

<script>
import { navigateTo } from '../../../common/utils/uniApi';
export default {
  name: 'examples',
  components: {},
  data() {
    return {
      list: [
        {
          id: 'input',
          name: 'Input 输入框',
          path: 'input',
        },
        {
          id: 'button',
          name: 'Button 按钮',
          path: 'button',
        },
      ],
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
    handleClickItem(path) {
      navigateTo(`/pages/examples/${path}/${path}`);
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.examples {
  width: 100%;
  padding: 20rpx 30rpx;
  .info {
    padding: 30rpx;
    font-size: 28rpx;
    line-height: 80rpx;
    color: #999;
  }
  .item {
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    height: 90rpx;
    border-radius: 8rpx;
    padding: 0 20rpx;
    margin-bottom: 20rpx;
    .left {
      display: flex;
      color: #444;
    }
    .right {
      width: 32rpx;
      height: 32rpx;
      display: flex;
      color: #999;
      background-size: 100%;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVQ4T2NkQALp6ela////X8XIyBg2c+bMa8hyuNiM2AwAiRFrCIoBII0wVxBrCIYBpBqC1QBSDMFpALGG4DWAGEMIGkDIENobQChaaReIhGyGpWDqJyRibcbqAlI1g/MLpdkZAEAkgBE0jfXzAAAAAElFTkSuQmCC)
        no-repeat top left;
    }
  }
}
</style>
