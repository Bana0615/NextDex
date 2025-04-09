"use client";
import React from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import PokeBadge from "@/components/pokemon/PokeBadge";
//Data
import typesData from "@/json/pokemon/types.json";
//Types
import { PokemonType } from "@/types/pokemon/Types";

function TypesSection() {
  const types: PokemonType[] = typesData ?? [];

  return (
    <Row g={2}>
      <h4 className="text-center mb-3">Pokémon Types</h4>
      {types.map((type) => (
        <Col key={type.name} xs={4} lg={2} className="mb-2 px-1">
          <Link
            href={`/pokemon/type?name=${type.name}`}
            style={{ textDecoration: "none" }}
          >
            <PokeBadge
              name={type.name}
              className={type.className}
              imgSrc={type.imgSrc}
            />
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default TypesSection;
