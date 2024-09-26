import router from '@/router';
import loginApi from '../loginApi';
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, RESET_ERROR } from './mutations';

const actions = {
  async login({ commit, dispatch }, loginUser) {
    commit(LOGIN_LOADING);
    try {
      await loginApi.login(loginUser);
      commit(LOGIN_SUCCESS);
      dispatch('auth/getCurrentUser', {}, { root: true });
      router.push('/');
    } catch (error) {
      commit(LOGIN_ERROR, error.errors);
    }
  },

  resetError({ commit }) {
    commit(RESET_ERROR);
  }
};

export default actions;
