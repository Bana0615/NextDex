"use client";

import React from "react";
// --- Next ---
import Link from "next/link";
// --- Helpers ---
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter"; // Assuming this helper exists
// --- Types ---
// Assuming these types are correctly defined elsewhere
import type { Pokemon, PokemonAbility } from "pokenode-ts";

// --- Helper Functions ---

/**
 * Renders a list of Pokémon abilities with links, handling hidden status.
 * @param abilities - Array of PokemonAbility objects.
 * @param basePath - The base path for the link href (e.g., "/pokemon/ability").
 * @param keyPrefix - A unique prefix for React keys.
 */
const renderAbilityList = (
  abilities: PokemonAbility[], // Now expects the full PokemonAbility object
  basePath: string,
  keyPrefix: string
) => {
  if (!abilities || abilities.length === 0) return null;

  // Sort abilities (e.g., by slot or alphabetically, optional)
  // Sorting by slot might be useful if the API guarantees slot order significance
  const sortedAbilities = abilities.sort((a, b) => a.slot - b.slot);

  return sortedAbilities.map((abilityInfo, index) => (
    <React.Fragment key={`${keyPrefix}-${abilityInfo.ability.name}`}>
      {/* Conjunctions and separators */}
      {index > 0 &&
        index === sortedAbilities.length - 1 &&
        sortedAbilities.length > 1 &&
        " and "}
      {index > 0 && index < sortedAbilities.length - 1 && ", "}
      {/* The Link */}
      <Link href={`${basePath}?name=${abilityInfo.ability.name}`} passHref>
        {capitalizeFirstLetter(abilityInfo.ability.name)}
      </Link>
      {/* Indicate if hidden */}
      {abilityInfo.is_hidden && <span className="text-muted"> (Hidden)</span>}
    </React.Fragment>
  ));
};

// --- Component ---

type AbilitiesSectionProps = {
  pokemonName: string;
  apiData: Pick<Pokemon, "abilities" | "past_abilities">; // Only need abilities data
};

/**
 * Renders a paragraph describing the Pokémon's current and past abilities,
 * indicating hidden status and handling empty past ability slots.
 */
export default function AbilitiesSection({
  pokemonName,
  apiData,
}: AbilitiesSectionProps) {
  // Extract current abilities (keep the full PokemonAbility object)
  const currentAbilities = apiData.abilities?.filter(
    (a): a is PokemonAbility => !!a?.ability // Ensure ability object exists
  );

  // Extract past abilities info
  const pastAbilitiesInfo = apiData.past_abilities;

  // --- Render Logic ---

  // Don't render anything if there's no ability data at all
  if (
    (!currentAbilities || currentAbilities.length === 0) &&
    (!pastAbilitiesInfo || pastAbilitiesInfo.length === 0)
  ) {
    // You could return a specific message if needed
    // return <p className="lead fs-6 mt-4 mb-5">{pokemonName} has no documented abilities.</p>;
    return null;
  }

  return (
    <p className="lead fs-6 mt-4 mb-5">
      {/* Current Abilities */}
      {currentAbilities && currentAbilities.length > 0 ? (
        <>
          {pokemonName}'s known{" "}
          {currentAbilities.length > 1 ? "abilities are" : "ability is"}{" "}
          {renderAbilityList(
            currentAbilities,
            "/pokemon/ability",
            "current-ability"
          )}
          .
        </>
      ) : (
        // Optional: Message if no current abilities but maybe past ones exist
        // Render this only if there are NO abilities at all (current or past)
        (!pastAbilitiesInfo || pastAbilitiesInfo.length === 0) && (
          <>{pokemonName} has no documented abilities.</>
        )
      )}

      {/* Past Abilities */}
      {pastAbilitiesInfo && pastAbilitiesInfo.length > 0 && (
        <>
          {" "}
          {/* Add space if current abilities were listed and past abilities exist */}
          Historically, its abilities have changed:{" "}
          {pastAbilitiesInfo.map((pastAbilityInfo, genIndex) => {
            const generationFormatted = capitalizeFirstLetter(
              pastAbilityInfo.generation.name
            );
            // Extract abilities for this past generation (keep full PokemonAbility)
            // Check if abilities array exists AND is not null (based on API doc image)
            const pastGenAbilities = pastAbilityInfo.abilities?.filter(
              (a): a is PokemonAbility => !!a?.ability
            );

            return (
              <React.Fragment key={pastAbilityInfo.generation.name}>
                {genIndex > 0 && "; "}{" "}
                {/* Separator for multiple past entries */}
                in {generationFormatted},{" "}
                {pastGenAbilities === null || pastGenAbilities?.length === 0 ? (
                  // Handle the case where the ability slot was empty or data missing
                  <>it had no ability listed in this slot</>
                ) : (
                  // Render the abilities it had
                  <>
                    it had the{" "}
                    {pastGenAbilities.length > 1 ? "abilities" : "ability"}{" "}
                    {renderAbilityList(
                      pastGenAbilities,
                      "/pokemon/ability",
                      pastAbilityInfo.generation.name // Use generation name for key prefix
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })}
          .
        </>
      )}
    </p>
  );
}
