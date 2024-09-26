<template>
  <div class="article-meta">
    <router-link
      :to="{ name: 'Profile', path: 'profile', params: { username: article.author.username } }"
    >
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{ name: 'Profile', path: 'profile', params: { username: article.author.username } }"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ article.createdAt | date }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
