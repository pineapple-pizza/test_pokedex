export interface Pokemon {
    name: string;
    url: string;
    types: string[];
    height: number;
    weight: number;
    base_experience: number;
    sprites: PokemonSprites;
}

interface PokemonSprites {
    front_default: string | null;
}