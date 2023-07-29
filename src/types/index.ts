export interface Pokemon {
    name: string;
    url: string;
    types: string[];
    // generation: string;
    height: number;
    weight: number;
    // abilities: { ability: { name: string } }[];
    base_experience: number;
    sprites: PokemonSprites;
  }
  
  interface PokemonSprites {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
  }