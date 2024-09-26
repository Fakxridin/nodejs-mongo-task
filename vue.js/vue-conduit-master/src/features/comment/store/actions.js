import commentApi from '../commentApi';
import {
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_LOADING,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_LOADING,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_LOADING,
  GET_COMMENTS_SUCCESS
} from './mutations';

const actions = {
  async getComments({ commit }, slug) {
    commit(GET_COMMENTS_LOADING);
    try {
      const comments = await commentApi.getComments(slug);
      commit(GET_COMMENTS_SUCCESS, comments);
    } catch (error) {
      commit(GET_COMMENTS_ERROR);
    }
  },

  async deleteComment({ commit }, { slug, id }) {
    commit(DELETE_COMMENT_LOADING);
    try {
      await commentApi.deleteComment(slug, id);
      commit(DELETE_COMMENT_SUCCESS, id);
    } catch (error) {
      commit(DELETE_COMMENT_ERROR);
    }
  },

  async createComment({ commit }, { slug, comment }) {
    commit(CREATE_COMMENT_LOADING);
    try {
      const response = await commentApi.createComment(slug, comment);
      commit(CREATE_COMMENT_SUCCESS, response);
    } catch (error) {
      commit(CREATE_COMMENT_ERROR, error.errors);
    }
  }
};

export default actions;
