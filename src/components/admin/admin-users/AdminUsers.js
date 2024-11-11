import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
//import { useNavigate } from "react-router-dom";
import {
  getUsersAdmin,
  getUserAdmin,
  deleteUserAdmin,
} from "../../../api/user-service";
import { question, toast } from "../../../helpers/functions/swal";
import SectionHeader from "../../user/common/section-header/SectionHeader";
import AdminEditUser from "./AdminEditUser";

const AdminProjects = () => {
  const [users, setUsers] = useState([]);
  //const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showEditUser, setshowEditUser] = useState(false);
  const [userToBeEdited, setUserToBeEdited] = useState();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
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
      name: "",
      selector: (row) => (
        <Button
          //as={Link}
          to={`/admin-share-edit/${row.id}`}
          style={{
            color: "#ee6c4d",
            backgroundColor: "white",
            fontSize: "0.7rem",
            border: "none",
          }}
          className="deleteButton"
          onClick={() => handleDelete(row.id)}
          disabled={deleting}
        >
          {deleting && <Spinner animation="border" size="sm" />}Löschen
        </Button>
      ),
    },
    {
      name: "",
      selector: (row) => (
        <Button
          style={{
            color: "#9fad3c",
            backgroundColor: "white",
            fontSize: "0.7rem",
            border: "none",
          }}
          className="deleteButton"
          onClick={() => HandleEditButton(row)}
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

  //const handleRowClicked = (row) => {
  //navigate(`/profile/${row.id}`);
  //};

  const handleDelete = (idToDelete) => {
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

  const HandleEditButton = async (userToBeEdited) => {
    setshowEditUser(false);
    try {
      const response = await getUserAdmin(userToBeEdited.id);
      setUserToBeEdited(response.data);
      setshowEditUser(true);
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
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            //onRowClicked={handleRowClicked}
          />
        </Col>
      </Row>
      {showEditUser && <AdminEditUser {...userToBeEdited} />}
    </Container>
  );
};

export default AdminProjects;
