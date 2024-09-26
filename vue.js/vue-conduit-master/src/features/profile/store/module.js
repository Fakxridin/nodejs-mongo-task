import { IDLE } from '@/common/configs/apiStatus';
import actions from './actions';
import mutations from './mutations';

const state = {
  user: null,
  articles: [],
  userStatus: IDLE,
  articlesStatus: IDLE
};
const getters = {
  user: (state) => state.user,
  articles: (state) => state.articles,
  userStatus: (state) => state.userStatus,
  articlesStatus: (state) => state.articlesStatus
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
