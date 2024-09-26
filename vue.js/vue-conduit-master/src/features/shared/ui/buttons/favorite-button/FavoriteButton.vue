<template>
  <button
    class="btn btn-sm"
    :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
    @click="onToggleFavorite()"
  >
    <i class="ion-heart"></i>&nbsp;
    <slot></slot>
  </button>
</template>

<script>
import { LOADING } from '@/common/configs/apiStatus';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FavoriteButton',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('favoriteButton', ['apiStatus'])
  },
  methods: {
    ...mapActions('favoriteButton', ['toggleFavorite']),

    onToggleFavorite() {
      if (this.apiStatus === LOADING) {
        return;
      }
      this.toggleFavorite({ favorited: this.article.favorited, slug: this.article.slug });
    }
  }
};
</script>
