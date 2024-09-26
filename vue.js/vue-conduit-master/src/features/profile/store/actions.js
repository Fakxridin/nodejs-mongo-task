import profileApi from '../profileApi';
import {
  GET_PROFILE_ARTICLES_ERROR,
  GET_PROFILE_ARTICLES_LOADING,
  GET_PROFILE_ARTICLES_SUCCESS,
  GET_PROFILE_ERROR,
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  TOGGLE_FAVORITE,
  TOGGLE_FOLLOW
} from './mutations';

const actions = {
  async getProfile({ commit, dispatch }, username) {
    commit(GET_PROFILE_LOADING);
    try {
      const user = await profileApi.getProfile(username);
      commit(GET_PROFILE_SUCCESS, user);
      dispatch('getProfileArticles', { articlesType: 'author', username });
    } catch (error) {
      commit(GET_PROFILE_ERROR);
    }
  },

  async getProfileArticles({ commit }, { articlesType, username }) {
    commit(GET_PROFILE_ARTICLES_LOADING);
    try {
      const response = await profileApi.getProfileArticles(articlesType, username);
      commit(GET_PROFILE_ARTICLES_SUCCESS, response);
    } catch (error) {
      commit(GET_PROFILE_ARTICLES_ERROR);
    }
  },

  toggleFavorite({ commit }, article) {
    commit(TOGGLE_FAVORITE, article);
  },

  toggleFollow({ commit }, profile) {
    commit(TOGGLE_FOLLOW, profile);
  }
};

export default actions;
