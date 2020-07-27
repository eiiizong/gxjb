import { GET_ACCESS_TOKEN, GET_USER_INFO, GET_ADMIN_LIST } from './types';

const getters = {
  // 获取 accessToken
  [GET_ACCESS_TOKEN](state) {
    return state.accessToken;
  },
  // 获取 用户信息
  [GET_USER_INFO](state) {
    return state.userInfo;
  },
  // 获取 巡检人员列表
  [GET_ADMIN_LIST](state) {
    return state.adminList;
  },
};

export default getters;
