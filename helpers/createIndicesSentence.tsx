import React, { JSX } from "react";
import Link from "next/link";
import { GenerationGameIndex, VersionGameIndex } from "pokenode-ts";
// --- Helpers ---
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";

/**
 * Creates a JSX sentence describing game indices with links.
 *
 * @param {string} baseName - The name of the item
 * @param {GenerationGameIndex[] | VersionGameIndex[]} values - Array of item objects game indicies.
 * @returns {JSX.Element | null} - JSX element representing the sentence, or null if no game indices.
 */
export function createIndicesSentence(
  baseName: string,
  values: GenerationGameIndex[] | VersionGameIndex[]
): JSX.Element {
  const numTypes = values.length;

  // Handle empty cases
  if (numTypes === 0) {
    return <p>{baseName} has no game indices.</p>;
  }

  return (
    <p>
      {baseName} has game indices of{" "}
      {values.map((info, index) => {
        const typeLink = (
          <Link
            href={`/pokemon/generation?name=${info.generation.name}`}
            key={info.generation.name}
          >
            {info.generation.name}
          </Link>
        );

        // Determine the separator to add *after* the current link
        const separator: string | null = getSentenceSeperator(index, numTypes);

        return (
          <React.Fragment key={info.generation.name + "-indices-sep"}>
            {typeLink}
            {separator}
          </React.Fragment>
        );
      })}
    </p>
  );
}
