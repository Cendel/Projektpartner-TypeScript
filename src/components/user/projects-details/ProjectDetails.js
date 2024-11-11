import React, { useEffect, useState, useCallback } from "react";
import "./projectDetails.scss";
import imageRounded from "../../../assets/img/rounded-bottom.svg";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spacer from "../../common/spacer/Spacer";
import DownloadSection from "./DownloadSection";
import { TiLocationOutline } from "react-icons/ti";
import {
  deleteProject,
  getProject,
  updateProjectFollowerList,
  projectListShares,
} from "../../../api/project-service";
import { question, toast } from "../../../helpers/functions/swal";
import { useNavigate, Link, useParams } from "react-router-dom";
import Loading from "../../common/loading/Loading";
import {
  convertCurrentDateToUserFormat,
  getCurrentDate,
} from "../../../helpers/functions/date-time";
import { sendMessage } from "../../../api/contact-service";
import { useAppSelector } from "../../../store/hooks";
import SectionHeader from "../common/section-header/SectionHeader";
import DataTable from "react-data-table-component";

const ProjectDetails = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { projectId } = useParams();
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const followed_projects = Object.values(user.followed_projects).map(
    (value) => value
  );
  const isFollowedProjectsIncludes = followed_projects.includes(project.id);
  const participated_projects = Object.values(user.participated_projects).map(
    (value) => value
  );
  const isParticipatedProjectsIncludes = participated_projects.includes(
    project.id
  );

  const [isFollowing, setIsFollowing] = useState(isFollowedProjectsIncludes);
  const [inputValue, setInputValue] = useState(""); //for the input field in invest class
  const [feedback, setFeedback] = useState(""); //for the input field in invest class
  const navigate = useNavigate();
  const [showParticipantsList, setShowParticipantsList] = useState(false);
  const [participantsList, setParticipantsList] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const result = await getProject(projectId);
      setProject(result.data);
    } catch (err) {
      toast(err, "error");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setIsFollowing(isFollowedProjectsIncludes);
  }, [isFollowedProjectsIncludes]);

  //handles scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const detailsEl = document.querySelector(".project-details");
      const detailsContainerEl = document.querySelector(
        ".project-screen-image"
      );

      if (window.innerHeight >= scrollPos) {
        detailsEl.style.marginTop = `${window.innerHeight - scrollPos}px`;
      } else {
        detailsEl.style.marginTop = "0px";
      }
      detailsContainerEl.style.opacity = `0.${
        scrollPos < 450 ? 999 - scrollPos : 549
      }`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const removeProject = async () => {
    question(
      "Sind Sie sicher, dass Sie löschen möchten?",
      "Das können Sie nicht rückgängig machen!"
    ).then((firstResult) => {
      if (firstResult.isConfirmed) {
        question(
          "Alle Inhalte und Mediendateien, die zu diesem Projekt gehören, werden gelöscht.",
          "Möchten Sie fortfahren und das Projekt endgültig löschen?"
        ).then((secondResult) => {
          if (secondResult.isConfirmed) {
            try {
              deleteProject(projectId);
              toast(
                "Das Projekt wurde erfolgreich gelöscht.",
                "success",
                10000,
                true
              );
              navigate("/");
            } catch (err) {
              toast("Das Löschen konnte nicht durchgeführt werden", "warning");
            } finally {
            }
          }
        });
      }
    });
  };

  const daysUntilImplementation = Math.round(
    (new Date(project.estimatedImplementationDate) - new Date()) / 86400000
  );

  const totalDays = Math.round(
    (new Date(project.estimatedImplementationDate) -
      new Date(project.createdDate)) /
      86400000
  );

  const handleFollowClick = async () => {
    try {
      updateProjectFollowerList(project.id);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const handleSupportClick = (ada) => {
    const investContainer = document.querySelector(".invest-container");
    investContainer.style.display = "block";
    window.scrollBy(0, 250);
  };

  const handleInputSubmit = async (event) => {
    event.preventDefault();
    if (
      inputValue <= 0 ||
      inputValue > project.totalShares - project.sharesTaken ||
      inputValue > project.maxSharesPerPerson
    ) {
      setFeedback("Bitte geben Sie eine gültige Nummer ein.");
    } else {
      const values = {
        createdDate: getCurrentDate(),
        sender: user.id,
        title: "KAUFANFRAGE",
        text: `
        Der Benutzer ${user.name} mit der ID-Nummer ${user.id} fordert ${inputValue} Anteile an dem Projekt  ${project.projectTitle} mit der ID ${project.id} an.

        Projektinformationen:
        - Projekttitel: ${project.projectTitle}
        - Projekt-ID: ${project.id}
      `,
      };
      setInputValue("");
      try {
        await sendMessage(values);
        const investContainer = document.querySelector(".invest-container");
        investContainer.style.display = "none";
        toast("Ihre Anfrage wurde erfolgreich gesendet.", "success");
      } catch (err) {
        alert(err.response.data.message);
      }
      setFeedback("");
    }
  };

  const participantsListHandleClick = async () => {
    try {
      const result = await projectListShares(projectId);
      setParticipantsList(result.data);
      window.scrollBy(0, 100);
      setShowParticipantsList(true);
    } catch (err) {
      toast(err, "error");
    } finally {
    }
  };

  const columns = [
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
  ];
  const handleRowClicked = (row) => {
    navigate(`/profile/${row.user}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="project-details-main-component">
          <div>
            <img
              src={project.projectImage}
              alt={project.projectTitle}
              className="project-screen-image"
            />
          </div>
          <div className="project-details-container">
            <div>
              <img src={imageRounded} alt="" className="imageRounded" />
            </div>
          </div>
          <div className="main-title">
            <h1>{project.projectTitle}</h1>
            <h4>{project.shortDesc}</h4>
          </div>
          <Container className="project-details">
            <div className="title">
              <h5>{project.projectTitle}</h5>
            </div>
            <div className="details-box">
              <div className="first-part">
                <div className="info-left">{project.longDesc}</div>
                <div className="info-right">
                  <div className="createdByName">
                    <span> erstellt von</span>
                    <h5>
                      <Link to={`/profile/${project.createdBy}`}>
                        {project.createdByName.substring(0, 20)}
                      </Link>
                    </h5>
                  </div>
                  <div className="location">
                    <div>
                      <TiLocationOutline />
                    </div>
                    <h5>{project.projectPlace.substring(0, 20)}</h5>
                  </div>
                </div>
              </div>
              <div className="second-part">
                <div className="left">
                  <ProgressBar
                    className="progress"
                    animated={false}
                    now={new Date(totalDays - daysUntilImplementation)}
                    max={new Date(totalDays)}
                    label={""}
                    variant={"success"}
                  />
                  <div className="numeric-info">
                    <div>
                      <h5>
                        {convertCurrentDateToUserFormat(project.createdDate)}
                      </h5>
                      <span>Startdatum</span>
                    </div>
                    <div>
                      {project.participantCount ? (
                        <>
                          <h5>{project.participantCount}</h5>
                          <span>Projektbeteiligte</span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <h5>
                        {convertCurrentDateToUserFormat(
                          project.estimatedImplementationDate
                        )}
                      </h5>
                      <span>Fertigstellungsdatum</span>
                    </div>
                  </div>
                </div>
                <div className="right">
                  {isFollowing ? (
                    <Button className="followed" onClick={handleFollowClick}>
                      Verfolgt
                    </Button>
                  ) : (
                    <Button onClick={handleFollowClick}>Folgen</Button>
                  )}
                </div>
              </div>
            </div>
          </Container>
          <Spacer height={30} />
          <Container>
            <div className="support">
              <div className="left">
                <ProgressBar
                  className="progress"
                  animated={false}
                  striped={true}
                  now={project.sharesTaken}
                  max={project.totalShares}
                  label={""}
                  variant={"success"}
                />
                <div className="numeric-info">
                  <div>
                    <h5>
                      {(
                        project.sharesTaken * project.shareValue
                      ).toLocaleString()}
                      €
                    </h5>
                    <span>Finanzierung bereitgestellt</span>
                  </div>
                  <div>
                    <h5>{project.totalShares - project.sharesTaken}</h5>
                    <span>Aktien noch verfügbar</span>
                  </div>
                  <div>
                    <h5>{project.projectValue.toLocaleString()} €</h5>
                    <span>Finanzierungsziel</span>
                  </div>
                </div>
              </div>
              <div className="right">
                {isParticipatedProjectsIncludes ? (
                  <Button className="participated" onClick={handleSupportClick}>
                    Unterstützt
                  </Button>
                ) : (
                  <Button onClick={handleSupportClick}>Unterstützen</Button>
                )}
              </div>
            </div>
          </Container>
          <Spacer height={30} />
          <Container className="invest-container" style={{ display: "none" }}>
            <div className="invest">
              {isParticipatedProjectsIncludes ? (
                <>
                  <p>
                    In diesem Projekt besitzen Sie bereits Aktien. Sie können
                    Ihr Profil besuchen, um Ihre Aktieninformationen einzusehen.
                  </p>
                  <p>
                    Für Aktualisierungen oder Stornierungen Ihrer Aktien können
                    Sie Kontakt mit uns aufnehmen.
                  </p>
                </>
              ) : (
                <>
                  <p>Aktienwert:</p>
                  <p>
                    <span>{project.shareValue} €</span>
                  </p>
                  <p>
                    Die maximale Anzahl an Anteilen, die erworben werden können:
                  </p>
                  <p>
                    <span>{project.maxSharesPerPerson}</span>
                  </p>

                  <p>Anzahl verfügbarer Aktien:</p>
                  <p>
                    <span>{project.totalShares - project.sharesTaken}</span>
                  </p>
                  <p>
                    Geben Sie die Anzahl der Aktien ein, die Sie kaufen möchten
                  </p>
                  <div>
                    <div className="input">
                      <form onSubmit={handleInputSubmit}>
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(event) =>
                            setInputValue(event.target.value)
                          }
                        />
                        <button type="submit">Anfrage senden</button>
                      </form>
                      {feedback && <p>{feedback}</p>}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Container>
          <Spacer height={30} />
          <Container>
            <DownloadSection
              createdBy={project.createdBy}
              projectId={projectId}
            />
          </Container>
          <Spacer height={30} />
          <Container>
            <Accordion className="accordion-info" alwaysOpen>
              <Accordion.Item eventKey="0" className="item">
                <Accordion.Header className="ada">
                  <h5>Worum geht es in dem Projekt?</h5>
                </Accordion.Header>
                <Accordion.Body>{project.about}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <h5>Was sind die Ziele und wer ist die Zielgruppe?</h5>
                </Accordion.Header>
                <Accordion.Body>{project.goal}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <h5>Wer steht hinter dem Projekt?</h5>
                </Accordion.Header>
                <Accordion.Body>{project.support}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {(user.is_superuser || user.name === project.createdByName) && (
              <>
                <div className="project-details-edit-buttons">
                  <Button onClick={removeProject}>PROJEKT LÖSCHEN</Button>
                  <Button onClick={() => participantsListHandleClick()}>
                    PROJEKTTEILNEHMER
                  </Button>
                  <Button
                    className="edit-button"
                    as={Link}
                    to={`/project-edit/${project.id}`}
                    mode="edit"
                  >
                    PROJEKT AKTUALISIEREN
                  </Button>
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
                    progressPending={loading}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    onRowClicked={handleRowClicked}
                  />
                </Col>
              </Row>
            </Container>
          )}
          <Spacer />
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
