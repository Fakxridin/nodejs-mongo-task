<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link to="/">
        <div class="navbar-brand">conduit</div>
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="/"> Home </router-link>
        </li>

        <fragment v-if="!user">
          <li class="nav-item">
            <router-link tag="a" class="nav-link" to="/auth/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" to="/auth/register">Sign up</router-link>
          </li>
        </fragment>

        <fragment v-else>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" to="/editor"
              ><i class="ion-compose"></i>&nbsp;New Article</router-link
            >
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" to="/settings"
              ><i class="ion-gear-a"></i>&nbsp;Settings</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              tag="a"
              class="nav-link"
              :to="{ name: 'Profile', path: 'profile', params: { username: user.username } }"
              >{{ user.username }}</router-link
            >
          </li>
        </fragment>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters('auth', ['user'])
  }
};
</script>
