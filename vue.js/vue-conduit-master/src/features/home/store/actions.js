import homeApi from '../homeApi';
import {
  GET_ARTICLES_FEED_ERROR,
  GET_ARTICLES_FEED_LOADING,
  GET_ARTICLES_FEED_SUCCESS,
  GET_ARTICLES_GLOBAL_ERROR,
  GET_ARTICLES_GLOBAL_LOADING,
  GET_ARTICLES_GLOBAL_SUCCESS,
  GET_ARTICLES_TAGS_ERROR,
  GET_ARTICLES_TAGS_LOADING,
  GET_ARTICLES_TAGS_SUCCESS,
  GET_TAGS_ERROR,
  GET_TAGS_LOADING,
  GET_TAGS_SUCCESS,
  TOGGLE_FAVORITE
} from './mutations';

const actions = {
  async getFeedArticles({ commit }) {
    commit(GET_ARTICLES_FEED_LOADING);
    try {
      const articles = await homeApi.getYourFeed();
      commit(GET_ARTICLES_FEED_SUCCESS, articles);
    } catch (error) {
      commit(GET_ARTICLES_FEED_ERROR);
    }
  },

  async getGlobalArticles({ commit }) {
    commit(GET_ARTICLES_GLOBAL_LOADING);
    try {
      const articles = await homeApi.getGlobalFeed();
      commit(GET_ARTICLES_GLOBAL_SUCCESS, articles);
    } catch (error) {
      commit(GET_ARTICLES_GLOBAL_ERROR);
    }
  },

  async getAriclesByTags({ commit }, tag) {
    commit(GET_ARTICLES_TAGS_LOADING);
    try {
      const articles = await homeApi.getArticlesByTag(tag);
      commit(GET_ARTICLES_TAGS_SUCCESS, articles);
    } catch (error) {
      commit(GET_ARTICLES_TAGS_ERROR);
    }
  },

  async getTags({ commit }) {
    commit(GET_TAGS_LOADING);
    try {
      const articles = await homeApi.getTags();
      commit(GET_TAGS_SUCCESS, articles);
    } catch (error) {
      commit(GET_TAGS_ERROR);
    }
  },

  toggleFavorite({ commit }, article) {
    commit(TOGGLE_FAVORITE, article);
  }
};

export default actions;
