import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { PokemonClient } from "pokenode-ts";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
//Helpers
import { createWeaknessSentence } from "@/helpers/createWeaknessSentence";
//Data
import typesData from "@/json/pokemon/types.json";
//Types
import { PokemonTypeData } from "@/types/pokemon/Types";
import { PokemonType } from "@/types/pokemon/Types";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);
  const [apiTypeData, setApiTypeData] = useState<PokemonTypeData>();
  const [typeData, setTypeData] = useState<PokemonType>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("id") ?? "";
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
      const api = new PokemonClient(); // create a PokemonClient

      await api
        .getTypeByName(typeParam)
        .then((data) => setApiTypeData(data as PokemonTypeData))
        .catch((error) => console.error(error));
    })();

    setIsLoading(false);
  }, []);

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
                      <img
                        src={`/images/pokemon/types/color/${typeData.imgSrc}`}
                        alt={`${typeData.name} type icon`}
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
                      {apiTypeData?.damage_relations && (
                        <>
                          <h4 className="text-center">Damage Relations</h4>
                          <p>
                            {createWeaknessSentence(
                              value,
                              apiTypeData?.damage_relations.double_damage_from
                            )}
                          </p>
                        </>
                      )}
                    </Col>
                    <Col md={6}>
                      {value} type Pokémon: {apiTypeData?.pokemon.length}
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
                      <code>{JSON.stringify(apiTypeData, null, 2)}</code>
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
