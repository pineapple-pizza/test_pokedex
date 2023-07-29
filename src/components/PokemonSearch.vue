<template>
    <div>
      <h2>Search</h2>
      <input v-model="searchQuery" @input="searchPokemons" placeholder="Search Pokemon...">
    </div>
  </template>
  
  <script lang="ts">
  import { mapActions } from 'vuex';
  import { Pokemon } from "@/types";
  import { Vue } from "vue-property-decorator";
  
  export default Vue.extend({
    data() {
      return {
        searchQuery: '',
      };
    },
    watch: {
      searchQuery: {
        handler: "searchPokemons",
        immediate: true,
      },
    },
    methods: {
      ...mapActions(['fetchPokemons']),
      searchPokemons() {
        const filteredPokemons = this.$store.state.pokemons.filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.$store.commit('setFilteredPokemons', filteredPokemons);
      },
    },
  });
  </script>
  