"use client";

import React from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
// --- Components ---
import SclBadge from "@/components/_silabs/SclBadge";
// --- Data ---
import typesData from "@/json/pokemon/types.json";
// --- Types ---
import type { PokemonType } from "@/types/pokemon/Types";

function TypesSection() {
  const types: Record<string, PokemonType> = typesData ?? {};

  return (
    <Row g={2}>
      <h4 className="text-center mb-3">Pokémon Types</h4>
      {Object.entries(types).map(([typeName, typeDetails]) => (
        <Col key={typeName} xs={4} lg={2} className="mb-2 px-1">
          <Link
            href={`/pokemon/type?name=${typeName}`}
            style={{ textDecoration: "none" }}
          >
            <SclBadge
              name={typeName}
              badgeOverwrite={typeDetails.className}
              imgSrc={`/images/pokemon/types/transparent/${typeDetails.imgSrc}`}
              fullWidth={true}
            />
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default TypesSection;
