import "./projectDetails.scss";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spacer from "../../common/spacer/Spacer";
import DownloadSection from "./DownloadSection";
import Loading from "../../common/loading/Loading";
import { useAppSelector } from "../../../store/hooks";
import Project from "../../../entities/Project";
import InvestSection from "./InvestSection";
import SupportSection from "./SupportSection";
import AccordionInfoSection from "./AccordionInfoSection";
import ButtonBarSection from "./ButtonBarSection";
import OverviewSection from "./OverviewSection";
import OpeningScreenSection from "./OpeningScreenSection";
import { loadProjectData } from "./projectDetailHandlers";

const ProjectDetails = () => {
  const user = useAppSelector((state) => state.auth.user!); // Non-null Assertion
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjectData(Number(projectId), setProject, setLoading, navigate);
  }, [navigate, projectId]);

  const participatedProjects = useMemo(
    () => Object.values(user.participated_projects),
    [user.participated_projects]
  );

  const isParticipatedProjectsIncludes = useMemo(
    () => (project ? participatedProjects.includes(project.id) : false),
    [project, participatedProjects]
  );

  return loading || !project ? (
    <Loading />
  ) : (
    <div className="project-details-main-component">
      <OpeningScreenSection project={project} />

      <OverviewSection user={user} project={project} />

      <Spacer height={30} />

      <SupportSection
        project={project}
        isParticipatedProjectsIncludes={isParticipatedProjectsIncludes}
      />

      <Spacer height={30} />

      <InvestSection
        project={project}
        user={user}
        isParticipatedProjectsIncludes={isParticipatedProjectsIncludes}
      />

      <Spacer height={30} />

      <DownloadSection createdBy={project.createdBy} projectId={project.id} />

      <Spacer height={30} />

      <AccordionInfoSection project={project} />

      <ButtonBarSection user={user} project={project} />

      <Spacer />
    </div>
  );
};

export default ProjectDetails;
