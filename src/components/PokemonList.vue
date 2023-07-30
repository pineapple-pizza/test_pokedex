<template>
  <div class="pkmn-container">
    <!-- The container for the PokemonList component -->
    <v-card>
      <v-card-title>
        <!-- Text field for search input with magnify icon -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <!-- Custom PokemonFilter component -->
      <PokemonFilter />

      <!-- Data table for displaying Pokemon information -->
      <v-data-table
        :items="filteredPokemons"
        :search="search"
        :headers="headers"
        :footer-props="{
          'items-per-page-options': [25],
          'disable-items-per-page': true,
        }"
      >
      <!-- Slot for customizing the display of 'base_experience' column,
                it also works as a filter -->
      <template  v-slot:[`item.base_experience`]="{ item }">
          <td>{{ item.base_experience }}</td>
        </template>

        <!-- Slot for customizing the display of 'url' column -->
        <template v-slot:[`item.url`]="{ item }">
          <v-chip
            small
            :to="{ name: 'pokemon-details', params: { name: item.name } }"
          >
            More details
            <v-icon right small> mdi-information-slab-circle-outline </v-icon>
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import PokemonFilter from "./PokemonFilter.vue";

export default {
  name: "PokemonList",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
        { text: "Base Experience", value: "base_experience" },
        { text: "Info", value: "url", sortable: false },
      ],
    };
  },
  components: {
    PokemonFilter,
  },
  computed: {
    ...mapGetters(['filteredPokemons', 'selectedType']),
    /**
     * Computed property for 'selectedType', using Vuex to get and set the value
     * 'get' function to retrieve the 'selectedType' from the store
     * 'set' function to dispatch the 'filterPokemons' action to update the filter
     */
    selectedType: {
      get(): string | null {
        return store.state.selectedType;
      },
      set(value: string | null) {
        store.dispatch('filterPokemons', value);
      },
    },
  },
  created() {
    /**
     * Dispatch the 'fetchPokemons' action when the component is created
     * This action fetches Pokemon data from the API and populates the store
     */
    store.dispatch("fetchPokemons");
  },
  methods: {
    /**
     * Using mapActions to map the Vuex action 'fetchPokemons' to the component's methods
     * This allows us to call 'fetchPokemons' directly as a method
     */
    ...mapActions(["fetchPokemons"]),
  },
};
</script>

<style lang="scss">
.pkmn-container {
  width: 550px;
  margin: auto;
  padding: 10px;
}
</style>