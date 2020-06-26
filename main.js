import Vue from 'vue';
import App from './App';

import store from './store/index.js';

// 过滤器
import './common/utils/filter';

Vue.config.productionTip = false;

App.mpType = 'app';


const app = new Vue({
  store,
  ...App,
});
app.$mount();
