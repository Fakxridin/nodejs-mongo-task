<template>
  <fragment>
    <div class="article-preview" v-if="status === 'loading'">Loading articles...</div>
    <div v-if="status === 'success'">
      <div class="article-preview" v-if="articles.length === 0">No articles are here...yet</div>

      <div class="article-preview" v-else v-for="(article, index) in articles" :key="index">
        <ArticleMeta :article="article">
          <FavoriteButton class="pull-xs-right" :article="article">
            {{ article.favoritesCount }}
          </FavoriteButton>
        </ArticleMeta>
        <router-link :to="{ name: 'Article', path: 'article', params: { slug: article.slug } }">
          <div class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li
                v-for="(tag, index) in article.tagList"
                :key="index"
                class="tag-default tag-pill tag-outline"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </router-link>
      </div>
    </div>
  </fragment>
</template>

<script>
import { IDLE } from '@/common/configs/apiStatus';
import ArticleMeta from '../article-meta/ArticleMeta.vue';
import FavoriteButton from '../buttons/favorite-button/FavoriteButton.vue';

export default {
  name: 'Articles',
  components: { ArticleMeta, FavoriteButton },
  props: {
    articles: {
      type: Array,
      default: () => []
    },
    status: {
      type: String,
      default: () => IDLE
    }
  }
};
</script>
