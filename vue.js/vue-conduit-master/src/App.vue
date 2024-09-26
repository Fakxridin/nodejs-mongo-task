<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './features/layouts/header/Header.vue';
import Footer from './features/layouts/footer/Footer.vue';

export default {
  name: 'App',
  components: { Header, Footer }
};
</script>

<style>
.is-invalid {
  border: 1px solid red !important;
}
.invalid-message {
  color: red !important;
}
</style>
