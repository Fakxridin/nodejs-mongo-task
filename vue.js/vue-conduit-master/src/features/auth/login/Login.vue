<template>
  <fragment>
    <h1 class="text-xs-center">Sign in</h1>
    <p class="text-xs-center">
      <router-link tag="a" to="/auth/register"> Need an account? </router-link>
    </p>

    <ErrorsForm :errors="errorsForm" />

    <form @submit.prevent="submit">
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="Email"
          v-model="$v.email.$model"
          :class="{ 'is-invalid': $v.email.$error }"
        />
        <small class="invalid-message" v-if="!$v.email.required && $v.email.$dirty"
          >Email is required</small
        >
      </fieldset>
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="password"
          placeholder="Password"
          v-model="$v.password.$model"
          :class="{ 'is-invalid': $v.password.$error }"
        />
        <small class="invalid-message" v-if="!$v.password.required && $v.password.$dirty"
          >Password is required</small
        >
      </fieldset>
      <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Sign in</button>
    </form>
  </fragment>
</template>

<script>
import { LOADING } from '@/common/configs/apiStatus';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import ErrorsForm from '../../shared/ui/errors-form/ErrorsForm.vue';

export default {
  name: 'Login',
  components: { ErrorsForm },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  validations: {
    email: { required },
    password: { required }
  },
  computed: {
    ...mapGetters('login', ['errorsForm', 'apiStatus'])
  },
  methods: {
    ...mapActions('login', ['login', 'resetError']),

    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.apiStatus === LOADING) {
        return;
      }
      await this.login({ email: this.email, password: this.password });
    }
  },
  watch: {
    $route() {
      this.resetError();
    }
  }
};
</script>
