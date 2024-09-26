import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { createGuard, createNonGuard } from './guards';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: { hasAuth: true },
    component: () => import('../features/auth/Auth.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../features/auth/login/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../features/auth/register/Register.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../features/home/Home.vue')
  },
  {
    path: '/article/:slug',
    name: 'Article',
    meta: { requireAuth: true },
    component: () => import('../features/article/Article.vue')
  },
  {
    path: '/editor/:slug?',
    name: 'Editor',
    meta: { requireAuth: true },
    component: () => import('../features/editor/Editor.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: { requireAuth: true },
    component: () => import('../features/settings/Settings.vue')
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    meta: { requireAuth: true },
    component: () => import('../features/profile/Profile.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../features/shared/ui/not-found/NotFound.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
});

router.beforeEach(createGuard(store));
router.beforeEach(createNonGuard(store));

export default router;
