import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Components ---
import PokemonTypeClientSection from "@/components/pages/PokemonTypeClientSection";

export const metadata: Metadata = {
  title: "Pokémon Type",
};

export default function PokedexPage() {
  return (
    <PageLayout headerShowBadge={true}>
      <Container className="main-content mt-3 mb-3">
        <Row className="shadow-lg mt-3 p-3 bg-body rounded">
          <PokemonTypeClientSection />
        </Row>
      </Container>
    </PageLayout>
  );
}
