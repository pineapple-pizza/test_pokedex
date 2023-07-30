import { Pokemon } from "@/types";

/**
 * Function to map Pokemon API response data to a Pokemon object
 * Return a new Pokemon object with properties mapped from the API response data
 */
export function mapPokemonApiResponseToPokemon(data: any): Pokemon {
  return {
    name: data.name,
    weight: data.weight,
    height: data.height,
    base_experience: data.base_experience,
    url: data.url,
    types: data.types.map((type: any) => type.type.name),
    sprites: data.sprites,
  };
}
