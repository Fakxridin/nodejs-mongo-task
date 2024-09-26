import axiosApi from '@/common/configs/axios';

const getComments = async (slug) => {
  const response = await axiosApi.get(`articles/${slug}/comments`);
  return response.data.comments;
};

const createComment = async (slug, comment) => {
  const response = await axiosApi.post(`articles/${slug}/comments`, {
    comment
  });
  return response.data.comment;
};

const deleteComment = async (slug, id) => {
  const response = await axiosApi.delete(`articles/${slug}/comments/${id}`);
  return response.data;
};

const commentApi = { getComments, createComment, deleteComment };

export default commentApi;
