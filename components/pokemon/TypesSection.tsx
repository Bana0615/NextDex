"use client";

import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import typesData from "@/json/pokemon/types.json";
import { PokemonType } from "@/types/pokemon/Types";

function TypesSection() {
  const types: PokemonType[] = typesData ?? [];

  return (
    <Row g={2}>
      {types.map((type) => (
        <Col key={type.name} xs={4} lg={2} className="mb-2 px-1">
          <a
            href={`/pokemon/type?id=${type.name}`}
            style={{ textDecoration: "none" }}
          >
            <Badge
              className="w-100 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: `${type.color} !important`,
                color: "#fff",
                textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                padding: "0.5em !important",
              }}
            >
              {type.imgSrc && (
                <img
                  src={type.imgSrc}
                  alt={`${type.name} type icon`}
                  style={{
                    height: "1.0em",
                    marginRight: "0.3em",
                  }}
                />
              )}
              <span>{type.name}</span>{" "}
            </Badge>
          </a>
        </Col>
      ))}
    </Row>
  );
}

export default TypesSection;
