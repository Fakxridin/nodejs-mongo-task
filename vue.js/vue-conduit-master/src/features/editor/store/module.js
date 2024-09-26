import { IDLE } from '@/common/configs/apiStatus';
import actions from './actions';
import mutations from './mutations';

const state = {
  article: null,
  errors: {},
  status: IDLE
};
const getters = {
  article: (state) => state.article,
  errorsForm: (state) => state.errors,
  apiStatus: (state) => state.status
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
