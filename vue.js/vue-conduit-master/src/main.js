import Vue from 'vue';
import Fragment from 'vue-fragment';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import date from './common/filters/date';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Fragment.Plugin);
Vue.use(Vuelidate);

Vue.filter('date', date);

store.dispatch('auth/getCurrentUser').then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app');
});
