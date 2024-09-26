<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="user" @click="onSelectArticlesType('feed')">
        <a class="nav-link" :class="{ active: articlesType === 'feed' && !tag }">Your Feed</a>
      </li>

      <li class="nav-item" @click="onSelectArticlesType('global')">
        <a class="nav-link" :class="{ active: articlesType === 'global' && !tag }">Global Feed</a>
      </li>

      <li class="nav-item" v-if="tag">
        <a class="nav-link active">#{{ tag }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    articlesType: {
      type: String,
      default: () => 'feed'
    },
    tag: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    onSelectArticlesType(type) {
      this.$emit('selectArticlesType', type);
    }
  }
};
</script>

<style scoped>
.nav-item {
  cursor: pointer;
}
</style>
