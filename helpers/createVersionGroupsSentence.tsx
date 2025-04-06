import React, { JSX } from "react";
import Link from "next/link";
import { NamedAPIResource } from "pokenode-ts";
// Helpers
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";

/**
 * Creates a JSX sentence listing version groups with links.
 *
 * @param {string} baseName - The name of the subject (e.g., Pokédex name).
 * @param {NamedAPIResource[]} values - Array of version group objects (name and url).
 * @returns {JSX.Element | null} - JSX element representing the sentence, or a paragraph indicating no groups.
 */
export function createVersionGroupsSentence(
  baseName: string,
  values: NamedAPIResource[]
): JSX.Element {
  const numGroups = values.length;

  // Handle empty cases
  if (numGroups === 0) {
    return (
      <p>
        The {baseName} Pokédex is not associated with any specific version
        groups.
      </p>
    );
  }

  return (
    <p>
      The {baseName} Pokédex is associated with the version groups:{" "}
      {values.map((versionGroup, index) => {
        const linkHref = `/pokemon/game?name=${versionGroup.name}`;

        const groupLink = (
          <Link href={linkHref} key={versionGroup.name}>
            {versionGroup.name}
          </Link>
        );

        const separator: string | null = getSentenceSeperator(index, numGroups);

        return (
          <React.Fragment key={versionGroup.name + "-vg-sep"}>
            {groupLink}
            {separator}
          </React.Fragment>
        );
      })}
    </p>
  );
}
