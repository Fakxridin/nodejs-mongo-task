<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <Feed
            :user="user"
            :articlesType="articlesType"
            :tag="tag"
            @selectArticlesType="selectArticlesType"
          />

          <Articles :status="articlesStatus" :articles="articles" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <Tags :tags="tags" :status="tagsStatus" @selectTag="selectTag" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Articles from '../shared/ui/articles/Articles.vue';
import Feed from './components/Feed.vue';
import Tags from './components/Tags.vue';

export default {
  name: 'Home',
  components: { Articles, Feed, Tags },
  data() {
    return {
      articlesType: 'global',
      tag: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('home', ['articles', 'tags', 'articlesStatus', 'tagsStatus'])
  },
  async created() {
    await Promise.all([this.getTags(), this.getGlobalArticles()]);
  },
  methods: {
    ...mapActions('home', ['getFeedArticles', 'getGlobalArticles', 'getAriclesByTags', 'getTags']),

    async selectArticlesType(articlesType) {
      if (this.articlesType === articlesType) {
        return;
      }
      this.articlesType = articlesType;
      this.tag = '';
      switch (this.articlesType) {
        case 'feed':
          await this.getFeedArticles();
          break;
        case 'global':
          await this.getGlobalArticles();
          break;
        case 'tag':
          await this.getAriclesByTags();
          break;
        default:
          await this.getGlobalArticles();
      }
    },

    async selectTag(tag) {
      this.tag = tag;
      this.articlesType = '';
      await this.getAriclesByTags(tag);
    }
  }
};
</script>
