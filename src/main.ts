import App from './App.vue';
import { createApp } from 'vue';

import './style.css';
import { router } from './routes';

createApp(App).use(router).mount('#app');
