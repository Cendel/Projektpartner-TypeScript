import apiRequest from "./apiRequest";

interface Project {
  id?: number;
  projectStatus?: boolean;
  adminAdvice?: boolean;
  projectTitle?: string;
  projectPlace?: string;
  estimatedImplementationDate?: string;
  slogan?: string;
  about?: string;
  goal?: string;
  support?: string;
  shortDesc?: string;
  longDesc?: string;
  projectImage?: File | string;
  createdBy?: number;
  createdByName?: string;
  createdDate?: string;
  projectValue?: string;
  totalShares?: number;
  shareValue?: string;
  maxSharesPerPerson?: number;
  sharesTaken?: number;
  followerList?: number[];
}

interface ShareOwnership {
  id?: number;
  user?: number;
  user_name?: string;
  project?: number;
  project_title?: string;
  shares?: number;
  share_value?: string;
}

interface ProjectAttachment {
  id?: number;
  file?: string | FormData;
  file_name?: string;
  file_extension?: string;
  project?: number;
}

// USER ENDPOINTS

export const createProject = (project: Project) => {
  return apiRequest<Project>("post", "/projects/create/", project);
}; //OK

export const getProject = (id: number) => {
  return apiRequest<Project>("get", `/projects/${id}/`);
}; //OK

export const getAllProjects = () => {
  return apiRequest<Project[]>("get", `/projects/`);
}; //OK

export const getProjectsByStatus = (status: boolean) => {
  return apiRequest<Project[]>(
    "get",
    `/projects/list/status/?projectStatus=${status}`
  );
}; //OK

export const getProjectsByAdminAdvice = (status: boolean) => {
  return apiRequest<Project[]>(
    "get",
    `/projects/list/advice/?adminAdvice=${status}`
  );
}; //OK

export const getProjectsForTables = (project_ids: number[]) => {
  return apiRequest<Project[]>(
    "get",
    "/projects/listforusertables/",
    undefined,
    project_ids
  );
}; //OK

export const getProjectsByIds = (project_ids: number[]) => {
  return apiRequest<Project[]>(
    "get",
    "/projects/listprojectsbyids/",
    undefined,
    project_ids
  );
}; //OK

export const updateProjectFollowerList = (
  id: number,
  followerList: number[]
) => {
  return apiRequest<Project>("put", `/projects/follow/${id}/`, {
    followerList,
  });
}; //OK

// ADMIN ENDPOINTS

export const updateProjectStatus = (id: number, projectStatus: boolean) => {
  return apiRequest<Project>("put", `/projects/updatestatus/${id}/`, {
    projectStatus,
  });
}; //OK

export const updateAdminAdvice = (id: number, adminAdvice: boolean) => {
  return apiRequest<Project>("put", `/projects/updateadvice/${id}/`, {
    adminAdvice,
  });
}; //OK

// ADMIN & PROJECT-OWNER ENDPOINTS

export const deleteProject = (id: number) => {
  return apiRequest<Project>("delete", `/projects/auth/${id}/`);
}; // NOT OK !!!!!!!!!

export const updateProject = (id: number, project: Project) => {
  return apiRequest<Project>("patch", `/projects/auth/${id}/`, project);
}; //OK

// ADMIN SHARE ENDPOINTS

export const createShare = (share: ShareOwnership) => {
  return apiRequest<ShareOwnership>("post", "/share_ownership/create/", share);
}; //OK

export const projectListShares = (projectId: number) => {
  return apiRequest<ShareOwnership[]>(
    "get",
    `/share_ownership/list/?projectId=${projectId}`
  );
}; //OK

export const userListShares = (userId: number) => {
  return apiRequest<ShareOwnership[]>(
    "get",
    `/share_ownership/list/user/?userId=${userId}`
  );
}; //OK

export const deleteShare = (shareId: ShareOwnership) => {
  return apiRequest<ShareOwnership>(
    "delete",
    `/share_ownership/delete/${shareId}/`
  );
}; //OK

// PROJECT ATTACHMENT ENDPOINTS

export const createAttachment = (file: FormData) => {
  return apiRequest<FormData>(
    "post",
    "/project_attachments/create/",
    file
  );
}; //OK

export const listAttachments = (projectId: number) => {
  return apiRequest<ProjectAttachment[]>(
    "get",
    `/project_attachments/listbyproject/?projectId=${projectId}`
  );
}; //OK

export const deleteAttachment = (attachmentId: number) => {
  return apiRequest<ProjectAttachment>(
    "delete",
    `/project_attachments/delete/${attachmentId}/`
  );
}; //OK