import router from '@/router';
import authApi from '../authApi';
import {
  GET_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  LOG_OUT,
  UPDATE_USER_SUCCESS
} from './mutations';

const actions = {
  async getCurrentUser({ commit }) {
    commit(GET_USER_LOADING);
    try {
      const user = await authApi.getCurrentUser();
      commit(GET_USER_SUCCESS, user);
    } catch (error) {
      commit(GET_USER_ERROR);
      router.push('/auth/login');
    }
  },

  updateUser({ commit }, user) {
    commit(UPDATE_USER_SUCCESS, user);
  },

  logout({ commit }) {
    localStorage.removeItem('api_token');
    commit(LOG_OUT);
    router.push('/');
  }
};

export default actions;
