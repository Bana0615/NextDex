import React from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import PokeBadge from "@/components/pokemon/PokeBadge";
//Types
import type { NamedAPIResource } from "pokenode-ts";

/**
 * Renders a list of Pokémon moves as clickable badges with custom background color.
 * @param {Array} moves - The array of move objects, e.g., [{ name: string, url: string }]
 * @param {string} color - The CSS color string (e.g., hex code like '#34ebcf') for the badge background.
 */
function MoveList({ moves, className = "" }) {
  const moveList = moves ?? [];

  // Handle the case where there are no moves
  if (moveList.length === 0) {
    return (
      <Container className="my-3">
        <p className="text-center">No moves available.</p>
      </Container>
    );
  }

  return (
    <Container className="my-3">
      <div className="d-flex flex-wrap gap-2">
        {moveList.map((move: NamedAPIResource, index: number) => (
          <Link
            key={move.name}
            href={`/pokemon/move?name=${move.name}`}
            className="text-decoration-none"
            passHref
          >
            <PokeBadge
              name={move.name}
              className={
                className ? className : index % 2 === 0 ? "" : "bgGray"
              }
            />
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default MoveList;
