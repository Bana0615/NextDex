"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// --- Next ---
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// --- Components ---
import { GameClient, Generation } from "pokenode-ts";
import LanguageTable from "@/components/pokemon/LanguageTable";
import SclBadge from "@/components/_silabs/SclBadge";
import PokemonGrid from "@/components/pokemon/PokemonGrid";
import NamedApiBadgeList from "@/components/pokemon/NamedApiBadgeList";
// --- Helpers ---
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
import { createNamedAPIResourceSentence } from "@/helpers/createNamedAPIResourceSentence";

export default function PokemonGenerationClientPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PokemonGenerationClientSection />
    </Suspense>
  );
}

function PokemonGenerationClientSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<Generation | null>(null);
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
      .getGenerationByName(nameParam)
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Pokémon Generation data:", error);
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
          Could not load Pokémon Generation data. The requested Pokémon
          Generation might not exist or there was an error.
        </p>
        <Link href="/">Go back to homepage</Link>
      </Container>
    );
  }

  // --- Render successful data ---
  return (
    <>
      <h2 className="fw-bold mb-3 text-center">
        {formattedName} <small className="text-muted">(generation)</small>
      </h2>
      <Row className="mt-5">
        <Col md={9}>
          {/* <p>This is the description</p>
                      <hr /> */}
          <h4 className="text-center">Region</h4>
          {apiData?.main_region?.name ? (
            <p>
              The main region for {formattedName} is{" "}
              <Link href={`/pokemon/region?name=${apiData.main_region.name}`}>
                {apiData.main_region.name}
              </Link>
              .
            </p>
          ) : (
            <p>There is no main region data for this region</p>
          )}
          {apiData.version_groups && apiData.version_groups.length > 0 && (
            <>
              <hr />
              <h4 className="text-center">Game Versions</h4>
              {createNamedAPIResourceSentence(
                `${formattedName} is associated with the version groups:`,
                `${formattedName} is not associated with any specific version groups`,
                "/pokemon/game",
                apiData.version_groups
              )}
            </>
          )}
          <hr />
          <h4 className="text-center">Pokémon Types</h4>
          {createNamedAPIResourceSentence(
            `${formattedName} introduced the following pokémon types:`,
            `${formattedName} did not introduce any pokémon types.`,
            "/pokemon/type",
            apiData.types
          )}
        </Col>
        <Col md={3}>
          <Row className="justify-content-center text-center">
            <h3 className="fs-5">{`Introduced in ${formattedName}`}</h3>
            <hr />
            {apiData?.pokemon_species && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">
                  {apiData?.pokemon_species.length}
                </h3>
                <p className="mt-1">Pokémon</p>
              </Col>
            )}
            {apiData?.types && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">{apiData?.types.length}</h3>
                <p className="mt-1">Pokémon Types</p>
              </Col>
            )}
            {apiData?.moves && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">{apiData?.moves.length}</h3>
                <p className="mt-1">Moves</p>
              </Col>
            )}
            {apiData?.abilities && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">{apiData?.abilities.length}</h3>
                <p className="mt-1">Abilities</p>
              </Col>
            )}
          </Row>
          {apiData?.names && (
            <>
              <hr />
              <LanguageTable data={apiData.names} />
            </>
          )}
        </Col>
      </Row>
      <Row>
        {apiData?.pokemon_species && (
          <>
            <h3 className="text-center mb-4">
              {`Pokémon Introduced `}
              <small>
                <SclBadge
                  name={apiData?.pokemon_species.length.toString()}
                  fullWidth={false}
                />
              </small>
            </h3>
            <PokemonGrid data={apiData?.pokemon_species} />
          </>
        )}
        {apiData?.moves && (
          <>
            <hr />
            <h3 className="text-center mb-4">
              {`Moves Introduced `}
              <small>
                <SclBadge
                  name={apiData?.moves.length.toString()}
                  fullWidth={false}
                />
              </small>
            </h3>
            <NamedApiBadgeList
              items={apiData?.moves}
              url={"/pokemon/move"}
            />
          </>
        )}
        {apiData?.abilities && (
          <>
            <hr />
            <h3 className="text-center mb-4">
              {`Abilities Introduced `}
              <small>
                <SclBadge
                  name={apiData?.abilities.length.toString()}
                  fullWidth={false}
                />
              </small>
            </h3>
            {apiData?.abilities.length > 0 ? (
              <div className="d-flex flex-wrap gap-2">
                {apiData.abilities.map((item, index) => (
                  <Link
                    key={item.name}
                    href={`/pokemon/ability?name=${item.name}`}
                    className="text-decoration-none"
                    passHref
                  >
                    <SclBadge
                      name={item.name}
                      badgeOverwrite={index % 2 === 0 ? "" : "bgGray"}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center">
                No abilities were introduced in this generation
              </p>
            )}
          </>
        )}
      </Row>
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
      <p className="mt-2">Loading Pokémon Generation Data...</p>
    </Container>
  );
}
