import React from "react";
import { Container, Nav } from "react-bootstrap";

function MonFooter() {
  // Get the current year dynamically for the copyright notice
  const currentYear = new Date().getFullYear();
  const copyrightStartYearDB = 2008;
  const copyrightStartYearNintendo = 1995;

  return (
    // Apply custom class, use dark theme text color base
    <footer className="pokemon-footer">
      <Container className="py-3 py-md-4">
        {" "}
        {/* Add padding */}
        {/* Flexbox layout: center on small screens, space-between on medium+ */}
        <div className="d-md-flex justify-content-md-between align-items-md-center text-center text-md-start">
          {/* Copyright Info */}
          {/* Adjust margin for spacing */}
          <div className="footer-copyright mb-3 mb-md-0">
            All content & design © Pokémon Database, {copyrightStartYearDB}-
            {currentYear}.
            <br /> {/* Line break for clarity */}
            Pokémon images & names © {copyrightStartYearNintendo}-{currentYear}{" "}
            Nintendo/Game Freak.
          </div>

          {/* Footer Links */}
          {/* Center links on small screens, end on medium+ */}
          <Nav className="footer-nav justify-content-center justify-content-md-end">
            <Nav.Item>
              {/* Add custom class for styling links */}
              <Nav.Link href="/terms" className="footer-link px-2">
                Terms
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/privacy" className="footer-link px-2">
                Privacy Policy
              </Nav.Link>
            </Nav.Item>
            {/* Add more links here if needed */}
            {/* Example:
            <Nav.Item>
              <Nav.Link href="/contact" className="footer-link px-2">Contact</Nav.Link>
            </Nav.Item>
             */}
          </Nav>
        </div>
      </Container>
    </footer>
  );
}

export default MonFooter;
