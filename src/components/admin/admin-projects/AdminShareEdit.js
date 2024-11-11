import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import {
  projectListShares,
  createShare,
  deleteShare,
} from "../../../api/project-service";
import * as Yup from "yup";

import { toast, question } from "../../../helpers/functions/swal";
import { useFormik } from "formik";
import SectionHeader from "../../user/common/section-header/SectionHeader";

const AdminShareEdit = () => {
  const { projectId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshComponent, setRefreshComponent] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const result = await projectListShares(projectId);
      setParticipants(result.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, [loadData, refreshComponent]);

  const columns = [
    {
      name: "Benutzer-ID",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.user_name,
      sortable: true,
    },
    {
      name: "Aktien in diesem Projekt",
      selector: (row) => row.shares,
      sortable: true,
    },
    {
      name: "Wert der Aktien",
      selector: (row) => {
        return (row.shares * row.share_value).toLocaleString() + " €";
      },
    },
    {
      name: "",
      selector: (row) => (
        <Button
          onClick={() => removeShare(row)}
          style={{
            color: "#ee6c4d",
            backgroundColor: "white",
            fontSize: "0.7rem",
            border: "none",
          }}
          className="deleteButton"
        >
          Löschen
        </Button>
      ),
    },
  ];

  const initialValues = {
    user: "",
    shares: "",
    project: projectId,
  };

  const validationSchema = Yup.object({
    user: Yup.string().required("Geben Sie die ID des Teilnehmers ein."),
    shares: Yup.number().min(1).required("Geben Sie Anzahl der Aktien ein."),
  });

  const onSubmit = async (values) => {
    const participantsIds = participants.map((obj) => obj.user);
    if (participantsIds.includes(values.user)) {
      toast(
        "Dieses Projekt hat bereits Anteile des Benutzers. Wenn Sie die Anteile des Benutzers aktualisieren möchten, können Sie die aktuellen Anteile löschen und eine Aktualisierung vornehmen.",
        "warning",
        100000,
        true
      );
    } else {
      setLoading(true);
      try {
        await createShare(values);
        toast("Die Aktie wurde erfolgreich erstellt.", "success");
        setRefreshComponent((prevValue) => !prevValue);
      } catch (err) {
        toast(
          `Fehler beim Erstellen der Aktie: ${err.response.data.message}`,
          "error"
        );
        console.log(err);
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

  const removeShare = async (row) => {
    question(
      `Die ${row.shares} Aktie(n) von ${row.user_name} in diesem Projekt werden gelöscht. Möchten Sie fortfahren?`
    ).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteShare(row.id);
          toast(
            "Die Anteile des Benutzers in diesem Projekt wurden erfolgreich gelöscht.",
            "success",
            10000,
            true
          );
          setRefreshComponent((prevValue) => !prevValue);
        } catch (err) {
          toast("Das Löschen konnte nicht durchgeführt werden", "warning");
        } finally {
        }
      }
    });
  };

  return (
    <Container>
      <Form noValidate onSubmit={formik.handleSubmit} className="mb-5">
        <SectionHeader title="Aktienkauf" />
        <Row>
          <Form.Group as={Col}>
            <FloatingLabel label="Benutzer ID">
              <Form.Control
                type="number"
                {...formik.getFieldProps("user")}
                isInvalid={isInvalid("user")}
                isValid={isValid("user")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.user}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col}>
            <FloatingLabel label="Anzahl Aktien">
              <Form.Control
                type="number"
                {...formik.getFieldProps("shares")}
                isInvalid={isInvalid("shares")}
                isValid={isValid("shares")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.shares}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Button
          style={{ marginTop: "1rem", width: "100%" }}
          variant="primary"
          type="submit"
          disabled={!(formik.dirty && formik.isValid) || loading}
        >
          {loading && <Spinner animation="border" size="sm" />}
          Aktienkauf bestätigen
        </Button>
      </Form>

      <Row>
        <SectionHeader title="Projektbeteiligte" />
        <Col>
          <DataTable
            columns={columns}
            data={participants}
            progressPending={loading}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminShareEdit;
