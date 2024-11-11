import axios from "axios";
import authHeader from "../helpers/functions/auth-header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// USER ENDPOINTS
export const sendMessage = (message) => {
  return axios.post(`${API_URL}/messages/create/`, message, {
    headers: authHeader(),
  });
};

// ADMIN ENDPOINTS

export const listMessages = () => {
  return axios.get(`${API_URL}/messages/`, {
    headers: authHeader(),
  });
};

export const getMessage = (id) => {
  return axios.get(`${API_URL}/messages/${id}/`, {
    headers: authHeader(),
  });
};

export const deleteMessage = (id) => {
  return axios.delete(`${API_URL}/messages/${id}/`, {
    headers: authHeader(),
  });
};
