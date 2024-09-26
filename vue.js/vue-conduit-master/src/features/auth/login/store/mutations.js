import { ERROR, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

const mutations = {
  [LOGIN_LOADING](state) {
    state.errors = {};
    state.status = LOADING;
  },
  [LOGIN_SUCCESS](state) {
    state.errors = {};
    state.status = SUCCESS;
  },
  [LOGIN_ERROR](state, payload) {
    state.errors = payload;
    state.status = ERROR;
  },
  [RESET_ERROR](state) {
    state.errors = {};
  }
};

export default mutations;
