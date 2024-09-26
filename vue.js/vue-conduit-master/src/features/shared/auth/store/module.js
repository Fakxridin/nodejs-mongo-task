import { IDLE } from '@/common/configs/apiStatus';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  user: null,
  status: IDLE // idle - loading - success - ERROR
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
