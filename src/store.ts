
import Vue from 'vue';
import Vuex, { MutationTree, ActionTree, GetterTree } from 'vuex';
import axios from 'axios';
import { Pokemon } from '@/types';

import { mapPokemonApiResponseToPokemon } from "@/pokemonUtils";

Vue.use(Vuex);

interface RootState {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  selectedType: string | null;
}

const state: RootState = {
  pokemons: [],
  filteredPokemons: [],
  selectedType: null,
};

const mutations: MutationTree<RootState> = {
  setPokemons(state, pokemons: Pokemon[]) {
    state.pokemons = pokemons;
    state.filteredPokemons = pokemons;
  },
  setFilteredPokemons(state, pokemons: Pokemon[]) {
    state.filteredPokemons = pokemons;
  },
  setSelectedType(state, selectedType: string | null) {
    state.selectedType = selectedType;
  },
};

const actions: ActionTree<RootState, RootState> = {
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

const getters: GetterTree<RootState, RootState> = {
  filteredPokemons: (state) => {
    return state.filteredPokemons;
  },
};

export default new Vuex.Store<RootState>({
  state,
  mutations,
  actions,
  getters,
});