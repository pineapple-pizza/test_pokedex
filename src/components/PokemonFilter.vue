<template>
  <div>
    <v-chip
      @click="filterType(null)"
      :style="{ backgroundColor: getTypeColor(null) }"
      >All</v-chip
    >

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
      typesLoaded: false,
      types: [],
    };
  },
  methods: {
    ...mapActions(['filterPokemons']),
    filterType(type: string | null) {
      this.filterPokemons(type);
    },
    getTypeColor(type: string | null) {
      return type ? typeColors[type.toLowerCase()] : "#CCCCCC";
    },
  },
  async mounted() {
    this.typesLoaded = false;
    await axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res: AxiosResponse<any>) => {
        this.types = res.data.results.map(
          (type: { name: string }) => type.name
        );
        this.typesLoaded = true;
      });
  },
});
</script>
