import React from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import useAdminEditUserFormik from "./useAdminEditUserFormik";

const AdminEditUser = (props) => {
  const { formik, updating } = useAdminEditUserFormik(props);
  for (const x in props) console.log(typeof x);
  return (
    <Form
      noValidate
      onSubmit={formik.handleSubmit}
      style={{ marginTop: "2rem" }}
    >
      <fieldset disabled={formik.values.builtIn}>
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
            <Form.Label>E-Mail</Form.Label>
            <Form.Control
              type="email"
              {...formik.getFieldProps("email")}
              isValid={formik.touched.email && !formik.errors.email}
              isInvalid={formik.touched.email && !!formik.errors.email}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
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
      </fieldset>
      {formik.values.builtIn && (
        <Alert variant="warning">
          Built-in accounts cannot be deleted or updated
        </Alert>
      )}
      <div className="text-end">
        {!formik.values.builtIn && (
          <>
            <Button
              variant="primary"
              type="submit"
              disabled={!(formik.dirty && formik.isValid) || updating}
            >
              {updating && <Spinner animation="border" size="sm" />} Update
            </Button>
          </>
        )}
      </div>
    </Form>
  );
};

export default AdminEditUser;
