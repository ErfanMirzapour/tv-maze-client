import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomePage,
      },
      {
         path: '/show/:showId',
         name: 'show',
         component: () => import('../pages/Show.vue'),
      },
   ],
});

export default router;
