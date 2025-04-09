import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Metadata } from "next";
// Components
import PokedexClientSection from "@/components/pages/PokedexClientSection";

export const metadata: Metadata = {
  title: "Pokedex",
};

export default function PokedexPage() {
  return (
    <Container className="main-content mt-3 mb-3">
      <Row className="shadow-lg mt-3 p-3 bg-body rounded">
        <PokedexClientSection />
      </Row>
    </Container>
  );
}
