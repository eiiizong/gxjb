import { CHANGE_ACCESS_TOKEN } from './types';

const mutations = {
  // 改变 access-token
  [CHANGE_ACCESS_TOKEN](state, access_token) {
    console.log('正在改变全局状态的 access_token,传入的值: ', access_token);
    state.accessToken = access_token;
  },
};

export default mutations;
