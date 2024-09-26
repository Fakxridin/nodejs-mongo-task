import axiosApi from '@/common/configs/axios';

const getYourFeed = async () => {
  const response = await axiosApi.get('articles/feed');
  return response.data.articles;
};

const getGlobalFeed = async () => {
  const response = await axiosApi.get('articles');
  return response.data.articles;
};

const getArticlesByTag = async (tag) => {
  const response = await axiosApi.get('articles', { params: { tag } });
  return response.data.articles;
};

const getTags = async () => {
  const response = await axiosApi.get('tags');
  return response.data.tags;
};

const homeApi = { getYourFeed, getGlobalFeed, getArticlesByTag, getTags };

export default homeApi;
