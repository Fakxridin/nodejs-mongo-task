import { IDLE } from '@/common/configs/apiStatus';
import actions from './actions';
import mutations from './mutations';

const state = {
  errors: {},
  status: IDLE
};

const getters = {
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
