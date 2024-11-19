import { Container, Nav, Navbar } from "react-bootstrap";
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
            <Nav.Link
              as={Link}
              to="/admin-projects"
              active={pathname.startsWith("/admin-projects")}
              className="m-auto"
            >
              Aktuelle Projekte
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin-requested-projects"
              active={pathname.startsWith("/admin-requested-projects")}
              className="m-auto"
            >
              Projektvorschläge
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/admin-messages"
              active={pathname.startsWith("/admin-messages")}
              className="m-auto"
            >
              Nachrichten
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin-users"
              active={pathname.startsWith("/admin-users")}
              className="m-auto"
            >
              Benutzer
            </Nav.Link>

            <Nav.Link as={Link} to="/" className="m-auto">
              Verlassen
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
