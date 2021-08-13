import { createApp } from 'vue';
import App from './app/App.vue';
import router from './app/app-routes';
import { key, store } from './app/app-state';

createApp(App).use(store, key).use(router).mount('#app');
