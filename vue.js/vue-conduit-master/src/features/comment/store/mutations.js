import { ERROR, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const GET_COMMENTS_LOADING = 'GET_COMMENTS_LOADING';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

export const CREATE_COMMENT_LOADING = 'CREATE_COMMENT_LOADING';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';

export const DELETE_COMMENT_LOADING = 'DELETE_COMMENT_LOADING';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

const mutations = {
  [GET_COMMENTS_LOADING](state) {
    state.comments = [];
    state.status = LOADING;
  },
  [GET_COMMENTS_SUCCESS](state, comments) {
    state.comments = comments;
    state.status = SUCCESS;
  },
  [GET_COMMENTS_ERROR](state) {
    state.comments = [];
    state.status = ERROR;
  },

  [DELETE_COMMENT_LOADING](state) {
    state.status = LOADING;
  },
  [DELETE_COMMENT_SUCCESS](state, id) {
    state.comments = [...state.comments].filter((comment) => comment.id !== id);
    state.status = SUCCESS;
  },
  [DELETE_COMMENT_ERROR](state) {
    state.status = ERROR;
  },

  [CREATE_COMMENT_LOADING](state) {
    state.errors = {};
    state.status = LOADING;
  },
  [CREATE_COMMENT_SUCCESS](state, comment) {
    state.comments.unshift(comment);
    state.errors = {};
    state.status = SUCCESS;
  },
  [CREATE_COMMENT_ERROR](state, payload) {
    state.errors = payload;
    state.status = ERROR;
  }
};

export default mutations;
