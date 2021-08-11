import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { itemsRoutes } from './example';

const routes: Array<RouteRecordRaw> = [...itemsRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
