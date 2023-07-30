<template>
  <div>
    <!-- Display a chip to filter 'All' Pokemons -->
    <v-chip
      @click="filterType(null)"
      :style="{ backgroundColor: getTypeColor(null) }"
      >All</v-chip
    >

    <!-- Display chips for filtering Pokemon by types -->
    <v-chip
      v-for="(type, i) in types"
      :key="i"
      @click="filterType(type)"
      :style="{ backgroundColor: getTypeColor(type), margin: '5px' }"
    >
      {{ type }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import { mapActions } from "vuex";

/**
 * Color mapping for each Pokemon type
 */
const typeColors: { [key: string]: string } = {
  normal: "#C8C8B2",
  fire: "#F8B17D",
  water: "#A9C2F6",
  electric: "#F8ECBC",
  grass: "#BCE0A6",
  ice: "#D8F1F0",
  fighting: "#E8A29F",
  poison: "#D9B6D8",
  ground: "#CDC7B5",
  flying: "#E6DFF9",
  psychic: "#FACAD8",
  bug: "#D7DBBE",
  rock: "#C2C1BA",
  ghost: "#BFBBC4",
  dragon: "#F2EDFE",
  dark: "#9E9D9C",
  steel: "#BCBCCD",
  fairy: "#CBAEBC",
  shadow: "#BFBDBF",
};

export default Vue.extend({
  data() {
    return {
      /**
       * Flag to indicate if the types data has been loaded from the API
       */
      typesLoaded: false,
      types: [],
    };
  },
  methods: {
    ...mapActions(['filterPokemons']),
    /**
     * Call the 'filterPokemons' action from the store to apply the filter
     */
    filterType(type: string | null) {
      this.filterPokemons(type);
    },
    /**
     * Function to add the background color for a Pokemon type chip
     * Return the corresponding color from the 'typeColors' object based on the type
     * If the type is null or undefined, return default color (#E0E0E0)
     * type.toLowerCase() to make sure all keys are lowercase
     */
    getTypeColor(type: string | null | undefined) {
      return type ? typeColors[type.toLowerCase()] : "#E0E0E0";
    },
  },
  async mounted() {
    /**
     * Set typesLoaded flag to false before fetching data
     */
    this.typesLoaded = false;
    await axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res: AxiosResponse<any>) => {
        /**
         * Extract the names of Pokemon types from the API response
         * and populate the 'types' array with the names
         */
        this.types = res.data.results.map(
          (type: { name: string }) => type.name
        );
        /**
         * Set the typesLoaded flag to true after fetching data
         */
        this.typesLoaded = true;
      });
  },
});
</script>
