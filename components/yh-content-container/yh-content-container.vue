<template>
  <view class="yh-content-container-wrapper">
    <scroll-view scroll-y class="yh-content-container">
      <slot />
    </scroll-view>
  </view>
</template>

<script>

/**
 * yhContentContainer
 * 内容包装器
 * @description 内容包装器
 * @tutorial https://ext.dcloud.net.cn/plugin?id=52
 * @property {String} title 标题文字
 */
export default {
  name: 'yhContentContainer',
  components: {
  },
  data() {
    return {
      
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style scoped lang="scss">
.yh-content-container-wrapper {
  width: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
}
.yh-content-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

</style>
