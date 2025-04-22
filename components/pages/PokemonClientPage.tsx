"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { PokemonClient, Pokemon } from "pokenode-ts";
// --- Next ---
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
// --- Components ---
import PokemonSpritesDisplay from "@/components/pokemon/PokemonSpritesDisplay";
import MoveList from "@/components/pokemon/MoveList";
import SclBadge from "@/components/_silabs/SclBadge";
import LanguageTable from "@/components/pokemon/LanguageTable";
// --- Helpers ---
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
import { createNamedAPIResourceSentence } from "@/helpers/createNamedAPIResourceSentence";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<Pokemon | null>(null);
  const [formattedName, setFormattedName] = useState<string>("");
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  useEffect(() => {
    const nameParam = searchParams?.get("name") ?? "";

    // Handle case where nameParam is missing or empty
    if (!nameParam) {
      console.warn("No 'name' parameter found in URL.");
      setErrorOccurred(true);
      setIsLoading(false);
      return;
    }

    // Reset state for new fetch
    setIsLoading(true);
    setErrorOccurred(false);
    setApiData(null);
    setFormattedName(capitalizeFirstLetter(nameParam));

    const api = new PokemonClient();

    api
      .getPokemonByName(nameParam)
      .then((data) => {
        //TODO: Figure out what is_default is used for
        const test = { ...data };
        delete test.id;
        delete test.name;
        delete test.base_experience;
        delete test.height;
        delete test.weight;
        delete test.order;
        delete test.abilities;
        delete test.forms;
        console.log("test", test);
        setApiData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Pokémon data:", error);
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
        {formattedName} <small className="text-muted">(type)</small>
      </h2>
      <Row>
        <Col md={9}>
          <p>
            The <a href="https://pokeapi.co/">PokéApi</a>{" "}
            <span className="fw-bold">id</span> for {formattedName} is{" "}
            {apiData?.id ?? "???"}.
          </p>
          <p>
            {`The base experience gained for defeating ${formattedName} is ${
              apiData?.base_experience ?? "???"
            }.`}
          </p>
          {apiData.forms && apiData.forms.length > 0 && (
            <>
              {createNamedAPIResourceSentence(
                `${formattedName}'s form(s): `,
                `${formattedName} does not have any forms.`,
                "/pokemon/form",
                apiData.forms
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
                <h3 className="fw-bold mb-0">{apiData?.abilities.length}</h3>
                <p className="mt-1">Abilities</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <Row className="mt-4 pt-3 border-top">
        {apiData?.abilities && (
          <div className="my-4">
            <h3 className="text-center mb-3">
              Abilities
              <small className="ms-2">
                <SclBadge
                  name={apiData.abilities.length.toString()}
                  badgeOverwrite="bgPoke"
                />
              </small>
            </h3>
            {apiData.abilities.length > 0 ? (
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
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
              <p className="text-muted">
                This Pokémon has no listed abilities.
              </p>
            )}
          </div>
        )}
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
