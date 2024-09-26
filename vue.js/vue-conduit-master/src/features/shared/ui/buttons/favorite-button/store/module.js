import { ERROR, IDLE, LOADING, SUCCESS } from '@/common/configs/apiStatus';
import favoriteButtonApi from '../favoriteButtonApi';

const TOGGLE_FAVORITE_LOADING = 'TOGGLE_FAVORITE_LOADING';
const TOGGLE_FAVORITE_SUCCESS = 'TOGGLE_FAVORITE_SUCCESS';
const TOGGLE_FAVORITE_ERROR = 'TOGGLE_FAVORITE_ERROR';

const state = {
  status: IDLE
};

const getters = {
  apiStatus: (state) => state.status
};

const mutations = {
  [TOGGLE_FAVORITE_LOADING](state) {
    state.status = LOADING;
  },
  [TOGGLE_FAVORITE_SUCCESS](state) {
    state.status = SUCCESS;
  },
  [TOGGLE_FAVORITE_ERROR](state) {
    state.status = ERROR;
  }
};

const actions = {
  async toggleFavorite({ commit, dispatch }, { favorited, slug }) {
    commit(TOGGLE_FAVORITE_LOADING);
    try {
      const response = await favoriteButtonApi.toggleFavorite(favorited, slug);
      dispatch('article/toggleFavorite', response, { root: true });
      dispatch('home/toggleFavorite', response, { root: true });
      dispatch('profile/toggleFavorite', response, { root: true });
      commit(TOGGLE_FAVORITE_SUCCESS);
    } catch (error) {
      commit(TOGGLE_FAVORITE_ERROR);
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
