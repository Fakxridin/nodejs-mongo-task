import axiosApi from '@/common/configs/axios';
import { setToken } from '@/common/configs/token';

const getCurrentUser = async () => {
  const token = localStorage.getItem('api_token');
  if (token) {
    setToken(token);
    const response = await axiosApi.get('user');
    setUser(response.data.user);
    return response.data.user;
  }
};

const setUser = (user) => {
  if (user && !user.image) {
    user.image = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
  }
};

const authApi = { getCurrentUser };

export default authApi;
