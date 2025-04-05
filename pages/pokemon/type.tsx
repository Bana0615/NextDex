import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { PokemonClient, Type as PokemonTypeData } from "pokenode-ts";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
import PokemonSpritesDisplay from "@/components/pokemon/PokemonSpritesDisplay";
import PokemonGrid from "@/components/pokemon/PokemonGrid";
//Helpers
import { createDamageRelationSentences } from "@/helpers/createDamageRelationSentences";
import { createIndicesSentence } from "@/helpers/createIndicesSentence";
//Data
import typesData from "@/json/pokemon/types.json";
//Types
import { PokemonType } from "@/types/pokemon/Types";

export default function TypePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);
  const [apiData, setApiData] = useState<PokemonTypeData>();
  const [typeData, setTypeData] = useState<PokemonType>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name") ?? "";
    const foundType = typesData.find(
      (type) => type.name.toLowerCase() === nameParam.toLowerCase()
    );

    if (nameParam === null || !foundType) {
      router.replace("/404");
      return;
    }

    setValue(
      nameParam.charAt(0).toUpperCase() + nameParam.slice(1).toLowerCase()
    );
    setTypeData(foundType);
    (async () => {
      const api = new PokemonClient();

      await api
        .getTypeByName(nameParam)
        .then((data) => {
          //delete tmp.moves; //TODO: More with this
          setApiData(data as PokemonTypeData);
        })
        .catch((error) => console.error(error));
    })();

    setIsLoading(false);
  }, [router]);

  return (
    <>
      <Head>
        <title>{`${value} type Pokémon | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
        <meta name="description" content={typeData?.description ?? ""} />
        {/* <meta name="keywords" content="" /> */}
      </Head>
      <div className="main-container">
        <MonHeader showBadge={true} />
        <Container className="main-content">
          <Row className="shadow-lg my-3 p-3 bg-body rounded">
            <Col>
              {!isLoading && value && (
                <>
                  <h2 className="fw-bold mb-3 text-center">
                    {typeData && (
                      <Image
                        src={`/images/pokemon/types/color/${typeData.imgSrc}`}
                        alt={`${typeData.name} type icon`}
                        height={35}
                        width={35}
                        style={{
                          height: "1.1em",
                          marginRight: "0.3em",
                        }}
                      />
                    )}
                    {value} <small className="text-muted">(type)</small>
                  </h2>
                  <Row>
                    <Col md={9}>
                      <p>{typeData?.description}</p>
                      {apiData?.damage_relations && (
                        <>
                          <hr />
                          <h4 className="text-center">Damage Relations</h4>
                          {createDamageRelationSentences(
                            value,
                            apiData?.damage_relations
                          )}
                        </>
                      )}
                      {apiData?.game_indices && (
                        <>
                          <hr />
                          <h4 className="text-center">Game Indices</h4>
                          {createIndicesSentence(value, apiData?.game_indices)}
                        </>
                      )}
                      {apiData?.past_damage_relations && (
                        <>
                          <hr />
                          <h4 className="text-center">Past Damage Relations</h4>
                          {createDamageRelationSentences(
                            value,
                            apiData?.past_damage_relations[0]
                          )}
                        </>
                      )}
                    </Col>
                    <Col md={3}>
                      <Row className="justify-content-center text-center">
                        {apiData?.pokemon && (
                          <Col xs={12} md={6}>
                            <h3 className="fw-bold mb-0">
                              {apiData?.pokemon.length}
                            </h3>
                            <p className="mt-1">{`${value} type Pokémon`}</p>
                          </Col>
                        )}
                        {apiData?.moves && (
                          <Col xs={12} md={6}>
                            <h3 className="fw-bold mb-0">
                              {apiData?.moves.length}
                            </h3>
                            <p className="mt-1">{`${value}-type moves`}</p>
                          </Col>
                        )}
                      </Row>
                      {apiData?.generation && (
                        <>
                          <hr />
                          <p className="mb-2">
                            {`${value} type pokémon were first introduced in `}
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
                      {apiData?.moves && (
                        <p>
                          {/* TODO: Create a section at the bottom of the page to list these */}
                          {/* TODO: Maybe move this up as a badge and link to the bottom section? */}
                          Total number of moves with this type:{" "}
                          {apiData?.moves.length}
                        </p>
                      )}
                    </Col>
                  </Row>
                  <div className="mt-5">
                    {apiData?.sprites && (
                      <>
                        <h3 className="text-center mb-4">{`${value} type Pokémon`}</h3>
                        <PokemonGrid pokemonList={apiData?.pokemon} />
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
              )}
            </Col>
          </Row>
        </Container>
        <MonFooter />
      </div>
    </>
  );
}
