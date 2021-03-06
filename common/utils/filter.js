// 自定义 vue 过滤函数
import Vue from 'vue';

// 格式化11位手机号码 将 1322222222 转化为 13****2222
Vue.filter('FormatPhoneNumbere', function (value) {
  // 将 value 转化为 字符串
  value = value + '';
  // 如果为空 则返回空字符串
  if (!value) {
    return '';
  }
  value = value.substr(0, 3) + '****' + value.substr(7, 11);
  return value;
});
// 格式化地址 将 ['四川省', '成都市', '锦江区'] 转化为 四川省成都市锦江区
Vue.filter('FormatAddress', function (value) {
  if (!value || value.length < 1) {
    return '';
  }
  return value.join('');
});

// 格式化时间 将 newData 转化为 2020年07月03日 13:45:56
Vue.filter('FormatDate', function (date) {
  // 如果为空 则返回空字符串
  if (!date) {
    return '';
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  return `${year}年${month}月${day}日 ${hours}:${minute}:${second}`;
});

// 格式化时间 将 2020-07-03 13:45:56 转化为 2020年07月03日 13:45:56
Vue.filter('FormatTime', function (time) {
  // 如果为空 则返回空字符串
  if (!time) {
    return '';
  }
  return `${time.substring(0,4)}年${time.substring(5,7)}月${time.substring(8,10)}日 ${time.substring(11)}`;
});
export default Vue;
