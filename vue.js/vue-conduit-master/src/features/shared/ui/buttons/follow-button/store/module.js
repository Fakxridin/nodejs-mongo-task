import { ERROR, IDLE, LOADING, SUCCESS } from '@/common/configs/apiStatus';
import followButtonApi from '../followButtonApi';

const TOGGLE_FOLLOW_LOADING = 'TOGGLE_FOLLOW_LOADING';
const TOGGLE_FOLLOW_SUCCESS = 'TOGGLE_FOLLOW_SUCCESS';
const TOGGLE_FOLLOW_ERROR = 'TOGGLE_FOLLOW_ERROR';

const state = {
  status: IDLE
};

const getters = {
  apiStatus: (state) => state.status
};

const mutations = {
  [TOGGLE_FOLLOW_LOADING](state) {
    state.status = LOADING;
  },
  [TOGGLE_FOLLOW_SUCCESS](state) {
    state.status = SUCCESS;
  },
  [TOGGLE_FOLLOW_ERROR](state) {
    state.status = ERROR;
  }
};

const actions = {
  async toggleFollow({ commit, dispatch }, { following, username }) {
    commit(TOGGLE_FOLLOW_LOADING);
    try {
      const response = await followButtonApi.toggleFollow(following, username);
      dispatch('article/toggleFollow', response, { root: true });
      dispatch('profile/toggleFollow', response, { root: true });
      commit(TOGGLE_FOLLOW_SUCCESS);
    } catch (error) {
      commit(TOGGLE_FOLLOW_ERROR);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
