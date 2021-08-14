import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { itemsRoutes } from './example';

const appRoutes = [
  {
    path: '/',
    redirect: '/items',
  },
];

const routes: Array<RouteRecordRaw> = [...itemsRoutes, ...appRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
