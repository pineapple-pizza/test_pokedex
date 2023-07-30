<template>
  <div>
    <v-chip @click="filterType(null)">All</v-chip>

    <v-chip v-for="(type, i) in types" :key="i" @click="filterType(type)">
      {{ type }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import { mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      typesLoaded: false,
      types: [],
    };
  },
  methods: {
    ...mapActions(["filterPokemons"]),
    filterType(type: string | null) {
      this.filterPokemons(type);
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
        console.log(this.types);
        this.typesLoaded = true;
      });
  },
});
</script>
