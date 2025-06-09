import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/cliente',
      name: 'cliente',
      component: () => import('../views/ClienteView.vue'),
    },
    {
      path: '/comprar',
      name: 'comprar',
      component: () => import('../views/ComprarView.vue'),
    },
    {
      path: '/vender',
      name: 'vender',
      component: () => import('../views/VenderView.vue'),
    },
    {
      path: '/movimiento',
      name: 'movimiento',
      component: () => import('../views/ListaMovimientos.vue'),
    },
  ],
})

export default router
