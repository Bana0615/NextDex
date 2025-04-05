import React from "react";
import Link from "next/link"; // Using Next.js Link
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// Optional: Import Placeholder if you want loading states for images
// import Placeholder from 'react-bootstrap/Placeholder';

// Helper function to extract ID from the PokeAPI URL - Remains the same
const getPokemonIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/").filter((part) => part !== "");
  return parts[parts.length - 1];
};

// Helper function to capitalize names - Remains the same
const capitalize = (s) => {
  return s && s.charAt(0).toUpperCase() + s.slice(1);
};

// Accept the array directly as a prop named 'pokemonList'
function PokemonGrid({ pokemonList }) {
  // Use the passed prop directly, provide default empty array for safety
  const listToRender = pokemonList ?? [];

  // Show a message if the list is empty
  if (listToRender.length === 0) {
    return (
      <Container className="my-4 text-center">
        <p>No Pokémon to display.</p>
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
        {/* Map directly over the listToRender array */}
        {listToRender.map((item) => {
          // Access data within each item
          const name = item.pokemon.name;
          const url = item.pokemon.url;
          const slot = item.slot;
          const pokemonId = getPokemonIdFromUrl(url);

          const imageUrl = pokemonId
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
            : "/images/pokedex/question_mark.png"; // Fallback image

          return (
            // Use a unique key for each item in the list
            <Col key={`${pokemonId}-${name}`}>
              <Link
                href={`/pokemon?name=${name}`} // Use href for Next.js Link
                className="text-decoration-none text-reset d-block h-100"
              >
                <Card className="h-100 text-center shadow-sm pokemon-card">
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={capitalize(name)}
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
                      {capitalize(
                        name
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      )}
                    </Card.Title>
                    <Card.Text className="small text-muted mb-0">
                      Slot: {slot}
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

export default PokemonGrid;

// How you would use this component:
/*
import PokemonGrid from './PokemonGrid';

function YourPage() {
  // Assume 'pokemonDataArray' holds the array you provided
  const pokemonDataArray = [
    { pokemon: { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" }, slot: 1 },
    { pokemon: { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" }, slot: 1 },
    // ... rest of the array
  ];

  return (
    <div>
      <h1>Pokemon</h1>
      <PokemonGrid pokemonList={pokemonDataArray} /> {/* Pass the array directly *}
    </div>
  );
}
*/
