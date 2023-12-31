import { mapPokemonApiResponseToPokemon } from "@/pokemonUtils";

/**
 * Describe block for the 'mapPokemonApiResponseToPokemon' function
 */
describe("mapPokemonApiResponseToPokemon", () => {
  /**
   * Test case for mapping Pokemon API response to Pokemon object correctly
   */
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

    /**
     * Expected result after mapping the API response to Pokemon object
     */
    const expectedResult = {
      name: "bulbasaur",
      weight: 69,
      height: 7,
      base_experience: 64,
      url: "https://pokeapi.co/api/v2/pokemon/1/",
      types: ["grass", "poison"],
      sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
    };

    /**
     * Call the function to be tested with the sample API response
     * Use 'expect' function to check if the result matches the expected result
     */
    const result = mapPokemonApiResponseToPokemon(apiResponse);
    expect(result).toEqual(expectedResult);
  });
});
