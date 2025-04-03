import React, { JSX } from "react";

interface WeaknessTypeInfo {
  name: string;
  url: string;
}

/**
 * Creates a JSX sentence describing type weaknesses with links.
 * Example: "Fighting takes double damage from <a href="...">flying</a>, <a href="...">psychic</a> and <a href="...">fairy</a>"
 *
 * @param {string} baseTypeName - The name of the type taking damage (e.g., "Fighting").
 * @param {Array<{name: string, url: string}>} weaknessTypes - Array of type objects causing double damage.
 * @returns {JSX.Element | null} - JSX element representing the sentence, or null if no weaknesses.
 */
export function createWeaknessSentence(
  baseTypeName: string,
  weaknessTypes: WeaknessTypeInfo[]
): JSX.Element {
  const numTypes = weaknessTypes.length;

  // Handle cases with no weaknesses
  if (numTypes === 0) {
    return <span>{baseTypeName} has no double damage weaknesses listed.</span>;
  }

  return (
    <span>
      {baseTypeName} takes double damage from{" "}
      {weaknessTypes.map((typeInfo, index) => {
        const typeLink = (
          <a href={`/pokemon/type?id=${typeInfo.name}`} key={typeInfo.name}>
            {typeInfo.name}
          </a>
        );

        // Determine the separator to add *after* the current link
        let separator: string | null = null;
        if (numTypes === 1) {
          // No separator needed if there's only one type
          separator = null;
        } else if (index < numTypes - 2) {
          // Comma for items before the second-to-last
          separator = ", ";
        } else if (index === numTypes - 2) {
          // " and " after the second-to-last item (before the last)
          separator = " and ";
        }

        return (
          <React.Fragment key={typeInfo.name + "-sep"}>
            {typeLink}
            {separator}
          </React.Fragment>
        );
      })}
    </span>
  );
}
