import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory('/mobile/'),
  routes: [
    {
      path: '/',
      name: 'session',
      component: () => import('../views/Session.vue')
    },
    {
      path: '/friend',
      name: 'friend',
      component: () => import('../views/Friend.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('../views/Me.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import("../views/chat/index.vue")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
  ]
})

export default router
