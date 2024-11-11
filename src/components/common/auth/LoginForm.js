import React, { useState } from "react";
import { Button, Form, Spinner, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getUser, login } from "../../../api/user-service";
import { toast } from "../../../helpers/functions/swal";
import { encryptedLocalStorage } from "../../../helpers/functions/encrypt-storage";
import { useAppDispatch } from "../../../store/hooks";
import { loginFailed, loginSuccess } from "../../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import "./auth.scss";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .required("Bitte geben Sie eine E-mail-Adresse ein."),
    password: Yup.string().required("Bitte geben Sie Ihr Passwort erneut ein."),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const respAuth = await login(values);
      encryptedLocalStorage.setItem("token", respAuth.data.token);

      const respUser = await getUser();
      dispatch(loginSuccess(respUser.data));
      navigate("/");

      formik.resetForm();
      toast("Sie haben sich erfolgreich angemeldet.", "success");
    } catch (err) {
      if (err.response.status === 401) {
        toast("EMail oder Passwort ist falsch.", "error");
      } else {
        toast(
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
          "error"
        );
      }
      dispatch(loginFailed());
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
    <Form noValidate onSubmit={formik.handleSubmit}>
      <h3>Anmelden</h3>
      <Form.Group>
        <FloatingLabel label="EMail" className="">
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

      <Form.Group>
        <FloatingLabel label="Passwort" className="">
          <Form.Control
            type="password"
            {...formik.getFieldProps("password")}
            isInvalid={formik.touched.password && !!formik.errors.password}
            isValid={formik.touched.password && !formik.errors.password}
          />
          <Form.Control.Feedback
            type="invalid"
            style={{ marginBottom: "1rem" }}
          >
            {formik.errors.password}
          </Form.Control.Feedback>
        </FloatingLabel>
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
