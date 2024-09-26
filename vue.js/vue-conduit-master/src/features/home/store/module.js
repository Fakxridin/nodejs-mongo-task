import { IDLE } from '@/common/configs/apiStatus';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  articles: [],
  tags: [],
  articlesStatus: IDLE,
  tagsStatus: IDLE
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
