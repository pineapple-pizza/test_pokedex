<template>
  <v-container>
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
      <v-data-table
        :items="filteredPokemons"
        :search="search"
        :headers="headers"
        :footer-props="{
          'items-per-page-options': [25],
          'disable-items-per-page': true,
        }"
      >
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

    <PokemonSearch />
    <PokemonFilter />
  </v-container>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import PokemonFilter from "./PokemonFilter.vue";
import PokemonSearch from "./PokemonSearch.vue";

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
        { text: "Info", value: "url", sortable: false },
      ],
    };
  },
  components: {
    PokemonFilter,
    PokemonSearch,
  },
  computed: {
    ...mapGetters(["filteredPokemons"]),
  },
  created() {
    store.dispatch("fetchPokemons");
  },
  methods: {
    ...mapActions(["fetchPokemons"]),
  },
};
</script>
