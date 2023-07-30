<template>
  <div>
    <PokemonList />
  </div>
</template>

<script lang="ts">
import PokemonList from "@/components/PokemonList.vue";

export default {
  name: "HomeView",
  components: {
    PokemonList,
  },
};
</script>