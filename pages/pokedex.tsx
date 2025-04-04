import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
import Pokedex from "@/components/pokemon/Pokedex";

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Generation One Pokédex | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
        <meta name="description" content="" />
        {/* <meta name="keywords" content="" /> */}
      </Head>
      <div className="main-container">
        <MonHeader showBadge={true} />
        <Container className="main-content">
          <Row className="shadow-lg mt-3 p-3 bg-body rounded">
            <Col className="mx-auto text-center">
              <Pokedex
                pokemonData={{
                  name: "Bulbasaur",
                  id: "001",
                  description: "...",
                }}
              />
            </Col>
          </Row>
        </Container>
        <MonFooter />
      </div>
    </>
  );
}
