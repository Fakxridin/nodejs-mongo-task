import router from '@/router';
import registerApi from '../registerApi';
import { REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS, RESET_ERROR } from './mutations';

const actions = {
  async register({ commit, dispatch }, registerUser) {
    commit(REGISTER_LOADING);
    try {
      await registerApi.register(registerUser);
      commit(REGISTER_SUCCESS);
      dispatch('auth/getCurrentUser', {}, { root: true });
      router.push('/');
    } catch (error) {
      commit(REGISTER_ERROR, error.errors);
    }
  },

  resetError({ commit }) {
    commit(RESET_ERROR);
  }
};

export default actions;
