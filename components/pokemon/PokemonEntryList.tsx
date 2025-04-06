import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
//Helpers
import { formatName } from "@/helpers/formatName";
import { getPokemonIdFromUrl } from "@/helpers/getPokemonIdFromUrl";
//Styles
import styles from "@/public/styles/components/PokemonGrid.module.css";
//Types
import { PokemonEntry } from "pokenode-ts";

interface PokemonEntryListProps {
  data: PokemonEntry[];
}

function PokemonEntryList({ data }: PokemonEntryListProps) {
  const listToRender = data ?? [];

  if (listToRender.length === 0) {
    return (
      <Container className="my-4 text-center">
        <p>No Pokémon entries to display.</p>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4">
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        xl={5}
        className="g-4 justify-content-center"
      >
        {listToRender.map((item) => {
          const name = item.pokemon_species.name;
          const url = item.pokemon_species.url;
          const entry_number = item.entry_number;

          const pokemonId = getPokemonIdFromUrl(url);

          const imageUrl = pokemonId
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
            : "/images/pokedex/question_mark.png"; // Fallback image

          return (
            <Col key={entry_number}>
              <Link
                href={`/pokemon?name=${name}`}
                className="text-decoration-none text-reset d-block h-100"
              >
                <Card
                  className={`h-100 text-center shadow-sm ${styles.pokemonCard}`}
                >
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={formatName(name)}
                    style={{
                      width: "96px",
                      height: "96px",
                      objectFit: "contain",
                      margin: "1rem auto 0",
                    }}
                    loading="lazy"
                  />
                  <Card.Body className="d-flex flex-column justify-content-center">
                    <Card.Title as="h6" className="mb-1">
                      {formatName(name)}
                    </Card.Title>
                    <Card.Text className="small text-muted mb-0">
                      Entry #: {entry_number}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default PokemonEntryList; // Export the new component name
