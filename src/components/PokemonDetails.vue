<template>
  <v-container>
    <v-spacer></v-spacer>
    <v-card width="344" style="margin: auto">
      <v-card-title>
        {{ pokemonDetails?.name }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <div v-if="pokemonDetails">
              <p>Weight: {{ pokemonDetails.weight }}</p>
              <p>Height: {{ pokemonDetails.height }}</p>
              <p>Base Experience: {{ pokemonDetails.base_experience }}</p>
              <p>Type: {{ formatTypes(pokemonDetails.types) }}</p>
            </div>
          </v-col>
          <v-col>
            <img
              :src="getImageUrl(pokemonDetails?.sprites.front_default)"
              alt="Pokemon Image"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text :to="{ path: '/' }"> Go Back </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Pokemon } from "@/types";
import { defineComponent } from "vue";
import { mapPokemonApiResponseToPokemon } from "@/pokemonUtils";

export default defineComponent({
  name: "PokemonDetails",
  data() {
    return {
      pokemonDetails: null as Pokemon | null,
    };
  },
  async created() {
    await this.fetchPokemonDetails();
  },
  watch: {
    "$route.params.name": {
      handler: "fetchPokemonDetails",
      immediate: true,
    },
  },
  methods: {
    async fetchPokemonDetails() {
      try {
        const name = this.$route.params.name;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        this.pokemonDetails = mapPokemonApiResponseToPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    },
    getImageUrl(url: string | null | undefined) {
      return url || "https://placehold.co/100x100";
    },
    formatTypes(types: string[] | null | undefined): string {
      // Check if types is null or undefined, return an empty string in that case
      if (!types) return "";

      // Join the elements of the types array with a space as the separator
      return types.join(", ");
    },
  },
});
</script>
