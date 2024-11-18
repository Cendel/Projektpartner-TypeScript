import { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getProjectsForTables } from "../../../api/project-service";
import { toast } from "../../../helpers/functions/swal";
import { convertCurrentDateToUserFormat } from "../../../helpers/functions/date-time";
import ProjectsListForTables from "../../../entities/ProjectsListForTables";

interface Column {
  name: string;
  selector: (row: ProjectsListForTables) => string;
  sortable: boolean;
}
interface Props {
  listToBeShowed: number[];
}

const UserProjectsList = ({ listToBeShowed }: Props) => {
  const [projectsList, setProjectsList] = useState<ProjectsListForTables[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const columns: Column[] = [
    {
      name: "Projekttitle",
      selector: (row) => row.projectTitle,
      sortable: true,
    },
    {
      name: "Erstellt von",
      selector: (row) => row.createdByName,
      sortable: true,
    },
    {
      name: "Fertigstellungsdatum",
      selector: (row) =>
        convertCurrentDateToUserFormat(row.estimatedImplementationDate),
      sortable: true,
    },
  ];

  const loadData = useCallback(async () => {
    try {
      const result = await getProjectsForTables(listToBeShowed);
      setProjectsList(result.data);
    } catch (err) {
      toast("Fehler beim Laden der Projekten.", "error");
    } finally {
      setLoading(false);
    }
  }, [listToBeShowed]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRowClicked = (row: ProjectsListForTables) => {
    navigate(`/projects/${row.id}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <DataTable
            columns={columns}
            data={projectsList}
            progressPending={loading}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            onRowClicked={handleRowClicked}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProjectsList;
