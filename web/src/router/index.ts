import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory('/web/'),
  routes: [
    {
      path: '/',
      name: 'session',
      component: () => import('../views/sessions/index.vue')
    },
    {
      path: '/friend',
      name: 'friend',
      component: () => import('../views/friend/index.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('../views/Me.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
  ]
})

export default router
