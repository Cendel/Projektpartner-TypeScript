import { useEffect, useState, useCallback } from "react";
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
  listSharesForProject,
  deleteShare,
} from "../../../api/project-service";
import { toast, question } from "../../../helpers/functions/swal";
import SectionHeader from "../../user/common/section-header/SectionHeader";
import useAdminShareEditFormik from "./useAdminShareEditFormik";
import ShareOwnershipList from "../../../entities/ShareOwnershipList";

const paginationConfig = {
  paginationPerPage: 10,
  paginationRowsPerPageOptions: [10, 20, 30],
};

interface Column {
  name: string;
  selector?: (row: ShareOwnershipList) => string | number;
  sortable?: boolean;
  cell?: (row: ShareOwnershipList) => JSX.Element;
}

const AdminShareEdit = () => {
  const { projectId } = useParams();
  const [participants, setParticipants] = useState<ShareOwnershipList[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshComponent, setRefreshComponent] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const result = await listSharesForProject(Number(projectId));
      setParticipants(result.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, [loadData, refreshComponent]);

  const { formik, isValid, isInvalid } = useAdminShareEditFormik({
    projectId: projectId || "",
    participants,
    setLoading,
    setRefreshComponent,
  });
  const columns: Column[] = [
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
        return (row.shares * Number(row.share_value)).toLocaleString() + " €";
      },
    },
    {
      name: "",
      cell: (row) => (
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

  const removeShare = async (row: ShareOwnershipList) => {
    question(
      "Möchten Sie fortfahren?",
      `Die ${row.shares} Aktie(n) von ${row.user_name} in diesem Projekt werden gelöscht.`
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
                isInvalid={Boolean(isInvalid("user"))}
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
                isInvalid={Boolean(isInvalid("shares"))}
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
            paginationPerPage={paginationConfig.paginationPerPage}
            paginationRowsPerPageOptions={
              paginationConfig.paginationRowsPerPageOptions
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminShareEdit;
