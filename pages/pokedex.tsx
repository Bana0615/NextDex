import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
import { GameClient, Pokedex } from "pokenode-ts";
import PokemonEntryList from "@/components/pokemon/PokemonEntryList";
import PokeBadge from "@/components/pokemon/PokeBadge";
//Helpers
import { formatName } from "@/helpers/formatName";
import { createVersionGroupsSentence } from "@/helpers/createVersionGroupsSentence";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function PokedexPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);
  const [apiData, setApiData] = useState<Pokedex>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name") ?? "";

    if (nameParam === null) {
      router.replace("/404");
      return;
    }

    (async () => {
      const api = new GameClient();

      await api
        .getPokedexByName(nameParam)
        .then((data) => {
          setApiData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    })();

    setValue(formatName(nameParam));
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
            {!isLoading && value && (
              <>
                <h2 className="fw-bold mb-3 text-center">
                  {value} <small className="text-muted">(pokédex)</small>
                </h2>
                <Col>
                  <Row className="mt-5">
                    <Col md={9}>
                      {/* <p>This is the description</p>
                      <hr /> */}
                      <h4 className="text-center">Region</h4>
                      {apiData?.region?.name ? (
                        <p>
                          This pokédex is from the{" "}
                          <Link
                            href={`/pokemon/region?name=${apiData.region.name}`}
                          >
                            {apiData.region.name}
                          </Link>{" "}
                          region.
                        </p>
                      ) : (
                        <p>
                          There is no region data (or region name) for this
                          pokédex
                        </p>
                      )}
                      {apiData?.version_groups && (
                        <>
                          <hr />
                          <h4 className="text-center">Version Groups</h4>
                          {createVersionGroupsSentence(
                            value,
                            apiData?.version_groups
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col md={3}>
                  <Row className="justify-content-center text-center">
                    <Col xs={12} md={6}>
                      <h3 className="fw-bold mb-0">
                        {apiData?.is_main_series ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#188754" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{ color: "#de3544" }}
                          />
                        )}
                      </h3>
                      <p className="mt-1">{`Pokédex originated in the main series`}</p>
                    </Col>
                    {apiData?.pokemon_entries && (
                      <Col xs={12} md={6}>
                        <h3 className="fw-bold mb-0">
                          {apiData?.pokemon_entries.length}
                        </h3>
                        <p className="mt-1">{`Pokémon in the ${value} pokédex`}</p>
                      </Col>
                    )}
                  </Row>
                  {apiData?.names && (
                    <>
                      <hr />
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Language</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiData?.names.map((item) => (
                            <tr key={`lang-${item.language.name}`}>
                              <td>{item.language.name}</td>
                              <td>{item.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                </Col>
                <div className="mt-5">
                  {apiData?.pokemon_entries && (
                    <>
                      <h3 className="text-center mb-4">
                        {`${value} type Pokémon `}
                        <small>
                          <PokeBadge
                            name={apiData?.pokemon_entries.length.toString()}
                            className={""}
                            fullWidth={false}
                          />
                        </small>
                      </h3>
                      <PokemonEntryList data={apiData?.pokemon_entries} />
                    </>
                  )}
                </div>
              </>
            )}
          </Row>
        </Container>
        <MonFooter />
      </div>
    </>
  );
}
