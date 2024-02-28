export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonInfo {
  abilities: IAbility[];
  base_experience: number;
  cries: {};
  forms: {}[];
  game_indices: {}[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {}[];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: { name: string; url: string };
  sprites: {
    back_default: string;
    back_female: null | string;
    back_shiny: string;
    back_shiny_female: null | string;
    front_default: string;
  };
  stats: {}[];
  types: {}[];
  weight: number;
}

export interface IAbility {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}
