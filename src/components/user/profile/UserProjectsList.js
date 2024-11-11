import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getProjectsForTables } from "../../../api/project-service";
import { toast } from "../../../helpers/functions/swal";
import { convertCurrentDateToUserFormat } from "../../../helpers/functions/date-time";

const UserProjectsList = (propsList) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const columns = [
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
      const result = await getProjectsForTables(propsList);
      setProjects(result.data);
    } catch (err) {
      toast("Fehler beim Laden der Projekten.", "error");
    } finally {
      setLoading(false);
    }
  }, [propsList]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRowClicked = (row) => {
    navigate(`/projects/${row.id}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <DataTable
            columns={columns}
            data={projects}
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
