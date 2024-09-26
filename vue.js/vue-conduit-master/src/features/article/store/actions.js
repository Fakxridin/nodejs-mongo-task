import router from '@/router';
import articleApi from '../articleApi';
import {
  DELETE_ARTICLE_ERROR,
  DELETE_ARTICLE_LOADING,
  DELETE_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
  GET_ARTICLE_LOADING,
  GET_ARTICLE_SUCCESS,
  TOGGLE_FAVORITE,
  TOGGLE_FOLLOW
} from './mutations';

const actions = {
  async getArticle({ commit }, slug) {
    commit(GET_ARTICLE_LOADING);
    try {
      const article = await articleApi.getArticleBySlug(slug);
      commit(GET_ARTICLE_SUCCESS, article);
    } catch (error) {
      commit(GET_ARTICLE_ERROR);
      router.push('/');
    }
  },

  async deleteArticle({ commit }, slug) {
    commit(DELETE_ARTICLE_LOADING);
    try {
      await articleApi.deleteArticle(slug);
      commit(DELETE_ARTICLE_SUCCESS);
      router.push('/');
    } catch (error) {
      commit(DELETE_ARTICLE_ERROR);
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
