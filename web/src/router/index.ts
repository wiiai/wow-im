import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
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
      component: () => import('../views/me/index.vue')
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: () => import('../views/meeting/index.vue')
    },
    {
      path: '/design',
      name: 'design',
      component: () => import('../views/design/index.vue')
    },
  ]
})

export default router
