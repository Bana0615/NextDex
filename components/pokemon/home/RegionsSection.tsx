"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { LocationClient, NamedAPIResource } from "pokenode-ts";
// --- Components ---
import SclBadge from "@/components/_silabs/SclBadge";

function RegionsSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    (async () => {
      const api = new LocationClient();

      await api
        .listRegions(0, 100)
        .then((data) => {
          setData(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    })();
  }, []);

  return (
    <Row g={2}>
      <Col>
        <h4 className="text-center mb-3">Regions</h4>
        {isLoading ? (
          <div className="text-center">Loading Regions...</div>
        ) : (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {data.map((value, index) => (
              <Link
                key={value.name}
                href={`/pokemon/region?name=${value.name}`}
                className="text-decoration-none"
                passHref
              >
                <SclBadge
                  name={value.name}
                  badgeOverwrite={index % 2 === 0 ? "bgNext" : "bgGray"}
                  fullWidth={true}
                />
              </Link>
            ))}
          </div>
        )}
      </Col>
    </Row>
  );
}

export default RegionsSection;
