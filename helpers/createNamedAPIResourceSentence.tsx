import React, { JSX } from "react";
import Link from "next/link";
import { NamedAPIResource } from "pokenode-ts";
// --- Helpers ---
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";

/**
 * Creates a JSX sentence listing NamedAPIResources with links.
 *
 * @param {string} initialString - The initial string of the subject (e.g., Kanto Pokédex is associated with the version groups:).
 * @param {string} emptyString - The empty string of the subject (e.g., Kanto Pokédex is not associated with any specific version groups)
 * @param {string} link - The link to send the user to
 * @param {NamedAPIResource[]} values - Array of NamedAPIResource objects (name and url).
 * @returns {JSX.Element | null} - JSX element representing the sentence, or a paragraph indicating nothing.
 */
export function createNamedAPIResourceSentence(
  initialString: string,
  emptyString: string,
  link: string,
  values: NamedAPIResource[]
): JSX.Element {
  const numGroups = values ? values.length : 0;

  // Handle empty cases
  if (numGroups === 0) {
    return <span>{emptyString}</span>;
  }

  return (
    <span>
      {initialString}{" "}
      {values.map((item, index) => {
        const linkHref = `${link}?name=${item.name}`;

        const groupLink = (
          <Link href={linkHref} key={item.name}>
            {capitalizeFirstLetter(item.name)}
          </Link>
        );

        const separator: string | null = getSentenceSeperator(index, numGroups);

        return (
          <React.Fragment key={item.name + "-vg-sep"}>
            {groupLink}
            {separator}
          </React.Fragment>
        );
      })}
    </span>
  );
}
