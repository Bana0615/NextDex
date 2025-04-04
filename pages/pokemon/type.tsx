import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from 'next/image';
import { PokemonClient, Type as PokemonTypeData } from "pokenode-ts";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
//Helpers
import { createWeaknessSentence } from "@/helpers/createWeaknessSentence";
import { createIndicesSentence } from "@/helpers/createIndicesSentence";
//Data
import typesData from "@/json/pokemon/types.json";
//Types
import { PokemonType } from "@/types/pokemon/Types";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);
  const [apiData, setApiData] = useState<PokemonTypeData>();
  const [tmpApiData, setTmpApiData] = useState<PokemonTypeData>();
  const [typeData, setTypeData] = useState<PokemonType>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("name") ?? "";
    const foundType = typesData.find(
      (type) => type.name.toLowerCase() === typeParam.toLowerCase()
    );

    if (typeParam === null || !foundType) {
      router.replace("/404");
      return;
    }

    setValue(
      typeParam.charAt(0).toUpperCase() + typeParam.slice(1).toLowerCase()
    );
    setTypeData(foundType);
    (async () => {
      const api = new PokemonClient();

      await api
        .getTypeByName(typeParam)
        .then((data) => {
          const tmp = { ...data };
          delete tmp.damage_relations;
          delete tmp.game_indices;
          setTmpApiData(tmp as PokemonTypeData)
          setApiData(data as PokemonTypeData)
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
          <Row className="shadow-lg mt-3 p-3 bg-body rounded">
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
                    <Col md={6}>
                      <p>{typeData?.description}</p>
                      {apiData?.damage_relations && (
                        <>
                          <h4 className="text-center">Damage Relations</h4>
                          <p>
                            {createWeaknessSentence(
                              value,
                              apiData?.damage_relations.double_damage_from
                            )}
                          </p>
                        </>
                      )}
                      {apiData?.game_indices && (
                        <>
                          <h4 className="text-center">Game Indices</h4>
                          <p>
                            {createIndicesSentence(
                              value,
                              apiData?.game_indices
                            )}
                          </p>
                        </>
                      )}
                    </Col>
                    <Col md={6}>
                      {value} type Pokémon: {apiData?.pokemon.length}
                    </Col>
                  </Row>
                  <hr />
                  <div className="mt-5">
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                        maxHeight: "500px",
                        overflowY: "auto",
                      }}
                    >
                      <code>{JSON.stringify(tmpApiData, null, 2)}</code>
                    </pre>
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
