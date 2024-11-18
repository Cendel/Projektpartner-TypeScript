import { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { listSharesForUser } from "../../../api/project-service";
import ShareOwnershipList from "../../../entities/ShareOwnershipList";

interface Column {
  name: string;
  selector: (row: ShareOwnershipList) => string | number;
  sortable: boolean;
}
interface Props {
  userId: number;
}

const UserSharesList = ({ userId }: Props) => {
  const [sharesList, setSharesList] = useState<ShareOwnershipList[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const columns: Column[] = [
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
        return (row.shares * Number(row.share_value)).toLocaleString() + " €";
      },
      sortable: true,
    },
  ];

  const loadData = useCallback(async () => {
    try {
      const result = await listSharesForUser(userId);
      setSharesList(result.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRowClicked = (row: ShareOwnershipList) => {
    navigate(`/projects/${row.project}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <DataTable
            columns={columns}
            data={sharesList}
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
