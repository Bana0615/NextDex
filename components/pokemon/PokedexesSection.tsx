"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Badge, Col, Row } from "react-bootstrap";
import { GameClient, NamedAPIResource } from "pokenode-ts";

function PokedexesSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexes, setPokedexes] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    (async () => {
      const api = new GameClient();

      await api
        .listPokedexes(0, 100)
        .then((data) => { console.log(data); setPokedexes(data.results); })
        .catch((error) => console.error(error));
    })();

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <Row g={2}>
          <h4 className="text-center mb-3">Pokédexes</h4>
          {pokedexes.map((type) => (
            <Col key={type.name} className="mb-2 px-1">
              <a
                href={`/pokedex?id=${type.name}`}
                style={{ textDecoration: "none" }}
              >
                <Badge
                  className="w-100 d-flex align-items-center justify-content-center"
                  style={{
                    color: "#fff",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                    padding: ".6em .5em",
                    maxWidth: "120px"
                  }}
                >
                  <span>{type.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</span>
                </Badge>
              </a>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default PokedexesSection;
