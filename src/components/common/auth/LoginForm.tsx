import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "./auth.scss";
import useLoginFormFormik from "./useLoginFormFormik";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const formik = useLoginFormFormik(setLoading);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <h3>Anmelden</h3>
      <Form.Group>
        <Form.Control
          placeholder="E-Mail"
          type="email"
          {...formik.getFieldProps("email")}
          isValid={formik.touched.email && !formik.errors.email}
          isInvalid={formik.touched.email && !!formik.errors.email}
        />
        <Form.Control.Feedback type="invalid" style={{ marginBottom: "1rem" }}>
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="password"
          placeholder="Passwort"
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && !!formik.errors.password}
          isValid={formik.touched.password && !formik.errors.password}
        />
        <Form.Control.Feedback type="invalid" style={{ marginBottom: "1rem" }}>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={!(formik.dirty && formik.isValid) || loading}
      >
        {loading && <Spinner animation="border" size="sm" />} Anmelden
      </Button>
    </Form>
  );
};

export default LoginForm;
