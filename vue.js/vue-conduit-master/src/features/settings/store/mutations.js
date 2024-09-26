import { ERROR, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const UPDATE_USER_LOADING = 'UPDATE_USER_LOADING';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

const mutations = {
  [UPDATE_USER_LOADING](state) {
    state.status = LOADING;
  },
  [UPDATE_USER_SUCCESS](state) {
    state.status = SUCCESS;
  },
  [UPDATE_USER_ERROR](state) {
    state.status = ERROR;
  }
};

export default mutations;
