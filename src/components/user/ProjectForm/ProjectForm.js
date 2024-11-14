import React, { useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Row,
  Form,
  Spinner,
} from "react-bootstrap";
import "./ProjectForm.scss";
import { getCurrentDate } from "../../../helpers/functions/date-time";
import { useAppSelector } from "../../../store/hooks";
import useProjectFormFormik from "./useProjectFormFormik";

const ProjectForm = (props) => {
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const { formik, isValid, isInvalid, handleImage } = useProjectFormFormik(
    props,
    setLoading,
    user
  );

  return (
    <>
      <div className="project-form">
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row className="mb-3 first-row">
            <Form.Group as={Col}>
              <FloatingLabel label="Projekttitel">
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("projectTitle")}
                  isInvalid={isInvalid("projectTitle")}
                  isValid={isValid("projectTitle")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.projectTitle}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col}>
              <FloatingLabel label="Projektort">
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("projectPlace")}
                  isInvalid={isInvalid("projectPlace")}
                  isValid={isValid("projectPlace")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.projectPlace}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="mb-3  second-row">
            <Form.Group as={Col}>
              <FloatingLabel label="geschätztes Realisierungsdatum">
                <Form.Control
                  type="date"
                  min={getCurrentDate()}
                  {...formik.getFieldProps("estimatedImplementationDate")}
                  isInvalid={isInvalid("estimatedImplementationDate")}
                  isValid={isValid("estimatedImplementationDate")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.estimatedImplementationDate}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col}>
              <FloatingLabel label="Slogan">
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("slogan")}
                  isInvalid={isInvalid("slogan")}
                  isValid={isValid("slogan")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.slogan}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3  worum">
            <FloatingLabel label="Worum geht es in dem Projekt?">
              <Form.Control
                as="textarea"
                {...formik.getFieldProps("about")}
                isInvalid={isInvalid("about")}
                isValid={isValid("about")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.about}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3  ziele">
            <FloatingLabel label="Was sind die Ziele und wer ist die Zielgruppe?">
              <Form.Control
                as="textarea"
                {...formik.getFieldProps("goal")}
                isInvalid={isInvalid("goal")}
                isValid={isValid("goal")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.goal}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3  wer">
            <FloatingLabel label="Wer steht hinter dem Projekt?">
              <Form.Control
                as="textarea"
                {...formik.getFieldProps("support")}
                isInvalid={isInvalid("support")}
                isValid={isValid("support")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.support}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3 kurz">
            <FloatingLabel label="Geben Sie eine kurze Beschreibung ein, die maximal 200 Zeichen lang ist.">
              <Form.Control
                as="textarea"
                {...formik.getFieldProps("shortDesc")}
                isInvalid={isInvalid("shortDesc")}
                isValid={isValid("shortDesc")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.shortDesc}
              </Form.Control.Feedback>{" "}
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3 lang">
            <FloatingLabel label="Geben Sie eine detaillierte Beschreibung ein, die mindestens 200 Zeichen lang ist.">
              <Form.Control
                as="textarea"
                {...formik.getFieldProps("longDesc")}
                isInvalid={isInvalid("longDesc")}
                isValid={isValid("longDesc")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.longDesc}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Row className="mb-3  first-row">
            <Form.Group as={Col}>
              <FloatingLabel label="Gesamtbetrag in Euro" className="mb-3">
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("projectValue")}
                  isInvalid={isInvalid("projectValue")}
                  isValid={isValid("projectValue")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.projectValue}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col}>
              <FloatingLabel label="Gesamtzahl der Anteile" className="mb-3">
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("totalShares")}
                  isInvalid={isInvalid("totalShares")}
                  isValid={isValid("totalShares")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.totalShares}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="mb-3  second-row">
            <Form.Group as={Col}>
              <FloatingLabel
                label="Wert eines Anteils in Euro"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  readOnly
                  disabled
                  style={{ backgroundColor: "white" }}
                  {...formik.getFieldProps("shareValue")}
                  value={(
                    formik.values.projectValue / formik.values.totalShares
                  ).toFixed(2)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.shareValue}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col}>
              <FloatingLabel
                label="Maximale Anzahl von Anteilen pro Person"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("maxSharesPerPerson")}
                  isInvalid={isInvalid("maxSharesPerPerson")}
                  isValid={isValid("maxSharesPerPerson")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.maxSharesPerPerson}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          {/* image file input field */}
          <Form.Group className="mb-3 projectImage" controlId="formImage">
            {props.projectImage && (
              <img
                src={props.projectImage} // displays existing project image
                alt="Project"
                className="project-image-preview"
              />
            )}
            <Form.Label>
              {props.projectImage
                ? "Wenn Sie das aktuelle Bild Ihres Projekts ändern möchten, können Sie unten das neue Bild hochladen."
                : "Laden Sie ein Bild hoch, das Ihr Projekt am besten beschreibt."}
              <Form.Control
                className="imageatt"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </Form.Label>
          </Form.Group>
          {/* file input field */}

          <Button
            variant="primary"
            type="submit"
            className="submit-button"
            disabled={
              !((formik.dirty && formik.isValid) || props.mode === "edit") ||
              loading
            }
          >
            {loading && <Spinner animation="border" size="sm" />}
            {props.mode === "edit"
              ? "PROJEKT AKTUALISIEREN"
              : "PROJEKT ERSTELLEN"}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ProjectForm;
