import React, { JSX } from "react";
import { GenerationGameIndex } from "pokenode-ts";
//Helpers
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";

/**
 * Creates a JSX sentence describing type weaknesses with links.
 * Example: "Fighting takes double damage from <a href="...">flying</a>, <a href="...">psychic</a> and <a href="...">fairy</a>"
 *
 * @param {string} baseName - The name of the type taking damage (e.g., "Fighting").
 * @param {GenerationGameIndex[]} values - Array of type objects causing double damage.
 * @returns {JSX.Element | null} - JSX element representing the sentence, or null if no weaknesses.
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
          <a href={`/pokemon/generation?name=${info.generation.name}`} key={info.generation.name}>
            {info.generation.name}
          </a>
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
