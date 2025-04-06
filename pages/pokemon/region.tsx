import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
import { LocationClient, Region } from "pokenode-ts";
import LanguageTable from "@/components/pokemon/LanguageTable";
//Helpers
import { formatName } from "@/helpers/formatName";

export default function RegionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);
  const [apiData, setApiData] = useState<Region>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name") ?? "";

    if (nameParam === null) {
      router.replace("/404");
      return;
    }

    (async () => {
      const api = new LocationClient();

      await api
        .getRegionByName(nameParam)
        .then((data) => {
          console.log("data", data);
          setApiData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    })();

    setValue(formatName(nameParam));

    setIsLoading(false);
  }, [router]);

  return (
    <>
      <Head>
        <title>{`${value} Region | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
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
                    {value} <small className="text-muted">(region)</small>
                  </h2>
                  <Row className="mt-5">
                    <Col md={9}>
                      {/* <p>This is the description</p>
                      <hr /> */}
                      <h4 className="text-center">Region</h4>
                      {apiData?.main_generation?.name ? (
                        <p>
                          The main generation for {value} is{" "}
                          <Link
                            href={`/pokemon/generation?name=${apiData.main_generation.name}`}
                          >
                            {apiData.main_generation.name}
                          </Link>
                          .
                        </p>
                      ) : (
                        <p>There is no main generation data for this region</p>
                      )}
                    </Col>
                    <Col md={3}>
                      <Row className="justify-content-center text-center">
                        {apiData?.locations && (
                          <Col xs={12} md={6}>
                            <h3 className="fw-bold mb-0">
                              {apiData.locations.length}
                            </h3>
                            <p className="mt-1">{`Locations in the ${value} region`}</p>
                          </Col>
                        )}
                      </Row>
                      {apiData?.names && (
                        <>
                          <hr />
                          <LanguageTable data={apiData.names} />
                        </>
                      )}
                    </Col>
                  </Row>
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
