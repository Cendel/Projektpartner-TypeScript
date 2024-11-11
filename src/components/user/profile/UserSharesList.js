import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { userListShares } from "../../../api/project-service";

const UserSharesList = (propsList) => {
  const [shares, setShares] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "Projekttitle",
      selector: (row) => row.project_title,
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
  ];

  const loadData = useCallback(async () => {
    try {
      const result = await userListShares(propsList[0]);
      setShares(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [propsList]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRowClicked = (row) => {
    navigate(`/projects/${row.project}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <DataTable
            columns={columns}
            data={shares}
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

export default UserSharesList;
