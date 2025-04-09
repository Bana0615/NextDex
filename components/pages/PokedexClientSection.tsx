"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Link from "next/link";
// Import hooks from 'next/navigation' for App Router
import { useRouter, useSearchParams } from "next/navigation";
//Components
import { GameClient, Pokedex } from "pokenode-ts";
import PokemonEntryList from "@/components/pokemon/PokemonEntryList";
import PokeBadge from "@/components/pokemon/PokeBadge";
import LanguageTable from "@/components/pokemon/LanguageTable";
//Helpers
import { formatName } from "@/helpers/formatName";
import { createVersionGroupsSentence } from "@/helpers/createVersionGroupsSentence";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// Wrap the component that uses useSearchParams in Suspense
// This is often needed because searchParams might not be available during initial server render phases
// and Suspense provides a fallback. Alternatively, handle loading state carefully.
// For simplicity here, we'll wrap the main export.
export default function PokedexClientSectionWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PokedexClientSection />
    </Suspense>
  );
}

// The actual component logic
function PokedexClientSection() {
  const router = useRouter(); // Use router from next/navigation
  const searchParams = useSearchParams(); // Use searchParams hook

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<Pokedex | null>(null); // Initialize with null for clarity
  const [formattedName, setFormattedName] = useState<string>("");
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false); // State to track errors

  useEffect(() => {
    // Get the 'name' parameter using the hook
    const nameParam = searchParams?.get("name");

    // Handle case where nameParam is missing or empty
    if (!nameParam) {
      console.warn("No 'name' parameter found in URL.");
      // Optionally redirect to a specific page or show an error message
      // router.replace("/some-error-page-or-list");
      setErrorOccurred(true); // Indicate an error state
      setIsLoading(false);
      return; // Stop execution
    }

    // Reset state for new fetch
    setIsLoading(true);
    setErrorOccurred(false);
    setApiData(null);
    setFormattedName(formatName(nameParam)); // Format the name for display

    const api = new GameClient();

    api
      .getPokedexByName(nameParam)
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Pokedex data:", error);
        // Handle API errors (e.g., Pokedex not found)
        setErrorOccurred(true);
        // Optionally, you could check error status (like 404)
        // and redirect using router.replace('/404') if desired
        // router.replace('/404'); // Example redirect on fetch error
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading is set to false in both success and error cases
      });

    // The dependency array should include `searchParams` because the effect
    // needs to re-run if the search parameters change.
  }, [searchParams, router]); // Add router if you use it inside the effect (e.g., for redirects on error)

  if (isLoading) {
    return <LoadingFallback />; // Use the reusable loading component
  }

  if (errorOccurred || !apiData) {
    return (
      <Container className="text-center py-5">
        <p className="text-danger">
          Could not load Pokedex data. The requested Pokedex might not exist or
          there was an error.
        </p>
        {/* Optional: Add a link back */}
        <Link href="/pokedex-list">Go back to Pokedex List</Link>
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
        {/* Wrap content in a single Row for better structure if needed */}
        <Col md={9}>
          <Row className="mt-5">
            {" "}
            {/* This Row might be redundant depending on layout */}
            {/* Region Section */}
            <h4 className="text-center">Region</h4>
            {apiData.region?.name ? (
              <p>
                This Pokédex is from the{" "}
                <Link href={`/region?name=${apiData.region.name}`}>
                  {" "}
                  {/* Assuming /region route */}
                  {formatName(apiData.region.name)}{" "}
                  {/* Format region name too */}
                </Link>{" "}
                region.
              </p>
            ) : (
              <p>This Pokédex is not associated with a specific main region.</p>
            )}
            {/* Version Groups Section */}
            {apiData.version_groups && apiData.version_groups.length > 0 && (
              <>
                <hr />
                <h4 className="text-center">Game Versions</h4>
                {createVersionGroupsSentence(
                  formattedName,
                  apiData.version_groups
                )}
              </>
            )}
          </Row>
        </Col>
        <Col md={3}>
          <Row className="justify-content-center text-center mt-5 mt-md-0">
            {" "}
            {/* Added margin top for mobile */}
            {/* Main Series Check */}
            <Col xs={6}>
              {" "}
              {/* Adjusted column size for better spacing */}
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
              {/* Simplified text */}
            </Col>
            {/* Pokemon Count */}
            {apiData.pokemon_entries && (
              <Col xs={6}>
                {" "}
                {/* Adjusted column size */}
                <h3 className="fw-bold mb-0">
                  {apiData.pokemon_entries.length}
                </h3>
                <p className="mt-1 small">{`Pokémon`}</p>{" "}
                {/* Simplified text */}
              </Col>
            )}
          </Row>

          {/* Language Names Table */}
          {apiData.names && apiData.names.length > 0 && (
            <>
              <hr />
              <LanguageTable data={apiData.names} />
            </>
          )}
        </Col>
      </Row>

      {/* Pokemon Entries List */}
      <div className="mt-5">
        {apiData.pokemon_entries && apiData.pokemon_entries.length > 0 ? (
          <>
            <h3 className="text-center mb-4">
              Pokémon in the {formattedName} Pokédex{" "}
              <small>
                <PokeBadge
                  name={apiData.pokemon_entries.length.toString()}
                  className={""} // Add specific classes if needed
                  fullWidth={false}
                />
              </small>
            </h3>
            <PokemonEntryList data={apiData.pokemon_entries} />
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
      <p className="mt-2">Loading Pokedex Data...</p>
    </Container>
  );
}
