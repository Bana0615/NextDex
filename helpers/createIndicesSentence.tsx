import React, { JSX } from "react";
import Link from 'next/link';
import { GenerationGameIndex } from "pokenode-ts";
//Helpers
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";

/**
 * Creates a JSX sentence describing game indices with links.
 *
 * @param {string} baseName - The name of the type taking damage (e.g., "Fighting").
 * @param {GenerationGameIndex[]} values - Array of type objects causing double damage.
 * @returns {JSX.Element | null} - JSX element representing the sentence, or null if no game indices.
 */
export function createIndicesSentence(
  baseName: string,
  values: GenerationGameIndex[]
): JSX.Element {
  const numTypes = values.length;

  // Handle empty cases
  if (numTypes === 0) {
    return <span>{baseName} has no game indices.</span>;
  }

  return (
    <span>
      {baseName} has game indices of{" "}
      {values.map((info, index) => {
        const typeLink = (
          <Link href={`/pokemon/generation?name=${info.generation.name}`} key={info.generation.name}>
            {info.generation.name}
          </Link>
        );

        // Determine the separator to add *after* the current link
        const separator: string | null = getSentenceSeperator(index, numTypes);

        return (
          <React.Fragment key={info.generation.name + "-sep"}>
            {typeLink}
            {separator}
          </React.Fragment>
        );
      })}
    </span>
  );
}
