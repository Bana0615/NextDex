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
// --- Helpers ---
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
import { createNamedAPIResourceSentence } from "@/helpers/createNamedAPIResourceSentence";
// --- Font Awesome ---
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Renders a list of NamedAPIResource links, separated by commas/and
const renderResourceList = (resources, basePath, keyPrefix) => {
  if (!resources || resources.length === 0) return null;
  return resources.map((resource, index) => (
    <React.Fragment key={`${keyPrefix}-${resource.name}`}>
      {/* Conjunctions and separators */}
      {index > 0 &&
        index === resources.length - 1 &&
        resources.length > 1 &&
        " and "}
      {index > 0 && index < resources.length - 1 && ", "}
      {/* The Link */}
      <Link href={`${basePath}?name=${resource.name}`} passHref>
        {capitalizeFirstLetter(resource.name)}
      </Link>
    </React.Fragment>
  ));
};

// --- Helper Function (from previous example) ---
// Renders types with " / " separator
const renderLinkedTypes = (types, keyPrefix) => {
  if (!types || types.length === 0) return null;
  return types
    .sort((a, b) => a.slot - b.slot)
    .map((typeInfo, index) => (
      <React.Fragment key={`${keyPrefix}-${typeInfo.type.name}`}>
        {index > 0 && " / "}
        <Link href={`/pokemon/type?name=${typeInfo.type.name}`} passHref>
          {capitalizeFirstLetter(typeInfo.type.name)}
        </Link>
      </React.Fragment>
    ));
};

export default function PokemonClientPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PokemonClientSection />
    </Suspense>
  );
}

function PokemonClientSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // --- State Definitions ---
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<Pokemon | null>(null);
  const [apiSpeciesData, setApiSpeciesData] = useState<PokemonSpecies | null>(
    null
  );
  const [apiFormData, setApiFormData] = useState<PokemonForm | null>(null);
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
      setApiFormData(null);
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
      setApiFormData(null);
      setGames([]);
      setHeldItems([]);
      setMoves([]);
      setFormattedName(capitalizeFirstLetter(nameParam)); // Set name early for potential display

      try {
        // --- Create Promises ---
        // Order matters for destructuring results later
        const promises = [
          api.getPokemonSpeciesByName(nameParam), // Result 1: speciesData
          api.getPokemonFormByName(nameParam), // Result 2: formData
          api.getPokemonByName(nameParam), // Result 3: pokemonData
        ];

        // --- Execute Concurrently ---
        const [speciesData, formData, pokemonData] = (await Promise.all(
          promises
        )) as [PokemonSpecies, PokemonForm, Pokemon];

        // --- Process Successful Results ---
        console.log("getPokemonSpeciesByName data:", speciesData);
        setApiSpeciesData(speciesData);

        console.log("getPokemonFormByName data:", formData);
        setApiFormData(formData);

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
        setApiFormData(null);
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
          <p className="lead fs-6 mt-4 mb-5">
            {formattedName} is an{" "}
            {apiData.types && apiData.types.length > 0
              ? renderLinkedTypes(apiData.types, "current")
              : "Pokémon"}{" "}
            type Pokémon, registered in the{" "}
            <a href="https://pokeapi.co/">PokéApi</a> with an ID of{" "}
            {apiData.id ?? "???"}. Defeating {formattedName} grants{" "}
            {apiData.base_experience ?? "???"} base experience points.
            {/* Past Types */}
            {apiData.past_types && apiData.past_types.length > 0 && (
              <>
                {" "}
                Historically, its typing differed:{" "}
                {apiData.past_types.map((pastTypeInfo, genIndex) => {
                  const generationFormatted = capitalizeFirstLetter(
                    pastTypeInfo.generation.name
                  );
                  return (
                    <React.Fragment key={pastTypeInfo.generation.name}>
                      {genIndex > 0 && "; "}{" "}
                      {/* Separator for multiple past entries */}
                      in {generationFormatted}, it was classified as{" "}
                      {renderLinkedTypes(
                        pastTypeInfo.types,
                        pastTypeInfo.generation.name
                      )}
                    </React.Fragment>
                  );
                })}
                .
              </>
            )}
            <>
              {" "}
              It takes{" "}
              {apiData.forms.length > 1 ? " the forms of " : " the form of "}
              {renderResourceList(apiData.forms, "/pokemon/form", "form")}
              {heldItems && heldItems.length > 0 && " and"}
              {/* Items part */}
              {heldItems && heldItems.length > 0 ? (
                // Case: Items exist
                <>
                  {" "}
                  sometimes be encountered holding items such as{" "}
                  {renderResourceList(heldItems, "/pokemon/item", "item")}.
                </>
              ) : (
                // Case: No items exist
                <>
                  {" "}
                  and is not typically found holding any items when encountered.
                </>
              )}
            </>
          </p>
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
                              abilityItem.is_hidden ? "bgGray" : "bgPoke"
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
            <hr />
            {apiData?.height && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">
                  {apiData?.height} <small className="fw-normal">dm*</small>
                </h3>
                <p className="mt-1">Height</p>
              </Col>
            )}
            {apiData?.weight && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">
                  {apiData?.weight} <small className="fw-normal">hg**</small>
                </h3>
                <p className="mt-1">Weight</p>
              </Col>
            )}

            <h3 className="fs-5">Information</h3>
            <hr />
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
              badgeOverwrite="bgPoke"
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
              badgeOverwrite="bgPoke"
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
