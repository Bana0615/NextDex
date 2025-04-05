import { PokemonTypeSprites } from "@/types/pokemon/Types";

declare module "pokenode-ts" {
  interface Type {
    sprites?: PokemonTypeSprites | null;
  }
}

export {};
