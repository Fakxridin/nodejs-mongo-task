import router from '@/router';
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://api.realworld.io/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosApi.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        router.push('/auth/login');
        break;
      case 500:
        break;
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosApi;
