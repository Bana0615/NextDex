"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { PokemonClient, Type as PokemonTypeData } from "pokenode-ts";
// --- Next ---
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
//Components
import PokemonSpritesDisplay from "@/components/pokemon/PokemonSpritesDisplay";
import PokemonGrid from "@/components/pokemon/PokemonGrid";
import MoveList from "@/components/pokemon/MoveList";
import SclBadge from "@/components/_silabs/SclBadge";
import LanguageTable from "@/components/pokemon/LanguageTable";
//Helpers
import { createDamageRelationSentences } from "@/helpers/createDamageRelationSentences";
import { createIndicesSentence } from "@/helpers/createIndicesSentence";
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
//Data
import typesData from "@/json/pokemon/types.json";
//Types
import { PokemonType } from "@/types/pokemon/Types";

export default function PokemonTypeClientSectionWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PokemonTypeClientSection />
    </Suspense>
  );
}

function PokemonTypeClientSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<PokemonTypeData | null>(null);
  const [formattedName, setFormattedName] = useState<string>("");
  const [typeData, setTypeData] = useState<PokemonType>();
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  useEffect(() => {
    const nameParam = searchParams?.get("name") ?? "";
    const foundType = typesData[nameParam.toLowerCase()] ?? null;

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
    setTypeData(foundType);

    const api = new PokemonClient();

    api
      .getTypeByName(nameParam)
      .then((data) => {
        setApiData(data as PokemonTypeData);
      })
      .catch((error) => {
        console.error("Failed to fetch Pokémon Type data:", error);
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
          Could not load Pokémon Type data. The requested Pokémon Type might not
          exist or there was an error.
        </p>
        <Link href="/">Go back to homepage</Link>
      </Container>
    );
  }

  // --- Render successful data ---
  return (
    <>
      <h2 className="fw-bold mb-3 text-center">
        {typeData && (
          <Image
            src={`/images/pokemon/types/color/${typeData.imgSrc}`}
            alt={`${formattedName} type icon`}
            height={35}
            width={35}
            style={{
              height: "1.1em",
              marginRight: "0.3em",
            }}
          />
        )}
        {formattedName} <small className="text-muted">(type)</small>
      </h2>
      <Row>
        <Col md={9}>
          <p>{typeData?.description ?? "No description available"}</p>
          {apiData?.damage_relations && (
            <>
              <hr />
              <h4 className="text-center">Damage Relations</h4>
              {createDamageRelationSentences(
                formattedName,
                apiData?.damage_relations
              )}
            </>
          )}
          {apiData?.game_indices && (
            <>
              <hr />
              <h4 className="text-center">Game Indices</h4>
              {createIndicesSentence(formattedName, apiData?.game_indices)}
            </>
          )}
          {apiData?.past_damage_relations &&
            apiData?.past_damage_relations.length > 0 && (
              <>
                <hr />
                <h4 className="text-center">Past Damage Relations</h4>
                {createDamageRelationSentences(
                  formattedName,
                  apiData?.past_damage_relations[0]
                )}
              </>
            )}
        </Col>
        <Col md={3}>
          <Row className="justify-content-center text-center">
            {apiData?.pokemon && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">{apiData?.pokemon.length}</h3>
                <p className="mt-1">{`${formattedName} Pokémon`}</p>
              </Col>
            )}
            {apiData?.moves && (
              <Col xs={12} md={6}>
                <h3 className="fw-bold mb-0">{apiData?.moves.length}</h3>
                <p className="mt-1">{`${formattedName}-type moves`}</p>
              </Col>
            )}
          </Row>
          {apiData?.generation && (
            <>
              <hr />
              <p className="mb-2">
                {`${formattedName} type pokémon were first introduced in `}
                <Link
                  href={`/pokemon/generation?name=${apiData?.generation.name}`}
                >
                  {apiData?.generation.name}
                </Link>
                {" of Pokémon."}
              </p>
            </>
          )}
          {apiData?.move_damage_class && (
            <>
              <hr />
              <p>
                The class of damage inflicted by this type is{" "}
                {apiData?.move_damage_class.name}
              </p>
            </>
          )}
          {apiData?.names && (
            <>
              <hr />
              <LanguageTable data={apiData.names} />
            </>
          )}
        </Col>
      </Row>
      <div className="mt-5">
        {apiData?.pokemon && (
          <>
            <h3 className="text-center mb-4">
              {`${formattedName} type Pokémon `}
              <small>
                <SclBadge
                  name={apiData?.pokemon.length.toString()}
                  badgeOverwrite={typeData?.className ?? "bgGray"}
                  fullWidth={false}
                />
              </small>
            </h3>
            <PokemonGrid data={apiData?.pokemon} />
          </>
        )}
        {apiData?.moves && (
          <>
            <hr />
            <h3 className="text-center mb-4">
              {`${formattedName}-type moves `}
              <small>
                <SclBadge
                  name={apiData?.moves.length.toString()}
                  badgeOverwrite={typeData?.className ?? "bgGray"}
                  fullWidth={false}
                />
              </small>
            </h3>
            <MoveList moves={apiData?.moves} className={typeData?.className} />
          </>
        )}
        {apiData?.sprites && (
          <>
            <hr />
            <PokemonSpritesDisplay spritesData={apiData?.sprites} />
          </>
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
      <p className="mt-2">Loading Pokémon Type Data...</p>
    </Container>
  );
}
