<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ErrorsForm :errors="errorsForm" />

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="$v.form.title.$model"
                  :class="{ 'is-invalid': $v.form.title.$error }"
                />
                <small
                  class="invalid-message"
                  v-if="!$v.form.title.required && $v.form.title.$dirty"
                  >Title is required</small
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="$v.form.description.$model"
                  :class="{ 'is-invalid': $v.form.description.$error }"
                />
                <small
                  class="invalid-message"
                  v-if="!$v.form.description.required && $v.form.description.$dirty"
                  >Description is required</small
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="{8}"
                  placeholder="Write your article (in markdown)"
                  v-model="$v.form.body.$model"
                  :class="{ 'is-invalid': $v.form.body.$error }"
                ></textarea>
                <small class="invalid-message" v-if="!$v.form.body.required && $v.form.body.$dirty"
                  >Body is required</small
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keyup.enter="addTag(tag)"
                />
                <div class="tag-list">
                  <span
                    v-for="(tag, index) in form.tagList"
                    :key="index"
                    class="tag-pill tag-default"
                  >
                    <i class="ion-close-round" @click="deleteTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="submit">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOADING } from '@/common/configs/apiStatus';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import ErrorsForm from '../shared/ui/errors-form/ErrorsForm.vue';

export default {
  name: 'Editor',
  components: { ErrorsForm },
  data() {
    return {
      slug: this.$route.params.slug,
      form: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      tag: ''
    };
  },
  validations: {
    form: {
      title: { required },
      description: { required },
      body: { required }
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('editor', ['errorsForm', 'apiStatus', 'article'])
  },
  async created() {
    if (this.slug) {
      await this.getArticle(this.slug);
      const { title, body, description, tagList } = this.article;
      this.form = { title, body, description, tagList };
    }
  },
  methods: {
    ...mapActions('editor', ['getArticle', 'createArticle', 'updateArticle', 'resetError']),

    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.apiStatus === LOADING) {
        return;
      }

      if (this.slug) {
        this.updateArticle({ slug: this.slug, updatedArticle: this.form });
        return;
      }
      this.createArticle(this.form);
    },

    addTag(tag) {
      this.tag = '';
      if (this.form.tagList.includes(tag)) {
        return;
      }
      this.form.tagList.push(tag);
    },

    deleteTag(tag) {
      this.form.tagList = [...this.form.tagList].filter((x) => x !== tag);
    }
  },
  watch: {
    $route() {
      this.resetError();
      this.form = {
        title: '',
        description: '',
        body: '',
        tagList: []
      };
    }
  }
};
</script>
