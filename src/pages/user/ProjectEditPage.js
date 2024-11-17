import React from "react";
import ProjectForm from "../../components/user/ProjectForm/ProjectForm";
import UserTemplate from "../../views/UserTemplate";
import { useParams } from "react-router-dom";

const ProjectEditPage = () => {
  const params = useParams();
  return (
    <UserTemplate>
      <ProjectForm edit={true} projectId={params.projectId} />
    </UserTemplate>
  );
};

export default ProjectEditPage;
