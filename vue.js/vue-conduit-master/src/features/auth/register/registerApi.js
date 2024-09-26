import axiosApi from '@/common/configs/axios';
import { setToken } from '@/common/configs/token';

const register = async (user) => {
  const response = await axiosApi.post('users', { user });
  localStorage.setItem('api_token', response.data.user.token);
  setToken(response.data.user.token);
  return response.data.user;
};

const registerApi = { register };

export default registerApi;
