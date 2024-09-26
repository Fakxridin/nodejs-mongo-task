import { ERROR, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const GET_ARTICLE_LOADING = 'GET_ARTICLE_LOADING';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_ERROR = 'GET_ARTICLE_ERROR';

export const DELETE_ARTICLE_LOADING = 'DELETE_ARTICLE_LOADING';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_ERROR = 'DELETE_ARTICLE_ERROR';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';

const mutations = {
  [GET_ARTICLE_LOADING](state) {
    state.article = null;
    state.status = LOADING;
  },
  [GET_ARTICLE_SUCCESS](state, article) {
    state.article = article;
    state.status = SUCCESS;
  },
  [GET_ARTICLE_ERROR](state) {
    state.article = null;
    state.status = ERROR;
  },

  [DELETE_ARTICLE_LOADING](state) {
    state.status = LOADING;
  },
  [DELETE_ARTICLE_SUCCESS](state) {
    state.article = null;
    state.status = SUCCESS;
  },
  [DELETE_ARTICLE_ERROR](state) {
    state.status = ERROR;
  },

  [TOGGLE_FAVORITE](state, payload) {
    state.article = payload;
  },
  [TOGGLE_FOLLOW](state, payload) {
    state.article.author = payload;
  }
};

export default mutations;
