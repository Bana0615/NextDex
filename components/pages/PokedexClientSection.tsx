"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Link from "next/link";
// Import hooks from 'next/navigation' for App Router
import { useRouter, useSearchParams } from "next/navigation";
//Components
import { GameClient, Pokedex } from "pokenode-ts";
import PokemonGrid from "@/components/pokemon/PokemonGrid";
import PokeBadge from "@/components/pokemon/PokeBadge";
import LanguageTable from "@/components/pokemon/LanguageTable";
//Helpers
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
import { createNamedAPIResourceSentence } from "@/helpers/createNamedAPIResourceSentence";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function PokedexClientSectionWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PokedexClientSection />
    </Suspense>
  );
}

function PokedexClientSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<Pokedex | null>(null);
  const [formattedName, setFormattedName] = useState<string>("");
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  useEffect(() => {
    const nameParam = searchParams?.get("name");

    // Handle case where nameParam is missing or empty
    if (!nameParam) {
      console.warn("No 'name' parameter found in URL.");
      setErrorOccurred(true); // Indicate an error state
      setIsLoading(false);
      return;
    }

    // Reset state for new fetch
    setIsLoading(true);
    setErrorOccurred(false);
    setApiData(null);
    setFormattedName(capitalizeFirstLetter(nameParam));

    const api = new GameClient();

    api
      .getPokedexByName(nameParam)
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Pokédex data:", error);
        setErrorOccurred(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams, router]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (errorOccurred || !apiData) {
    return (
      <Container className="text-center py-5">
        <p className="text-danger">
          Could not load Pokédex data. The requested Pokédex might not exist or
          there was an error.
        </p>
        <Link href="/">Go back to homepage</Link>
      </Container>
    );
  }

  // --- Render successful data ---
  return (
    <>
      <h2 className="fw-bold mb-3 text-center">
        {formattedName} <small className="text-muted">(Pokédex)</small>
      </h2>
      <Row>
        {" "}
        <Col md={9}>
          <Row className="mt-5">
            <h4 className="text-center">Region</h4>
            {apiData.region?.name ? (
              <p>
                This Pokédex is from the{" "}
                <Link href={`/pokemon/region?name=${apiData.region.name}`}>
                  {capitalizeFirstLetter(apiData.region.name)}
                </Link>{" "}
                region.
              </p>
            ) : (
              <p>This Pokédex is not associated with a specific main region.</p>
            )}
            {apiData.version_groups && apiData.version_groups.length > 0 && (
              <>
                <hr />
                <h4 className="text-center">Game Versions</h4>
                {createNamedAPIResourceSentence(
                  `${formattedName} Pokédex is associated with the version groups:`,
                  `${formattedName} is not associated with any specific version groups`,
                  "/pokemon/game",
                  apiData.version_groups
                )}
              </>
            )}
          </Row>
        </Col>
        <Col md={3}>
          <Row className="justify-content-center text-center mt-5 mt-md-0">
            <Col xs={6}>
              <h3 className="fw-bold mb-0">
                {apiData.is_main_series ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#188754" }}
                    title="Main Series"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "#de3544" }}
                    title="Not Main Series"
                  />
                )}
              </h3>
              <p className="mt-1 small">{`Main Series`}</p>{" "}
            </Col>
            {apiData.pokemon_entries && (
              <Col xs={6}>
                <h3 className="fw-bold mb-0">
                  {apiData.pokemon_entries.length}
                </h3>
                <p className="mt-1 small">{`Pokémon`}</p>{" "}
              </Col>
            )}
          </Row>

          {apiData.names && apiData.names.length > 0 && (
            <>
              <hr />
              <LanguageTable data={apiData.names} />
            </>
          )}
        </Col>
      </Row>

      <div className="mt-5">
        {apiData.pokemon_entries && apiData.pokemon_entries.length > 0 ? (
          <>
            <h3 className="text-center mb-4">
              Pokémon in the {formattedName} Pokédex{" "}
              <small>
                <PokeBadge
                  name={apiData.pokemon_entries.length.toString()}
                  className={""}
                  fullWidth={false}
                />
              </small>
            </h3>
            <PokemonGrid data={apiData.pokemon_entries} />
          </>
        ) : (
          <p className="text-center">
            No Pokémon entries found for this Pokédex.
          </p>
        )}
      </div>
    </>
  );
}

// Reusable Loading Fallback Component
function LoadingFallback() {
  return (
    <Container className="text-center py-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-2">Loading Pokédex Data...</p>
    </Container>
  );
}
