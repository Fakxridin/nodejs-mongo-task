import { ERROR, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

const mutations = {
  [REGISTER_LOADING](state) {
    state.errors = {};
    state.status = LOADING;
  },
  [REGISTER_SUCCESS](state) {
    state.errors = {};
    state.status = SUCCESS;
  },
  [REGISTER_ERROR](state, payload) {
    state.errors = payload;
    state.status = ERROR;
  },
  [RESET_ERROR](state) {
    state.errors = {};
  }
};

export default mutations;
