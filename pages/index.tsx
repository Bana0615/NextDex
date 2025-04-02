import { Container, Row, Col } from "react-bootstrap";
import MonHeader from "@/components/MonHeader";
import MonFooter from "@/components/MonFooter";

export default function Home() {
  return (
    <>
      <div className="main-container">
        <MonHeader showBadge={true} />
        <Container className="main-content">
          <Row className="shadow-lg mt-3 p-3 bg-body rounded">
            <Col lg={8} className="mx-auto">
              TEST
              <br />
              <br />
              <br />
              Welcome to NextDex, your ultimate destination for exploring the
              vast world of Pokémon! Built with cutting-edge web technologies
              including React, Next.js, and Bootstrap, NextDex offers a fast,
              responsive, and visually appealing experience for trainers of all
              levels. Dive into our comprehensive Pokédex section to search,
              filter, and learn intricate details about every known Pokémon.
              Beyond the Pokédex, NextDex is designed to be an ever-expanding
              resource, featuring in-depth information on Pokémon games,
              regions, items, characters, and much more. Prepare to enhance your
              Pokémon knowledge with a sleek interface and a wealth of data
              right at your fingertips!
            </Col>
          </Row>
        </Container>
        <MonFooter />
      </div>
    </>
  );
}
