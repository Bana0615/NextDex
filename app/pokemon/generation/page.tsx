import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokémon Generation",
};

export default function PokemonGenerationPage() {
  return (
    <Container className="main-content mt-3 mb-3">
      <Row className="shadow-lg mt-3 p-3 bg-body rounded">
        <Row className="mt-5">
          <h2 className="text-center">Pokémon Generation</h2>
          <span className="text-center">Coming Soon.....</span>
        </Row>
      </Row>
    </Container>
  );
}
