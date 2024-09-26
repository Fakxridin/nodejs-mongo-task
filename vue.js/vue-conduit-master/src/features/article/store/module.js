import { IDLE } from '@/common/configs/apiStatus';
import actions from './actions';
import mutations from './mutations';

const state = {
  article: null,
  status: IDLE
};

const getters = {
  article: (state) => state.article,
  apiStatus: (state) => state.status
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
