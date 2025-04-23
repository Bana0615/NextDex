import { PokemonTypeSprites, PokemonCries } from "@/types/pokemon/Types";

declare module "pokenode-ts" {
  interface Type {
    sprites?: PokemonTypeSprites | null;
  }
  interface Pokemon {
    cries?: PokemonCries | null;
  }
}

export {};
