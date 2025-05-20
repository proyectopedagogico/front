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
      path: '/historias',
      name: 'stories',
      component: () => import('../views/StoriesView.vue'),
    },
    {
      path: '/servicios',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/experiencia',
      name: 'experience',
      component: () => import('../views/ExperienceView.vue'),
    },
    {
      path: '/sobre-mi',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
  ],
})

export default router
