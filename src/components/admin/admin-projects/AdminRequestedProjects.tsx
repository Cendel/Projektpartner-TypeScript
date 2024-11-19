import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import {
  getProjectsByStatus,
  updateProjectStatus,
} from "../../../api/project-service";
import { toast } from "../../../helpers/functions/swal";
import SectionHeader from "../../user/common/section-header/SectionHeader";
import { convertCurrentDateToUserFormat } from "../../../helpers/functions/date-time";
import Project from "../../../entities/Project";

const paginationConfig = {
  paginationPerPage: 10,
  paginationRowsPerPageOptions: [10, 20, 30],
};

interface Column {
  name: string;
  selector?: (row: Project) => string | number;
  sortable?: boolean;
  cell?: (row: Project) => JSX.Element;
}

const AdminRequestedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleStatusChange = async (projectId: number, checked: boolean) => {
    try {
      await updateProjectStatus(projectId, checked);
      const updatedProjects = projects.map((project) =>
        project.id === projectId
          ? { ...project, projectStatus: checked }
          : project
      );
      setProjects(updatedProjects);
    } catch (err) {
      toast("Fehler beim Aktualisieren des Projektstatus", "error");
    }
  };

  const columns: Column[] = [
    {
      name: "Projekttitle",
      selector: (row) => row.projectTitle,
      sortable: true,
    },
    {
      name: "Erstellt von",
      selector: (row) => row.createdBy,
      sortable: true,
    },
    {
      name: "Erstellungsdatum",
      selector: (row) => convertCurrentDateToUserFormat(row.createdDate),
      sortable: true,
    },
    {
      name: "Projektstatus",
      cell: (row) => (
        <Form.Check
          type="switch"
          id={row.id.toString()}
          label=""
          checked={row.projectStatus}
          onChange={(e) => handleStatusChange(row.id, e.target.checked)}
        />
      ),
    },
    {
      name: "Aktien",
      cell: (row) => (
        <Nav.Link as={Link} to={`/admin-share-edit/${row.id}`}>
          <Button
            style={{ width: "2rem", padding: "0.1rem", fontSize: "0.7rem" }}
          >
            {row.sharesTaken}
          </Button>
        </Nav.Link>
      ),
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectsByStatus(false);
        setProjects(response.data);
      } catch (err) {
        toast("Fehler beim Laden der Projekten.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleRowClicked = (row: Project) => {
    navigate(`/projects/${row.id}`);
  };

  return (
    <Container>
      <SectionHeader title="Projektvorschläge" />
      <Row>
        <Col>
          <DataTable
            columns={columns}
            data={projects}
            progressPending={loading}
            pagination
            paginationPerPage={paginationConfig.paginationPerPage}
            paginationRowsPerPageOptions={
              paginationConfig.paginationRowsPerPageOptions
            }
            onRowClicked={handleRowClicked}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminRequestedProjects;
