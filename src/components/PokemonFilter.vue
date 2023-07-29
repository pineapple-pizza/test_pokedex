<template>
    <div>
      <h2>Filters</h2>
      <select v-model="selectedType">
        <option value="">All Types</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue } from "vue-property-decorator"; // Import Vue class
  
  export default Vue.extend({
    data() {
      return {
        selectedType: "",
      };
    },
    computed: {
      types() {
        // You can fetch the available types from the API or hardcode them here
        return [
          "normal",
          "fire",
          "water",
          "grass",
          "electric",
          "ice",
          "fighting",
          "poison",
          "ground",
          "flying",
          "psychic",
          "bug",
          "rock",
          "ghost",
          "dragon",
          "dark",
          "steel",
          "fairy",
        ];
      },
    },
    watch: {
      selectedType: {
        handler: "filterPokemons", // Call the filterPokemons method when selectedType changes
        immediate: true, // Call the filterPokemons method immediately after the component is created
      },
    },
    methods: {
      filterPokemons() {
        // Dispatch the 'filterPokemons' action to populate the store
        this.$store.dispatch('filterPokemons', this.selectedType);
      },
    },
  });
  </script>
  