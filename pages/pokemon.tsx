import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
//Helpers
import { formatName } from "@/helpers/formatName";

export default function PokemonPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name") ?? "";

    if (nameParam === null) {
      router.replace("/404");
      return;
    }

    setValue(formatName(nameParam));

    setIsLoading(false);
  }, [router]);

  return (
    <>
      <Head>
        <title>{`${value} Pokémon | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
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
                    {value} <small className="text-muted">(pokémon)</small>
                  </h2>
                  <Row className="mt-5">
                    <span className="text-center">Coming Soon.....</span>
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
