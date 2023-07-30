<template>
  <div class="pkmn-container">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <PokemonFilter />

      <v-data-table
        :items="filteredPokemons"
        :search="search"
        :headers="headers"
        :footer-props="{
          'items-per-page-options': [25],
          'disable-items-per-page': true,
        }"
      >
      <template  v-slot:[`item.base_experience`]="{ item }">
          <td>{{ item.base_experience }}</td>
        </template>

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
    ...mapGetters(['filteredPokemons']),
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
    store.dispatch("fetchPokemons");
  },
  methods: {
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