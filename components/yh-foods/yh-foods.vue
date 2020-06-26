<template>
  <view class="yh-foods-wrapper" v-if="categoryList">
    <view class="yh-foods">
      <view class="menu-wrapper">
        <scroll-view
          class="scroll-view menu-scroll-view"
          scroll-with-animation
          :scroll-into-view="menuScrollIntoView"
          scroll-y
        >
          <template v-for="(item,index) in categoryList">
            <view
              class="menu-item"
              :id="item.id"
              :class="item.checked ? 'active' : ''"
              :key="item.id"
              @click.stop="handleMenuItem"
            >
              <text
                class="icon icon-ordering-hot"
                v-if="item.id === 'hot'"
              ></text>
              <text
                class="icon icon-ordering-recommend"
                v-if="item.id === 'recommend'"
              ></text>
              <text class="text">{{ item.name }}</text>
              <text class="badge" v-if="item.num > 0 && index>1">{{ item.num }}</text>
            </view>
          </template>
        </scroll-view>
      </view>
      <view class="good-wrapper">
        <scroll-view
          class="scroll-view good-scroll-view"
          scroll-with-animation
          :scroll-into-view="goodScrollIntoView"
          @scroll="handleGoodScroll"
          scroll-y
        >
          <template v-for="item in categoryList">
            <view class="good-item" :id="item.id" :key="item.id">
              <view class="good-item-title">{{ item.name }}</view>
              <view class="good-item-content">
                <template v-for="(childItem, childIndex) in item.goodsList">
                  <yh-goods-card
                    :key="childItem.id"
                    :last="childIndex === item.goodsList.length - 1"
                    :cardData="childItem"
                    @sub="handleSub"
                    @add="handleAdd"
                  ></yh-goods-card>
                </template>
              </view>
            </view>
          </template>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * Input 输入框
 * @description input输入框组件
 * @property {Number} maxlength  最大输入长度，
 */

import yhGoodsCard from '@/components/yh-goods-card/yh-goods-card.vue';
export default {
  name: 'yhFood',
  props: {
    categoryList: {
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  components: {
    yhGoodsCard,
  },
  data() {
    return {
      goodScrollIntoView: '',
      menuScrollIntoView: '',
      isClickMenu: false,
      scrollRange: [],
      timer: null,
      watchTime: 0,
    };
  },
  created() {},
  mounted() {
    // 初始化滚动 考虑 此时是否去掉滚动效果
    this.categoryList.map(item => {
      if(item.checked) {
        this.goodScrollIntoView = item.id
      }
    })
  },
  methods: {
    getScrollRange() {
      const data = this.categoryList;
      let arr = [];
      let num = 0;
      const space = 20;
      data.map(item => {
        arr.push(num);
        var itemNum = 0;
        item.goodsList.map(goodItem => {
          itemNum += 90;
        });
        itemNum += 30 - 10 - space;
        num += itemNum;
      });
      this.scrollRange = arr;
    },
    handleMenuItem(e) {
      const id = e.currentTarget.id;
      this.goodScrollIntoView = id;
      this.isClickMenu = true;
      setTimeout(() => {
        this.isClickMenu = false;
      }, 500);
      this.$emit('menuItem', id);
    },
    handleSub(categoryId, id,is_multiple_spec,data) {
      this.$emit('sub', categoryId, id,is_multiple_spec,data);
    },
    handleAdd(categoryId, id, is_multiple_spec,data) {
      this.$emit('add', categoryId, id, is_multiple_spec,data);
    },
    handleGoodScroll(e) {
      if (this.isClickMenu) {
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const scrollTop = e.detail.scrollTop;
        const categoryList = this.categoryList;
        const scrollRange = this.scrollRange;
        let id = '';
        scrollRange.map((item, index) => {
          if (scrollTop > item) {
            id = categoryList[index].id;
            this.menuScrollIntoView = id;
            this.$emit('goodScroll', id);
          }
        });
      }, 500);
    },
  },
  computed: {},
  watch: {
    categoryList(newVal) {
      if (newVal.length > 0 && this.watchTime < 1) {
        this.getScrollRange();
        ++this.watchTime;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/scss/variable';
view,
text,
icon,
scroll-view {
  box-sizing: border-box;
}
.yh-foods-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.yh-foods {
  height: 100%;
  display: flex;
  width: 702rpx;
  margin: auto;
  background-image: linear-gradient(0deg, #faf6f0 0%, #ffffff 100%);
  border: 1px solid #f4ca94;
  border-bottom: none;
  border-top-left-radius: 12rpx;
  border-top-right-radius: 12rpx;
  overflow: hidden;
}
.menu-wrapper {
  width: $foods-menu-width;
  height: 100%;
  display: flex;
  border-top-left-radius: 12rpx;
  overflow: hidden;
}
.scroll-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.good-scroll-view {
  padding-bottom: 0rpx;
}
.menu-item {
  height: $foods-menu-height;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: $foods-menu-color;
  font-size: $foods-menu-font-size;
  background-image: linear-gradient(#f5f6f7, #f5f6f7);
  &.active {
    background-color: transparent;
    color: $foods-menu-active-color;
    font-weight: 700;
    font-size: $foods-menu-font-size;
    background-image: none;
  }
  .icon {
    width: 32rpx;
    height: 32rpx;
    background-repeat: no-repeat;
    background-position: top left;
    background-size: 100%;
    margin-right: 4rpx;
  }
  .icon-ordering-hot {
    background-image: url(data:image/png;base64,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);
  }
  .icon-ordering-recommend {
    background-image: url(data:image/png;base64,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);
  }
  .badge {
    position: absolute;
    top: 4rpx;
    right: 1px;
    min-width: 32rpx;
    height: 32rpx;
    padding: 0 8rpx;
    color: #fff;
    font-weight: 400;
    font-size: 24rpx;
    line-height: 32rpx;
    white-space: nowrap;
    text-align: center;
    background: #bc3c40;
    border-radius: 30px;
  }
}

.good-wrapper {
  flex: 1;
  height: 100%;
  overflow: hidden;
  padding-left: 20rpx;
}

.good-item {
  width: 100%;
  &:last-child {
    padding-bottom: 20rpx;
  }
}
.good-item-title {
  width: 100%;
  font-size: 28rpx;
  line-height: 60rpx;
}
.good-item-content {
  width: 100%;
  padding-right: 30rpx;
}
</style>
