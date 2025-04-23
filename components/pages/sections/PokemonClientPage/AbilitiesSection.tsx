"use client";

import React from "react";
// --- Next ---
import Link from "next/link";
// --- Helpers ---
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter"; // Assuming this helper exists
// --- Types ---
// Assuming these types are correctly defined elsewhere
import type {
  Pokemon,
  NamedAPIResource,
  PokemonAbility,
  PokemonAbilityPast,
} from "pokenode-ts";

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

  // Sort abilities by slot for consistent order
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
 * indicating hidden status and handling empty past ability slots with more context.
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
    return null;
  }

  // Find the current hidden ability, if one exists
  const currentHiddenAbility = currentAbilities?.find((a) => a.is_hidden);

  return (
    <span>
      {/* Current Abilities */}
      {currentAbilities && currentAbilities.length > 0 ? (
        <>
          {` ${pokemonName}'s known `}
          {currentAbilities.length > 1 ? "abilities are" : "ability is"}{" "}
          {renderAbilityList(
            currentAbilities,
            "/pokemon/ability",
            "current-ability"
          )}
          .
        </>
      ) : (
        // Render this only if there are NO abilities at all (current or past)
        (!pastAbilitiesInfo || pastAbilitiesInfo.length === 0) && (
          <>{pokemonName} has no documented abilities.</>
        )
      )}

      {/* Past Abilities */}
      {pastAbilitiesInfo && pastAbilitiesInfo.length > 0 && (
        <>
          {" "}
          Historically, its abilities have changed:{" "}
          {pastAbilitiesInfo.map((pastAbilityInfo, genIndex) => {
            const generationFormatted = capitalizeFirstLetter(
              pastAbilityInfo.generation.name
            );
            // Extract abilities for this past generation (keep full PokemonAbility)
            const pastGenAbilities = pastAbilityInfo.abilities?.filter(
              (a): a is PokemonAbility => !!a?.ability
            );

            // Determine if the slot was empty in this past generation
            const wasSlotEmpty =
              pastGenAbilities === null || pastGenAbilities?.length === 0;

            // Check if this past entry is for Gen IV and if there's a current hidden ability
            const isGen4EmptySlotCase =
              wasSlotEmpty &&
              pastAbilityInfo.generation.name === "generation-iv" &&
              currentHiddenAbility;

            return (
              <React.Fragment key={pastAbilityInfo.generation.name}>
                {genIndex > 0 && "; "}{" "}
                {/* Separator for multiple past entries */}
                in {generationFormatted},{" "}
                {isGen4EmptySlotCase ? (
                  // Special message for likely hidden ability slot empty in Gen IV
                  <>
                    its hidden ability slot, now occupied by{" "}
                    <Link
                      href={`/pokemon/ability?name=${currentHiddenAbility.ability.name}`}
                      passHref
                    >
                      {capitalizeFirstLetter(currentHiddenAbility.ability.name)}
                    </Link>
                    , was not yet available
                  </>
                ) : wasSlotEmpty ? (
                  // Generic fallback for other empty slot cases
                  <>one of its ability slots was empty</>
                ) : (
                  // Render the abilities it had in that generation
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
    </span>
  );
}
