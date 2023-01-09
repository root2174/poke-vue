import App from './App.vue';
import { createApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';

import './style.css';

createApp(App).use(VueQueryPlugin).mount('#app');
