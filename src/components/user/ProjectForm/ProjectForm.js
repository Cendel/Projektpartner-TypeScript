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
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "../../../helpers/functions/swal";
import { createProject, updateProject } from "../../../api/project-service";
import {
  formatDateToYYYYMMDD,
  getCurrentDate,
} from "../../../helpers/functions/date-time";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const ProjectForm = (props) => {
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const user = useAppSelector((state) => state.auth.user);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const initialValues = {
    projectTitle: props.projectTitle,
    projectPlace: props.projectPlace,
    estimatedImplementationDate:
      props.mode === "edit"
        ? formatDateToYYYYMMDD(props.estimatedImplementationDate)
        : "",
    slogan: props.slogan,
    about: props.about,
    goal: props.goal,
    support: props.support,
    shortDesc: props.shortDesc,
    longDesc: props.longDesc,
    createdBy: props.mode === "edit" ? props.createdBy : user.id,
    projectValue: props.projectValue,
    totalShares: props.totalShares,
    shareValue: props.shareValue,
    maxSharesPerPerson: props.maxSharesPerPerson,
  };
  const validationSchema = Yup.object({
    projectTitle: Yup.string().required(
      "Geben Sie den Namen des Projekts ein."
    ),
    projectPlace: Yup.string().required("Geben Sie den Ort des Projekts ein."),
    estimatedImplementationDate: Yup.string().required(
      "Geben Sie das voraussichtliche Implementierungsdatum ein."
    ),
    slogan: Yup.string()
      .max(50, "Der Slogan soll maximal 50 Zeichen lang sein.")
      .required("Geben Sie einen Slogan für Ihr Projekt ein."),
    about: Yup.string().required(
      "Geben Sie ein, worum es in Ihrem Projekt geht."
    ),
    goal: Yup.string().required(
      "Erzählen Sie von Ihren Projektzielen und Zielgruppen."
    ),
    support: Yup.string().required(
      "Geben Sie ein, wer hinter Ihrem Projekt steht."
    ),
    shortDesc: Yup.string()
      .max(200, "Die kurze Beschreibung soll maximal 200 Zeichen lang sein.")
      .required(
        "Geben Sie eine kurze Beschreibung ein, die maximal 200 Zeichen lang ist."
      ),
    longDesc: Yup.string()
      .min(
        200,
        "Die detaillierte Beschreibung soll mindestens 200 Zeichen lang sein."
      )
      .required(
        "Geben Sie eine detaillierte Beschreibung ein, die mindestens 200 Zeichen lang ist."
      ),
    projectValue: Yup.number().required(
      "Geben Sie den Gesamtbetrag in Euro ein, der für das Projekt benötigt wird."
    ),
    totalShares: Yup.number().required(
      "Geben Sie die Gesamtzahl der Anteile ein, die für das Projekt verfügbar sind."
    ),
    maxSharesPerPerson: Yup.number().required(
      "Geben Sie die maximale Anzahl von Anteilen ein, die eine Person kaufen kann."
    ),
  });

  const onSubmit = async (values) => {
    console.log(values.projectValue);
    console.log(values.totalShares);
    console.log((values.projectValue / values.totalShares).toFixed(2));
    values.shareValue = (values.projectValue / values.totalShares).toFixed(2);
    setLoading(true);
    if (props.mode === "edit") {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        if (image) {
          formData.append("projectImage", image);
        }
        await updateProject(projectId, formData);
        toast("Ihr Projekt wurde erfolgreich aktualisiert.", "success");
        navigate(`/projects/${projectId}`);
      } catch (err) {
        alert(err.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
          formData.append("projectImage", image);
        }
        await createProject(formData);
        formik.resetForm();
        toast(
          "Ihr Projekt wurde erfolgreich erstellt. Bitte warten Sie auf die Genehmigung durch den Administrator, um Ihr Projekt zu veröffentlichen. In der Zwischenzeit können Sie auf der Projekt-Detailseite Änderungen an Ihrem Projekt vornehmen und Dateien hinzufügen, die Sie zu Ihrem Projekt teilen möchten.",
          "success",
          100000,
          true
        );
        navigate(`/`);
      } catch (err) {
        alert(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalid = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  const isValid = (field) => {
    return formik.touched[field] && !formik.errors[field];
  };

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
