import React, { JSX } from "react";
import Link from 'next/link';
import { TypeRelationsPast } from "pokenode-ts";
//Helpers
import { getSentenceSeperator } from "@/helpers/getSentenceSeperator";
import { createWeaknessSentence } from "@/helpers/createDamageRelationSentences";

/**
 * Creates a JSX sentence describing past damage relations with links.
 *
 * @param {string} baseName - The name of the type taking damage (e.g., "Fighting").
 * @param {TypeRelationsPast[]} values - Array of type objects past damage relations.
 * @returns {JSX.Element | null} - JSX element representing the sentence, or null if no past_damage_relations.
 */
export function createPastDamageRelationsSentence(
    baseName: string,
    values: TypeRelationsPast[]
): JSX.Element {
    const numTypes = values.length;

    // Handle empty cases
    if (numTypes === 0) {
        return <p>{baseName} has no past damage relations.</p>;
    }
    // TODO: make createWeaknessSentence modular so we can reuse it

    return (
        <>
            {values.map((info, index) => {
                if (Object.keys(info.damage_relations).length > 0) {
                    console.log("info", info);
                    //Double Damage from
                    const typeLink = (
                        { baseName } takes double damage from { " "}
                    <Link href={`/pokemon/type?name=${info.generation.name}`} key={info.name}>
                        {info.generation.name}
                    </Link>
                    );

            // Determine the separator to add *after* the current link
            const separator: string | null = getSentenceSeperator(index, numTypes);
                    // createWeaknessSentence()
                }

            return (
            <React.Fragment key={info.generation.name + "-sep"}>
                {typeLink}
                {separator}
            </React.Fragment>
            );
            })}
        </>
    );
}
