import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "../../../helpers/functions/swal";
import { updateUser } from "../../../api/user-service";
import { useAppSelector } from "../../../store/hooks";
import "./Profile.scss";

const ProfileEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const { name, job, location, about, phone, website } = user;

  const initialValues = {
    name,
    job,
    location,
    about,
    phone,
    website,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Bitte geben Sie Ihren Namen ein."),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await updateUser(values);
      toast("Ihr Profil wurde erfolgreich aktualisiert.", "success");
    } catch (err) {
      toast(err.response.data.message, "error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div className="profile-edit">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("name")}
              isValid={formik.touched.name && !formik.errors.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Beruf</Form.Label>
            <Form.Control type="text" {...formik.getFieldProps("job")} />
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Ort</Form.Label>
            <Form.Control type="text" {...formik.getFieldProps("location")} />
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Telefon</Form.Label>
            <Form.Control type="text" {...formik.getFieldProps("phone")} />
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control type="text" {...formik.getFieldProps("website")} />
          </Form.Group>
        </Row>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Über mich</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            {...formik.getFieldProps("about")}
          />
        </Form.Group>

        <Button
          type="submit"
          disabled={!(formik.dirty && formik.isValid) || loading}
        >
          {loading && <Spinner animation="border" size="sm" />} Aktualisieren
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
