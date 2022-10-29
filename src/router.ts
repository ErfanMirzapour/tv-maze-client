import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: Home,
      },
      {
         path: '/show/:showId',
         name: 'show',
         component: () => import('./pages/Show.vue'),
      },
      {
         path: '/search',
         name: 'search',
         component: () => import('./pages/Search.vue'),
      },
   ],
});

export default router;
