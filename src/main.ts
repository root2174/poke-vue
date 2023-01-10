import App from './App.vue';
import { createApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';

import './style.css';
import { router } from './routes';

createApp(App).use(VueQueryPlugin).use(router).mount('#app');
