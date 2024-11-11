import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { register } from "../../../api/user-service";
import { toast } from "../../../helpers/functions/swal";
import PasswordInput from "../password-input/PasswordInput";

const RegisterForm = ({ setKey }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Bitte geben Sie Ihren Namen ein."),
    email: Yup.string()
      .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
      .required("Bitte geben Sie eine E-mail-Adresse ein."),
    password: Yup.string()
      .required("Bitte Passwort eingeben.")
      .min(8, "Bitte geben Sie mindestens 8 Zeichen ein.")
      .matches(/[a-z]+/, "Ein Kleinbuchstabe")
      .matches(/[A-Z]+/, "Ein Großbuchstabe")
      .matches(/[@$!%*#?&.]+/, "Ein besonderes Zeichen")
      .matches(/\d+/, "Eine Nummer"),
    confirmPassword: Yup.string()
      .required("Bitte geben Sie Ihr Passwort erneut ein.")
      .oneOf([Yup.ref("password")], "Passwortfelder stimmen nicht überein."),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await register(values);
      formik.resetForm();
      toast("Sie sind registriert.", "success");
      setKey("login");
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message;

        if (errorMessage === "Name taken") {
          toast("Der Benutzername ist bereits vergeben.", "warning");
        } else if (errorMessage === "Email taken") {
          toast("Die E-Mail-Adresse ist bereits vergeben.", "warning");
        } else {
          toast("Ein Fehler ist aufgetreten.", "error");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
