import { mapPokemonApiResponseToPokemon } from "@/pokemonUtils";

describe("mapPokemonApiResponseToPokemon", () => {
  it("should map Pokemon API response to Pokemon object correctly", () => {
    const apiResponse = {
      name: "bulbasaur",
      weight: 69,
      height: 7,
      base_experience: 64,
      url: "https://pokeapi.co/api/v2/pokemon/1/",
      types: [
        { type: { name: "grass" } },
        { type: { name: "poison" } },
      ],
      sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
    };

    const expectedResult = {
      name: "bulbasaur",
      weight: 69,
      height: 7,
      base_experience: 64,
      url: "https://pokeapi.co/api/v2/pokemon/1/",
      types: ["grass", "poison"],
      sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
    };

    const result = mapPokemonApiResponseToPokemon(apiResponse);
    expect(result).toEqual(expectedResult);
  });
});
