import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import {
  getUsersAdmin,
  getUserAdmin,
  deleteUserAdmin,
} from "../../../api/user-service";
import { question, toast } from "../../../helpers/functions/swal";
import SectionHeader from "../../user/common/section-header/SectionHeader";
import AdminEditUser from "./AdminEditUser";
import UserOverview from "../../../entities/UserOverview";
import User from "../../../entities/User";

const PAGINATION_CONFIG = {
  paginationPerPage: 10,
  paginationRowsPerPageOptions: [10, 20, 30],
};

const buttonStyle = (type: "delete" | "edit") => ({
  color: type === "delete" ? "#ee6c4d" : "#9fad3c",
  backgroundColor: "white",
  fontSize: "0.7rem",
  border: "none",
});

interface Column {
  name?: string;
  selector?: (row: UserOverview) => string;
  sortable?: boolean;
  cell?: (row: UserOverview) => JSX.Element;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [userToBeEdited, setUserToBeEdited] = useState<User>();

  const columns: Column[] = [
    {
      name: "ID",
      selector: (row) => row.id.toString(),
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "E-Mail",
      selector: (row) => row.email,
    },

    {
      cell: (row) => (
        <Button
          style={buttonStyle("delete")}
          onClick={() => handleDelete(row.id)}
          disabled={deleting}
        >
          {deleting && <Spinner animation="border" size="sm" />}Löschen
        </Button>
      ),
    },
    {
      cell: (row) => (
        <Button
          style={buttonStyle("edit")}
          onClick={() => handleEditButton(row)}
        >
          Bearbeiten
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersAdmin();
        setUsers(response.data);
      } catch (err) {
        toast("Benutzerdaten konnten nicht geladen werden.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (idToDelete: number) => {
    question(
      "Sind Sie sicher, dass Sie löschen möchten?",
      "Das können Sie nicht rückgängig machen!"
    ).then((result) => {
      if (result.isConfirmed) {
        setDeleting(true);
        try {
          deleteUserAdmin(idToDelete);
          toast("Der Benutzer wurde erfolgreich gelöscht.", "success", 1500);
          setUsers(users.filter((user) => user.id !== idToDelete));
        } catch (err) {
          toast("Das Löschen konnte nicht durchgeführt werden", "warning");
        } finally {
          setDeleting(false);
        }
      }
    });
  };

  const handleEditButton = async (userToBeEdited: UserOverview) => {
    setShowEditUser(false);
    try {
      const response = await getUserAdmin(userToBeEdited.id);
      setUserToBeEdited(response.data);
      setShowEditUser(true);
    } catch (err) {
      toast("Benutzerdaten konnten nicht geladen werden.", "error");
    }
  };

  return (
    <Container>
      <SectionHeader title="Benutzer" />
      <Row>
        <Col>
          <DataTable
            columns={columns}
            data={users}
            progressPending={loading}
            pagination
            paginationPerPage={PAGINATION_CONFIG.paginationPerPage}
            paginationRowsPerPageOptions={
              PAGINATION_CONFIG.paginationRowsPerPageOptions
            }
          />
        </Col>
      </Row>
      {showEditUser && <AdminEditUser {...userToBeEdited} />}
    </Container>
  );
};

export default AdminUsers;