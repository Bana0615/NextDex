import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Metadata } from "next";
// Components
import PokemonRegionClientSection from "@/components/pages/PokemonRegionClientSection";

export const metadata: Metadata = {
  title: "Pokémon Region",
};

export default function PokemonRegionPage() {
  return (
    <Container className="main-content mt-3 mb-3">
      <Row className="shadow-lg mt-3 p-3 bg-body rounded">
        <PokemonRegionClientSection />
      </Row>
    </Container>
  );
}
