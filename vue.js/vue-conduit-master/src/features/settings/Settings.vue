<template>
  <div class="settings-page" v-if="user">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="$v.form.image.$model"
                  :class="{ 'is-invalid': $v.form.email.$error }"
                />
                <small
                  class="invalid-message"
                  v-if="!$v.form.email.required && $v.form.email.$dirty"
                  >Email is required</small
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="$v.form.username.$model"
                  :class="{ 'is-invalid': $v.form.username.$error }"
                />
                <small
                  class="invalid-message"
                  v-if="!$v.form.username.required && $v.form.username.$dirty"
                  >Username is required</small
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="{8}"
                  placeholder="Short bio about you"
                  v-model="$v.form.bio.$model"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="$v.form.email.$model"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="$v.form.password.$model"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
          <hr />

          <button class="btn btn-outline-danger" @click="logout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOADING } from '@/common/configs/apiStatus';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Settings',
  data() {
    return {
      form: {
        email: '',
        username: '',
        bio: '',
        image: '',
        password: ''
      }
    };
  },
  validations: {
    form: {
      email: { required },
      username: { required },
      bio: '',
      image: '',
      password: ''
    }
  },
  created() {
    if (this.user) {
      const { email, username, bio, image } = this.user;
      this.form = { email, username, bio, image };
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('settings', ['apiStatus'])
  },
  methods: {
    ...mapActions('settings', ['updateUser', 'logout']),

    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.apiStatus === LOADING) {
        return;
      }
      await this.updateUser({
        email: this.form.email,
        username: this.form.username,
        bio: this.form.bio,
        password: this.form.password,
        image: this.form.image
      });
    }
  },
  watch: {
    user(newValue) {
      this.form = {
        email: newValue?.email,
        username: newValue?.username,
        bio: newValue?.bio,
        image: newValue?.image
      };
    }
  }
};
</script>
