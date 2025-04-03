import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("id");

    if (typeParam === null) {
      router.replace("/404");
      return;
    }

    setValue(typeParam);

    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="main-container">
        <MonHeader showBadge={true} />
        <Container className="main-content">
          <Row className="shadow-lg mt-3 p-3 bg-body rounded">
            <Col>
              {!isLoading && value && (
                <>
                  <h2 className="fw-bold mb-3 text-center">Type: {value}</h2>
                  <p className="text-center">Coming soon.....</p>
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
