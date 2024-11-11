import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./unauthorized.scss";

const Unauthorized = () => {
  return (
    <Container className="unauthorized-page">
      <h1>Zugriff nicht erlaubt</h1>
      <p>
        Sie haben keine Berechtigung, auf diese Seite zuzugreifen. Bitte kehren
        Sie zur{" "}
        <Link to="/" className="home-link">
          Startseite
        </Link>{" "}
        zurück.
      </p>
    </Container>
  );
};

export default Unauthorized;
