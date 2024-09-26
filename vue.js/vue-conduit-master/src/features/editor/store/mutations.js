import { ERROR, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const GET_ARTICLE_LOADING = 'GET_ARTICLE_LOADING';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_ERROR = 'GET_ARTICLE_ERROR';

export const CREATE_ARTICLE_LOADING = 'CREATE_ARTICLE_LOADING';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_ERROR = 'CREATE_ARTICLE_ERROR';

export const UPDATE_ARTICLE_LOADING = 'UPDATE_ARTICLE_LOADING';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_ERROR = 'UPDATE_ARTICLE_ERROR';

export const RESET_ERROR = 'RESET_ERROR';

const mutations = {
  [GET_ARTICLE_LOADING](state) {
    state.article = null;
    state.errors = {};
    state.status = LOADING;
  },
  [GET_ARTICLE_SUCCESS](state, article) {
    state.article = article;
    state.errors = {};
    state.status = SUCCESS;
  },
  [GET_ARTICLE_ERROR](state) {
    state.article = null;
    state.status = ERROR;
  },

  [CREATE_ARTICLE_LOADING](state) {
    state.errors = {};
    state.status = LOADING;
  },
  [CREATE_ARTICLE_SUCCESS](state) {
    state.errors = {};
    state.status = SUCCESS;
  },
  [CREATE_ARTICLE_ERROR](state, payload) {
    state.errors = payload;
    state.status = ERROR;
  },

  [UPDATE_ARTICLE_LOADING](state) {
    state.errors = {};
    state.status = LOADING;
  },
  [UPDATE_ARTICLE_SUCCESS](state) {
    state.errors = {};
    state.status = SUCCESS;
  },
  [UPDATE_ARTICLE_ERROR](state, payload) {
    state.errors = payload;
    state.status = ERROR;
  },

  [RESET_ERROR](state) {
    state.errors = {};
  }
};

export default mutations;
