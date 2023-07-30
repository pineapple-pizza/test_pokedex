
import Vue from 'vue';
import Vuex, { MutationTree, ActionTree, GetterTree } from 'vuex';
import axios from 'axios';
import { Pokemon } from '@/types';

import { mapPokemonApiResponseToPokemon } from "@/pokemonUtils";

Vue.use(Vuex);

/**
 * Define the root state interface, representing structure of the state in the store
 */
interface RootState {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  selectedType: string | null;
}

/**
 * Initialize the root state object with the structure
 */
const state: RootState = {
  pokemons: [],
  filteredPokemons: [],
  selectedType: null,
};

/**
 * Define the mutations, responsible for updating the state in response to actions
 */
const mutations: MutationTree<RootState> = {
  /**
   * Mutation to set the fetched Pokemon data in the state
   */
  setPokemons(state, pokemons: Pokemon[]) {
    state.pokemons = pokemons;
    state.filteredPokemons = pokemons;
  },
  /**
   * Mutation to set the filtered Pokemon data in the state
   */
  setFilteredPokemons(state, pokemons: Pokemon[]) {
    state.filteredPokemons = pokemons;
  },
  /**
   * Mutation to set the selected type for filtering in the state
   */
  setSelectedType(state, selectedType: string | null) {
    state.selectedType = selectedType;
  },
};

/**
 * Define the actions, which are responsible for making API calls and trigger mutations
 */
const actions: ActionTree<RootState, RootState> = {
  /**
   * Action to fetch Pokemon data from the API and update the state with it
   * Call 'setPokemons' mutation to update the state with the fetched Pokemon data
   */
  async fetchPokemons({ commit }) {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
      const pokemonData: { name: string; url: string }[] = response.data.results;
      const pokemons: Pokemon[] = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return mapPokemonApiResponseToPokemon(res.data);
        })
      );
      commit('setPokemons', pokemons);
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
    }
  },
  /**
   * Action to filter the Pokemon data based on the selected type and update state
   * If no type is selected, set the filteredPokemons to be the same as the pokemons array
   * If a type is selected, filter the pokemons array based on the selected type
   * Call the 'setFilteredPokemons' mutation to update the state with the filtered data
   */
  filterPokemons({ commit, state }, selectedType: string | null) {
    commit('setSelectedType', selectedType);
    if (!selectedType) {
      commit('setFilteredPokemons', state.pokemons);
    } else {
      const filteredPokemons = state.pokemons.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
      commit('setFilteredPokemons', filteredPokemons);
    }
  },
};

/**
 * Define the getters, which allow access state data in a computed way
 */
const getters: GetterTree<RootState, RootState> = {
  /**
   * Getter for accessing the filteredPokemon data from the state
   */
  filteredPokemons: (state) => {
    return state.filteredPokemons;
  },
};

/**
 * Export the store instance with: state, mutations, actions, and getters
 */
export default new Vuex.Store<RootState>({
  state,
  mutations,
  actions,
  getters,
});