import { RouteRecordRaw } from 'vue-router';
import ItemList from './item-list/ItemList.vue';
import ItemDetail from './item-detail/ItemDetail.vue';

const itemRoutes: Array<RouteRecordRaw> = [
  {
    path: '/items',
    component: ItemList,
    children: [
      {
        path: '',
        redirect: { name: 'items' },
      },
      {
        path: ':id',
        component: ItemDetail,
      },
    ],
  },
];
export default itemRoutes;
