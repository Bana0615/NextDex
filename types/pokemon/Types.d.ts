export type PokemonType = {
  name: string;
  color: string;
  imgSrc: string;
  description: string;
};

export interface PokemonTypeData {
  damage_relations: DamageRelations;
  game_indices: Index[];
  generation: Generation2;
  id: number;
  move_damage_class: MoveDamageClass;
  moves: Mfe[];
  name: string;
  names: Name[];
  past_damage_relations: PastDamageRelation[];
  pokemon: Pokemon[];
  sprites: Sprites;
}

export interface DamageRelations {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: DoubleDamageTo[];
  half_damage_from: HalfDamageFrom[];
  half_damage_to: HalfDamageTo[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface DoubleDamageFrom {
  name: string;
  url: string;
}

export interface DoubleDamageTo {
  name: string;
  url: string;
}

export interface HalfDamageFrom {
  name: string;
  url: string;
}

export interface HalfDamageTo {
  name: string;
  url: string;
}

export interface Index {
  game_index: number;
  generation: Generation;
}

export interface Generation {
  name: string;
  url: string;
}

export interface Generation2 {
  name: string;
  url: string;
}

export interface MoveDamageClass {
  name: string;
  url: string;
}

export interface Mfe {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface PastDamageRelation {
  damage_relations: DamageRelations2;
  generation: Generation3;
}

export interface DamageRelations2 {
  double_damage_from: DoubleDamageFrom2[];
  double_damage_to: DoubleDamageTo2[];
  half_damage_from: HalfDamageFrom2[];
  half_damage_to: HalfDamageTo2[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface DoubleDamageFrom2 {
  name: string;
  url: string;
}

export interface DoubleDamageTo2 {
  name: string;
  url: string;
}

export interface HalfDamageFrom2 {
  name: string;
  url: string;
}

export interface HalfDamageTo2 {
  name: string;
  url: string;
}

export interface Generation3 {
  name: string;
  url: string;
}

export interface Pokemon {
  pokemon: Pokemon2;
  slot: number;
}

export interface Pokemon2 {
  name: string;
  url: string;
}

export interface Sprites {
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-ix": GenerationIx;
  "generation-v": GenerationV;
  "generation-vi": GenerationVi;
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface GenerationIii {
  colosseum: Colosseum;
  emerald: Emerald;
  "firered-leafgreen": FireredLeafgreen;
  "ruby-saphire": RubySaphire;
  xd: Xd;
}

export interface Colosseum {
  name_icon: string;
}

export interface Emerald {
  name_icon: string;
}

export interface FireredLeafgreen {
  name_icon: string;
}

export interface RubySaphire {
  name_icon: string;
}

export interface Xd {
  name_icon: string;
}

export interface GenerationIv {
  "diamond-pearl": DiamondPearl;
  "heartgold-soulsilver": HeartgoldSoulsilver;
  platinum: Platinum;
}

export interface DiamondPearl {
  name_icon: string;
}

export interface HeartgoldSoulsilver {
  name_icon: string;
}

export interface Platinum {
  name_icon: string;
}

export interface GenerationIx {
  "scarlet-violet": ScarletViolet;
}

export interface ScarletViolet {
  name_icon: string;
}

export interface GenerationV {
  "black-2-white-2": Black2White2;
  "black-white": BlackWhite;
}

export interface Black2White2 {
  name_icon: string;
}

export interface BlackWhite {
  name_icon: string;
}

export interface GenerationVi {
  "omega-ruby-alpha-sapphire": OmegaRubyAlphaSapphire;
  "x-y": XY;
}

export interface OmegaRubyAlphaSapphire {
  name_icon: string;
}

export interface XY {
  name_icon: string;
}

export interface GenerationVii {
  "lets-go-pikachu-lets-go-eevee": LetsGoPikachuLetsGoEevee;
  "sun-moon": SunMoon;
  "ultra-sun-ultra-moon": UltraSunUltraMoon;
}

export interface LetsGoPikachuLetsGoEevee {
  name_icon: string;
}

export interface SunMoon {
  name_icon: string;
}

export interface UltraSunUltraMoon {
  name_icon: string;
}

export interface GenerationViii {
  "brilliant-diamond-and-shining-pearl": BrilliantDiamondAndShiningPearl;
  "legends-arceus": LegendsArceus;
  "sword-shield": SwordShield;
}

export interface BrilliantDiamondAndShiningPearl {
  name_icon: string;
}

export interface LegendsArceus {
  name_icon: string;
}

export interface SwordShield {
  name_icon: string;
}
