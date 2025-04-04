import React, { JSX } from "react";
import Link from 'next/link';
import { NamedAPIResource } from "pokenode-ts";
//Helpers
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";

/**
 * Creates a JSX sentence describing type weaknesses with links.
 * Example: "Fighting takes double damage from <a href="...">flying</a>, <a href="...">psychic</a> and <a href="...">fairy</a>"
 *
 * @param {string} baseName - The name of the type taking damage (e.g., "Fighting").
 * @param {NamedAPIResource[]} values - Array of type objects causing double damage.
 * @returns {JSX.Element | null} - JSX element representing the sentence, or null if no weaknesses.
 */
export function createWeaknessSentence(
  baseName: string,
  values: NamedAPIResource[]
): JSX.Element {
  const numTypes = values.length;

  // Handle empty cases
  if (numTypes === 0) {
    return <span>{baseName} has no double damage weaknesses listed.</span>;
  }

  return (
    <span>
      {baseName} takes double damage from{" "}
      {values.map((info, index) => {
        const typeLink = (
          <Link href={`/pokemon/type?name=${info.name}`} key={info.name}>
            {info.name}
          </Link>
        );

        // Determine the separator to add *after* the current link
        const separator: string | null = getSentenceSeperator(index, numTypes);

        return (
          <React.Fragment key={info.name + "-sep"}>
            {typeLink}
            {separator}
          </React.Fragment>
        );
      })}
    </span>
  );
}
