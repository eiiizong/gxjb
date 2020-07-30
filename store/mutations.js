import { CHANGE_ACCESS_TOKEN, CHANGE_USER_INFO,CHANGE_ADMIN_LIST } from './types';

const mutations = {
  // 改变 access-token
  [CHANGE_ACCESS_TOKEN](state, access_token) {
    // console.log('正在改变全局状态的 access_token,传入的值: ', access_token);
    state.accessToken = access_token;
  },
  // 改变 用户信息
  [CHANGE_USER_INFO](state, userInfo) {
    // console.log('正在改变全局状态的 userInfo,传入的值: ', userInfo);
    state.userInfo = {
      ...state.userInfo,
      ...userInfo,
    };
  },
  // 改变 巡检人员列表
  [CHANGE_ADMIN_LIST](state, list) {
    // console.log('正在改变全局状态的 adminList,传入的值: ', list);
    state.adminList = [].concat(list);
  },
};

export default mutations;
