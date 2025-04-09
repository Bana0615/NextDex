import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokemon",
};

export default function PokedexPage() {
  return (
    <Container className="main-content mt-3 mb-3">
      <Row className="shadow-lg mt-3 p-3 bg-body rounded">
        <Row className="mt-5">
          <span className="text-center">Coming Soon.....</span>
        </Row>
      </Row>
    </Container>
  );
}
