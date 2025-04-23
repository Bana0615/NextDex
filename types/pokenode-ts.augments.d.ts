import {
  PokemonTypeSprites,
  PokemonCries,
  PokemonAbilityPast,
} from "@/types/pokemon/Types";

declare module "pokenode-ts" {
  interface Type {
    sprites?: PokemonTypeSprites | null;
  }
  interface Pokemon {
    cries?: PokemonCries | null;
    past_abilities?: PokemonAbilityPast[] | null;
  }

  interface PokemonAbilityPast {
    generation: NamedAPIResource;
    abilities: PokemonAbility[];
  }
}

export {};
