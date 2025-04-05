import React, { JSX } from "react";
import Link from "next/link";
import { TypeRelations, TypeRelationsPast } from "pokenode-ts";
// Helpers
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";

// Define a type for the keys of DamageRelations to ensure type safety
type DamageRelationKey = keyof TypeRelations;

// Map relation keys to human-readable descriptions
const relationDescriptions: Record<DamageRelationKey, string> = {
  double_damage_from: "takes double damage from",
  double_damage_to: "deals double damage to",
  half_damage_from: "takes half damage from",
  half_damage_to: "deals half damage to",
  no_damage_from: "takes no damage from",
  no_damage_to: "deals no damage to",
};

/**
 * Creates an array of JSX sentences describing type damage relations with links.
 * Example Output might include paragraphs like:
 * - "Ice takes double damage from fighting, rock, steel and fire"
 * - "Ice deals double damage to flying, ground, grass and dragon"
 * - "Ice takes half damage from ice"
 * - "Ice deals half damage to steel, fire, water and ice"
 *
 * @param {string} baseName - The name of the type being described (e.g., "Ice").
 * @param {TypeRelationsPast | TypeRelations | undefined | null} damageRelations - The damage relations object for the type, potentially null or undefined.
 * @returns {JSX.Element[]} - Array of JSX <p> elements representing the sentences for each non-empty relation. Returns an empty array if damageRelations is null/undefined. Returns a single generic paragraph if all relations are empty.
 */
export function createDamageRelationSentences(
  baseName: string,
  damageRelations: TypeRelationsPast | TypeRelations | undefined | null
): JSX.Element[] {
  // Handle cases where damageRelations data is missing
  if (!damageRelations) {
    return [];
  }

  const sentences: JSX.Element[] = [];

  // Iterate over the known damage relation keys
  (Object.keys(relationDescriptions) as DamageRelationKey[]).forEach(
    (relationKey) => {
      // Check if the key exists on the input object and get the array of related types
      const values = damageRelations[relationKey];

      // Only proceed if the values array is valid
      if (values && values.length > 0) {
        const numTypes = values.length;
        const description = relationDescriptions[relationKey];

        // Construct the sentence paragraph
        sentences.push(
          <p key={`${baseName}-${relationKey}`}>
            {" "}
            {baseName} {description}{" "}
            {values.map((info, index) => {
              const typeLink = (
                <Link href={`/pokemon/type?name=${info.name}`} key={info.name}>
                  {info.name}
                </Link>
              );

              // Determine the separator
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
    }
  );

  // If after checking all relations amd no sentences were generated then return a generic message
  if (sentences.length === 0) {
    return [
      <p key={`${baseName}-no-relations`}>
        {baseName} has no specific damage relations listed.
      </p>,
    ];
  }

  return sentences;
}
