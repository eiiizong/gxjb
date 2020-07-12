import { GET_ACCESS_TOKEN,GET_USER_INFO } from './types';

const getters = {
  // 获取 accessToken
  [GET_ACCESS_TOKEN](state) {
    return state.accessToken;
  },
  // 获取 用户信息
  [GET_USER_INFO](state) {
    return state.userInfo;
  },
};

export default getters;
