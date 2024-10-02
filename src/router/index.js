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
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/Auth.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') // Retrieve token from localStorage

  if (!token && to.name !== 'auth') {
    // If token is not found and the route is not the auth page, redirect to '/auth'
    next({ name: 'auth' })
  } else {
    // Otherwise, proceed to the requested route
    next()
  }
})

export default router
