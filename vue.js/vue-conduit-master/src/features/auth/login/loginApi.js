import axiosApi from '@/common/configs/axios';
import { setToken } from '@/common/configs/token';

const login = async (user) => {
  const response = await axiosApi.post('users/login', { user });
  localStorage.setItem('api_token', response.data.user.token);
  setToken(response.data.user.token);
  return response.data.user;
};

const loginApi = { login };

export default loginApi;
