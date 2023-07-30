import { Pokemon } from "@/types";

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
