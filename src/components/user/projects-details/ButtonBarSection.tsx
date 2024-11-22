import { useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spacer from "../../common/spacer/Spacer";
import SectionHeader from "../common/section-header/SectionHeader";
import DataTable from "react-data-table-component";
import ShareOwnershipList from "../../../entities/ShareOwnershipList";
import { listSharesForProject } from "../../../api/project-service";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";
import { toast } from "../../../helpers/functions/swal";
import { removeProject } from "./projectDetailHandlers";
import User from "../../../entities/User";
import Project from "../../../entities/Project";

interface Props {
  user: User;
  project: Project;
}

const columns = [
  {
    name: "Name",
    selector: (row: ShareOwnershipList) => row.user_name,
    sortable: true,
  },
  {
    name: "Aktien in diesem Projekt",
    selector: (row: ShareOwnershipList) => row.shares,
    sortable: true,
  },
  {
    name: "Wert der Aktien",
    selector: (row: ShareOwnershipList) => {
      return (row.shares * Number(row.share_value)).toLocaleString() + " €";
    },
  },
];

const ButtonBarSection = ({ user, project }: Props) => {
  const paginationConfig = {
    paginationPerPage: 10,
    paginationRowsPerPageOptions: [10, 20, 30],
  };
  const [showParticipantsList, setShowParticipantsList] = useState(false);
  const [participantsList, setParticipantsList] = useState<
    ShareOwnershipList[]
  >([]);

  const handleRowClicked = (row: ShareOwnershipList) => {
    navigate(`/profile/${row.user}`);
  };

  const participantsListHandleClick = async () => {
    try {
      const result = await listSharesForProject(project.id);
      setParticipantsList(result.data);
      window.scrollBy(0, 100);
      setShowParticipantsList(true);
    } catch (err) {
      toast(handleAxiosError(err).message, "error");
    } finally {
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <Container>
        {(user.is_superuser || user.name === project.createdByName) && (
          <>
            <div className="project-details-edit-buttons">
              <Button onClick={() => removeProject(navigate, project.id)}>
                PROJEKT LÖSCHEN
              </Button>
              <Button onClick={participantsListHandleClick}>
                PROJEKTTEILNEHMER
              </Button>
              <Nav.Link as={Link} to={`/project-edit/${project.id}`}>
                <Button className="edit-button">PROJEKT AKTUALISIEREN</Button>
              </Nav.Link>
            </div>
          </>
        )}
      </Container>
      <Spacer height={50} />
      {showParticipantsList && (
        <Container>
          <Row>
            <SectionHeader title="Projektbeteiligte" />
            <Col>
              <DataTable
                columns={columns}
                data={participantsList}
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
      )}
    </>
  );
};

export default ButtonBarSection;
