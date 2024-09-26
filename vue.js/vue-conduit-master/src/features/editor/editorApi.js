import axiosApi from '@/common/configs/axios';
import articleApi from '../article/articleApi';

const getArticleBySlug = async (slug) => {
  return articleApi.getArticleBySlug(slug);
};

const createArticle = async (article) => {
  const response = await axiosApi.post(`articles`, { article });
  return response.data.article;
};

const updateArticle = async (slug, article) => {
  const response = await axiosApi.put(`articles/${slug}`, { article });
  return response.data.article;
};

const editorApi = { getArticleBySlug, createArticle, updateArticle };

export default editorApi;
