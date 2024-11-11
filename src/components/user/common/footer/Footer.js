import React from "react";
import { Col, Row } from "react-bootstrap";
import "./footer.scss";
import { settings } from "../../../../helpers/settings";
import logo from "../../../../assets/img/logo/logo_footer.png";
import {
  MdOutlineHome,
  MdInfoOutline,
  MdOutlineHeadphones,
  MdOutlinePrivacyTip,
} from "react-icons/md";

import { AiOutlineFundProjectionScreen } from "react-icons/ai";

import { Link, useLocation } from "react-router-dom";
import ContactInfo from "../../contact/contact-info/ContactInfo";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <footer className="appFooter">
      <Row className="g-5 footerRow">
        <Col lg={6} xl={6}>
          <Link to="/">
            <img
              src={logo}
              alt={settings.siteName}
              className="img-fluid logo"
            />
          </Link>
          <p>
            Wir glauben an die Kraft von Kreativität, Zusammenarbeit und
            Innovation.
          </p>
          <ContactInfo />
        </Col>
        <Col lg={4} xl={5}>
          <h2>Unsere Partner</h2>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </Col>
        <Col lg={2} xl={1}>
          <h2>Links</h2>
          <ul>
            <li>
              <Link to="/" className={pathname === "/" ? "active" : ""}>
                <MdOutlineHome /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={pathname.startsWith("/projects") ? "active" : ""}
              >
                <AiOutlineFundProjectionScreen /> Projekte
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={pathname === "/about" ? "active" : ""}
              >
                <MdInfoOutline /> Über uns
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={pathname === "/contact" ? "active" : ""}
              >
                <MdOutlineHeadphones /> Kontakt
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className={pathname === "/privacy-policy" ? "active" : ""}
              >
                <MdOutlinePrivacyTip /> Datenschutz
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
