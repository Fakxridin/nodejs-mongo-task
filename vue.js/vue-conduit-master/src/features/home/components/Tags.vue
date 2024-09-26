<template>
  <div class="tag-list">
    <div v-if="status === isLoading">Loading tags...</div>
    <a
      v-for="(tag, index) in tags"
      :key="index"
      class="tag-pill tag-default"
      @click="onSelectTag(tag)"
    >
      {{ tag }}
    </a>
  </div>
</template>

<script>
import { IDLE, LOADING } from '@/common/configs/apiStatus';

export default {
  name: 'Tags',
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    status: {
      type: String,
      default: () => IDLE
    }
  },
  data() {
    return {
      isLoading: LOADING
    };
  },
  methods: {
    onSelectTag(tag) {
      this.$emit('selectTag', tag);
    }
  }
};
</script>

<style scoped>
.tag-pill {
  cursor: pointer;
}
</style>
