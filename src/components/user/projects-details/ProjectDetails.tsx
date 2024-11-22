import "./projectDetails.scss";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imageRounded from "../../../assets/img/rounded-bottom.svg";
import { Container } from "react-bootstrap";
import Spacer from "../../common/spacer/Spacer";
import DownloadSection from "./DownloadSection";
import { getProject } from "../../../api/project-service";
import { toast } from "../../../helpers/functions/swal";
import Loading from "../../common/loading/Loading";
import { useAppSelector } from "../../../store/hooks";
import Project from "../../../entities/Project";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";
import { handleInvestSubmit } from "./projectDetailHandlers";
import InvestSection from "./InvestSection";
import SupportSection from "./SupportSection";
import AccordionInfoSection from "./AccordionInfoSection";
import ButtonBarSection from "./ButtonBarSection";
import OverviewSection from "./OverviewSection";

const ProjectDetails = () => {
  const user = useAppSelector((state) => state.auth.user!); // Non-null Assertion
  const { projectId } = useParams();
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState(true);

  const participated_projects = Object.values(user.participated_projects).map(
    (value) => value
  );

  const isParticipatedProjectsIncludes = project
    ? participated_projects.includes(project.id)
    : false;

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

          <OverviewSection user={user} project={project} />

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
