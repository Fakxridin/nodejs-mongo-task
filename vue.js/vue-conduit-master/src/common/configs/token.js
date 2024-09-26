import axiosApi from './axios';

export function setToken(token) {
  if (token) {
    axiosApi.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axiosApi.defaults.headers.common['Authorization'];
  }
}
