import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "../../api/project-service";
import ProjectForm from "../../components/user/ProjectForm/ProjectForm";
import UserTemplate from "../../templates/UserTemplate";

const ProjectEditPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      const result = await getProject(projectId);
      setProject(result.data);
    };
    fetchProject();
  }, [projectId]);

  const initialVal = [];

  if (Object.keys(project).length > 0) {
    const initialValues = {
      projectTitle: project.projectTitle,
      projectPlace: project.projectPlace,
      estimatedImplementationDate: project.estimatedImplementationDate,
      slogan: project.slogan,
      about: project.about,
      goal: project.goal,
      support: project.support,
      shortDesc: project.shortDesc,
      longDesc: project.longDesc,
      projectValue: project.projectValue,
      totalShares: project.totalShares,
      shareValue: project.shareValue,
      maxSharesPerPerson: project.maxSharesPerPerson,
      projectImage: project.projectImage,
      createdBy: project.createdBy,
      mode: "edit",
    };
    initialVal.push(initialValues);
  }

  return (
    <UserTemplate>
      {Object.keys(project).length > 0 ? (
        <ProjectForm {...initialVal[0]} />
      ) : (
        <div>loading</div>
      )}
    </UserTemplate>
  );
};

export default ProjectEditPage;
