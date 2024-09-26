<template>
  <div class="profile-page" v-if="profile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div>
              <router-link
                v-if="isOwner"
                tag="button"
                class="btn btn-sm btn-outline-secondary action-btn"
                to="/settings"
              >
                <i class="ion-gear-a"></i>
                &nbsp; Edit profile settings
              </router-link>

              <FollowButton v-else :following="profile.following" :username="profile.username" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: articlesType === 'author' }"
                  @click="setArticlesType('author')"
                >
                  My Articles
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: articlesType === 'favorited' }"
                  @click="setArticlesType('favorited')"
                >
                  Favorited Articles
                </a>
              </li>
            </ul>
          </div>

          <Articles :status="articlesStatus" :articles="articles" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Articles from '../shared/ui/articles/Articles.vue';
import FollowButton from '../shared/ui/buttons/follow-button/FollowButton.vue';

export default {
  name: 'Profile',
  components: { Articles, FollowButton },
  data() {
    return {
      username: this.$route.params.username,
      articlesType: 'author'
    };
  },
  async created() {
    await this.getProfile(this.username);
  },
  computed: {
    ...mapGetters({ currentUser: 'auth/user' }),
    ...mapGetters({ profile: 'profile/user' }),
    ...mapGetters('profile', ['articles', 'articlesStatus']),
    isOwner() {
      return this.currentUser && this.currentUser.username === this.username;
    }
  },
  methods: {
    ...mapActions('profile', ['getProfile', 'getProfileArticles']),

    async setArticlesType(articlesType) {
      if (this.articlesType === articlesType) {
        return;
      }
      this.articlesType = articlesType;
      await this.getProfileArticles({ articlesType, username: this.username });
    }
  },
  watch: {
    '$route.params.username': {
      handler: async function (username) {
        this.username = username;
        this.articlesType = 'author';
        await this.getProfile(this.username);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped>
.nav-item {
  cursor: pointer;
}
</style>
