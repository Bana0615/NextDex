import React from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";

interface HeaderProps {
  className?: string;
  navLinks?: { label: string; href: string; target?: string }[];
  showBadge?: boolean;
}

const defaultNavLinks = [
  { label: "Home", href: "/", target: "" },
  { label: "Feedback", href: "/feedback", target: "" },
  {
    label: "GitHub",
    href: process.env.NEXT_PUBLIC_APP_GITHUB_URL || "",
    target: "_blank",
  },
];

function MonHeader({
  className = "",
  showBadge = false,
  navLinks = defaultNavLinks,
}: HeaderProps) {
  return (
    <Navbar
      id="main-header"
      expand="lg"
      className={`pokemon-navbar ${className}`}
      sticky="top"
    >
      <Container className="position-relative">
        <Navbar.Brand
          href="/"
          className="position-relative d-flex align-items-center pokemon-brand"
        >
          {showBadge && process.env.NEXT_PUBLIC_NAVBAR_BRAND_BADGE && (
            <Badge className="pokemon-badge me-2">
              {process.env.NEXT_PUBLIC_NAVBAR_BRAND_BADGE}
            </Badge>
          )}
          <div>
            {process.env.NEXT_PUBLIC_APP_NAME}
            {process.env.NEXT_PUBLIC_NAVBAR_BRAND_SUBTITLE && (
              <span className="navbar-subtitle">
                {process.env.NEXT_PUBLIC_NAVBAR_BRAND_SUBTITLE}
              </span>
            )}
          </div>
        </Navbar.Brand>

        {/* --- CSS Pokeball Element --- */}
        <div className="pokeball-center-container">
          <div className="css-pokeball"></div>
        </div>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="pokemon-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {navLinks.map((link, index) => (
              <Nav.Link
                key={index}
                href={link.href}
                target={link.target ? link.target : "_self"}
                className="pokemon-nav-link"
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MonHeader;
