<template>
  <button class="btn btn-sm btn-outline-secondary action-btn" @click="onToggleFollow()">
    <i class="ion-plus-round"></i>
    &nbsp; {{ following ? 'Unfollow' : 'Follow' }} {{ username }}
  </button>
</template>

<script>
import { LOADING } from '@/common/configs/apiStatus';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FollowButton',
  props: {
    following: {
      type: Boolean,
      default: () => false
    },
    username: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...mapGetters('followButton', ['apiStatus'])
  },
  methods: {
    ...mapActions('followButton', ['toggleFollow']),

    onToggleFollow() {
      if (this.apiStatus === LOADING) {
        return;
      }
      this.toggleFollow({ following: this.following, username: this.username });
    }
  }
};
</script>
