import { Container, Row, Col } from "react-bootstrap";
//Components
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";
import TypesSection from "@/components/pokemon/TypesSection";
import PokedexesSection from "@/components/pokemon/PokedexesSection";

export default function Home() {
  return (
    <>
      <div className="main-container">
        <MonHeader showBadge={true} />
        <Container className="main-content">
          <Row className="shadow-lg mt-3 p-3 bg-body rounded">
            <Col lg={7}>
              <h2 className="fw-bold mb-3 text-center">Welcome to NextDex!</h2>
              <p className="lead fs-6">
                Your ultimate destination for exploring the vast world of
                Pokémon!
              </p>
              <p className="lh-lg">
                Built with cutting-edge web technologies including{" "}
                <strong>React</strong>, <strong>Next.js</strong>, and{" "}
                <strong>Bootstrap</strong>, NextDex offers a fast, responsive,
                and visually appealing experience for trainers of all levels.
                Dive into our comprehensive <strong>Pokédex</strong> section to
                search, filter, and learn intricate details about every known{" "}
                <strong>Pokémon</strong>. Beyond the Pokédex, NextDex is
                designed to be an ever-expanding resource, featuring in-depth
                information on <strong>Pokémon</strong> games, regions, items,
                characters, and much more. Prepare to enhance your{" "}
                <strong>Pokémon</strong> knowledge with a sleek interface and a
                wealth of data right at your fingertips!
              </p>
            </Col>
            <Col lg={5}>
              <TypesSection />
              <hr />
              <PokedexesSection />
            </Col>
          </Row>
        </Container>
        <MonFooter />
      </div>
    </>
  );
}
