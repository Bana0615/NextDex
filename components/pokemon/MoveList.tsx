import React from "react";
import Link from "next/link";
import { Badge, Container } from "react-bootstrap";
import PokeBadge from "@/components/pokemon/PokeBadge";

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
        <p>No moves available.</p>
      </Container>
    );
  }

  return (
    <Container className="my-3">
      <h5 className="mb-3">Moves</h5>
      <div className="d-flex flex-wrap gap-2">
        {moveList.map((move) => (
          <Link
            key={move.name}
            href={`/pokemon/move?name=${move.name}`}
            className="text-decoration-none"
            passHref
          >
            <PokeBadge name={move.name} className={className} />
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default MoveList;
