import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Components ---
import PokemonRegionClientPage from "@/components/pages/PokemonRegionClientPage";

export const metadata: Metadata = {
  title: "Pokémon Region",
};

export default function PokemonRegionPage() {
  return (
    <PageLayout headerShowBadge={true}>
      <Container className="main-content mt-3 mb-3">
        <Row className="shadow-lg mt-3 p-3 bg-body rounded">
          <PokemonRegionClientPage />
        </Row>
      </Container>
    </PageLayout>
  );
}
