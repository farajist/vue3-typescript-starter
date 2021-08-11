import { createApp } from 'vue';
import App from './app/App.vue';
import router from './app/app-routes';
import store from './app/app-state';

createApp(App).use(store).use(router).mount('#app');
