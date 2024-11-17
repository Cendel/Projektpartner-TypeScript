import Attachment from "../entities/Attachment";
import Project from "../entities/Project";
import ProjectAdminAdvice from "../entities/ProjectAdminAdvice";
import ProjectFollowerUpdate from "../entities/ProjectFollowerUpdate";
import ProjectListForTables from "../entities/ProjectListForTables";
import ProjectStatus from "../entities/ProjectStatus";
import ShareOwnership from "../entities/ShareOwnership";
import ShareOwnershipList from "../entities/ShareOwnershipList";
import apiRequest from "./apiRequest";

// USER ENDPOINTS

export const createProject = (project: FormData) => {
  return apiRequest<FormData, Project>("post", "/projects/create/", project);
}; //OK

export const getProject = (id: number) => {
  return apiRequest<void, Project>("get", `/projects/${id}/`);
}; //OK

export const getAllProjects = () => {
  return apiRequest<void, Project[]>("get", `/projects/`);
}; //OK

export const getProjectsByStatus = (status: boolean) => {
  return apiRequest<void, Project[]>(
    "get",
    `/projects/list/status/?projectStatus=${status}`
  );
}; //OK

export const getProjectsByAdminAdvice = (status: boolean) => {
  return apiRequest<void, Project[]>(
    "get",
    `/projects/list/advice/?adminAdvice=${status}`
  );
}; //OK

export const getProjectsForTables = (project_ids: number[]) => {
  return apiRequest<void, ProjectListForTables[]>(
    "get",
    "/projects/listforusertables/",
    undefined,
    { project_ids }
  );
}; //OK

export const getProjectsByIds = (project_ids: number[]) => {
  return apiRequest<void, Project[]>(
    "get",
    "/projects/listprojectsbyids/",
    undefined,
    { project_ids }
  );
}; //OK

export const updateProjectFollowerList = (
  id: number,
  followerList: number[]
) => {
  return apiRequest<ProjectFollowerUpdate, ProjectFollowerUpdate>(
    "put",
    `/projects/follow/${id}/`,
    {
      followerList,
    }
  );
}; //OK

// ADMIN ENDPOINTS

export const updateProjectStatus = (id: number, projectStatus: boolean) => {
  return apiRequest<ProjectStatus, ProjectStatus>(
    "put",
    `/projects/updatestatus/${id}/`,
    {
      projectStatus,
    }
  );
}; //OK

export const updateAdminAdvice = (id: number, adminAdvice: boolean) => {
  return apiRequest<ProjectAdminAdvice, ProjectAdminAdvice>(
    "put",
    `/projects/updateadvice/${id}/`,
    {
      adminAdvice,
    }
  );
}; //OK

// ADMIN & PROJECT-OWNER ENDPOINTS

export const deleteProject = (id: number) => {
  return apiRequest<void, void>("delete", `/projects/auth/${id}/`);
}; // OK

export const updateProject = (id: number, project: Project) => {
  return apiRequest<Project, Project>(
    "patch",
    `/projects/auth/${id}/`,
    project
  );
}; //OK

// ADMIN SHARE ENDPOINTS

export const createShare = (share: ShareOwnership) => {
  return apiRequest<ShareOwnership, ShareOwnership>(
    "post",
    "/share_ownership/create/",
    share
  );
}; //OK

export const projectListShares = (projectId: number) => {
  return apiRequest<void, ShareOwnershipList>(
    "get",
    `/share_ownership/list/?projectId=${projectId}`
  );
}; //OK

export const userListShares = (userId: number) => {
  return apiRequest<void, ShareOwnershipList>(
    "get",
    `/share_ownership/list/user/?userId=${userId}`
  );
}; //OK

export const deleteShare = (shareId: number) => {
  return apiRequest<void, void>(
    "delete",
    `/share_ownership/delete/${shareId}/`
  );
}; //OK

// PROJECT ATTACHMENT ENDPOINTS

export const createAttachment = (file: FormData) => {
  return apiRequest<FormData, Attachment>(
    "post",
    "/project_attachments/create/",
    file
  );
}; //OK

export const listAttachments = (projectId: number) => {
  return apiRequest<void, Attachment[]>(
    "get",
    `/project_attachments/listbyproject/?projectId=${projectId}`
  );
}; //OK

export const deleteAttachment = (attachmentId: number) => {
  return apiRequest<void, void>(
    "delete",
    `/project_attachments/delete/${attachmentId}/`
  );
}; //OK
