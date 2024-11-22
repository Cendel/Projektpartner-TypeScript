import "./projectDetails.scss";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import imageRounded from "../../../assets/img/rounded-bottom.svg";
import { Button, Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spacer from "../../common/spacer/Spacer";
import DownloadSection from "./DownloadSection";
import { TiLocationOutline } from "react-icons/ti";
import {
  getProject,
  updateProjectFollowerList,
} from "../../../api/project-service";
import { toast } from "../../../helpers/functions/swal";
import Loading from "../../common/loading/Loading";
import { convertCurrentDateToUserFormat } from "../../../helpers/functions/date-time";
import { useAppSelector } from "../../../store/hooks";
import Project from "../../../entities/Project";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";

import {
  calculateDaysUntilImplementation,
  calculateTotalDays,
} from "../../../helpers/functions/date-calculations";
import { handleInvestSubmit } from "./projectDetailHandlers";
import InvestSection from "./InvestSection";
import SupportSection from "./SupportSection";
import AccordionInfoSection from "./AccordionInfoSection";
import ButtonBarSection from "./ButtonBarSection";

const ProjectDetails = () => {
  const user = useAppSelector((state) => state.auth.user!); // Non-null Assertion
  const { projectId } = useParams();
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState(true);
  const followed_projects = Object.values(user.followed_projects).map(
    (value) => value
  );
  const participated_projects = Object.values(user.participated_projects).map(
    (value) => value
  );

  const isFollowedProjectsIncludes = project
    ? followed_projects.includes(project.id)
    : false;
  const isParticipatedProjectsIncludes = project
    ? participated_projects.includes(project.id)
    : false;

  const [isFollowing, setIsFollowing] = useState(isFollowedProjectsIncludes);
  const [inputValue, setInputValue] = useState(""); //for the input field in invest class
  const [feedback, setFeedback] = useState(""); //for the input field in invest class
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    try {
      const result = await getProject(Number(projectId));
      setProject(result.data);
    } catch (err) {
      toast(handleAxiosError(err).message, "error");
      navigate("/page-not-found");
    } finally {
      setLoading(false);
    }
  }, [navigate, projectId]);

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
      const detailsEl = document.querySelector(
        ".project-details"
      ) as HTMLElement;
      const detailsContainerEl = document.querySelector(
        ".project-screen-image"
      ) as HTMLElement;

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

  const daysUntilImplementation = calculateDaysUntilImplementation(
    project?.estimatedImplementationDate ?? ""
  );
  const totalDays = calculateTotalDays(
    project?.estimatedImplementationDate ?? "",
    project?.createdDate ?? ""
  );

  const handleFollowClick = async () => {
    if (project)
      try {
        updateProjectFollowerList(project.id);
        setIsFollowing(!isFollowing);
      } catch (err) {
      } finally {
      }
  };

  const handleInvestSubmitClick = () =>
    handleInvestSubmit(inputValue, setInputValue, setFeedback, user, project);

  return (
    <>
      {loading || !project ? (
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
                    now={totalDays - daysUntilImplementation - 0}
                    max={totalDays}
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
          <SupportSection
            project={project}
            isParticipatedProjectsIncludes={isParticipatedProjectsIncludes}
          />
          <Spacer height={30} />
          <InvestSection
            isParticipatedProjectsIncludes={isParticipatedProjectsIncludes}
            project={project}
            handleInvestSubmitClick={handleInvestSubmitClick}
            inputValue={inputValue}
            setInputValue={setInputValue}
            feedback={feedback}
          />
          <Spacer height={30} />
          <Container>
            <DownloadSection
              createdBy={project.createdBy}
              projectId={project.id}
            />
          </Container>
          <Spacer height={30} />
          <AccordionInfoSection project={project} />
          <ButtonBarSection user={user} project={project} />

          <Spacer />
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
