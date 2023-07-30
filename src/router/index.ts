import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PokemonDetails from '@/components/PokemonDetails.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomeView },
  { path: '/pokemon/:name', name: 'pokemon-details', component: PokemonDetails },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
