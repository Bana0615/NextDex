import React, { JSX } from "react";
import Link from "next/link";
import {
  TypeRelations,
  TypeRelationsPast,
  NamedAPIResource,
} from "pokenode-ts";
// Helpers
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";

// Define a type for the keys of DamageRelations to ensure type safety
type DamageRelationKey = keyof TypeRelations;

// Map relation keys to human-readable descriptions (Present Tense)
const presentTenseDescriptions: Record<DamageRelationKey, string> = {
  double_damage_from: "takes double damage from",
  double_damage_to: "deals double damage to",
  half_damage_from: "takes half damage from",
  half_damage_to: "deals half damage to",
  no_damage_from: "takes no damage from",
  no_damage_to: "deals no damage to",
};

// Map relation keys to human-readable descriptions (Past Tense)
const pastTenseDescriptions: Record<DamageRelationKey, string> = {
  double_damage_from: "took double damage from",
  double_damage_to: "dealt double damage to",
  half_damage_from: "took half damage from",
  half_damage_to: "dealt half damage to",
  no_damage_from: "took no damage from",
  no_damage_to: "dealt no damage to",
};

/**
 * Creates an array of JSX sentences describing type damage relations with links.
 * Uses past tense and includes generation context (with a link) if TypeRelationsPast is provided.
 * Example Output (Present):
 * - "Ice takes double damage from fighting, rock, steel and fire"
 * Example Output (Past):
 * - "During [link to generation-i], Ice took double damage from fighting and rock"
 *
 * @param {string} baseName - The name of the type being described (e.g., "Ice").
 * @param {TypeRelationsPast | TypeRelations | undefined | null} damageRelationsInput - The damage relations object for the type, potentially null or undefined.
 * @returns {JSX.Element[]} - Array of JSX <p> elements representing the sentences for each non-empty relation. Returns an empty array if damageRelationsInput is null/undefined. Returns a single generic paragraph if all relations are empty.
 */
export function createDamageRelationSentences(
  baseName: string,
  damageRelationsInput: TypeRelationsPast | TypeRelations | undefined | null
): JSX.Element[] {
  // Handle cases where damageRelations data is missing
  if (!damageRelationsInput) {
    return [];
  }

  // Type Guard to check if it's TypeRelationsPast
  const isPast = (
    relations: TypeRelationsPast | TypeRelations
  ): relations is TypeRelationsPast => {
    return (relations as TypeRelationsPast).generation !== undefined;
  };

  const isPastRelations = isPast(damageRelationsInput);
  const damageRelations = isPastRelations
    ? damageRelationsInput.damage_relations
    : damageRelationsInput;

  // Select the correct tense descriptions
  const descriptions = isPastRelations
    ? pastTenseDescriptions
    : presentTenseDescriptions;

  // Create Generation Link
  let generationPrefix: JSX.Element | null = null;
  let rawGenerationName: string | null = null;

  if (isPastRelations) {
    rawGenerationName = damageRelationsInput.generation.name;
    generationPrefix = (
      <>
        During{" "}
        <Link
          href={`/pokemon/generation?name=${rawGenerationName}`}
          key={rawGenerationName}
        >
          {rawGenerationName}
        </Link>
        ,{" "}
      </>
    );
  }

  const sentences: JSX.Element[] = [];

  // Iterate over the known damage relation keys
  (Object.keys(descriptions) as DamageRelationKey[]).forEach((relationKey) => {
    const values: NamedAPIResource[] | undefined =
      damageRelations?.[relationKey];

    if (values && values.length > 0) {
      const numTypes = values.length;
      const description = descriptions[relationKey];

      // Construct the sentence paragraph
      sentences.push(
        <p
          key={`${baseName}-${relationKey}${
            isPastRelations ? `-past-${rawGenerationName}` : ""
          }`}
        >
          {generationPrefix}
          {baseName} {description}{" "}
          {values.map((info, index) => {
            const typeLink = (
              <Link href={`/pokemon/type?name=${info.name}`} key={info.name}>
                {info.name}
              </Link>
            );

            const separator: string | null = getSentenceSeperator(
              index,
              numTypes
            );

            return (
              <React.Fragment key={`${info.name}-${relationKey}-item`}>
                {typeLink}
                {separator}
              </React.Fragment>
            );
          })}
        </p>
      );
    }
  });

  // If after checking all relations no sentences were generated, return a generic message
  if (sentences.length === 0) {
    const noRelationsKey = `${baseName}-no-relations${
      isPastRelations ? `-past-${rawGenerationName}` : ""
    }`;

    const noRelationsContext = isPastRelations
      ? ` during ${rawGenerationName}`
      : "";
    return [
      <p key={noRelationsKey}>
        {baseName} had no specific damage relations listed{noRelationsContext}.
      </p>,
    ];
  }

  return sentences;
}
