import { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import PasswordInput from "../password-input/PasswordInput";
import useRegisterFormFormik from "./useRegisterFormFormik";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const formik = useRegisterFormFormik(setLoading);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <h3>Registrieren</h3>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          {...formik.getFieldProps("name")}
          isValid={formik.touched.name && !formik.errors.name}
          isInvalid={formik.touched.name && !!formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="email"
          placeholder="E-Mail"
          {...formik.getFieldProps("email")}
          isValid={formik.touched.email && !formik.errors.email}
          isInvalid={formik.touched.email && !!formik.errors.email}
        />
        <Form.Control.Feedback type="invalid" style={{ marginBottom: "1rem" }}>
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group style={{ marginBottom: "1rem" }}>
        <PasswordInput
          placeholder="Passwort"
          {...formik.getFieldProps("password")}
          isValid={formik.touched.password && !formik.errors.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
          error={formik.errors.password}
          style={{ padding: "1rem", margin: "0" }}
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: "1rem" }}>
        <PasswordInput
          placeholder="Passwort bestätigen"
          {...formik.getFieldProps("confirmPassword")}
          isValid={
            formik.touched.confirmPassword && !formik.errors.confirmPassword
          }
          isInvalid={
            formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
          error={formik.errors.confirmPassword}
          style={{ padding: "1rem", margin: "0" }}
        />
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
