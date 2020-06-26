import { GET_ACCESS_TOKEN } from './types';

const getters = {
  // 获取 key
  [GET_ACCESS_TOKEN](state) {
    return state.accessToken;
  },
};

export default getters;
