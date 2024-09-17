import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Author',
      component: () => import('../views/Author.vue')
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('../views/Books.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/Category.vue')
    }
  ]
})

export default router
