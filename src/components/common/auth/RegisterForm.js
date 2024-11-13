import React, { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import PasswordInput from "../password-input/PasswordInput";
import useRegisterFormFormik from "./useRegisterFormFormik";

const RegisterForm = ({ setKey }) => {
  const [loading, setLoading] = useState(false);
  const formik = useRegisterFormFormik(setKey, setLoading);

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="">
      <h3>Registrieren</h3>
      <Form.Group className="">
        <FloatingLabel label="Name" className="">
          <Form.Control
            type="text"
            {...formik.getFieldProps("name")}
            isValid={formik.touched.name && !formik.errors.name}
            isInvalid={formik.touched.name && !!formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>{" "}
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="">
        <FloatingLabel label="E-Mail" className="">
          <Form.Control
            type="email"
            {...formik.getFieldProps("email")}
            isValid={formik.touched.email && !formik.errors.email}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          <Form.Control.Feedback
            type="invalid"
            style={{ marginBottom: "1rem" }}
          >
            {formik.errors.email}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="" style={{ marginBottom: "1rem" }}>
        <FloatingLabel label="Passwort" className="">
          <PasswordInput
            {...formik.getFieldProps("password")}
            isValid={formik.touched.password && !formik.errors.password}
            isInvalid={formik.touched.password && !!formik.errors.password}
            error={formik.errors.password}
            style={{ padding: "1rem", margin: "0" }}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="" style={{ marginBottom: "1rem" }}>
        <FloatingLabel label="Passwort bestätigen" className="">
          <PasswordInput
            {...formik.getFieldProps("confirmPassword")}
            isValid={
              formik.touched.confirmPassword && !formik.errors.confirmPassword
            }
            isInvalid={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }
            error={formik.errors.confirmPassword}
            style={{ padding: "1rem", margin: "0" }}
          />{" "}
        </FloatingLabel>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={!(formik.dirty && formik.isValid) || loading}
      >
        {loading && <Spinner animation="border" size="sm" />} Registrieren
      </Button>
    </Form>
  );
};

export default RegisterForm;
