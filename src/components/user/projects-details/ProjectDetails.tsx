import "./projectDetails.scss";
import { useEffect, useState, useCallback } from "react";
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
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState(true);

  const participated_projects = Object.values(user.participated_projects).map(
    (value) => value
  );

  const isParticipatedProjectsIncludes = project
    ? participated_projects.includes(project.id)
    : false;

  const navigate = useNavigate();

  const loadData = useCallback(() => {
    loadProjectData(Number(projectId), setProject, setLoading, navigate);
  }, [navigate, projectId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      {loading || !project ? (
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

          <DownloadSection
            createdBy={project.createdBy}
            projectId={project.id}
          />

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
