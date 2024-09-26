<template>
  <fragment>
    <ErrorsForm :errors="errorsForm" />

    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="{3}"
          v-model="$v.comment.$model"
          :class="{ 'is-invalid': $v.comment.$error }"
        ></textarea>
        <small class="invalid-message" v-if="!$v.comment.required && $v.comment.$dirty"
          >Comment is required</small
        >
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" type="button" @click="submit">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <router-link
          class="comment-author"
          :to="{ name: 'Profile', path: 'profile', params: { username: comment.author.username } }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
          {{ comment.author.username }}
        </router-link>
        <span class="date-posted">{{ comment.createdAt | date('dd/MM/yyyy HH:mm:ss') }}</span>
        <span class="mod-options" v-if="comment.author.username === user.username">
          <i class="ion-trash-a" @click="deleteComment({ slug, id: comment.id })"></i>
        </span>
      </div>
    </div>
  </fragment>
</template>

<script>
import { LOADING } from '@/common/configs/apiStatus';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import ErrorsForm from '../shared/ui/errors-form/ErrorsForm.vue';

export default {
  name: 'Comment',
  components: { ErrorsForm },
  props: {
    slug: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      comment: ''
    };
  },
  validations: {
    comment: { required }
  },
  async created() {
    await this.getComments(this.slug);
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('comment', ['comments', 'errorsForm', 'apiStatus'])
  },
  methods: {
    ...mapActions('comment', ['getComments', 'deleteComment', 'createComment']),

    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.apiStatus === LOADING) {
        return;
      }
      await this.createComment({ slug: this.slug, comment: { body: this.comment } });
      this.comment = '';
      this.$v.$reset();
    }
  }
};
</script>
