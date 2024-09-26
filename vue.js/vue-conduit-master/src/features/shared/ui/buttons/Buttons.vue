<template>
  <fragment>
    <fragment v-if="isOwner">
      <router-link
        class="btn btn-outline-secondary btn-sm"
        :to="{ name: 'Editor', path: 'editor', params: { slug: article.slug } }"
      >
        <i class="ion-edit"></i>
        &nbsp;Edit Article
      </router-link>
      <button class="btn btn-outline-danger btn-sm" @click="onDeleteArticle">
        <i class="ion-trash-a"></i>
        &nbsp;Delete Article
      </button>
    </fragment>

    <fragment v-else>
      <FollowButton :following="article.author.following" :username="article.author.username" />
      &nbsp;&nbsp;
      <FavoriteButton :article="article">
        <fragment>
          &nbsp; {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Post &nbsp;
          <span className="counter">({{ article.favoritesCount }})</span>
        </fragment>
      </FavoriteButton>
    </fragment>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex';
import FavoriteButton from './favorite-button/FavoriteButton.vue';
import FollowButton from './follow-button/FollowButton.vue';

export default {
  name: 'Buttons',
  components: { FavoriteButton, FollowButton },
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
    isOwner() {
      return this.user.username === this.article.author.username;
    }
  },
  methods: {
    onDeleteArticle() {
      this.$emit('deleteArticle', this.article.slug);
    }
  }
};
</script>

<style scoped>
.btn-outline-danger {
  margin-left: 0.5rem;
}
</style>
