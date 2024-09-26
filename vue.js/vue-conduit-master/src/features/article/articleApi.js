import axiosApi from '@/common/configs/axios';

const getArticleBySlug = async (slug) => {
  const response = await axiosApi.get(`articles/${slug}`);
  return response.data.article;
};

const deleteArticle = async (slug) => {
  const response = await axiosApi.delete(`articles/${slug}`);
  return response.data;
};

const articleApi = { getArticleBySlug, deleteArticle };

export default articleApi;
