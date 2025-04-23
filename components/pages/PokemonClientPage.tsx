"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// --- Next ---
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
// --- Pokemon ---
import {
  PokemonClient,
  Pokemon,
  NamedAPIResource,
  PokemonSpecies,
  PokemonForm,
} from "pokenode-ts";
// --- Components ---
import PokemonSpritesDisplay from "@/components/pokemon/PokemonSpritesDisplay";
import NamedApiBadgeList from "@/components/pokemon/NamedApiBadgeList";
import SclBadge from "@/components/_silabs/SclBadge";
import LanguageTable from "@/components/pokemon/LanguageTable";
// --- Components ---
import Description from "@/components/pages/sections/PokemonClientPage/Description";
import Cries from "@/components/pages/sections/PokemonClientPage/Cries";
// --- Helpers ---
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
// --- Font Awesome ---
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PokemonClientPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PokemonClientSection />
    </Suspense>
  );
}

function PokemonClientSection() {
  const searchParams = useSearchParams();
  // --- State Definitions ---
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<Pokemon | null>(null);
  const [apiSpeciesData, setApiSpeciesData] = useState<PokemonSpecies | null>(
    null
  );
  const [formattedName, setFormattedName] = useState<string>("");
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [games, setGames] = useState<NamedAPIResource[]>([]);
  const [heldItems, setHeldItems] = useState<NamedAPIResource[]>([]);
  const [moves, setMoves] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    const nameParam = searchParams?.get("name") ?? "";

    // --- Initial Check ---
    if (!nameParam) {
      console.warn("No 'name' parameter found in URL.");
      setErrorOccurred(true);
      setIsLoading(false);
      // Clear all data states if no name param
      setApiData(null);
      setApiSpeciesData(null);
      setGames([]);
      setHeldItems([]);
      setMoves([]);
      setFormattedName("");
      return; // Exit early
    }

    // --- API Client ---
    const api = new PokemonClient();

    // --- Async Fetch Function ---
    const fetchAllPokemonData = async () => {
      // Reset state for the new fetch operation
      setIsLoading(true);
      setErrorOccurred(false);
      setApiData(null); // Clear previous data before fetching
      setApiSpeciesData(null);
      setGames([]);
      setHeldItems([]);
      setMoves([]);
      setFormattedName(capitalizeFirstLetter(nameParam)); // Set name early for potential display

      try {
        // --- Create Promises ---
        // Order matters for destructuring results later
        const promises = [
          api.getPokemonSpeciesByName(nameParam),
          api.getPokemonByName(nameParam),
        ];

        // --- Execute Concurrently ---
        const [speciesData, pokemonData] = (await Promise.all(promises)) as [
          PokemonSpecies,
          Pokemon
        ];
        console.clear();

        // --- Process Successful Results ---
        console.log("getPokemonSpeciesByName data:", speciesData);
        setApiSpeciesData(speciesData);

        console.log("getPokemonByName data:", pokemonData);
        setApiData(pokemonData);
        // Extract derived data from pokemonData
        setGames(pokemonData?.game_indices.map((item) => item.version) ?? []);
        setHeldItems(pokemonData?.held_items.map((item) => item.item) ?? []);
        setMoves(pokemonData?.moves.map((item) => item.move) ?? []);

        // Ensure error state is false after successful fetch
        setErrorOccurred(false);
      } catch (error) {
        // --- Handle Errors from Any Promise ---
        console.error("Failed to fetch Pokémon data:", error);
        setErrorOccurred(true);
        // Clear data states on error
        setApiData(null);
        setApiSpeciesData(null);
        setGames([]);
        setHeldItems([]);
        setMoves([]);
      } finally {
        // --- Always run after try/catch ---
        setIsLoading(false);
      }
    };

    // --- Trigger the Fetch ---
    fetchAllPokemonData();
  }, [searchParams]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (errorOccurred || !apiData) {
    return (
      <Container className="text-center py-5">
        <p className="text-danger">
          Could not load Pokémon data. The requested Pokémon might not exist or
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
        {formattedName} <small className="text-muted">(pokémon)</small>
      </h2>
      <Row>
        <Col md={9}>
          <Description
            pokemonName={formattedName}
            apiData={apiData}
            heldItems={heldItems}
          />
          <Cries pokemonName={formattedName} apiData={apiData} />
          {apiData?.abilities && (
            <>
              {apiData.abilities.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  <span className="fw-bold">Abilities: </span>
                  {apiData.abilities
                    .sort((a, b) => a.slot - b.slot) // Sort by slot
                    .map((abilityItem) => (
                      <React.Fragment key={abilityItem.ability.name}>
                        <Link
                          href={`/pokemon/ability?name=${abilityItem.ability.name}`}
                          className="text-decoration-none"
                          title={
                            `${capitalizeFirstLetter(
                              abilityItem.ability.name
                            )} ` +
                            `(Slot ${abilityItem.slot})` +
                            (abilityItem.is_hidden ? " - Hidden Ability" : "") // Indicate if hidden based on the flag
                          }
                          passHref
                        >
                          <SclBadge
                            name={abilityItem.ability.name}
                            badgeOverwrite={
                              abilityItem.is_hidden ? "bgGray" : "bgNext"
                            }
                            faIcon={
                              abilityItem.is_hidden ? faEyeSlash : undefined
                            }
                          />
                        </Link>
                      </React.Fragment>
                    ))}
                </div>
              ) : (
                <p className="text-muted">Abilities: None</p>
              )}
            </>
          )}
        </Col>
        <Col md={3}>
          <Row className="justify-content-center text-center">
            <h3 className="fs-5">Physicals</h3>
            <Col xs={12} md={6}>
              <h3 className="fw-bold mb-0">
                {apiData?.height ?? "???"}{" "}
                <small className="fw-normal">dm*</small>
              </h3>
              <p className="mt-1">Height</p>
            </Col>
            <Col xs={12} md={6}>
              <h3 className="fw-bold mb-0">
                {apiData?.weight ?? "???"}{" "}
                <small className="fw-normal">hg**</small>
              </h3>
              <p className="mt-1">Weight</p>
            </Col>

            <hr />
            <h3 className="fs-5">Information</h3>
            {apiData?.order && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">{apiData?.order}</h3>
                <p className="mt-1">Order***</p>
              </Col>
            )}
            {apiData?.abilities && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">{apiData.abilities.length}</h3>
                <p className="mt-1">Abilities</p>
              </Col>
            )}
            <Col xs={12} md={6}>
              <h3 className="fw-bold mb-0">{games.length}</h3>
              <p className="mt-1">Games</p>
            </Col>
            <Col xs={12} md={6}>
              <h3 className="fw-bold mb-0">{heldItems.length}</h3>
              <p className="mt-1">Held Items</p>
            </Col>
            <Col xs={12} md={6}>
              <h3 className="fw-bold mb-0">{moves.length}</h3>
              <p className="mt-1">Moves</p>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Games */}
      <Row className="mt-4 pt-3 border-top">
        <h3 className="text-center mb-4">
          {`Games `}
          <small>
            <SclBadge
              name={games.length.toString()}
              fullWidth={false}
              badgeOverwrite="bgNext"
            />
          </small>
        </h3>
        <NamedApiBadgeList items={games} url={"/pokemon/game"} />
      </Row>

      {/* Moves */}
      <Row className="mt-4 pt-3 border-top">
        <h3 className="text-center mb-4">
          {`Moves `}
          <small>
            <SclBadge
              name={moves.length.toString()}
              fullWidth={false}
              badgeOverwrite="bgNext"
            />
          </small>
        </h3>
        <NamedApiBadgeList items={moves} url={"/pokemon/move"} />
      </Row>

      {/* --- Legend --- */}
      <Row className="mt-4 pt-3 border-top">
        <Col>
          <p className="text-muted small text-center mb-0">
            * dm = decimeter (1 dm = 10 cm or approx 3.94 inches)
            <br />
            ** hg = hectogram (1 hg = 100 g or approx 0.22 lbs)
            <br />
            *** Order for sorting. Almost national order, except families are
            grouped together.
          </p>
        </Col>
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
      <p className="mt-2">Loading Pokémon Data...</p>
    </Container>
  );
}
