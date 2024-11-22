import "./projectDetails.scss";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spacer from "../../common/spacer/Spacer";
import DownloadSection from "./DownloadSection";
import { getProject } from "../../../api/project-service";
import { toast } from "../../../helpers/functions/swal";
import Loading from "../../common/loading/Loading";
import { useAppSelector } from "../../../store/hooks";
import Project from "../../../entities/Project";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";
import InvestSection from "./InvestSection";
import SupportSection from "./SupportSection";
import AccordionInfoSection from "./AccordionInfoSection";
import ButtonBarSection from "./ButtonBarSection";
import OverviewSection from "./OverviewSection";
import OpeningScreenSection from "./OpeningScreenSection";

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
