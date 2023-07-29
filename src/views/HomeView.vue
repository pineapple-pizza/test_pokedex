<template>
  <div class="home">
    <Home/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from '../components/AllPokemons.vue';

@Component({
  components: {
    Home,
  },
})
export default class HomeView extends Vue {}
</script>
