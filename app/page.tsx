// --- React ---
import { Container, Row, Col } from "react-bootstrap";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Sections ---
import TypesSection from "@/components/pokemon/home/TypesSection";
import PokedexesSection from "@/components/pokemon/home/PokedexesSection";
import RegionsSection from "@/components/pokemon/home/RegionsSection";
import GenerationsSection from "@/components/pokemon/home/GenerationsSection";

export default function HomePage() {
  return (
    <PageLayout headerShowBadge={true}>
      <Container className="main-content mt-3 mb-3">
        <Row className="shadow-lg mt-3 p-3 bg-body rounded">
          <Col lg={7}>
            <h2 className="fw-bold mb-3 text-center">
              Welcome to {process.env.NEXT_PUBLIC_APP_NAME}!
            </h2>
            <p className="lead fs-6">
              Your ultimate destination for exploring the vast world of Pokémon!
            </p>
            <p className="lh-lg">
              Built with cutting-edge web technologies including{" "}
              <strong>React</strong>, <strong>Next.js</strong>, and{" "}
              <strong>Bootstrap</strong>, NéxtDex offers a fast, responsive, and
              visually appealing experience for trainers of all levels. Dive
              into our comprehensive <strong>Pokédex</strong> section to search,
              filter, and learn intricate details about every known{" "}
              <strong>Pokémon</strong>. Beyond the Pokédex, NéxtDex is designed
              to be an ever-expanding resource, featuring in-depth information
              on <strong>Pokémon</strong> games, regions, items, characters, and
              much more. Prepare to enhance your <strong>Pokémon</strong>{" "}
              knowledge with a sleek interface and a wealth of data right at
              your fingertips!
            </p>
          </Col>
          <Col lg={5}>
            <TypesSection />
            <hr />
            <PokedexesSection />
            <hr />
            <RegionsSection />
            <hr />
            <GenerationsSection />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
