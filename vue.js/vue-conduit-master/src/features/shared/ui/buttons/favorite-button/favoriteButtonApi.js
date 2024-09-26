import axiosApi from '@/common/configs/axios';

const toggleFavorite = async (favorited, slug) => {
  let response;

  if (favorited) {
    response = await axiosApi.delete(`articles/${slug}/favorite`);
  } else {
    response = await axiosApi.post(`articles/${slug}/favorite`, {});
  }
  return response.data.article;
};

const favoriteButtonApi = { toggleFavorite };

export default favoriteButtonApi;
