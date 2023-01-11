import { createRouter, createWebHashHistory } from 'vue-router';
import HomeVue from './pages/Home/Home.vue';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails.vue';

export const routes = [
  { path: '/', component: HomeVue },
  { path: '/pokemon/:id', component: PokemonDetails },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
