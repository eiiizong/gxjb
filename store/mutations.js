import { CHANGE_ACCESS_TOKEN } from './types';

const mutations = {
  // 改变 access-token
  [CHANGE_ACCESS_TOKEN](state, token) {
    state.accessToken = token;
  },
};

export default mutations;
