// src/store.ts
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'; // Import Axios here
import { Pokemon } from '@/types'; // Create this TypeScript type later

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [] as Pokemon[],
    filteredPokemons: [] as Pokemon[], // Add a new state property to store filtered Pokemons
  },
  mutations: {
    setPokemons(state, pokemons: Pokemon[]) {
        state.pokemons = pokemons;
        state.filteredPokemons = pokemons; // Initialize filteredPokemons with all Pokemons
      },
      setFilteredPokemons(state, pokemons: Pokemon[]) {
        state.filteredPokemons = pokemons; // Update the filtered Pokemons
      },  
      filterPokemons(state, selectedType: string) {
        if (!selectedType) {
          state.filteredPokemons = state.pokemons;
        } else {
          state.filteredPokemons = state.pokemons.filter(pokemon =>
            pokemon.types.includes(selectedType)
          );
        }
      },
  },
  actions: {
    async fetchPokemons({ commit }) {
      try {
        // Fetch data from the API using axios
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemons: Pokemon[] = response.data.results;
        commit('setPokemons', pokemons);
      } catch (error) {
        console.error('Error fetching Pokemons:', error);
      }
    },
    filterPokemons({ commit, state }, selectedType) {
        if (!selectedType) {
          // If no type is selected, return all Pokemons
          commit('setFilteredPokemons', state.pokemons);
        } else {
          // Filter Pokemons based on the selected type
          const filteredPokemons = state.pokemons.filter((pokemon) =>
            pokemon.types.includes(selectedType)
          );
          commit('setFilteredPokemons', filteredPokemons);
        }
      },
  },
  getters: {
    filteredPokemons: (state) => {
        return state.filteredPokemons;
      },
  },
});
