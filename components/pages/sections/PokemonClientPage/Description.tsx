"use client";

import React from "react";
// --- Next ---
import Link from "next/link";
// --- Helpers ---
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
// --- Types ---
import type { Pokemon, NamedAPIResource } from "pokenode-ts";

// Renders a list of NamedAPIResource links, separated by commas/and
const renderResourceList = (
  resources: NamedAPIResource[],
  basePath: string,
  keyPrefix: string
) => {
  if (!resources || resources.length === 0) return null;
  return resources.map((resource, index) => (
    <React.Fragment key={`${keyPrefix}-${resource.name}`}>
      {/* Conjunctions and separators */}
      {index > 0 &&
        index === resources.length - 1 &&
        resources.length > 1 &&
        " and "}
      {index > 0 && index < resources.length - 1 && ", "}
      {/* The Link */}
      <Link href={`${basePath}?name=${resource.name}`} passHref>
        {capitalizeFirstLetter(resource.name)}
      </Link>
    </React.Fragment>
  ));
};

// Renders types with " / " separator
const renderLinkedTypes = (types, keyPrefix) => {
  if (!types || types.length === 0) return null;
  return types
    .sort((a, b) => a.slot - b.slot)
    .map((typeInfo, index) => (
      <React.Fragment key={`${keyPrefix}-${typeInfo.type.name}`}>
        {index > 0 && " / "}
        <Link href={`/pokemon/type?name=${typeInfo.type.name}`} passHref>
          {capitalizeFirstLetter(typeInfo.type.name)}
        </Link>
      </React.Fragment>
    ));
};

type DescriptionProps = {
  pokemonName: string;
  apiData: Pokemon;
  heldItems: NamedAPIResource[];
};

export default function Description({
  pokemonName,
  apiData,
  heldItems,
}: DescriptionProps) {
  return (
    <span>
      {pokemonName} is an{" "}
      {apiData.types && apiData.types.length > 0
        ? renderLinkedTypes(apiData.types, "current")
        : "Pokémon"}{" "}
      type Pokémon, registered in the <a href="https://pokeapi.co/">PokéApi</a>{" "}
      with an ID of {apiData.id ?? "???"}. Defeating {pokemonName} grants{" "}
      {apiData.base_experience ?? "???"} base experience points.
      {/* Past Types */}
      {apiData.past_types && apiData.past_types.length > 0 && (
        <>
          {" "}
          Historically, its typing differed:{" "}
          {apiData.past_types.map((pastTypeInfo, genIndex) => {
            const generationFormatted = capitalizeFirstLetter(
              pastTypeInfo.generation.name
            );
            return (
              <React.Fragment key={pastTypeInfo.generation.name}>
                {genIndex > 0 && "; "}{" "}
                {/* Separator for multiple past entries */}
                in {generationFormatted}, it was classified as{" "}
                {renderLinkedTypes(
                  pastTypeInfo.types,
                  pastTypeInfo.generation.name
                )}
              </React.Fragment>
            );
          })}
          .
        </>
      )}
      <>
        {heldItems && heldItems.length > 0 ? (
          // Case: Items exist
          <>
            {" "}
            It can sometimes be encountered holding items such as{" "}
            {renderResourceList(heldItems, "/pokemon/item", "item")}.
          </>
        ) : (
          // Case: No items exist
          <> It is not typically found holding any items when encountered.</>
        )}
      </>
    </span>
  );
}
