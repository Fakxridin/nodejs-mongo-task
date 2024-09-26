<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article">
          <Buttons :article="article" @deleteArticle="deleteArticle(slug)" />
        </ArticleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{ article.body }}</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article">
          <Buttons :article="article" @deleteArticle="deleteArticle(slug)" />
        </ArticleMeta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <Comment :slug="slug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Comment from '../comment/Comment.vue';
import ArticleMeta from '../shared/ui/article-meta/ArticleMeta.vue';
import Buttons from '../shared/ui/buttons/Buttons.vue';

export default {
  name: 'Article',
  components: { ArticleMeta, Buttons, Comment },
  data() {
    return {
      slug: this.$route.params.slug
    };
  },
  async created() {
    await this.getArticle(this.slug);
  },
  computed: {
    ...mapGetters('article', ['article', 'apiStatus'])
  },
  methods: {
    ...mapActions('article', ['getArticle', 'deleteArticle'])
  }
};
</script>
