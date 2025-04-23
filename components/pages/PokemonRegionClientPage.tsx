"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// --- Next ---
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// --- Components ---
import { LocationClient, Region } from "pokenode-ts";
import LanguageTable from "@/components/pokemon/LanguageTable";
import SclBadge from "@/components/_silabs/SclBadge";
// --- Helpers ---
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
import { createNamedAPIResourceSentence } from "@/helpers/createNamedAPIResourceSentence";

export default function PokemonRegionClientPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PokemonRegionClientSection />
    </Suspense>
  );
}

function PokemonRegionClientSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<Region | null>(null);
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

    const api = new LocationClient();

    api
      .getRegionByName(nameParam)
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Pokémon Region data:", error);
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
          Could not load Pokémon Region data. The requested Pokémon Region might
          not exist or there was an error.
        </p>
        <Link href="/">Go back to homepage</Link>
      </Container>
    );
  }

  // --- Render successful data ---
  return (
    <>
      <h2 className="fw-bold mb-3 text-center">
        {formattedName} <small className="text-muted">(region)</small>
      </h2>
      <Row className="mt-5">
        <Col md={9}>
          {/* <p>This is the description</p>
                      <hr /> */}
          <h4 className="text-center">Main Generation</h4>
          {apiData?.main_generation?.name ? (
            <p>
              The main generation for {formattedName} is{" "}
              <Link
                href={`/pokemon/generation?name=${apiData.main_generation.name}`}
              >
                {apiData.main_generation.name}
              </Link>
              .
            </p>
          ) : (
            <p>There is no main generation data for this region</p>
          )}
          {apiData.version_groups && apiData.version_groups.length > 0 && (
            <>
              <hr />
              <h4 className="text-center">Game Versions</h4>
              {createNamedAPIResourceSentence(
                `${formattedName} Region is associated with the version groups:`,
                `${formattedName} is not associated with any specific version groups`,
                "/pokemon/game",
                apiData.version_groups
              )}
            </>
          )}
          {apiData?.pokedexes && (
            <>
              <hr />
              <h3 className="text-center mb-4">
                {`Pokédexes `}
                <small>
                  <SclBadge
                    name={apiData?.pokedexes.length.toString()}
                    fullWidth={false}
                  />
                </small>
              </h3>
              <div className="d-flex flex-wrap gap-2">
                {apiData.pokedexes.map((item, index) => (
                  <Link
                    key={item.name}
                    href={`/pokedex?name=${item.name}`}
                    className="text-decoration-none"
                    passHref
                  >
                    <SclBadge
                      name={item.name}
                      badgeOverwrite={index % 2 === 0 ? "bgPoke" : "bgGray"}
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </Col>
        <Col md={3}>
          <Row className="justify-content-center text-center">
            {apiData?.locations && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">{apiData.locations.length}</h3>
                <p className="mt-1">{`Locations in the ${formattedName} region`}</p>
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
        {apiData?.locations && (
          <Col xs={12}>
            <hr />
            <h3 className="text-center mb-4">
              {`${formattedName} Locations `}
              <small>
                <SclBadge
                  name={apiData?.locations.length.toString()}
                  fullWidth={false}
                />
              </small>
            </h3>
            <div className="d-flex flex-wrap gap-2">
              {apiData.locations.map((item, index) => (
                <Link
                  key={item.name}
                  href={`/pokemon/location?name=${item.name}`}
                  className="text-decoration-none"
                  passHref
                >
                  <SclBadge
                    name={item.name}
                    badgeOverwrite={index % 2 === 0 ? "bgPoke" : "bgGray"}
                  />
                </Link>
              ))}
            </div>
          </Col>
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
      <p className="mt-2">Loading Pokémon Region Data...</p>
    </Container>
  );
}
