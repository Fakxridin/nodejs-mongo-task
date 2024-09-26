import router from '@/router';
import settingsApi from '../settingsApi';
import { UPDATE_USER_ERROR, UPDATE_USER_LOADING, UPDATE_USER_SUCCESS } from './mutations';

const actions = {
  async updateUser({ commit, dispatch }, user) {
    commit(UPDATE_USER_LOADING);
    try {
      const response = await settingsApi.updateUser(user);
      commit(UPDATE_USER_SUCCESS);
      dispatch('auth/updateUser', response, { root: true });
      router.push('/');
    } catch (error) {
      commit(UPDATE_USER_ERROR);
    }
  },

  logout({ dispatch }) {
    dispatch('auth/logout', {}, { root: true });
  }
};

export default actions;
