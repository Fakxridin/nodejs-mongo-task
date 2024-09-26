import axiosApi from '@/common/configs/axios';

const toggleFollow = async (following, username) => {
  let response;

  if (following) {
    response = await axiosApi.delete(`profiles/${username}/follow`);
  } else {
    response = await axiosApi.post(`profiles/${username}/follow`, {});
  }
  return response.data.profile;
};

const followButtonApi = { toggleFollow };

export default followButtonApi;
