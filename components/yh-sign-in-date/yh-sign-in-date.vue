<template>
  <view class="yh-sign-in-date-wrapper">
    <view class="yh-sign-in-date">
      <text class="icon icon-decoration left"></text>
      <text class="icon icon-decoration right"></text>
      <view class="toolbar"> {{ selectYM.year }}年{{ selectYM.month }}月 </view>
      <view class="week">
        <text>日</text>
        <text>一</text>
        <text>二</text>
        <text>三</text>
        <text>四</text>
        <text>五</text>
        <text>六</text>
      </view>
      <view
        class="days"
        @touchmove="handleTouchmove"
        @touchstart="handleTouchstart"
      >
        <view class="row">
          <template v-for="(item, index) in renderData.arrRow1">
            <view class="day" :key="index">
              <text :class="[item === today.day && isSameYM ? 'today' : '']">{{
                item ? item : ''
              }}</text>
            </view>
          </template>
        </view>
        <view class="row">
          <template v-for="(item, index) in renderData.arrRow2">
            <view class="day" :key="index">
              <text :class="[item === today.day && isSameYM ? 'today' : '']">{{
                item ? item : ''
              }}</text>
            </view>
          </template>
        </view>
        <view class="row">
          <template v-for="(item, index) in renderData.arrRow3">
            <view class="day" :key="index">
              <text :class="[item === today.day && isSameYM ? 'today' : '']">{{
                item ? item : ''
              }}</text>
            </view>
          </template>
        </view>
        <view class="row">
          <template v-for="(item, index) in renderData.arrRow4">
            <view class="day" :key="index">
              <text :class="[item === today.day && isSameYM ? 'today' : '']">{{
                item ? item : ''
              }}</text>
            </view>
          </template>
        </view>
        <view class="row">
          <template v-for="(item, index) in renderData.arrRow5">
            <view class="day" :key="index">
              <text class="signed" :class="[item === today.day && isSameYM ? 'today' : '']">{{
                item ? item : ''
              }}</text>
            </view>
          </template>
        </view>
        <view class="row">
          <template v-for="(item, index) in renderData.arrRow6">
            <view class="day" :key="index">
              <text :class="[item === today.day && isSameYM ? 'today' : '']">{{
                item ? item : ''
              }}</text>
            </view>
          </template>
        </view>
        <div class="bg">{{ selectYM.month }}</div>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * Input 输入框
 */
