import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Components ---
import PokemonGenerationClientPage from "@/components/pages/PokemonGenerationClientPage";

export const metadata: Metadata = {
  title: "Pokémon Generation",
};

export default function PokemonGenerationPage() {
  return (
    <PageLayout headerShowBadge={true}>
      <Container className="main-content mt-3 mb-3">
        <Row className="shadow-lg mt-3 p-3 bg-body rounded">
          <PokemonGenerationClientPage />
        </Row>
      </Container>
    </PageLayout>
  );
}
