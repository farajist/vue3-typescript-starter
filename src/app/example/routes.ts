import { RouteRecordRaw } from 'vue-router';
import ItemList from './item-list/ItemList.vue';
import Items from './Items.vue';
// import ItemDetail from './item-detail/ItemDetail.vue';

const itemRoutes: Array<RouteRecordRaw> = [
  {
    path: '/items',
    component: Items,
    children: [
      {
        path: '',
        name: 'item-list',
        component: ItemList,
      },
      {
        path: '',
        redirect: { name: 'item-list' },
      },
    ],
  },
];
export default itemRoutes;