export default {
  name: 'yhSignInDate',
  props: {},
  data() {
    return {
      // 今日信息
      today: {
        year: '',
        month: '',
        day: '',
        week: '',
      },
      // 每月第一天是周几
      firstWeek: 0,
      // 这个月共有天数
      monthAllday: 0,
      // 已签到日期
      signed: ['2020年05月12日', '2020年05月20日', '2020年05月22日'],
      // 渲染数据
      renderData: null,
      pageXStart: 0,
      pageYStart: 0,
      pageXEnd: 0,
      pageYEnd: 0,
      timer: null,
      // 选择年月
      selectYM: {},
    };
  },
  created() {
    this.getToday();
    this.getRenderData();
  },
  mounted() {
    // console.log(this.$scopedSlots.prefix)
  },
  methods: {
    // 获取今天信息
    getToday() {
      const nowTime = new Date();
      const formatWeek = ['日', '一', '二', '三', '四', '五', '六'];
      let month = nowTime.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      let year = nowTime.getFullYear();
      let day = nowTime.getDate();
      let week = nowTime.getDay();
      this.today = Object.assign(
        {},
        { year, month, day, week: formatWeek[week] }
      );
      this.selectYM = Object.assign({}, { year, month });
      console.log('today', this.today);

      this.getMonthFirstDay(year, month);
      this.getMonthDays(year, month);
    },
    // 获取某个月共有天数
    getMonthDays(year, month) {
      year = parseInt(year);
      month = parseInt(month);
      const time = new Date(year, month, 0);
      console.log(`${year}年${month}月共有${time.getDate()}天`);
      this.monthAllday = time.getDate();
    },
    // 获取每月第一天是周几
    getMonthFirstDay(year, month) {
      year = parseInt(year);
      month = parseInt(month);
      const time = new Date(`${month}/1/${year}`);
      this.firstWeek = time.getDay();
      console.log(`${year}年${month}月第一天是周${this.firstWeek}`);
    },
    // 渲染数据
    getRenderData() {
      const monthAllday = this.monthAllday;
      const firstWeek = this.firstWeek;
      let arr = {
        arrRow1: [],
        arrRow2: [],
        arrRow3: [],
        arrRow4: [],
        arrRow5: [],
        arrRow6: [],
      };
      let num = 0;
      let obj = null;

      for (let i = 0; i < 42; i++) {
        obj = '';
        if (i >= firstWeek && num < monthAllday) {
          obj = i - firstWeek + 1;
          num++;
        }
        const arrRowIndex = Math.floor(i / 7) + 1;
        arr['arrRow' + arrRowIndex].push(obj);
      }

      this.renderData = Object.assign({}, arr);
    },
    //
    handleTouchmove(event) {
      const pageXStart = this.pageXStart;
      const pageYStart = this.pageYStart;
      let { month, year } = this.selectYM;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const pageX = parseInt(event.touches[0].pageX);
        const pageY = parseInt(event.touches[0].pageY);
        let tx = pageX - pageXStart;
        let ty = pageY - pageYStart;
        if (Math.abs(tx) > Math.abs(ty)) {
          if (tx < -20) {
            // console.log('左滑');
            if (parseInt(month) >= 12) {
              month = 1;
              year++;
            } else {
              month++;
            }
          }
          if (tx > 20) {
            // console.log('右滑');
            if (parseInt(month) <= 1) {
              month = 12;
              year--;
            } else {
              month--;
            }
          }
        } else {
          if (ty < -20) {
            // console.log('上滑');
            year++;
          }
          if (ty > 20) {
            // console.log('下滑');
            year--;
          }
        }
        if (parseInt(month) < 10) {
          month = '0' + parseInt(month);
        }
        this.selectYM = Object.assign({}, { month, year });
        this.getMonthFirstDay(year, month);
        this.getMonthDays(year, month);
        this.getRenderData();
      }, 100);
    },
    handleTouchstart(event) {
      const pageX = parseInt(event.touches[0].pageX);
      const pageY = parseInt(event.touches[0].pageY);
      this.pageXStart = pageX;
      this.pageYStart = pageY;
    },
  },
  computed: {
    isSameYM() {
      let result = false;
      const today = this.today;
      const selectYM = this.selectYM;
      if (today.year && selectYM.year) {
        if (today.year === selectYM.year && today.month === selectYM.month) {
          result = true;
        }
      }
      return result;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
view,
text,
icon,
swiper {
  box-sizing: border-box;
}
.yh-sign-in-date-wrapper {
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  background-color: #fff;
  border-radius: 30rpx;
  .yh-sign-in-date {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    .icon-decoration {
      width: 66rpx;
      height: 54rpx;
      position: absolute;
      top: -28rpx;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAABsCAMAAACcjep6AAAC9FBMVEUAAAC5mVu0k1T9/PnAoGHBoWP////+/fvAn2D////////////An2D///+9nV66mlz////AoGLAoGHAn2HAoGLHqnP///+hgUL////An2DAoGL///////7AoGL////An2GhgUL///////+ggED///////7AoGH////An2H////////AoGH///////++n2L////+/vyhgUL///////+hgUHAoGH//v7AoGH////An2DAoGHAoGL//v6/n1+hgUL///7////y7N/AoGL///////+9nmP////An2D////BoWP///7AoGL+/fzAoGL+/fyjhEb////BoWLAoGL////AoGL+/vzAoGLAoGLAoGKhgUL//v7///+hgUKhgULAn2H////AoGH7+fX//v2ffz/////Vv5WhgULBoWPAoGL////CpWyhgUKigUP///+gf0Dl17z////AoGL///+hgUL////BoWOffz6hgUKgfz////+hgULczbH////o4NHg0LLu5NLZxJ6/nl/Ptofq4tLHrn7XwZjBpnDGrHrCp3L///7s49LKr3r////////28url2L3Hq3X59e7Quoz38unYxJyhgUKhgULw6Nm8pXjFqG+6o3XSu47x697ax6Lbx6Tt5tv69vGniU7i07fJrXfIrHfOtYTq49fs5dj////SsnXAoGKhgULQr2/07NzexpnPrWy/nl/VtXe+nVzTs3affz/RsHH+/fz7+PO+nl7SsXO9nFv49Oz8+/j07uKcejj7+fXv59f59u7l2L7LsX7OrnD9/PrQt4jGp2zCo2Xx6drt4s7OtIOtjU6rikr28ebu5NHEpWjBoWO0k1Xr4MyoiEqmhkfi07XbyaXZxZ/TvJDWuoTo3snIrHXMrG/28ejp3MPdy6nizqbXwprVt328mlijg0Xeza3Krnnq49bt4Mfm1LHk0q3gyZ7cwpO2llm8pnrZzrXZvojAq4LWuICzmmeqj1e8m1nUxanRwqLKuZfHtI7Grn8bL6HuAAAAqHRSTlMABgoEGyr9D9nIQRfz4hUQSC9IYDf+9N7Utv748e3f0qmMVPbCu7Che2JbVk0xJB8T6+bPy72vq6qmk3VpT0EoG/767b+ZlY2JiH1uWUIsIPr36efg3t3LxcC1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)
        no-repeat top left;
      background-size: 100%;
      &.left {
        left: 146rpx;
      }
      &.right {
        right: 146rpx;
      }
    }
  }
  .toolbar {
    height: 116rpx;
    font-size: 36rpx;
    line-height: 116rpx;
    color: #333;
    font-weight: 500;
    text-align: center;
  }
  .week {
    height: 64rpx;
    background-color: #faf2e1;
    font-size: 30rpx;
    line-height: 64rpx;
    color: #1f1c18;
    display: flex;
    align-items: center;
    text {
      width: 14.2857142%;
      text-align: center;
    }
  }
  .days {
    padding: 10rpx 0;
    position: relative;
    .bg {
      font-size: 350rpx;
      position: absolute;
      display: flex;
      top: 50%;
      left: 50%;
      color: #f5f5f5;
      font-weight: 500;

      z-index: 0;
      transform: translate(-50%, -50%);
    }
    .row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: 100rpx;
      position: relative;
      z-index: 1;
      .day {
        width: 14.2857142%;
        text-align: center;
        display: flex;
        height: 100%;
        font-size: 30rpx;
        text {
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          margin: auto;
          background-size: 60rpx 60rpx;
          background-repeat: no-repeat;
          background-position: center center;
          color: #333;
          &.signed {
            color: #6f2639;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAAABvJjlvJjlvJjlvJjlvJjlvJjlvJjlvJjnbrFfYp03ZqVLRnjzWpEndr1zluXHjt2zfsWDhs2XnvHXToEDpv3zUokTrwYDzzZbuxYjtxIXswoPovnnwyI3itWn0zpjyy5PxypDvx4rHkkTfsoLFkDzkuYzit4eITRIxAAAACHRSTlMA38O7QPuPcNScRaYAAAGQSURBVGje7dvdboJAEIZhUUTUqqCA/ZO2IHr/d1gCSbPTcZs0mf2cuPsOeuCBT+bAs3Fyv1LStP8kSoWL+i+dpqQAo+HJUGzAlw+hLgYcj06AlcDPQimF46GFa3gxOvx37Bb+SSd8/RTqaoVnpMQVnFBnwnIDsxTCX0LZ4Yg1l4bn3OjhlCcL30whfBLqb/jMaqTg5swy4BM0CjeoIXADTQP8As1r+BWa1/AbNK/hIzSv4RKaCR9L3FOq2BgTh9+heQ0foHkO71BD4R00Ah+Ao2NjTBzOcEPgDJrncJ0NL8AbgWtoGuA9NBOugbNXsTEqDue4MeEcmufwFjUU3kL7Beewl5aNEXF4iRsCL6EFGBGH17gx4TU0Ci9xj5KN7T0kvIIWYFsPCW+gUXiFe5RsjIrDFWYo3LKqjVBVyzJgXlsJ1aYsb+GINReFrYdkvGiEC5Fp/3mz1xZCKYRnpMQVnFDHegLbScHd7RNYhfCTUBaYHnZTuBCZjh9281N21xvHoxPgADuDNfztKMAA+G59A6iWkW3wwG5EAAAAAElFTkSuQmCC);
          }
          &.today {
            color: #6f2639;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAIVBMVEUAAABvJjlvJjlvJjlvJjlvJjlvJjlvJjlvJjlvJjlvJjlywNzNAAAACnRSTlMA3yDDu0Q8j3AEGSXKtAAAALpJREFUWMPt2SEOAjEQheG3CUFULRa5jj0CCkHCCZoQFIfgClyAE5QlmJ6SZGjRbUc0Q97vPznmDVS5KL0wxMJG7KMU7OIArAUvKGgWfAUccQt+e3+uxXfvL4KlSiz1xKujdKrBt685IFeDcx3xsEltS/EzixEu5krxr9AVL1NqV4IfU2pOV9WUIyYmJiYmJiYmJiYmJiYmJv433D6yWB2WNGOa1QFRM5paHYrbx3HLDwGj2OizS4E1fQCBxBiKF3XoswAAAABJRU5ErkJggg==);
          }
        }
      }
    }
  }
}
</style>
