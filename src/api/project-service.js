import axios from "axios";
import authHeader from "../helpers/functions/auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// USER ENDPOINTS
export const createProject = (project) => {
  return axios.post(`${API_URL}/projects/create/`, project, {
    headers: authHeader(),
  }); // OK
};

export const getProject = (id) => {
  return axios.get(`${API_URL}/projects/${id}/`, { headers: authHeader() }); // OK
};

export const getAllProjects = () => {
  return axios.get(`${API_URL}/projects`);
};

export const getProjectsByStatus = (status) => {
  return axios.get(`${API_URL}/projects/list/status/?projectStatus=${status}`, {
    headers: authHeader(),
  }); // OK
};

export const getProjectsByAdminAdvice = (status) => {
  return axios.get(`${API_URL}/projects/list/advice/?adminAdvice=${status}`, {
    headers: authHeader(),
  }); // OK
};

export const getProjectsForTables = (project_ids) => {
  return axios.get(`${API_URL}/projects/listforusertables/`, {
    headers: authHeader(),
    params: { ...project_ids },
  }); // OK
};

export const getProjectsByIds = (project_ids) => {
  return axios.get(`${API_URL}/projects/listprojectsbyids/`, {
    headers: authHeader(),
    params: { ...project_ids },
  }); // OK
};

export const updateProjectFollowerList = (id, values) => {
  return axios.put(`${API_URL}/projects/follow/${id}/`, values, {
    headers: authHeader(),
  });
};

// ADMIN ENDPOINTS

export const updateProjectStatus = (id, value) => {
  return axios.put(
    `${API_URL}/projects/updatestatus/${id}/`,
    {
      projectStatus: value,
    },
    {
      headers: authHeader(),
    }
  );
};

export const updateAdminAdvice = (id, value) => {
  return axios.put(
    `${API_URL}/projects/updateadvice/${id}/`,
    {
      adminAdvice: value,
    },
    {
      headers: authHeader(),
    }
  );
};

export const updateParticipantList = (id, values) => {
  return axios.post(`${API_URL}/projects/${id}.participantList`, values);
};

// ADMIN & PROJECT-OWNER ENDPOINTS

export const deleteProject = (id) => {
  return axios.delete(`${API_URL}/projects/auth/${id}`, {
    headers: authHeader(),
  });
};

export const updateProject = (projectId, project) => {
  return axios.patch(`${API_URL}/projects/auth/${projectId}/`, project, {
    headers: authHeader(),
  });
};

// ADMIN SHARE ENDPOINTS

export const createShare = (share) => {
  return axios.post(`${API_URL}/share_ownership/create/`, share, {
    headers: authHeader(),
  });
};

export const projectListShares = (projectId) => {
  return axios.get(`${API_URL}/share_ownership/list/?projectId=${projectId}`, {
    headers: authHeader(),
  });
};

export const userListShares = (userId) => {
  return axios.get(`${API_URL}/share_ownership/list/user/?userId=${userId}`, {
    headers: authHeader(),
  });
};

export const deleteShare = (shareId) => {
  return axios.delete(`${API_URL}/share_ownership/delete/${shareId}/`, {
    headers: authHeader(),
  });
};

// PROJECT ATTACHMENT ENDPOINTS

export const createAttachment = (file) => {
  return axios.post(`${API_URL}/project_attachments/create/`, file, {
    headers: authHeader(),
  });
};

export const listAttachments = (projectId) => {
  return axios.get(
    `${API_URL}/project_attachments/listbyproject/?projectId=${projectId}`,
    {
      headers: authHeader(),
    }
  );
};

export const deleteAttachment = (attachmentId) => {
  return axios.delete(
    `${API_URL}/project_attachments/delete/${attachmentId}/`,
    {
      headers: authHeader(),
    }
  );
};
