import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import MenuDropdown from "./MenuDropdown";

const Menubar = () => {
  const { pathname } = useLocation();
  return (
    <div className="menubar">
      <Navbar>
        <Container className="links">
          <Nav>
            <Nav.Link
              as={Link}
              to="/projects"
              active={pathname.startsWith("/projects")}
            >
              Projekte
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" active={pathname === "/contact"}>
              Kontakt
            </Nav.Link>
          </Nav>
        </Container>
        <Nav.Link
          className="project-form-button"
          as={Link}
          to="/project-form"
          active={pathname === "/project-form"}
        >
          <Button>Projekt erstellen</Button>
        </Nav.Link>
        <MenuDropdown />
      </Navbar>
    </div>
  );
};

export default Menubar;
