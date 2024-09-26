import axiosApi from '@/common/configs/axios';

const getProfile = async (username) => {
  const response = await axiosApi.get(`profiles/${username}`);
  return response.data.profile;
};

const getProfileArticles = async (articlesType, username) => {
  const response = await axiosApi.get(`articles?${articlesType}=${username}`);
  return response.data.articles;
};

const profileApi = { getProfile, getProfileArticles };

export default profileApi;
