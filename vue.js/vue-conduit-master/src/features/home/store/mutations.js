import { ERROR, LOADING, SUCCESS } from '@/common/configs/apiStatus';

export const GET_ARTICLES_FEED_LOADING = 'GET_ARTICLES_FEED_LOADING';
export const GET_ARTICLES_FEED_SUCCESS = 'GET_ARTICLES_FEED_SUCCESS';
export const GET_ARTICLES_FEED_ERROR = 'GET_ARTICLES_FEED_ERROR';

export const GET_ARTICLES_GLOBAL_LOADING = 'GET_ARTICLES_GLOBAL_LOADING';
export const GET_ARTICLES_GLOBAL_SUCCESS = 'GET_ARTICLES_GLOBAL_SUCCESS';
export const GET_ARTICLES_GLOBAL_ERROR = 'GET_ARTICLES_GLOBAL_ERROR';

export const GET_ARTICLES_TAGS_LOADING = 'GET_ARTICLES_TAGS_LOADING';
export const GET_ARTICLES_TAGS_SUCCESS = 'GET_ARTICLES_TAGS_SUCCESS';
export const GET_ARTICLES_TAGS_ERROR = 'GET_ARTICLES_TAGS_ERROR';

export const GET_TAGS_LOADING = 'GET_TAGS_LOADING';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_ERROR = 'GET_TAGS_ERROR';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

const mutations = {
  [GET_ARTICLES_FEED_LOADING](state) {
    state.articles = [];
    state.articlesStatus = LOADING;
  },
  [GET_ARTICLES_FEED_SUCCESS](state, articles) {
    state.articles = articles;
    state.articlesStatus = SUCCESS;
  },
  [GET_ARTICLES_FEED_ERROR](state) {
    state.articles = [];
    state.articlesStatus = ERROR;
  },

  [GET_ARTICLES_GLOBAL_LOADING](state) {
    state.articles = [];
    state.articlesStatus = LOADING;
  },
  [GET_ARTICLES_GLOBAL_SUCCESS](state, articles) {
    state.articles = articles;
    state.articlesStatus = SUCCESS;
  },
  [GET_ARTICLES_GLOBAL_ERROR](state) {
    state.articles = [];
    state.articlesStatus = ERROR;
  },

  [GET_ARTICLES_TAGS_LOADING](state) {
    state.articles = [];
    state.articlesStatus = LOADING;
  },
  [GET_ARTICLES_TAGS_SUCCESS](state, articles) {
    state.articles = articles;
    state.articlesStatus = SUCCESS;
  },
  [GET_ARTICLES_TAGS_ERROR](state) {
    state.articles = [];
    state.articlesStatus = ERROR;
  },

  [GET_TAGS_LOADING](state) {
    state.tags = [];
    state.tagsStatus = LOADING;
  },
  [GET_TAGS_SUCCESS](state, tags) {
    state.tags = tags;
    state.tagsStatus = SUCCESS;
  },
  [GET_TAGS_ERROR](state) {
    state.tags = [];
    state.tagsStatus = ERROR;
  },

  [TOGGLE_FAVORITE](state, payload) {
    state.articles = state.articles.map((article) => {
      const { slug, favorited, favoritesCount } = payload;
      return article.slug === slug ? { ...article, favorited, favoritesCount } : article;
    });
  }
};

export default mutations;
