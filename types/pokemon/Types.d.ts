import { Type } from "pokenode-ts";

export type PokemonType = {
  color: string;
  imgSrc: string;
  description: string;
  className: string;
};

interface NameIcon {
  name_icon: string;
}

export interface PokemonGenerationSprites {
  colosseum?: NameIcon;
  emerald?: NameIcon;
  "firered-leafgreen"?: NameIcon;
  "ruby-saphire"?: NameIcon;
  xd?: NameIcon;
  "diamond-pearl"?: NameIcon;
  "heartgold-soulsilver"?: NameIcon;
  platinum?: NameIcon;
  "black-2-white-2"?: NameIcon;
  "black-white"?: NameIcon;
  "omega-ruby-alpha-sapphire"?: NameIcon;
  "x-y"?: NameIcon;
  "lets-go-pikachu-lets-go-eevee"?: NameIcon;
  "sun-moon"?: NameIcon;
  "ultra-sun-ultra-moon"?: NameIcon;
  "brilliant-diamond-and-shining-pearl"?: NameIcon;
  "legends-arceus"?: NameIcon;
  "sword-shield"?: NameIcon;
  "scarlet-violet"?: NameIcon;
}

export interface PokemonTypeSprites {
  "generation-i"?: PokemonGenerationSprites;
  "generation-ii"?: PokemonGenerationSprites;
  "generation-iii"?: PokemonGenerationSprites;
  "generation-iv"?: PokemonGenerationSprites;
  "generation-v"?: PokemonGenerationSprites;
  "generation-vi"?: PokemonGenerationSprites;
  "generation-vii"?: PokemonGenerationSprites;
  "generation-viii"?: PokemonGenerationSprites;
  "generation-ix"?: PokemonGenerationSprites;
}
