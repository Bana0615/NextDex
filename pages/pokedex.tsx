import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { GameClient, Pokedex } from "pokenode-ts";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);
  const [apiData, setApiData] = useState<Pokedex>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("id") ?? "";

    if (typeParam === null) {
      router.replace("/404");
      return;
    }

    setValue(
      typeParam.charAt(0).toUpperCase() + typeParam.slice(1).toLowerCase()
    );
    (async () => {
      const api = new GameClient();

      await api
        .getPokedexByName(typeParam)
        .then((data) => setApiData(data))
        .catch((error) => console.error(error));
    })();

    setIsLoading(false);
  }, [router]);

  return (
    <>
      <Head>
        <title>{`${value} Pokédex | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
        {/* <meta name="description" content="" /> */}
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
                    {value} <small className="text-muted">(pokedex)</small>
                  </h2>
                  <Row>
                    <Col md={6}>
                      <p>description</p>
                    </Col>
                    <Col md={6}>
                      {value} Pokédex contains: ?? Pokémon
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
                      <code>{JSON.stringify(apiData, null, 2)}</code>
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
