/**
 * Define the Pokemon interface, which represents the structure of a Pokemon object
 */
export interface Pokemon {
    name: string;
    url: string;
    types: string[];
    height: number;
    weight: number;
    base_experience: number;
    sprites: PokemonSprites;
}

/**
 * Interface representing the sprites of a Pokemon
 */
interface PokemonSprites {
    front_default: string | null;
}