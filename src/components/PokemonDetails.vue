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
            <!-- Render the div content if pokemonDetails is not null or undefined -->
            <div v-if="pokemonDetails">
              <!-- Display informations about the Pokemon -->
              <p>Weight: {{ pokemonDetails.weight }}</p>
              <p>Height: {{ pokemonDetails.height }}</p>
              <p>Base Experience: {{ pokemonDetails.base_experience }}</p>
              <p>Type: {{ formatTypes(pokemonDetails.types) }}</p>
            </div>
          </v-col>
          <v-col>
            <!-- Display the Pokemon's image using the front_default sprite URL -->
            <img
              :src="getImageUrl(pokemonDetails?.sprites.front_default)"
              alt="Pokemon Image"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <!-- Display a "Go Back" button that navigates to the home page -->
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
      /**
       * Hold the Pokemon details or set to null if not fetched yet
       */
      pokemonDetails: null as Pokemon | null,
    };
  },
  /**
   * Fetch Pokemon details when the component is created
   */
  async created() {
    await this.fetchPokemonDetails();
  },
  /**
   * Watch for changes in the route parameter "name" and fetch Pokemon details
   */
  watch: {
    "$route.params.name": {
      handler: "fetchPokemonDetails",
      immediate: true,
    },
  },
  methods: {
    /**
     * Fetch Pokemon details from the PokeAPI based on the "name" route parameter
     */
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
    /**
     * Get the URL of the Pokemon's image, or use a placeholder URL if not available
     */
    getImageUrl(url: string | null | undefined) {
      return url || "https://placehold.co/100x100";
    },
    /**
     * Format the Pokemon types by using a comma as a separator
     * Check if types is null or undefined return an empty string in that case
     * Join the elements of the types array with a comma as the separator
     */
    formatTypes(types: string[] | null | undefined): string {
      if (!types) return "";

      return types.join(", ");
    },
  },
});
</script>
