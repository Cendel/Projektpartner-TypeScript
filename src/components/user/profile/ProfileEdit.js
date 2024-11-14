import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../../store/hooks";
import "./Profile.scss";
import useProfileEditFormik from "./useProfileEditFormik";

const ProfileEdit = () => {
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const formik = useProfileEditFormik(setLoading, user);

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
