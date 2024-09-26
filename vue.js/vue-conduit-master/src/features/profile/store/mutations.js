import { ERROR, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

export const GET_PROFILE_ARTICLES_LOADING = 'GET_PROFILE_ARTICLES_LOADING';
export const GET_PROFILE_ARTICLES_SUCCESS = 'GET_PROFILE_ARTICLES_SUCCESS';
export const GET_PROFILE_ARTICLES_ERROR = 'GET_PROFILE_ARTICLES_ERROR';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';

const mutations = {
  [GET_PROFILE_LOADING](state) {
    state.user = null;
    state.userStatus = LOADING;
    state.articlesStatus = LOADING;
  },
  [GET_PROFILE_SUCCESS](state, user) {
    state.user = user;
    state.userStatus = SUCCESS;
    state.articlesStatus = SUCCESS;
  },
  [GET_PROFILE_ERROR](state) {
    state.user = null;
    state.articles = [];
    state.userStatus = ERROR;
    state.articlesStatus = ERROR;
  },

  [GET_PROFILE_ARTICLES_LOADING](state) {
    state.articles = [];
    state.articlesStatus = LOADING;
  },
  [GET_PROFILE_ARTICLES_SUCCESS](state, articles) {
    state.articles = articles;
    state.articlesStatus = SUCCESS;
  },
  [GET_PROFILE_ARTICLES_ERROR](state) {
    state.articles = [];
    state.articlesStatus = ERROR;
  },

  [TOGGLE_FAVORITE](state, payload) {
    state.articles = state.articles.map((article) => {
      const { slug, favorited, favoritesCount } = payload;
      return article.slug === slug ? { ...article, favorited, favoritesCount } : article;
    });
  },

  [TOGGLE_FOLLOW](state, payload) {
    state.user = payload;
  }
};

export default mutations;
