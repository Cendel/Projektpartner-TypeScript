import React from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import logo from "../../../../assets/img/logo/logo_header.png";
import "./header.scss";
import { settings } from "../../../../helpers/settings";
import { Link, useLocation } from "react-router-dom";
import Menubar from "./Menubar";
import MenuDropdown from "./MenuDropdown";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <Navbar expand={false} className=" navbar">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt={settings.siteName} className="logo_header" />
        </Navbar.Brand>
        <Menubar />
        <Navbar.Toggle className="toggle" />
        <Navbar.Offcanvas placement="end" className="offCanvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="title">
              <h3>{settings.siteName}</h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <ul>
                <li>
                  <Link to="/" className={pathname === "/" ? "active" : ""}>
                    <h5>Home</h5>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link
                    to="/projects"
                    className={pathname.startsWith("/projects") ? "active" : ""}
                  >
                    <h5>Projekte</h5>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link
                    to="/contact"
                    className={pathname.startsWith("/contact") ? "active" : ""}
                  >
                    <h5>Kontakt</h5>
                  </Link>
                </li>
              </ul>

              <Nav.Link
                className="project-form-button-navbar"
                as={Link}
                to="/project-form"
                active={pathname === "/project-form"}
              >
                <Button>Projekt erstellen</Button>
              </Nav.Link>

              <div className="separator"></div>

              <MenuDropdown />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
