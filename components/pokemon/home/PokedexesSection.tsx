"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Col, Row } from "react-bootstrap";
import { GameClient, NamedAPIResource } from "pokenode-ts";
//Helpers
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";

function PokedexesSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexes, setPokedexes] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    (async () => {
      const api = new GameClient();

      await api
        .listPokedexes(0, 100)
        .then((data) => {
          setPokedexes(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    })();
  }, []);

  return (
    <Row g={2}>
      <h4 className="text-center mb-3">Pokédexes</h4>
      {isLoading ? (
        <Col className="text-center">Loading Pokédexes...</Col>
      ) : (
        pokedexes.map((value, index) => (
          <Col key={value.name} className="mb-2 px-1">
            <Link
              href={`/pokedex?name=${value.name}`}
              style={{ textDecoration: "none" }}
            >
              <Badge
                className="w-100 d-flex align-items-center justify-content-center"
                bg={index % 2 === 0 ? "danger" : "secondary"}
                style={{
                  color: "#fff",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                  padding: ".6em .5em",
                  maxWidth: "120px",
                }}
              >
                <span>{capitalizeFirstLetter(value.name)}</span>
              </Badge>
            </Link>
          </Col>
        ))
      )}
    </Row>
  );
}

export default PokedexesSection;
