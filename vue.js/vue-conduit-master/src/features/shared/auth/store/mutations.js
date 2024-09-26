import { ERROR, IDLE, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const GET_USER_LOADING = 'GET_USER_LOADING';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const UPDATE_USER_LOADING = 'UPDATE_USER_LOADING';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const LOG_OUT = 'LOG_OUT';

const mutations = {
  [GET_USER_LOADING](state) {
    state.status = LOADING;
  },
  [GET_USER_SUCCESS](state, user) {
    state.user = user;
    state.status = SUCCESS;
  },
  [GET_USER_ERROR](state) {
    state.user = null;
    state.status = ERROR;
  },

  [UPDATE_USER_SUCCESS](state, user) {
    state.user = user;
  },

  [LOG_OUT](state) {
    state.user = null;
    state.status = IDLE;
  }
};

export default mutations;
