import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../../../assets/img/logo/logo_auth.png";
import "./auth.scss";
import { settings } from "../../../helpers/settings";
import { MdEmail, MdOutlinePhone } from "react-icons/md";

const Auth = () => {
  const [register, setRegister] = useState(false);

  return (
    <Container className="board ">
      <Col xs={10} sm={8} md={6} lg={4}>
        <img src={logo} alt="Projektpartner" className="logo-auth" />
        {!register ? <LoginForm /> : <RegisterForm />}
        <h5 className="mt-5 command-line">
          {!register
            ? "Sie haben noch kein Konto? "
            : "Sie haben bereits ein Konto? "}

          <span className="command" onClick={() => setRegister(!register)}>
            {!register ? " Registrieren" : "Anmelden"}
          </span>
        </h5>
        <div className="contact">
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <a href={`tel:${settings.phone1}`}>{settings.phone1}</a>
        </div>
      </Col>
    </Container>
  );
};

export default Auth;
