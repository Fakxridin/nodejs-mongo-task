import axiosApi from '@/common/configs/axios';

const updateUser = async (user) => {
  const response = await axiosApi.put('user', { user });
  return response.data.user;
};

const settingsApi = { updateUser };

export default settingsApi;
