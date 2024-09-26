import router from '@/router';
import editorApi from '../editorApi';
import {
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_LOADING,
  CREATE_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
  GET_ARTICLE_LOADING,
  GET_ARTICLE_SUCCESS,
  RESET_ERROR,
  UPDATE_ARTICLE_ERROR,
  UPDATE_ARTICLE_LOADING,
  UPDATE_ARTICLE_SUCCESS
} from './mutations';

const actions = {
  async getArticle({ commit, rootGetters }, slug) {
    commit(GET_ARTICLE_LOADING);
    try {
      const article = await editorApi.getArticleBySlug(slug);
      if (article.author.username === rootGetters['auth/user'].username) {
        commit(GET_ARTICLE_SUCCESS, article);
        return;
      }
      router.push('/');
    } catch (error) {
      commit(GET_ARTICLE_ERROR);
      router.push('/');
    }
  },

  async createArticle({ commit }, newArticle) {
    commit(CREATE_ARTICLE_LOADING);
    try {
      const article = await editorApi.createArticle(newArticle);
      commit(CREATE_ARTICLE_SUCCESS);
      router.push(`/article/${article.slug}`);
    } catch (error) {
      commit(CREATE_ARTICLE_ERROR, error.errors);
    }
  },

  async updateArticle({ commit }, { slug, updatedArticle }) {
    commit(UPDATE_ARTICLE_LOADING);
    try {
      const article = await editorApi.updateArticle(slug, updatedArticle);
      commit(UPDATE_ARTICLE_SUCCESS);
      router.push(`/article/${article.slug}`);
    } catch (error) {
      commit(UPDATE_ARTICLE_ERROR, error.errors);
    }
  },

  resetError({ commit }) {
    commit(RESET_ERROR);
  }
};

export default actions;
