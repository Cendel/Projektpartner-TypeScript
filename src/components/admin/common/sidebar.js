import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Navbar bg="primary" expand="lg" className="admin-navbar" variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button
              as={Link}
              to="/admin-projects"
              active={pathname.startsWith("/admin-projects")}
            >
              Aktuelle Projekte
            </Button>
            <Button
              as={Link}
              to="/admin-requested-projects"
              active={pathname.startsWith("/admin-requested-projects")}
            >
              Projektvorschläge
            </Button>

            <Button
              as={Link}
              to="/admin-messages"
              active={pathname.startsWith("/admin-messages")}
            >
              Nachrichten
            </Button>
            <Button
              as={Link}
              to="/admin-users"
              active={pathname.startsWith("/admin-users")}
            >
              Benutzer
            </Button>

            <Button as={Link} to="/">
              Verlassen
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
